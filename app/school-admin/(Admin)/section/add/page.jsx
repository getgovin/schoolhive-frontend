"use client";

import { Form, Select, Input, Button, Card, Row, Col, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { sectionCreate } from "../../../../../api/section.api";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classList } from "../../../../../api/class.api";
import { LoadingOutlined } from "@ant-design/icons";

export default function AddSectionPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Queries
  const query = useQuery({
    queryKey: ["classes"],
    queryFn: classList,
  });
  const classOptions = query?.data?.data?.map((value) => ({
    value: value?._id,
    label: value?.className,
  }));
  // Mutations
  const mutation = useMutation({
    mutationFn: sectionCreate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["sections"],
        });
        router.back();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleSubmit = async (values) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card title="Add Section">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <h3 className="mb-4 font-semibold">Section Information</h3>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Class Name"
              name="classId"
              rules={[
                {
                  required: true,
                  message: "Please select class",
                },
              ]}
            >
              <Select placeholder="Select Class" options={classOptions} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Section Name"
              name="sectionName"
              rules={[
                {
                  required: true,
                  message: "Please enter section name",
                },
              ]}
            >
              <Input
                placeholder="Enter Section (A, B, C)"
                maxLength={5}
                onChange={(e) => {
                  form.setFieldValue(
                    "sectionName",
                    e.target.value.toUpperCase(),
                  );
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-3 mt-8">
          <Button onClick={() => router.back()}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <span className="flex items-center"> Create Section</span>
            )}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

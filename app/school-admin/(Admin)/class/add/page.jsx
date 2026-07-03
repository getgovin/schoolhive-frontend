"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Select, Button, Card, Row, Col, message, Spin } from "antd";
import { useRouter } from "next/navigation";
import { classCreate } from "../../../../../api/class.api";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

const classOptions = [
  { label: "Pre-Nursery", value: "PRE_NURSERY" },
  { label: "Nursery", value: "NURSERY" },
  { label: "LKG", value: "LKG" },
  { label: "UKG", value: "UKG" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];

export default function AddClassPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // Mutations
  const mutation = useMutation({
    mutationFn: classCreate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["classes"],
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
    <Card title="Add Class">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <h3 className="mb-4 font-semibold">Class Information</h3>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Class Name"
              name="className"
              rules={[
                {
                  required: true,
                  message: "Please select class",
                },
              ]}
            >
              <Select
                placeholder="Select Class"
                options={classOptions}
                showSearch
                optionFilterProp="label"
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
              <span className="flex items-center">
                {" "}
                Create Class
              </span>
            )}
          </Button>
        </div>
      </Form>
    </Card>
  );
}

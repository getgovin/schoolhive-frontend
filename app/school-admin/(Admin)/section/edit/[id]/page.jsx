"use client";

import { LoadingOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  Select,
  Input,
  Button,
  Card,
  Row,
  Col,
  Spin,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { sectionupdate, sectionView } from "../../../../../../api/section.api";
import { classList } from "../../../../../../api/class.api";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function EditSectionPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  // Get Classes
  const {
    data: classData,
    isLoading: classLoading,
  } = useQuery({
    queryKey: ["classes"],
    queryFn: classList,
  });

  const classOptions =
    classData?.data?.map((item) => ({
      value: item._id,
      label: item.className,
    })) || [];

  // Get Section Details
  const {
    data: sectionData,
    isLoading,
  } = useQuery({
    queryKey: ["section", params.id],
    queryFn: () => sectionView(params.id),
    enabled: !!params.id,
  });

  useEffect(() => {
    if (sectionData?.data) {
      form.setFieldsValue({
        classId: sectionData.data.classId?._id,
        sectionName: sectionData.data.sectionName,
      });
    }
  }, [sectionData, form]);

  // Update Mutation
  const mutation = useMutation({
    mutationFn: sectionupdate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message);

        queryClient.invalidateQueries({
          queryKey: ["sections"],
        });

        router.back();
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (values) => {
    mutation.mutate({
      id: params.id,
      data: values,
    });
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-80">
  //       <Spin size="large" />
  //     </div>
  //   );
  // }

  return (
    <Card title="Edit Section">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
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
              <Select
                placeholder="Select Class"
                options={classOptions}
                loading={classLoading}
              />
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
                onChange={(e) =>
                  form.setFieldValue(
                    "sectionName",
                    e.target.value.toUpperCase()
                  )
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-3 mt-8">
          <Button onClick={() => router.back()}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            loading={mutation.isPending}
            disabled={mutation.isPending}
          >
            Update Section
          </Button>
        </div>
      </Form>
    </Card>
  );
}
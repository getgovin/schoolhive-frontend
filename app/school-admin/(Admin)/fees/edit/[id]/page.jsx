"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { feeUpdate, feeView } from "../../../../../../api/fee.api";
import { classList } from "../../../../../../api/class.api";

export default function EditFeesPage() {
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
    data: feeData,
    isLoading,
  } = useQuery({
    queryKey: ["fee", params.id],
    queryFn: () => feeView(params.id),
    enabled: !!params.id,
  });

  useEffect(() => {
    if (feeData?.data) {
      form.setFieldsValue({
        classId: feeData.data.classId?._id,
        fee: Number(feeData.data.fee),
      });
    }
  }, [feeData, form]);

  // Update Mutation
  const mutation = useMutation({
    mutationFn: feeUpdate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data.message);

        queryClient.invalidateQueries({
          queryKey: ["fees"],
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
  return (
    <Card title="Edit Fees">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <h3 className="mb-4 font-semibold">
          Fees Information
        </h3>

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
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Fees Amount"
              name="fee"
              rules={[
                {
                  required: true,
                  message: "Please enter fees amount",
                },
                {
                  validator: (_, value) => {
                    if (
                      value === undefined ||
                      value === null
                    ) {
                      return Promise.resolve();
                    }

                    if (value <= 0) {
                      return Promise.reject(
                        new Error(
                          "Fees must be greater than 0"
                        )
                      );
                    }

                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                className="w-full"
                min={0.01}
                step={0.01}
                precision={2}
                placeholder="Enter Fees Amount"
                controls={false}
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
          >
            Edit Fees
          </Button>
        </div>
      </Form>
    </Card>
  );
}
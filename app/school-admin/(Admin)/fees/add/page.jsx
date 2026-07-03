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
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { feeCreate } from "../../../../../api/fee.api";
import {classList} from "../../../../../api/class.api"
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

export default function AddFeesPage() {
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
    mutationFn: feeCreate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["fees"],
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
    <Card title="Add Fees">
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              <span className="flex items-center"> Create Fees</span>
            )}
          </Button>

        </div>
      </Form>
    </Card>
  );
}
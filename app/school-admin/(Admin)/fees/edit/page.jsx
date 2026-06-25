"use client";

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
import { useRouter } from "next/navigation";

export default function EditFeesPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);

    message.success("Fees created successfully");

    /*
    Payload Example

    {
      classId: values.classId,
      fees: values.fees
    }
    */
  };

  return (
    <Card title="Edit Fees">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
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
                options={[
                  {
                    label: "Nursery",
                    value: 1,
                  },
                  {
                    label: "LKG",
                    value: 2,
                  },
                  {
                    label: "UKG",
                    value: 3,
                  },
                  {
                    label: "Class 1",
                    value: 4,
                  },
                  {
                    label: "Class 2",
                    value: 5,
                  },
                  {
                    label: "Class 3",
                    value: 6,
                  },
                  {
                    label: "Class 4",
                    value: 7,
                  },
                  {
                    label: "Class 5",
                    value: 8,
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Fees Amount"
              name="fees"
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
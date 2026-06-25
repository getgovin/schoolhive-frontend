"use client";

import {
  Form,
  Select,
  Button,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { useRouter } from "next/navigation";

const classOptions = [
  { label: "Pre-Nursery", value: "PRE_NURSERY" },
  { label: "Nursery", value: "NURSERY" },
  { label: "LKG", value: "LKG" },
  { label: "UKG", value: "UKG" },
  { label: "Class 1", value: "1" },
  { label: "Class 2", value: "2" },
  { label: "Class 3", value: "3" },
  { label: "Class 4", value: "4" },
  { label: "Class 5", value: "5" },
  { label: "Class 6", value: "6" },
  { label: "Class 7", value: "7" },
  { label: "Class 8", value: "8" },
  { label: "Class 9", value: "9" },
  { label: "Class 10", value: "10" },
  { label: "Class 11", value: "11" },
  { label: "Class 12", value: "12" },
];

export default function AddClassPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);

    message.success("Class created successfully");
  };

  return (
    <Card title="Add Class">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h3 className="mb-4 font-semibold">
          Class Information
        </h3>

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
          <Button onClick={() => router.back()}>
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Create Class
          </Button>
        </div>
      </Form>
    </Card>
  );
}
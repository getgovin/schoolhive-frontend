"use client";

import {
  Form,
  Select,
  Input,
  Button,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { useRouter } from "next/navigation";

export default function AddSectionPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);

    message.success("Section created successfully");

    /*
    Payload Example

    {
      classId: 1,
      sectionName: "A"
    }
    */
  };

  return (
    <Card title="Add Section">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <h3 className="mb-4 font-semibold">
          Section Information
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
                    e.target.value.toUpperCase()
                  );
                }}
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
            Create Section
          </Button>
        </div>
      </Form>
    </Card>
  );
}
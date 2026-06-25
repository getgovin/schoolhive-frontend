"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Upload,
  DatePicker,
  Select,
  InputNumber,
  message,
} from "antd";
import {
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;
const { TextArea } = Input;

export default function UpdateStaffPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = (values) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth?.format("YYYY-MM-DD"),
      joiningDate: values.joiningDate?.format("YYYY-MM-DD"),
      photo: fileList?.[0]?.originFileObj || null,
    };

    console.log(payload);
    message.success("Staff created successfully");
  };

  const previewImage =
    fileList.length > 0
      ? URL.createObjectURL(fileList[0].originFileObj)
      : null;

  return (
    <Card title="Edit Staff">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {/* Photo */}
        <Form.Item label="Staff Photo">
          <ImgCrop rotationSlider showGrid>
            <Dragger
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false}
              showUploadList={false}
              fileList={fileList}
              onChange={({ fileList }) =>
                setFileList(fileList)
              }
            >
              {previewImage ? (
                <div className="relative flex justify-center">
                  <img
                    src={previewImage}
                    alt="Staff"
                    className="h-48 w-48 object-cover rounded-lg border"
                  />

                  <Button
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    className="!absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileList([]);
                    }}
                  />
                </div>
              ) : (
                <>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p>Click or drag staff photo here</p>
                </>
              )}
            </Dragger>
          </ImgCrop>
        </Form.Item>

        {/* Staff Information */}
        <h3 className="mb-4 font-semibold">
          Staff Information
        </h3>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter first name",
                },
              ]}
            >
              <Input placeholder="Enter First Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Middle Name"
              name="middleName"
            >
              <Input placeholder="Enter Middle Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
            >
              <Input placeholder="Enter Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item
              label="Gender"
              name="gender"
            >
              <Select
                placeholder="Select Gender"
                options={[
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                  {
                    label: "Other",
                    value: "Other",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Date Of Birth"
              name="dateOfBirth"
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Blood Group"
              name="bloodGroup"
            >
              <Input placeholder="Blood Group" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Mobile Number"
              name="mobile"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter mobile number",
                },
              ]}
            >
              <Input placeholder="Mobile Number" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message:
                    "Please enter valid email",
                },
              ]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
          </Col>
        </Row>

        {/* Employment Information */}
        <h3 className="mb-4 mt-6 font-semibold">
          Employment Information
        </h3>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Employee ID"
              name="employeeId"
            >
              <Input placeholder="Employee ID" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Joining Date"
              name="joiningDate"
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[
                {
                  required: true,
                  message:
                    "Please select designation",
                },
              ]}
            >
              <Select
                placeholder="Select Designation"
                options={[
                  {
                    label: "Driver",
                    value: "DRIVER",
                  },
                  {
                    label: "Conductor",
                    value: "CONDUCTOR",
                  },
                  {
                    label: "Bus Cleaner",
                    value: "BUS_CLEANER",
                  },
                  {
                    label: "Watchman",
                    value: "WATCHMAN",
                  },
                  {
                    label: "Cleaner",
                    value: "CLEANER",
                  },
                  {
                    label: "Accountant",
                    value: "ACCOUNTANT",
                  },
                  {
                    label: "Senior Accountant",
                    value:
                      "SENIOR_ACCOUNTANT",
                  },
                  {
                    label: "Helper",
                    value: "HELPER",
                  },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Department"
              name="department"
              rules={[
                {
                  required: true,
                  message:
                    "Please enter department",
                },
              ]}
            >
              <Input placeholder="Department" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Employment Type"
              name="employmentType"
            >
              <Select
                placeholder="Employment Type"
                options={[
                  {
                    label: "Full Time",
                    value: "FULL_TIME",
                  },
                  {
                    label: "Part Time",
                    value: "PART_TIME",
                  },
                  {
                    label: "Contract",
                    value: "CONTRACT",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Experience (Years)"
              name="experience"
            >
              <InputNumber
                min={0}
                className="w-full"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Salary Information */}
        <h3 className="mb-4 mt-6 font-semibold">
          Salary Information
        </h3>

        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item
              label="Monthly Salary"
              name="salary"
            >
              <InputNumber
                className="w-full"
                min={0}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Bank Name"
              name="bankName"
            >
              <Input placeholder="Bank Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Account Number"
              name="accountNumber"
            >
              <Input placeholder="Account Number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="IFSC Code"
              name="ifscCode"
            >
              <Input placeholder="IFSC Code" />
            </Form.Item>
          </Col>
        </Row>

        {/* Address Information */}
        <h3 className="mb-4 mt-6 font-semibold">
          Address Information
        </h3>

        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item
              label="Village"
              name="village"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Tehsil"
              name="tehsil"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="District"
              name="district"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="State"
              name="state"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item
              label="Pincode"
              name="pincode"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={18}>
            <Form.Item
              label="Address"
              name="address"
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>

        {/* Emergency Information */}
        <h3 className="mb-4 mt-6 font-semibold">
          Emergency Information
        </h3>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Emergency Contact Person"
              name="emergencyPerson"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Relationship"
              name="relationship"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Emergency Mobile"
              name="emergencyMobile"
            >
              <Input />
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
            Update Staff
          </Button>
        </div>
      </Form>
    </Card>
  );
}
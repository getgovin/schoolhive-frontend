"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Steps,
  Row,
  Col,
  Upload,
  DatePicker,
  Select,
  message,
  UploadProps
} from "antd";
import {
  UploadOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
const { Step } = Steps;
const { TextArea } = Input;
import { InboxOutlined } from '@ant-design/icons';

export default function AddSchoolPage() {
  const [current, setCurrent] = useState(1);
    const router = useRouter();
const { Dragger } = Upload;

  const [form] = Form.useForm();

  const next = async () => {
    try {
      if (current === 0) {
        await form.validateFields([
          "schoolName",
          "schoolCode",
          "schoolEmail",
          "schoolPhone",
          "address",
          "subscriptionStart",
          "subscriptionEnd",
        ]);
      }

      setCurrent(current + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onFinish = (values) => {
    console.log("School Data:", values);

    message.success("School created successfully!");
  };

  const items = [
  {
    title: '  School Info',
  },
  {
    title: 'Director Info',
  },
 
];

  const uploadProps = {
    name: 'file',
    multiple: false,
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      // if (status === 'done') {
      //   messageApi.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   messageApi.error(`${info.file.name} file upload failed.`);
      // }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
  
      <Card title="Add School"> 
         <Steps current={current} titlePlacement="vertical" items={items} ellipsis />
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          {/* STEP 1 */}
          {current === 1 && (
            <>
              <Row gutter={16} className="mt-8">
                                <Col xs={24} md={24} className="mb-4">
                                 <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Uplload your school logo here
        </p>
      </Dragger>
</Col>
                 
                <Col xs={24} md={12}>
                  <Form.Item
                    label="School Name"
                    name="schoolName"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter school name",
                      },
                    ]}
                  >
                    <Input placeholder="Enter school name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="School Code"
                    name="schoolCode"
                    rules={[
                      {
                        required: true,
                        message:
                          "Please enter school code",
                      },
                    ]}
                  >
                    <Input placeholder="Enter school code" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="UDISE Code"
                    name="udiseCode"
                  >
                    <Input placeholder="Enter UDISE code" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="DISE Code"
                    name="diseCode"
                  >
                    <Input placeholder="Enter DISE code" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="School Email"
                    name="schoolEmail"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Enter school email" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="School Phone"
                    name="schoolPhone"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </Col>
              </Row>
 <Row gutter={16}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="City"
                    name="city"
                  >
                    <Input placeholder="City" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    label="State"
                    name="state"
                  >
                    <Input placeholder="State" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    label="Pincode"
                    name="pincode"
                  >
                    <Input placeholder="Pincode" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="School Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter school address",
                  },
                ]}
              >
                <TextArea
                  rows={3}
                  placeholder="Enter school address"
                />
              </Form.Item>

             

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Subscription Start Date"
                    name="subscriptionStart"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Subscription End Date"
                    name="subscriptionEnd"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <DatePicker
                      className="w-full"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Board Type"
                    name="boardType"
                  >
                    <Select
                      placeholder="Select board"
                      options={[
                        {
                          label: "CBSE",
                          value: "CBSE",
                        },
                        {
                          label: "ICSE",
                          value: "ICSE",
                        },
                        {
                          label: "State Board",
                          value: "STATE",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>

                {/* <Col xs={24} md={12}>
                  <Form.Item
                    label="School Logo"
                    name="logo"
                  >
                    <Upload
                      beforeUpload={() => false}
                      maxCount={1}
                    >
                      <Button
                        icon={<UploadOutlined />}
                      >
                        Upload Logo
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col> */}
              </Row>
            </>
          )}

          {/* STEP 2 */}
          {current === 2 && (
            <>
        
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="First name" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Primary Mobile"
                    name="primaryMobile"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Primary mobile number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Secondary Mobile"
                    name="secondaryMobile"
                  >
                    <Input placeholder="Secondary mobile number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Email"
                    name="directorEmail"
                    rules={[
                      {
                        required: true,
                        type: "email",
                      },
                    ]}
                  >
                    <Input placeholder="Email address" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select position"
                      options={[
                        {
                          label: "Director",
                          value: "Director",
                        },
                        {
                          label: "Principal",
                          value: "Principal",
                        },
                        {
                          label:
                            "Director & Principal",
                          value: "Both",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-8">
            {current > 1 && (
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={prev}
              >
                Previous
              </Button>
            )}

            {current === 1 && (
              <Button
                icon={<ArrowLeftOutlined />}
      onClick={() => router.back()}
              >
                Back
              </Button>
            )}

            {current < 2 && (
              <Button
                type="primary"                onClick={next}
              >
                Next 
                  <i className="fi fi-tr-arrow-small-right text-2xl text-white ml-2"></i>

              </Button>
            )}

            {current === 2 && (

              
              <Button
                type="primary"
                htmlType="submit"
              >
                Create School
              </Button>
            )}
          </div>
        </Form>
      </Card>
  );
}
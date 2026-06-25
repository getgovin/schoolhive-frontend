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
  ArrowLeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;
const { TextArea } = Input;

export default function CreateTeacherPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    const payload = {
      ...values,
      dateOfBirth: values.dateOfBirth?.format("YYYY-MM-DD"),
      joiningDate: values.joiningDate?.format("YYYY-MM-DD"),
      photo: fileList?.[0]?.originFileObj || null,
    };

    console.log(payload);
    message.success("Teacher created successfully");
  };

  const previewImage =
    fileList.length > 0
      ? URL.createObjectURL(fileList[0].originFileObj)
      : null;

  return (
    <Card
      title="Edit Teacher"
 
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>

        <Form.Item label="Teacher Photo">
          <ImgCrop rotationSlider showGrid>
            <Dragger
              accept="image/*"
              maxCount={1}
              beforeUpload={() => false}
              showUploadList={false}
              fileList={fileList}
              onChange={({ fileList }) => setFileList(fileList)}
            >
              {previewImage ? (
                <div className="relative flex justify-center">
                  <img
                    src={previewImage}
                    alt="Teacher"
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
                  <p>Click or drag teacher photo here</p>
                </>
              )}
            </Dragger>
          </ImgCrop>
        </Form.Item>

        <h5>Teacher Information</h5>

        <Row gutter={16}>
          <Col xs={24} md={8}><Form.Item label="First Name" name="firstName" rules={[{required:true}]}><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Middle Name" name="middleName"><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Last Name" name="lastName" rules={[{required:true}]}><Input /></Form.Item></Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={6}><Form.Item label="Gender" name="gender" rules={[{required:true}]}><Select options={[{label:"Male",value:"Male"},{label:"Female",value:"Female"},{label:"Other",value:"Other"}]} /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Date Of Birth" name="dateOfBirth" rules={[{required:true}]}><DatePicker className="w-full" /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Blood Group" name="bloodGroup"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Mobile Number" name="mobile" rules={[{required:true}]}><Input /></Form.Item></Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}><Form.Item label="Email" name="email" rules={[{type:"email"}]}><Input /></Form.Item></Col>
        </Row>

        <h5>Professional Information</h5>

        <Row gutter={16}>
          <Col xs={24} md={8}><Form.Item label="Employee ID" name="employeeId" rules={[{required:true}]}><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Joining Date" name="joiningDate" rules={[{required:true}]}><DatePicker className="w-full" /></Form.Item></Col>
          <Col xs={24} md={8}>
          <Form.Item label="Designation" name="designation"><Select options={[{label:"Lead Teacher",value:"LEAD"},{label:"Support Teacher",value:"SUPPORT"}]} /></Form.Item>
         </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}><Form.Item label="Department" name="department"><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Subject" name="subject"><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Employment Type" name="employmentType"><Select options={[{label:"Full Time",value:"FULL_TIME"},{label:"Part Time",value:"PART_TIME"},{label:"Contract",value:"CONTRACT"}]} /></Form.Item></Col>
        </Row>

        <Form.Item label="Experience (Years)" name="experience">
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <h5>Salary Information</h5>

        <Row gutter={16}>
          <Col xs={24} md={6}><Form.Item label="Monthly Salary" name="salary"><InputNumber className="w-full" /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Bank Name" name="bankName"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Account Number" name="accountNumber"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="IFSC Code" name="ifscCode"><Input /></Form.Item></Col>
        </Row>

        <h5>Qualification Information</h5>

        <Row gutter={16}>
          <Col xs={24} md={6}><Form.Item label="Highest Qualification" name="highestQualification"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="University / College" name="university"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Passing Year" name="passingYear"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Certifications" name="certifications"><Input /></Form.Item></Col>
        </Row>

        <h5>Address Information</h5>

        <Row gutter={16}>
          <Col xs={24} md={6}><Form.Item label="Village" name="village"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="Tehsil" name="tehsil"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="District" name="district"><Input /></Form.Item></Col>
          <Col xs={24} md={6}><Form.Item label="State" name="state"><Input /></Form.Item></Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={6}><Form.Item label="Pincode" name="pincode"><Input /></Form.Item></Col>
          <Col xs={24} md={18}><Form.Item label="Address" name="address"><TextArea rows={3} /></Form.Item></Col>
        </Row>

        <h5>Emergency Information</h5>

        <Row gutter={16}>
          <Col xs={24} md={8}><Form.Item label="Emergency Contact Person" name="emergencyPerson"><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Relationship" name="relationship"><Input /></Form.Item></Col>
          <Col xs={24} md={8}><Form.Item label="Emergency Mobile" name="emergencyMobile"><Input /></Form.Item></Col>
        </Row>

        <div className="flex justify-end gap-3 mt-8">
          <Button onClick={() => router.back()}>Cancel</Button>
          <Button type="primary" htmlType="submit">Update Teacher</Button>
        </div>
      </Form>
    </Card>
  );
}
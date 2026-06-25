"use client";

import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Avatar,
  Button,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function TeacherDetailsPage() {
  const router = useRouter();

 const teacher = {
  firstName: "Rahul",
  middleName: "Kumar",
  lastName: "Sharma",

  employeeId: "EMP-001",

  gender: "Male",
  dob: "15 Aug 1990",
  bloodGroup: "B+",

  mobile: "+91 9876543210",
  email: "rahul.sharma@gmail.com",

  joiningDate: "01 Apr 2023",
  designation: "Senior Teacher",
  department: "Science",
  subject: "Physics",
  employmentType: "Full Time",
  experience: "8 Years",

  monthlySalary: "45000",
  bankName: "State Bank of India",
  accountNumber: "XXXXXX4587",
  ifscCode: "SBIN0001234",

  highestQualification: "M.Sc Physics",
  university: "DAVV Indore",
  passingYear: "2015",
  certifications: "B.Ed, CTET",

  village: "Vijay Nagar",
  tehsil: "Indore",
  district: "Indore",
  state: "Madhya Pradesh",
  pincode: "452001",
  address:
    "123 Vijay Nagar, Near C21 Mall, Indore",

  emergencyContactPerson: "Amit Sharma",
  relationship: "Brother",
  emergencyMobile: "+91 9876543215",

  photo:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43b?w=500",
};

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
     <Card

>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 20,
      flexWrap: "wrap",
    }}
  >
    <Avatar
      size={96}
      src={teacher.photo}
    >
      {teacher.firstName?.charAt(0)}
    </Avatar>

    <div>
      <Title level={2}>
        {teacher.firstName}{" "}
        {teacher.middleName}{" "}
        {teacher.lastName}
      </Title>

      <Text type="secondary">
        Employee ID: {teacher.employeeId}
      </Text>

      <br />

      <Tag
        color="success"
        icon={<CheckCircleFilled />}
        style={{
          marginTop: 12,
          borderRadius: 20,
        }}
      >
        Active Teacher
      </Tag>
    </div>
  </div>
</Card>

      {/* Personal Information */}
   <Card title="PERSONAL INFORMATION">
  <Row gutter={[48, 32]}>
    <Col xs={24} md={12}>
      <label>First Name</label>
      <span className="view-value">
        {teacher.firstName}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Middle Name</label>
      <span className="view-value">
        {teacher.middleName}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Last Name</label>
      <span className="view-value">
        {teacher.lastName}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Gender</label>
      <span className="view-value">
        {teacher.gender}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Date Of Birth</label>
      <span className="view-value">
        {teacher.dob}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Blood Group</label>
      <span className="view-value">
        {teacher.bloodGroup}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Mobile Number</label>
      <span className="view-value">
        {teacher.mobile}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Email</label>
      <span className="view-value">
        {teacher.email}
      </span>
    </Col>
  </Row>
</Card>
      {/* Academic Information */}
     <Card title="PROFESSIONAL INFORMATION">
  <Row gutter={[48, 32]}>
    <Col xs={24} md={12}>
      <label>Employee ID</label>
      <span className="view-value">
        {teacher.employeeId}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Joining Date</label>
      <span className="view-value">
        {teacher.joiningDate}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Designation</label>
      <span className="view-value">
        {teacher.designation}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Department</label>
      <span className="view-value">
        {teacher.department}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Subject</label>
      <span className="view-value">
        {teacher.subject}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Employment Type</label>
      <span className="view-value">
        {teacher.employmentType}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Experience</label>
      <span className="view-value">
        {teacher.experience}
      </span>
    </Col>
  </Row>
</Card>

      {/* Parent Information */}
     <Card title="SALARY INFORMATION">
  <Row gutter={[48, 32]}>
    <Col xs={24} md={12}>
      <label>Monthly Salary</label>
      <span className="view-value">
        ₹{teacher.monthlySalary}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Bank Name</label>
      <span className="view-value">
        {teacher.bankName}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Account Number</label>
      <span className="view-value">
        {teacher.accountNumber}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>IFSC Code</label>
      <span className="view-value">
        {teacher.ifscCode}
      </span>
    </Col>
  </Row>
</Card>


<Card
  title="QUALIFICATION INFORMATION"
>
  <Row gutter={[48, 32]}>
    <Col xs={24} md={12}>
      <label>Highest Qualification</label>
      <span className="view-value">
        {teacher.highestQualification}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>University / College</label>
      <span className="view-value">
        {teacher.university}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Passing Year</label>
      <span className="view-value">
        {teacher.passingYear}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Certifications</label>
      <span className="view-value">
        {teacher.certifications}
      </span>
    </Col>
  </Row>
</Card>
<Card
  title="ADDRESS INFORMATION"
>
  <Row gutter={[48, 32]}>
    <Col xs={24} md={12}>
      <label>Village</label>
      <span className="view-value">
        {teacher.village}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Tehsil</label>
      <span className="view-value">
        {teacher.tehsil}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>District</label>
      <span className="view-value">
        {teacher.district}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>State</label>
      <span className="view-value">
        {teacher.state}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Pincode</label>
      <span className="view-value">
        {teacher.pincode}
      </span>
    </Col>

    <Col span={24}>
      <label>Address</label>
      <span className="view-value">
        {teacher.address}
      </span>
    </Col>
  </Row>
</Card>
    <Card
  title="EMERGENCY INFORMATION"
>
  <Row gutter={[48, 32]}>
    <Col xs={24} md={12}>
      <label>Emergency Contact Person</label>
      <span className="view-value">
        {teacher.emergencyContactPerson}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Relationship</label>
      <span className="view-value">
        {teacher.relationship}
      </span>
    </Col>

    <Col xs={24} md={12}>
      <label>Emergency Mobile</label>
      <span className="view-value">
        {teacher.emergencyMobile}
      </span>
    </Col>
  </Row>
</Card>

      {/* Back Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 24,
        }}
      >
        <Button
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
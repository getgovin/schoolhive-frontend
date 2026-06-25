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

export default function StudentDetailsPage() {
  const router = useRouter();

  const student = {
    firstName: "Rahul",
    middleName: "Kumar",
    lastName: "Sharma",

    admissionNo: "ADM-2025-001",
    rollNo: "15",

    gender: "Male",
    dob: "15 Aug 2012",
    bloodGroup: "B+",
    aadhaarNumber: "1234 5678 9012",

    class: "8",
    section: "A",
    house: "Blue House",
    admissionDate: "01 Apr 2025",

    fatherName: "Rajesh Sharma",
    fatherMobile: "+91 9876543210",
    fatherOccupation: "Business",

    motherName: "Sunita Sharma",
    motherMobile: "+91 9876543211",
    motherOccupation: "Teacher",

    email: "rahul.sharma@gmail.com",
    mobile: "+91 9123456789",

    address:
      "123 Vijay Nagar, Near C21 Mall, Indore, Madhya Pradesh",
    city: "Indore",
    state: "Madhya Pradesh",
    pincode: "452001",

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
            src={student.photo}
            style={{
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            {student.firstName?.charAt(0)}
          </Avatar>

          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 32,
              }}
            >
              {student.firstName} {student.middleName}{" "}
              {student.lastName}
            </Title>

            <div style={{ marginTop: 6 }}>
              <Text type="secondary">
                Admission No: {student.admissionNo}
              </Text>

              <Text
                type="secondary"
                style={{ margin: "0 8px" }}
              >
                •
              </Text>

              <Text type="secondary">
                Roll No: {student.rollNo}
              </Text>
            </div>

            <Tag
              color="success"
              icon={<CheckCircleFilled />}
              style={{
                marginTop: 12,
                borderRadius: 20,
                paddingInline: 12,
              }}
            >
              Active Student
            </Tag>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card
        title="PERSONAL INFORMATION"
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>First Name</label>
            <span className="view-value">
              {student.firstName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Middle Name</label>
            <span className="view-value">
              {student.middleName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Last Name</label>
            <span className="view-value">
              {student.lastName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Gender</label>
            <span className="view-value">
              {student.gender}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Date of Birth</label>
            <span className="view-value">
              {student.dob}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Blood Group</label>
            <span className="view-value">
              {student.bloodGroup}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Aadhaar Number</label>
            <span className="view-value">
              {student.aadhaarNumber}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Academic Information */}
      <Card
        title="ACADEMIC INFORMATION"
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Admission Number</label>
            <span className="view-value">
              {student.admissionNo}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Roll Number</label>
            <span className="view-value">
              {student.rollNo}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Class</label>
            <span className="view-value">
              {student.class}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Section</label>
            <span className="view-value">
              {student.section}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>House</label>
            <span className="view-value">
              {student.house}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Admission Date</label>
            <span className="view-value">
              {student.admissionDate}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Parent Information */}
      <Card
        title="PARENT INFORMATION"
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Father Name</label>
            <span className="view-value">
              {student.fatherName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Father Mobile</label>
            <span className="view-value">
              {student.fatherMobile}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Father Occupation</label>
            <span className="view-value">
              {student.fatherOccupation}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mother Name</label>
            <span className="view-value">
              {student.motherName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mother Mobile</label>
            <span className="view-value">
              {student.motherMobile}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mother Occupation</label>
            <span className="view-value">
              {student.motherOccupation}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Contact Information */}
      <Card
        title="CONTACT INFORMATION"
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Email</label>
            <span className="view-value">
              {student.email}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mobile Number</label>
            <span className="view-value">
              {student.mobile}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>City</label>
            <span className="view-value">
              {student.city}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>State</label>
            <span className="view-value">
              {student.state}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Pincode</label>
            <span className="view-value">
              {student.pincode}
            </span>
          </Col>

          <Col span={24}>
            <label>Address</label>
            <span className="view-value">
              {student.address}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Documents */}
      <Card
        title="DOCUMENT INFORMATION"
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={8}>
            <label>Birth Certificate</label>
            <span className="view-value">
              Uploaded
            </span>
          </Col>

          <Col xs={24} md={8}>
            <label>Aadhaar Card</label>
            <span className="view-value">
              Uploaded
            </span>
          </Col>

          <Col xs={24} md={8}>
            <label>Transfer Certificate</label>
            <span className="view-value">
              Uploaded
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
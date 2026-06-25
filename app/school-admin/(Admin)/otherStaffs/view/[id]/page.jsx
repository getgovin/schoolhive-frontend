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

export default function StaffDetailsPage() {
  const router = useRouter();

  const staff = {
    firstName: "Ramesh",
    middleName: "Kumar",
    lastName: "Yadav",

    employeeId: "STF001",

    gender: "Male",
    dob: "10 Jan 1990",
    bloodGroup: "B+",

    mobile: "+91 9876543210",
    email: "ramesh@school.com",

    joiningDate: "15 Jun 2022",
    designation: "Driver",
    department: "Transport",
    employmentType: "Full Time",
    experience: "8 Years",

    salary: "25000",
    bankName: "State Bank of India",
    accountNumber: "123456789012",
    ifscCode: "SBIN0001234",

    village: "Vijay Nagar",
    tehsil: "Indore",
    district: "Indore",
    state: "Madhya Pradesh",
    pincode: "452001",
    address:
      "123 Vijay Nagar, Near C21 Mall, Indore",

    emergencyPerson: "Amit Yadav",
    relationship: "Brother",
    emergencyMobile: "+91 9876543299",

    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43b?w=500",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <Card
        style={{
          borderRadius: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Avatar
            size={100}
            src={staff.photo}
          >
            {staff.firstName?.charAt(0)}
          </Avatar>

          <div>
            <Title
              level={2}
              style={{
                margin: 0,
              }}
            >
              {staff.firstName}{" "}
              {staff.middleName}{" "}
              {staff.lastName}
            </Title>

            <Text type="secondary">
              Employee ID : {staff.employeeId}
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
              Active Staff
            </Tag>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card
        title={
          <span
            style={{
              color: "#6d28d9",
              fontWeight: 700,
            }}
          >
            PERSONAL INFORMATION
          </span>
        }
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>First Name</label>
            <span className="view-value">
              {staff.firstName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Middle Name</label>
            <span className="view-value">
              {staff.middleName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Last Name</label>
            <span className="view-value">
              {staff.lastName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Gender</label>
            <span className="view-value">
              {staff.gender}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Date Of Birth</label>
            <span className="view-value">
              {staff.dob}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Blood Group</label>
            <span className="view-value">
              {staff.bloodGroup}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mobile Number</label>
            <span className="view-value">
              {staff.mobile}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Email</label>
            <span className="view-value">
              {staff.email}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Employment Information */}
      <Card
        title={
          <span
            style={{
              color: "#6d28d9",
              fontWeight: 700,
            }}
          >
            EMPLOYMENT INFORMATION
          </span>
        }
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Employee ID</label>
            <span className="view-value">
              {staff.employeeId}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Joining Date</label>
            <span className="view-value">
              {staff.joiningDate}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Designation</label>
            <span className="view-value">
              {staff.designation}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Department</label>
            <span className="view-value">
              {staff.department}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Employment Type</label>
            <span className="view-value">
              {staff.employmentType}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Experience</label>
            <span className="view-value">
              {staff.experience}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Salary Information */}
      <Card
        title={
          <span
            style={{
              color: "#6d28d9",
              fontWeight: 700,
            }}
          >
            SALARY INFORMATION
          </span>
        }
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Monthly Salary</label>
            <span className="view-value">
              ₹{staff.salary}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Bank Name</label>
            <span className="view-value">
              {staff.bankName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Account Number</label>
            <span className="view-value">
              {staff.accountNumber}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>IFSC Code</label>
            <span className="view-value">
              {staff.ifscCode}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Address Information */}
      <Card
        title={
          <span
            style={{
              color: "#6d28d9",
              fontWeight: 700,
            }}
          >
            ADDRESS INFORMATION
          </span>
        }
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Village</label>
            <span className="view-value">
              {staff.village}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Tehsil</label>
            <span className="view-value">
              {staff.tehsil}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>District</label>
            <span className="view-value">
              {staff.district}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>State</label>
            <span className="view-value">
              {staff.state}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Pincode</label>
            <span className="view-value">
              {staff.pincode}
            </span>
          </Col>

          <Col span={24}>
            <label>Address</label>
            <span className="view-value">
              {staff.address}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Emergency Information */}
      <Card
        title={
          <span
            style={{
              color: "#6d28d9",
              fontWeight: 700,
            }}
          >
            EMERGENCY INFORMATION
          </span>
        }
      >
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Emergency Contact Person</label>
            <span className="view-value">
              {staff.emergencyPerson}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Relationship</label>
            <span className="view-value">
              {staff.relationship}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Emergency Mobile</label>
            <span className="view-value">
              {staff.emergencyMobile}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Back Button */}
      <div className="flex justify-end">
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
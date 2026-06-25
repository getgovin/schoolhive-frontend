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
  Divider,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function SchoolDetailsPage() {
  const router = useRouter();

  const school = {
    schoolName: "Greenwood Senior Secondary School",
    schoolCode: "GSS-2024-001",
    udiseCode: "23456789012",
    diseCode: "",
    email: "admin@greenwoodschool.edu",
    phone: "+91 98765 43210",
    city: "Indore",
    state: "Madhya Pradesh",
    pincode: "452001",
    address:
      "123, Vijay Nagar, Near City Mall, Indore, Madhya Pradesh - 452001",
    subscriptionStart: "01 Apr 2025",
    subscriptionEnd: "31 Mar 2026",
    boardType: "CBSE",
    directorName: "Mr. Ramesh Kumar",
    directorPrimaryPhone: "+91 91234 56789",
    directorSecondaryPhone: "+91 99876 54321",
    directorEmail: "director@greenwoodschool.edu"
  };





  return (
    <div  className="flex flex-col gap-6">
     
    
     
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
              style={{
                background: "#ede9fe",
                color: "#6d28d9",
                fontSize: 42,
                fontWeight: 700,
              }}
            >
              GS
            </Avatar>

            <div>
              <Title
                level={2}
                style={{
                  margin: 0,
                  fontSize: 34,
                }}
              >
                {school.schoolName}
              </Title>

              <div style={{ marginTop: 4 }}>
                <Text type="secondary">
                  School Code: {school.schoolCode}
                </Text>

                <Text
                  type="secondary"
                  style={{ margin: "0 8px" }}
                >
                  •
                </Text>

                <Text type="secondary">
                  UDISE: {school.udiseCode}
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
                Active Subscription
              </Tag>
            </div>
          </div>
        </Card>

        {/* Basic Information */}
        <Card
          title="BASIC INFORMATION"
      
        >
          <Row gutter={[48, 32]}>
            <Col xs={24} md={12}>
              <label>School Name</label>
              <span className="view-value">{school.schoolName}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>School Code</label>
              <span className="view-value">{school.schoolCode}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>UDISE Code</label>
              <span className="view-value">{school.udiseCode}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>DISE Code</label>
              <span className="view-value">
                {school.diseCode || "Not provided"}
              </span>
            </Col>

            <Col xs={24} md={12}>
              <label>School Email</label>
              <span className="view-value">{school.email}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>School Phone</label>
              <span className="view-value">{school.phone}</span>
            </Col>
          </Row>
        </Card>

        {/* Location */}
        <Card
          title="LOCATION"
        
        >
          <Row gutter={[48, 32]}>
            <Col xs={24} md={8}>
              <label>City</label>
              <span className="view-value">{school.city}</span>        
            </Col>

            <Col xs={24} md={8}>
              <label>State</label>
              <span className="view-value">{school.state}</span>
            </Col>

            <Col xs={24} md={8}>
              <label>Pincode</label>
              <span className="view-value">{school.pincode}</span>
            </Col>

            <Col span={24}>
              <label>School Address</label>
              <span className="view-value">{school.address}</span>
            </Col>
          </Row>
        </Card>

        {/* Subscription */}
        <Card
          title="SUBSCRIPTION & BOARD"
      
        >
          <Row gutter={[48, 32]}>
            <Col xs={24} md={12}>
              <label>Subscription Start Date</label>
              <span className="view-value">{school.subscriptionStart}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>Subscription End Date</label>
              <span className="view-value">{school.subscriptionEnd}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>Board Type</label>
              <span className="view-value">{school.boardType}</span>
            </Col>
          </Row>
        </Card>


          {/* Director Information */}
        <Card
          title="Director Information"
        
        >
          <Row gutter={[48, 32]}>
            <Col xs={24} md={12}>
              <label>Name</label>
              <span className="view-value">{school.directorName}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>Primary Phone</label>
              <span className="view-value">{school.directorPrimaryPhone}</span>
            </Col>
            <Col xs={24} md={12}>
              <label>Secondary Phone</label>
              <span className="view-value">{school.directorSecondaryPhone}</span>
            </Col>

            <Col xs={24} md={12}>
              <label>Email</label>
              <span className="view-value">{school.directorEmail}</span>
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
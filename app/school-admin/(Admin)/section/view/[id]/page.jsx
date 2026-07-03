"use client";

import React from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
} from "antd";
import {
  ArrowLeftOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function SectionDetailsPage() {
  const router = useRouter();

  // Dummy data (replace with API later)
  const sectionDetails = {
    id: 1,
    className: "Class 10",
    sectionName: "A",
    status: "Active",
    createdAt: "15 Jun 2026",
    updatedAt: "18 Jun 2026",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* HEADER CARD */}
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {/* Left Side */}
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 32,
              }}
            >
              {sectionDetails.className} -{" "}
              {sectionDetails.sectionName}
            </Title>

            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Section Details Information
              </Text>
            </div>

         
          </div>

          {/* Right Side */}
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                color: "#1677ff",
              }}
            >
              {sectionDetails.sectionName}
            </Title>

            <Text type="secondary">
              Section Name
            </Text>
          </div>
        </div>
      </Card>

      {/* SECTION INFO */}
      <Card title="SECTION INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Class Name</label>
            <span className="view-value">
              {sectionDetails.className}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Section Name</label>
            <span className="view-value">
              {sectionDetails.sectionName}
            </span>
          </Col>

       
        </Row>
      </Card>



      {/* BACK BUTTON */}
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
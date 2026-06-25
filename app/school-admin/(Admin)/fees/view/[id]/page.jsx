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

export default function FeesDetailsPage() {
  const router = useRouter();

  const feeDetails = {
    id: 1,
    className: "Class 10",
    feesAmount: 25000.5,
    status: "Active",
    createdAt: "15 Jun 2026",
    updatedAt: "18 Jun 2026",
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
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
          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 32,
              }}
            >
              {feeDetails.className}
            </Title>

            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Fee Structure Details
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
              {feeDetails.status}
            </Tag>
          </div>

          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                color: "#1677ff",
              }}
            >
              ₹
              {feeDetails.feesAmount.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </Title>

            <Text type="secondary">
              Total Fees
            </Text>
          </div>
        </div>
      </Card>

      {/* Fees Information */}
      <Card title="FEES INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Class Name</label>
            <span className="view-value">
              {feeDetails.className}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Fees Amount</label>
            <span className="view-value">
              ₹
              {feeDetails.feesAmount.toLocaleString(
                "en-IN",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Status</label>
            <span className="view-value">
              {feeDetails.status}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Record ID</label>
            <span className="view-value">
              {feeDetails.id}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Audit Information */}
      <Card title="AUDIT INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Created Date</label>
            <span className="view-value">
              {feeDetails.createdAt}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Last Updated Date</label>
            <span className="view-value">
              {feeDetails.updatedAt}
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
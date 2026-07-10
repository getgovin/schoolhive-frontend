"use client";

import React from "react";
import { Card, Row, Col, Typography, Tag, Avatar, Button } from "antd";
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { studentView } from "../../../../../../api/student.api";
import moment from "moment";

const { Title, Text } = Typography;

export default function StudentDetailsPage() {
  const router = useRouter();
  const params = useParams();

  // Queries
  const query = useQuery({
    queryKey: ["studentsView", params.id],
    queryFn: () => studentView(params.id),
    enabled: !!params.id,
  });

  const { data, error, isPending } = query;

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <Card>
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
            // src={student.photo}
            style={{
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            {data?.data?.studentInfo?.firstName?.charAt(0)}
          </Avatar>

          <div>
            <Title
              level={2}
              style={{
                margin: 0,
                fontSize: 32,
              }}
            >
              {data?.data?.studentInfo?.firstName}{" "}
              {data?.data?.studentInfo?.middleName}{" "}
              {data?.data?.studentInfo?.lastName}
            </Title>

            <div style={{ marginTop: 6 }}>
              <Text type="secondary">
                Admission No: {data?.data?.studentInfo?.adminssion_number}
              </Text>

              <Text type="secondary" style={{ margin: "0 8px" }}>
                •
              </Text>

              <Text type="secondary">
                Roll No: {data?.data?.studentInfo?.roll_number}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card title="PERSONAL INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>First Name</label>
            <span className="view-value">
              {data?.data?.studentInfo?.firstName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Middle Name</label>
            <span className="view-value">
              {data?.data?.studentInfo?.middleName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Last Name</label>
            <span className="view-value">
              {data?.data?.studentInfo?.lastName}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Gender</label>
            <span className="view-value">
              {data?.data?.studentInfo?.gender}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Date of Birth</label>
            <span className="view-value">
              {moment(data?.data?.studentInfo?.dob).format("DD/MMM/YYYY")}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Blood Group</label>
            <span className="view-value">
              {data?.data?.studentInfo?.blood_group}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label> Total Fee</label>
            <span className="view-value">₹{data?.data?.fee}</span>
          </Col>

          <Col xs={24} md={12}>
            <label> Old Fee</label>
            <span className="view-value">
              ₹{data?.data?.studentInfo?.oldFee}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Bus Fee</label>
            <span className="view-value">
              ₹{data?.data?.studentInfo?.busFee}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label> Current Class Fee</label>
            <span className="view-value">₹{data?.data?.currentFee}</span>
          </Col>
        </Row>
      </Card>

      {/* Academic Information */}
      <Card title="ACADEMIC INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Admission Number</label>
            <span className="view-value">
              {data?.data?.studentInfo?.adminssion_number}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Roll Number</label>
            <span className="view-value">
              {data?.data?.studentInfo?.roll_number}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Class</label>
            <span className="view-value">
              {data?.data?.studentInfo?.classId?.className} Class
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Section</label>
            <span className="view-value">
              {data?.data?.studentInfo?.sectionId?.sectionName} Section
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Admission Date</label>
            <span className="view-value">
              {moment(data?.data?.studentInfo?.joining_date).format(
                "DD/MMM/YYYY",
              )}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Parent Information */}
      <Card title="PARENT INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Father Name</label>
            <span className="view-value">
              {data?.data?.parentsDetails?.father_name}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Father Mobile</label>
            <span className="view-value">
              {data?.data?.parentsDetails?.father_number}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Father WhatsApp</label>
            <span className="view-value">
              {data?.data?.parentsDetails?.father_whatsaappNumbr}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mother Name</label>
            <span className="view-value">
              {data?.data?.parentsDetails?.mother_name}
            </span>
          </Col>

          <Col xs={24} md={12}>
            <label>Mother Mobile</label>
            <span className="view-value">
              {data?.data?.parentsDetails?.mother_number}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Contact Information */}
      <Card title="CONTACT INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label>Village</label>
            <span className="view-value">
              {data?.data?.addressInfo?.village}
            </span>
          </Col>{" "}
          <Col xs={24} md={12}>
            <label>Tehsil</label>
            <span className="view-value">
              {data?.data?.addressInfo?.tehssil}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label>Distric</label>
            <span className="view-value">
              {data?.data?.addressInfo?.distric}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label>State</label>
            <span className="view-value">{data?.data?.addressInfo?.state}</span>
          </Col>
          <Col xs={24} md={12}>
            <label>Pincode</label>
            <span className="view-value">
              {data?.data?.addressInfo?.pincode}
            </span>
          </Col>
          <Col span={24}>
            <label>Address</label>
            <span className="view-value">
              {data?.data?.addressInfo?.address}
            </span>
          </Col>
        </Row>
      </Card>

      {/* Emergency */}
      <Card title="EMERGENCY CONTACT INFORMATION">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={8}>
            <label>Name</label>
            <span className="view-value">
              {data?.data?.emergency_info?.contact_person}
            </span>
          </Col>

          <Col xs={24} md={8}>
            <label>Relation</label>
            <span className="view-value">
              {data?.data?.emergency_info?.relationshp}
            </span>
          </Col>

          <Col xs={24} md={8}>
            <label>Number</label>
            <span className="view-value">
              {data?.data?.emergency_info?.mobile_number}
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

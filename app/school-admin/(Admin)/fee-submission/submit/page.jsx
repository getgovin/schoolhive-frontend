"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  Button,
  Table,
  Divider,
} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons"
import { useQuery } from "@tanstack/react-query";
import { classFilterList } from "../../../../../api/class.api";
import { sectionFilterList } from "../../../../../api/section.api";
import { studentFilerList } from "../../../../../api/student.api";

export default function SubmitFeePage() {
  const [selectedStudent, setSelectedStudent] =
    useState(null);
  const [classId, setClassId] =
    useState(null);
  const [sectionId, setSectionId] =
    useState(null);
    
      // Queries
  const query = useQuery({
    queryKey: ["classes"],
    queryFn: classFilterList,
  });
  const classOptions = query?.data?.data?.map((value) => ({
    value: value?._id,
    label: value?.className,
  }));

  const { data: sectionData } = useQuery({
  queryKey: ["sections", classId],
  queryFn: () => sectionFilterList({ classId }),
  enabled: !!classId, // Only run when classId exists
});
  const SectionOptions = sectionData?.data?.map((value) => ({
    value: value?._id,
    label: value?.sectionName,
  })); 

    const studentQuery= useQuery({
  queryKey: ["sections", classId , sectionId],
  queryFn: () => studentFilerList({ classId ,sectionId}),
  enabled: !!classId && !!sectionId, // Only run when classId exists
});
  const studentOption = sectionData?.data?.map((value) => ({
    value: value?._id,
    label: value?.studentInfor?.first_name,
  })); 
  const studentDetails = {
    rollNo: "15",
    name: "Rahul Sharma",
    fatherName: "Rajesh Sharma",
    phone: "9876543210",
    address: "Indore, MP",
    class: "Class 10",
    section: "A",
  };

  const feeHistory = [
    {
      id: 1,
      date: "2026-01-10",
      amount: 5000,
      mode: "Cash",
      receipt: "REC-001",
    },
    {
      id: 2,
      date: "2026-03-15",
      amount: 10000,
      mode: "Online",
      receipt: "REC-002",
    },
  ];

  const columns = [
    { title: "Date", dataIndex: "date" },
    { title: "Receipt", dataIndex: "receipt" },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (v) => `₹${v}`,
    },
    {
      title: "Action",
      render: () => <Button size="small">PDF</Button>,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">
        Submit Fee
      </h2>

     
        <Row gutter={[16,16]} className="mb-4">
          <Col xs={24} md={6}>
            <Select
              placeholder="Select Class"
              className="w-full"
            />
          </Col>

          <Col xs={24} md={6}>
            <Select
              placeholder="Select Section"
              className="w-full"
            />
          </Col>

          <Col xs={24} md={12}>
            <Select
              placeholder="Select Student"
              className="w-full"
              onChange={() =>
                setSelectedStudent(true)
              }
              options={[
                {
                  label: "Rahul Sharma - Father: Rajesh Sharma",
                  value: 1,
                },
              ]}
            />
          </Col>
        </Row>
     

      {/* STUDENT INFO */}
      <Card title="Student Details">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
              <label> Roll No:</label>
            <span className="view-value">
              {studentDetails.rollNo}
            </span>
          </Col>
          <Col xs={24} md={12}>
          
             <label> Name:</label>
            <span className="view-value">
              {studentDetails.name}
            </span>
          </Col>
          <Col xs={24} md={12}>               
             <label>Father Name:</label>
            <span className="view-value">
              {studentDetails.fatherName}  </span>
          </Col>
          <Col xs={24} md={12}>
               
             <label> Phone:</label>
            <span className="view-value">
              {studentDetails.phone}  </span>
          </Col>
          <Col xs={24} md={24}>
               
             <label> Address:</label>
            <span className="view-value">
              {studentDetails.address}  </span>
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* PAYMENT ENTRY */}
      <Card title="New Payment">
        <Row gutter={[24,24]}>
          <Col xs={24} md={12}>
            <Input placeholder="Receipt ID" />
          </Col>

          <Col xs={24} md={12}>
            <InputNumber
              placeholder="Discount"
              className="w-full"
              min={0}
            />
          </Col>

          <Col xs={24} md={12}>
            <InputNumber
              placeholder="Bus Charges"
              className="w-full"
              min={0}
            />
          </Col>

          <Col xs={24} md={12}>
            <InputNumber
              placeholder="Other Charges"
              className="w-full"
              min={0}
            />
          </Col>
       
        </Row>

         <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 24,
        }}
      >
        <Button
          type="primary"
          className="mt-4"
        >
          Submit Payment
        </Button>
      </div>
      </Card>

      <Divider />

      {/* HISTORY */}
      <Card title="Fee History">
        <Table
          dataSource={feeHistory}
          columns={columns}
          rowKey="id"
          scroll={{x:"max-content"}}
        />
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
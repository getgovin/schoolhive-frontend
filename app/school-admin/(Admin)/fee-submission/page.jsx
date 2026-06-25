"use client";

import React, { useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Select,
  Input,
  Button,
  Tag,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function FeesPage() {
  const router = useRouter();

  const [filters, setFilters] = useState({
    class: null,
    section: null,
    student: "",
  });

  const dataSource = [
    {
      id: 1,
      receiptId: "REC-001",
      studentName: "Rahul Sharma",
      fatherName: "Rajesh Sharma",
      className: "Class 10",
      section: "A",
      totalFee: 25000,
      paid: 15000,
      remaining: 10000,
      date: "2026-06-15",
    },
    {
      id: 2,
      receiptId: "REC-002",
      studentName: "Aman Verma",
      fatherName: "Sunil Verma",
      className: "Class 9",
      section: "B",
      totalFee: 22000,
      paid: 22000,
      remaining: 0,
      date: "2026-06-14",
    },
  ];

  const columns = [
    {
      title: "Receipt ID",
      dataIndex: "receiptId",
    },
    {
      title: "Student Name",
      dataIndex: "studentName",
    },
    {
      title: "Class",
      dataIndex: "className",
    },
    {
      title: "Section",
      dataIndex: "section",
    },
    {
      title: "Paid",
      dataIndex: "paid",
      render: (v) => `₹${v}`,
    },
    {
      title: "Remaining",
      dataIndex: "remaining",
      render: (v) => (
        <Tag color={v === 0 ? "green" : "red"}>
          ₹{v}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Fees Submission
        </h2>

      
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-5">

        <Row gutter={[8,8]}>
          <Col xs={24} md={8}>
            <Select
              placeholder="Select Class"
              className="w-full"
              onChange={(v) =>
                setFilters({
                  ...filters,
                  class: v,
                })
              }
              options={[
                { label: "Class 1", value: 1 },
                { label: "Class 2", value: 2 },
              ]}
            />
          </Col>

          <Col xs={24} md={8}>
            <Select
              placeholder="Select Section"
              className="w-full"
              onChange={(v) =>
                setFilters({
                  ...filters,
                  section: v,
                })
              }
              options={[
                { label: "A", value: "A" },
                { label: "B", value: "B" },
              ]}
            />
          </Col>

          <Col xs={24} md={8}>
            <Input
              placeholder="Search student name..."
              className="table-search-inputs"
              prefix={<SearchOutlined />}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  student: e.target.value,
                })
              }
            />
          </Col>
        </Row>
        <div className="flex justify-end  ">

          <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            router.push(
              "/school-admin/fee-submission/submit"
            )
          }
        >
          Submit Fee
        </Button>
  </div>
  </div>

    
   

      {/* TABLE */}
      <Card>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          pagination={false}
          scroll={{x:"max-content"}}
        />
      </Card>
    </div>
  );
}
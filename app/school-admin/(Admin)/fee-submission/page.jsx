"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  Select,
  Input,
  Button,
  Tag,
  Divider,
  Typography,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { studentallHistoryView } from "../../../../api/feesubmisssion.api";
import moment from "moment";
import { debounce } from "lodash";

const { Text } = Typography;

export default function FeesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 500),
    [],
  );

  const feeHistory = useQuery({
    queryKey: ["allfeeHistory", page, pageSize, debouncedSearch],
    queryFn: () =>
      studentallHistoryView({
        page,
        pageSize,
        search: debouncedSearch,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "receiptDate",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Receipt No",
      dataIndex: "receiptNo",
    },
    {
      title: "Student",
      render: (_, record) =>
        `${record.studentId?.studentInfo?.firstName || ""} ${
          record.studentId?.studentInfo?.lastName || ""
        }`,
    },
    {
      title: "Class",
      render: (_, record) =>
        `${record.classId?.className || ""} - ${record.sectionId?.sectionName || ""}`,
    },
    {
      title: "Fee Details",
      render: (_, record) => (
        <>
          <div>Old Fee: ₹{record.oldFee}</div>
          <div>Tuition Fee: ₹{record.tuitionFee}</div>
          <div>Bus Fee: ₹{record.busFee}</div>
          <div>Other Charge: ₹{record.otherCharge}</div>
          <div>Fine: ₹{record.fine}</div>
          <div>Discount: -₹{record.discount}</div>

          <Divider style={{ margin: "6px 0" }} />

          <Text strong>Total: ₹{record.totalAmount}</Text>
        </>
      ),
    },
    {
      title: "Paid By",
      dataIndex: "paidBy",
    },
    {
      title: "Collected By",
      dataIndex: "receivedBy",
    },
    {
      title: "Payment",
      dataIndex: "paymentMode",
    },
    {
      title: "Remark",
      dataIndex: "remarks",
      ellipsis: true,
    },
    {
      title: "Remaining",
      render: (v) => <Tag color="green">₹{v?.studentId?.fee}</Tag>,
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-xl font-bold">Fee Submission</h2>
      </div>
        <Row gutter={[8, 8]} className="mb-5" justify="space-between">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search student name..."
              className="table-search-inputs"
              prefix={<SearchOutlined />}
              onChange={(e) => {
                handleSearch(e.target.value);
                setSearch(e.target.value);
              }}
            />
          </Col>

          <Col xs={24} sm={8} md={8} lg={8} className="!flex justify-end">
                    <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/school-admin/fee-submission/submit")}
          >
            Submit Fee
          </Button>
          </Col>
        </Row>

      {/* TABLE */}
      <Card>
        <Table
          columns={columns}
          dataSource={feeHistory?.data?.data}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize,
            total: feeHistory?.data?.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} students`,
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            },
          }}
        />
      </Card>
    </div>
  );
}

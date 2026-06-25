"use client";

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Dropdown,
  Modal,
  Space,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { confirm } = Modal;

export default function SchoolListPage() {
  const router = useRouter();
  const [search, setsearch] = useState("");

  const showDeleteConfirm = (record) => {
    confirm({
      title: "Delete School",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete ${record.schoolName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        console.log("Delete:", record);
      },
    });
  };

  const dataSource = [
    {
      key: 1,
      schoolName: "Delhi Public School",
      code: "DPS001",
      startDate: "01 Jan 2025",
      endDate: "31 Dec 2025",
      status: "Active",
    },
    {
      key: 2,
      schoolName: "St. Xavier School",
      code: "SXS002",
      startDate: "01 Feb 2025",
      endDate: "31 Jan 2026",
      status: "Expired",
    },
    {
      key: 3,
      schoolName: "Modern School",
      code: "MS003",
      startDate: "01 Mar 2025",
      endDate: "28 Feb 2026",
      status: "Pending",
    },
      {
      key: 4,
      schoolName: "Modern School",
      code: "MS003",
      startDate: "01 Mar 2025",
      endDate: "28 Feb 2026",
      status: "Pending",
    },
      {
      key: 5,
      schoolName: "Modern School",
      code: "MS003",
      startDate: "01 Mar 2025",
      endDate: "28 Feb 2026",
      status: "Pending",
    },
  ];

  const filteredData = dataSource.filter(
    (item) =>
      item.schoolName
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "School Name",
      dataIndex: "schoolName",
      sorter: (a, b) =>
        a.schoolName.localeCompare(b.schoolName),
    },
    {
      title: "School Code",
      dataIndex: "code",
      sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
      title: "Subscription Start",
      dataIndex: "startDate",
    },
    {
      title: "Subscription End",
      dataIndex: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const color =
          status === "Active"
            ? "green"
            : status === "Expired"
            ? "red"
            : "orange";

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: 80,
      render: (_, record) => {
        const items = [
          {
            key: "view",
            icon: <EyeOutlined />,
            label: "View",
            onClick: () => router.push(`/super-admin/schools/view/${record.key}`),
          },
          {
            key: "edit",
            icon: <EditOutlined />,
            label: "Edit",
            onClick: () => router.push(`/super-admin/schools/edit/${record.key}`),
          },
          {
            key: "delete",
            icon: <DeleteOutlined />,
            danger: true,
            label: "Delete",
            onClick: () => showDeleteConfirm(record),
          },
        ];

        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items,
              onClick: ({ key }) => {
                if (key === "view") {
                  console.log("View", record);
                }

                if (key === "edit") {
                  console.log("Edit", record);
                }

                if (key === "delete") {
                  showDeleteConfirm(record);
                }
              },
            }}
          >
            <Button
              type="text"
              icon={<MoreOutlined />}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Schools List
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all registered schools.
        </p>
      </div>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
        <Input
          placeholder="Search school..."
          prefix={<SearchOutlined />}
          className="max-w-md table-search-inputs"
          allowClear
          value={search}
          onChange={(e) =>
            setsearch(e.target.value)
          }

        />

        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => router.push("/super-admin/schools/create")}
        >
          Add School
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="key"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) =>
              `Total ${total} schools`,
          }}
          scroll={{x :"max-content"}}
        />
      </div>
    </>
  );s
}
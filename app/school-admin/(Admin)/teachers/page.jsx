"use client";

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Modal,
  Row,
  Col,
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
export default function TeacherListPage() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const [page , setPage] = useState(1)
  const [pageSize , setPageSize] = useState(10)
  const [search , setSearch] = useState("") 


  const [totalCount, setTotalCount] = useState(100);


const showDeleteConfirm = (record) => {
  modal.confirm({
    title: "Delete Teacher",
    icon: <ExclamationCircleFilled />,
    content: `Are you sure you want to delete ${record.name}?`,
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk: () => {
      console.log("Delete Teacher:", record.id);
    },
  });
};

const dataSource = [
  {
    key: 1,
    name: "Rahul Sharma",
    employeeId: "EMP001",
    subject: "Mathematics",
    designation: "Senior Teacher",
    email: "rahul@school.com",
    mobile: "9876543210",
  },
  {
    key: 2,
    name: "Priya Verma",
    employeeId: "EMP002",
    subject: "Science",
    designation: "Teacher",
    email: "priya@school.com",
    mobile: "9876543211",
  },
  {
    key: 3,
    name: "Arjun Singh",
    employeeId: "EMP003",
    subject: "English",
    designation: "HOD",
    email: "arjun@school.com",
    mobile: "9876543212",
  },
];

const columns = [
  {
    title: "Teacher Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Employee ID",
    dataIndex: "employeeId",
    sorter: (a, b) =>
      a.employeeId.localeCompare(b.employeeId),
  },
  {
    title: "Subject",
    dataIndex: "subject",
    sorter: (a, b) =>
      a.subject.localeCompare(b.subject),
  },
  {
    title: "Designation",
    dataIndex: "designation",
    sorter: (a, b) =>
      a.designation.localeCompare(b.designation),
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Action",
    key: "action",
    width: 80,
    render: (_, record) => (
      <Dropdown
        trigger={["click"]}
        menu={{
          items: [
            {
              key: "view",
              icon: <EyeOutlined />,
              label: "View",
            },
            {
              key: "edit",
              icon: <EditOutlined />,
              label: "Edit",
            },
            {
              key: "delete",
              icon: <DeleteOutlined />,
              label: "Delete",
              danger: true,
            },
          ],
          onClick: ({ key }) => {
            switch (key) {
              case "view":
                router.push(
                  `/school-admin/teachers/view/${record.key}`
                );
                break;

              case "edit":
                router.push(
                  `/school-admin/teachers/edit/${record.key}`
                );
                break;

              case "delete":
                showDeleteConfirm(record);
                break;
            }
          },
        }}
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
        />
      </Dropdown>
    ),
  },
];

  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };
  return (
    <>
              {contextHolder}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Teachers List</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all registered teachers.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        {/* Left Side Filters */}
        <Row gutter={[8, 8]} className="flex-1">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search Teachers..."
              prefix={<SearchOutlined />}
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="table-search-inputs"
            />
          </Col>




        </Row>

        {/* Right Side Buttons */}
        <div className="flex justify-end  ">
   


          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/school-admin/teachers/add")}
          >
            Add Teacher
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          pagination={{
            current: page,
            pageSize,
            total: totalCount,
            showSizeChanger: true,
           showTotal: (total) => `Total ${total} teachers`,
            onChange: (newPage, newPageSize) => {
             setPageSize(newPageSize) ; setPage(newPage)
            },
          }}
          scroll={{x:"max-content"}}

        />
      </div>

    </>
  );
}

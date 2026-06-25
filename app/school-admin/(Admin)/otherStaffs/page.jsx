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
export default function OtherStaffListPage() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const [page , setPage] = useState(1)
  const [pageSize , setPageSize] = useState(10)
  const [search , setSearch] = useState("") 


  const [totalCount, setTotalCount] = useState(100);


const showDeleteConfirm = (record) => {
  modal.confirm({
    title: "Delete Other Staff",
    icon: <ExclamationCircleFilled />,
    content: `Are you sure you want to delete ${record.name}?`,
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk: () => {
      console.log("Delete Other Staff:", record.id);
    },
  });
};

const dataSource = [
  {
    key: 1,
    name: "Ramesh Yadav",
    employeeId: "STF001",
    designation: "Driver",
    department: "Transport",
    email: "ramesh@school.com",
    mobile: "9876543210",
  },
  {
    key: 2,
    name: "Suresh Patel",
    employeeId: "STF002",
    designation: "Conductor",
    department: "Transport",
    email: "suresh@school.com",
    mobile: "9876543211",
  },
  {
    key: 3,
    name: "Mohan Singh",
    employeeId: "STF003",
    designation: "Senior Accountant",
    department: "Accounts",
    email: "mohan@school.com",
    mobile: "9876543212",
  },
  {
    key: 4,
    name: "Raj Kumar",
    employeeId: "STF004",
    designation: "Watchman",
    department: "Security",
    email: "raj@school.com",
    mobile: "9876543213",
  },
];

const columns = [
  {
    title: "Staff Name",
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
    title: "Designation",
    dataIndex: "designation",
    sorter: (a, b) =>
      a.designation.localeCompare(b.designation),
  },
  {
    title: "Department",
    dataIndex: "department",
    sorter: (a, b) =>
      a.department.localeCompare(b.department),
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
                  `/school-admin/otherStaffs/view/${record.key}`
                );
                break;

              case "edit":
                router.push(
                  `/school-admin/otherStaffs/edit/${record.key}`
                );
                break;

              case "delete":
                showDeleteConfirm(record);
                break;

              default:
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


  return (
    <>
              {contextHolder}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Other Staffs List</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all registered other staffs.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        {/* Left Side Filters */}
        <Row gutter={[8, 8]} className="flex-1">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search Other staffs..."
              prefix={<SearchOutlined />}
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="table-search-inputs"
            />
          </Col>




        </Row>

        {/* Right Side Buttons */}
        <div className="flex justify-end gap-2">
   


          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/school-admin/otherStaffs/add")}
          >
            Add Staff
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey="key"
          scroll={{x:"max-content"}}
          pagination={{
            current: page,
            pageSize,
            total: totalCount,
            showSizeChanger: true,
           showTotal: (total) => `Total ${total} Staffs`,
            onChange: (newPage, newPageSize) => {
            setPage(newPage) ; setPageSize(newPageSize)
            },
          }}
        />
      </div>

    </>
  );
}

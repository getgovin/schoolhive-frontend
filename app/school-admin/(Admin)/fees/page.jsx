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

export default function FeesListPage() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();


  const [page , setPage] = useState(1)
  const [pageSize , setPageSize] = useState(10)
  const [search , setSearch] = useState("") 

  const [totalCount] = useState(50);

  const showDeleteConfirm = (record) => {
    modal.confirm({
      title: "Delete Fees",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete fees for ${record.className}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Delete Fees:", record.key);
      },
    });
  };

  const dataSource = [
    {
      key: 1,
      className: "Nursery",
      fees: 10000,
    },
    {
      key: 2,
      className: "LKG",
      fees: 12000,
    },
    {
      key: 3,
      className: "UKG",
      fees: 12000,
    },
    {
      key: 4,
      className: "Class 1",
      fees: 15000,
    },
    {
      key: 5,
      className: "Class 2",
      fees: 18000,
    },
    {
      key: 6,
      className: "Class 3",
      fees: 20000,
    },
  ];

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) =>
        (page - 1) * pageSize + index + 1,
    },
    {
      title: "Class Name",
      dataIndex: "className",
      sorter: (a, b) =>
        a.className.localeCompare(b.className),
    },
    {
      title: "Fees Amount",
      dataIndex: "fees",
      sorter: (a, b) => a.fees - b.fees,
      render: (fees) => `₹${fees.toLocaleString()}`,
    },
    {
      title: "Action",
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
                    `/school-admin/fees/view/${record.key}`
                  );
                  break;

                case "edit":
                  router.push(
                    `/school-admin/fees/edit/${record.key}`
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
        <h1 className="text-2xl font-bold text-slate-900">
          Fees List
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage class-wise fee structure.
        </p>
      </div>

      {/* Search & Add Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <Row gutter={[8, 8]} className="flex-1">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search fees..."
              prefix={<SearchOutlined />}
              allowClear
              value={search}
               onChange={(e) =>
                setSearch(e.target.value )
              }
              
              className="table-search-inputs"
            />
          </Col>
        </Row>
        <div className="flex justify-end  ">

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            router.push("/school-admin/fees/add")
          }
        >
          Add Fees
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
            showTotal: (total) =>
              `Total ${total} Fee Records`,
            onChange: (newPage, newPageSize) => {
             setPage(newPage) ; setPageSize(newPageSize)
            },
          }}
        />
      </div>
    </>
  );
}
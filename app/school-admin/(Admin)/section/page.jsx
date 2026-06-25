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
import { useRouter, useSearchParams } from "next/navigation";

export default function SectionListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modal, contextHolder] = Modal.useModal();

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const searchText = searchParams.get("search") || "";

  const [totalCount] = useState(50);

  const showDeleteConfirm = (record) => {
    modal.confirm({
      title: "Delete Section",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete Section ${record.sectionName}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        console.log("Delete Section:", record.key);
      },
    });
  };

  const dataSource = [
    {
      key: 1,
      className: "Class 1",
      sectionName: "A",
    },
    {
      key: 2,
      className: "Class 1",
      sectionName: "B",
    },
    {
      key: 3,
      className: "Class 2",
      sectionName: "A",
    },
    {
      key: 4,
      className: "Class 2",
      sectionName: "B",
    },
    {
      key: 5,
      className: "Class 3",
      sectionName: "A",
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
      title: "Section Name",
      dataIndex: "sectionName",
      sorter: (a, b) =>
        a.sectionName.localeCompare(b.sectionName),
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
                    `/school-admin/section/view/${record.key}`
                  );
                  break;

                case "edit":
                  router.push(
                    `/school-admin/section/edit/${record.key}`
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

  const updateQueryParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
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

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Section List
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all class sections.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <Row gutter={[8, 8]} className="flex-1">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search section..."
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(e) =>
                updateQueryParams({
                  search: e.target.value,
                  page: 1,
                })
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
            router.push("/school-admin/section/add")
          }
        >
          Add Section
        </Button>
      </div>
      </div>

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
              `Total ${total} Sections`,
            onChange: (newPage, newPageSize) => {
              updateQueryParams({
                page: newPage,
                pageSize: newPageSize,
              });
            },
          }}
        />
      </div>
    </>
  );
}
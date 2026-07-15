"use client";

import React, { useMemo, useState } from "react";
import { Table, Input, Button, Dropdown, Modal, Row, Col } from "antd";
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
import { debounce } from "lodash";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { feeDelete, feeList } from "../../../../api/fee.api";
import { toast } from "react-toastify";

export default function FeesListPage() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 500),
    [],
  );

  // Queries
  const query = useQuery({
    queryKey: ["fees", page, pageSize, debouncedSearch],
    queryFn: () =>
      feeList({
        page,
        pageSize,
        search: debouncedSearch,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data, error, isPending } = query;

  const mutation = useMutation({
    mutationFn: feeDelete,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        // Refetch the list automatically
        queryClient.invalidateQueries({
          queryKey: ["fees"],
        });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const showDeleteConfirm = (record) => {
    modal.confirm({
      title: "Delete Fees",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete fees for ${record.className}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
               mutation.mutateAsync(record?._id);


   
      },
    });
  };

  const columns = [
    {
      title: "S.No",
      render: (_, __, index) => (page - 1) * pageSize + index + 1,
    },
    {
      title: "Class Name",
      dataIndex: ["classId", "className"],
      sorter: (a, b) =>
        (a.classId?.className || "").localeCompare(b.classId?.className || ""),
      render: (className) => `${className}`,
    },
    {
      title: "Fees Amount",
      dataIndex: "fee",
      sorter: (a, b) => a.fee - b.fee,
      render: (fee) => `₹${fee?.toLocaleString()}`,
    },
    {
      title: "Action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              // {
              //   key: "view",
              //   icon: <EyeOutlined />,
              //   label: "View",
              // },
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
                // case "view":
                //   router.push(`/school-admin/fees/view/${record.key}`);
                //   break;

                case "edit":
                  router.push(`/school-admin/fees/edit/${record._id}`);
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
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Fee List</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage class-wise fee structure.
        </p>
      </div>

      {/* Search & Add Button */}
 
        <Row gutter={[8, 8]}  justify="space-between" className="mb-5">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search fees..."
              prefix={<SearchOutlined />}
              allowClear
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setDebouncedSearch(e.target.value);
              }}
              className="table-search-inputs"
            />
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} className="!flex justify-end">
           <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/school-admin/fees/add")}
          >
            Add Fees
          </Button>
          </Col>
        </Row>
     
         
 

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table
          columns={columns}
          dataSource={data?.data || []}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize,
            total: data?.total || 0,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} Fee Records`,
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            },
          }}
        />
      </div>
    </>
  );
}

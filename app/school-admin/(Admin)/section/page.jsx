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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sectionDelete, sectionList } from "../../../../api/section.api";
import { debounce } from "lodash";
import { toast } from "react-toastify";

export default function SectionListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modal, contextHolder] = Modal.useModal();

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
    queryKey: ["sections", page, pageSize, debouncedSearch],
    queryFn: () =>
      sectionList({
        page,
        pageSize,
        search: debouncedSearch,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data, error, isPending } = query;

  const mutation = useMutation({
    mutationFn: sectionDelete,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        // Refetch the list automatically
        queryClient.invalidateQueries({
          queryKey: ["sections"],
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
      title: "Delete Section",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete Section ${record.sectionName} from class ${record.sectionName}?`,
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
    },
    {
      title: "Section Name",
      dataIndex: "sectionName",
      sorter: (a, b) => a.sectionName.localeCompare(b.sectionName),
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
                //   router.push(
                //     `/school-admin/section/view/${record._id}`
                //   );
                //   break;

                case "edit":
                  router.push(`/school-admin/section/edit/${record._id}`);
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

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Section List</h1>
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
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              className="table-search-inputs"
            />
          </Col>
        </Row>
        <div className="flex justify-end  ">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/school-admin/section/add")}
          >
            Add Section
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table
          columns={columns}
          dataSource={data?.data}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize,
            total: data?.total || 0,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} Sections`,
            onChange: (newPage, newPageSize) => {
              setPageSize(newPageSize);
              setPage(newPage);
            },
          }}
        />
      </div>
    </>
  );
}

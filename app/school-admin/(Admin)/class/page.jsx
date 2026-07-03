"use client";
import React, { useMemo, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { classDelete, classList } from "../../../../api/class.api";
import { debounce } from "lodash";
import { toast } from "react-toastify";

export default function ClassListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [modal, contextHolder] = Modal.useModal();

  const [page , setPage] = useState(1)
  const [pageSize , setPageSize] = useState(10)
  const [search , setSearch] = useState("") 
  const [debouncedSearch , setDebouncedSearch] = useState("") 


const handleSearch = useMemo(
  () =>
    debounce((value) => {
      setDebouncedSearch(value);
    }, 500),
  []
);
  // Queries
const query = useQuery({
  queryKey: ["classes", page, pageSize, debouncedSearch],
  queryFn: () =>
    classList({
      page,
      pageSize,
       search : debouncedSearch,
    }),
  staleTime: 1000 * 60 * 5, // 5 minutes

});

const mutation = useMutation({
  mutationFn: classDelete,
  onSuccess: (data) => {
    if(data?.status){
    toast.success(data?.message)
    // Refetch the list automatically
    queryClient.invalidateQueries({
      queryKey: ["classes"],
    });
    } else {
          toast.error(data?.message)
    }
  },
  onError: (error) => {
        toast.error(error.response?.data?.message)

  },
});
  const showDeleteConfirm = (record) => {
    modal.confirm({
      title: "Delete Class",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete ${record.className}?`,
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
      key: "serial",
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
             
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
              

                case "edit":
                  router.push(
                    `/school-admin/class/edit/${record._id}`
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
          Class List
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all school classes.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        <Row gutter={[8, 8]} className="flex-1">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search class..."
              prefix={<SearchOutlined />}
              allowClear
              value={search}
              onChange={(e) =>
                {setSearch(e.target.value ) ; handleSearch(e.target.value) }              }
              className="table-search-inputs"
            />
          </Col>
        </Row>

        <div className="flex justify-end gap-2">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() =>
              router.push(
                "/school-admin/class/add"
              )
            }
          >
            Add Class
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table
          columns={columns}
          dataSource={query?.data?.data || []}
          rowKey="_id"
          scroll={{x:"max-content"}}
          pagination={{
            current: page,
            pageSize,
            total: query?.data?.total || 0,
            showSizeChanger: true,
            showTotal: (total) =>
              `Total ${total} Classes`,
            onChange: (newPage, newPageSize) => {
              setPage(newPage) ; setPageSize(newPageSize)
            },
          }}
        />
      </div>
    </>
  );
}
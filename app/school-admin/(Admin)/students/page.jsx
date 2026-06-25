"use client";

import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Modal,
  Select,
  Row,
  Col,
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  MoreOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CommonModal from "../../../../components/common/CommonModal";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const { Option } = Select;
export default function SchoolListPage() {
  const router = useRouter();
  const [modal, contextHolder] = Modal.useModal();

  const [page , setPage] = useState(1)
  const [pageSize , setPageSize] = useState(10)
  const [search , setSearch] = useState("") 
  const [selectedClass , setSelectedClass ] = useState("") 
  const [selectedSection , setSelectedSection] = useState("") 


  const [importModal, setImportModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [totalCount, setTotalCount] = useState(100);


  const showDeleteConfirm = (record) => {
    modal.confirm({
      title: "Delete Student",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete ${record.name}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        console.log("Delete:", record);
      },
    });
  };

  const showTemplateDownloadConfirm = () => {
    modal.confirm({
      title: "Download Student Template",
      content: "Are you sure you want to download the student Excel template?",
      okText: "Download",
      cancelText: "Cancel",
      onOk: () => {
        downloadStudentTemplate();
      },
    });
  };

  const downloadStudentTemplate = () => {
    const data = [
      {
        "Student Name": "",
        "Father Name": "",
        "Mother Name": "",
        Class: "",
        Section: "",
        "Father Mobile Number": "",
        "Father WhatsApp Number": "",
        "Mother Mobile Number": "",
        "Village Name": "",
        "Tehsil Name": "",
        "District Name": "",
        Pincode: "",
        "State Name": "",
      },
    ];

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "Student_Template.xlsx");
  };
  const dataSource = [
    {
      key: 1,
      name: "Rahul Sharma",
      fatherName: "Rajesh Sharma",
      motherName: "Sunita Sharma",
      class: "10",
      section: "A",
    },
    {
      key: 2,
      name: "Priya Verma",
      fatherName: "Amit Verma",
      motherName: "Pooja Verma",
      class: "9",
      section: "B",
    },
    {
      key: 3,
      name: "Arjun Singh",
      fatherName: "Vijay Singh",
      motherName: "Neha Singh",
      class: "12",
      section: "C",
    },
    {
      key: 4,
      name: "Ananya Gupta",
      fatherName: "Sanjay Gupta",
      motherName: "Kavita Gupta",
      class: "11",
      section: "A",
    },
    {
      key: 5,
      name: "Rohan Patel",
      fatherName: "Mahesh Patel",
      motherName: "Rekha Patel",
      class: "8",
      section: "D",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      sorter: (a, b) => a.fatherName.localeCompare(b.fatherName),
    },
    {
      title: "Mother Name",
      dataIndex: "motherName",
      sorter: (a, b) => a.motherName.localeCompare(b.motherName),
    },
    {
      title: "Class",
      dataIndex: "class",
      sorter: (a, b) => Number(a.class) - Number(b.class),
    },
    {
      title: "Section",
      dataIndex: "section",
      sorter: (a, b) => a.section.localeCompare(b.section),
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
        ];

        return (
          <Dropdown
            trigger={["click"]}
            menu={{
              items,
              onClick: ({ key }) => {
                if (key === "view") {
                  router.push(`/school-admin/students/view/${record.key}`);
                }

                if (key === "edit") {
                  router.push(`/school-admin/students/edit/${record.key}`);
                }

                if (key === "delete") {
                  showDeleteConfirm(record);
                }
              },
            }}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
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
        <h1 className="text-2xl font-bold text-slate-900">Students List</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage all registered students.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-5">
        {/* Left Side Filters */}
        <Row gutter={[8, 8]} className="flex-1">
          <Col xs={24} sm={8} md={8} lg={8}>
            <Input
              placeholder="Search Student..."
              prefix={<SearchOutlined />}
              allowClear
              value={search}
              onChange={(e) =>
               setSearch(e.target.value)
              }
              className="table-search-inputs"
            />
          </Col>

          <Col xs={12} sm={8} md={8} lg={6}>
            <Select
              placeholder="Class"
              allowClear
              className="w-full"
              value={selectedClass}
              onChange={(value) =>
               setSelectedClass(value)
              }
            >
              <Option value="1">Class 1</Option>
              <Option value="2">Class 2</Option>
              <Option value="3">Class 3</Option>
              <Option value="4">Class 4</Option>
              <Option value="5">Class 5</Option>
            </Select>
          </Col>

          <Col xs={12} sm={8} md={8} lg={6}>
            <Select
              placeholder="Section"
              allowClear
              className="w-full"
              value={selectedSection}
              onChange={(value) =>
               setSelectedSection(value)
              }
            >
              <Option value="A">A</Option>
              <Option value="B">B</Option>
              <Option value="C">C</Option>
              <Option value="D">D</Option>
            </Select>
          </Col>
        </Row>

        {/* Right Side Buttons */}
        <div className="flex justify-end flex-wrap wrap gap-2">
          <Button
            icon={<UploadOutlined />}
            onClick={showTemplateDownloadConfirm}
          >
            Excel Template
          </Button>

          <Button
            icon={<UploadOutlined />}
            onClick={() => setImportModal(true)}
          >
            Import Student
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => router.push("/school-admin/students/add")}
          >
            Add Student
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
            showTotal: (total) => `Total ${total} students`,
            onChange: (newPage, newPageSize) => {
           setPage(newPage); setPageSize(newPageSize)
            },
          }}
        />
      </div>

      <CommonModal
        open={importModal}
        title="Import Students"
        okText="Import"
        onCancel={() => {
          setImportModal(false);
          setFileList([]);
        }}
        onOk={() => {
          console.log(fileList);
          setImportModal(false);
        }}
      >
        <Upload.Dragger
          accept=".xlsx,.xls"
          maxCount={1}
          fileList={fileList}
          beforeUpload={(file) => {
            const isExcel =
              file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

            if (!isExcel) {
              message.error("Only Excel files are allowed");
              return Upload.LIST_IGNORE;
            }

            setFileList([file]);
            return false;
          }}
          onRemove={() => setFileList([])}
        >
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>

          <p className="ant-upload-text">Click or drag Excel file here</p>

          <p className="ant-upload-hint">
            Only .xlsx and .xls files are supported
          </p>
        </Upload.Dragger>
      </CommonModal>
    </>
  );
}

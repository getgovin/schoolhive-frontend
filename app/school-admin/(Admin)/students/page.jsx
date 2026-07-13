"use client";

import React, { useMemo, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentDelete, studentImport, studentList } from "../../../../api/student.api";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import { classList } from "../../../../api/class.api";
import { sectionFilterList } from "../../../../api/section.api";

const { Option } = Select;
export default function SchoolListPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modal, contextHolder] = Modal.useModal();

  const [page , setPage] = useState(1)
  const [pageSize , setPageSize] = useState(10)
  const [search , setSearch] = useState("") 
  const [classId , setclassId ] = useState("") 
  const [sectonID , setsectonID] = useState("") 


  const [importModal, setImportModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
      }, 500),
    [],
  );


  const mutation = useMutation({
    mutationFn: studentDelete,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["students"],
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
      title: "Delete Student",
      icon: <ExclamationCircleFilled />,
      content: `Are you sure you want to delete ${record.studentInfo?.firstName || ""} ${record.studentInfo?.lastName || ""}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        mutation.mutateAsync(record?._id);

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
        "Student First Name": "",
        "Student Middle Name": "",
        "Student Last Name": "",
        "Gender":"",
        "Date Of Birth":"",
        "Blood Group" :"",
        "Admission Number":"",
        "Roll Number":"",
        "Date Of Joining":"",
        "Class":"",
        "Section":"",
        "Bus Fee":"",
        "Old Fee":"",
        "Father Name":"",
        "Father Mobile":"",
        "Father WhatsApp":"",
        "Mother Name":"",
        "Mother Mobile":"",
        "Village":"",
        "Tehsil":"",
        "District":"",
        "State":"",
        "Pincode":"",
        "Address":"",
        "Emergency Contact Person":"",
        "Emergency Person Relation":"",
        "Emergency Person Number":"",

       
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


const downloadfailedStudentTemplate = (apiData) => {
  const excelData = apiData.map((item) => ({
    "Row Not Imported": item.row,
    "Which field is incorrect" :  item.field ,
     "Error Why Not Imported": item.message,
    "Student Name": item.studentName,
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "NotImportedStudents.xlsx");
};


  // Queries
  const query = useQuery({
    queryKey: ["students", page, pageSize, debouncedSearch , classId , sectonID],
    queryFn: () =>
      studentList({
        page,
        pageSize,
        search: debouncedSearch,
        classId,
        sectonID
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data, error, isPending } = query;


   const classQuery = useQuery({
      queryKey: ["classes"],
      queryFn: classList,
    });
    const classOptions = classQuery?.data?.data?.map((value) => ({
      value: value?._id,
      label: value?.className,
    }));
  
    const { data: sectionData } = useQuery({
    queryKey: ["sections", classId],
    queryFn: () => sectionFilterList({ classId }),
    enabled: !!classId, // Only run when classId exists
  });
    const sectionOptions = sectionData?.data?.map((value) => ({
      value: value?._id,
      label: value?.sectionName,
    })); 


const columns = [
  {
    title: "Name",
    key: "name",
    render: (_, record) =>
      `${record.studentInfo?.firstName || ""} ${record.studentInfo?.lastName || ""}`,
    sorter: (a, b) =>
      a.studentInfo.firstName.localeCompare(b.studentInfo.firstName),
  },
  {
    title: "Father Name",
    key: "fatherName",
    render: (_, record) => record.parentsDetails?.father_name,
    sorter: (a, b) =>
      a.parentsDetails.father_name.localeCompare(b.parentsDetails.father_name),
  },
  {
    title: "Mother Name",
    key: "motherName",
    render: (_, record) => record.parentsDetails?.mother_name,
  },
  {
    title: "Class",
    key: "class",
    render: (_, record) => record.studentInfo?.classId?.className,
  },
  {
    title: "Section",
    key: "section",
    render: (_, record) => record.studentInfo?.sectionId?.sectionName,
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
              router.push(`/school-admin/students/view/${record._id}`);
            }

            if (key === "edit") {
              router.push(`/school-admin/students/edit/${record._id}`);
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
}
];

 const excelMutation = useMutation({
    mutationFn: studentImport,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        if(data?.errors.length > 0){
        downloadfailedStudentTemplate(data?.errors)
          toast.info("Error data excel download please check and correct this and upload again don't upload all data only incorrect data upload ")
        }
        queryClient.invalidateQueries({
          queryKey: ["students"],
        });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const handleImport = () => {
  if (!fileList.length) {
    toast.error("Please select an Excel file");
    return;
  }

  const formData = new FormData();

  formData.append("file", fileList[0]);

  excelMutation.mutate(formData);
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
              { setSearch(e.target.value) ;handleSearch(e.target.value)
                            }              }
              className="table-search-inputs"
            />
          </Col>

          <Col xs={12} sm={8} md={8} lg={6}>
            <Select
              placeholder="Class"
              allowClear
              className="w-full"
              value={classId}
              onChange={(value) =>
               setclassId(value)
              }
              optionRender={classOptions}
            >
              
              {
              classOptions?.map((res,i)=>(
                 <Option value={res?.value} key={i}>{res?.label}</Option>
              )) }
              
             
  
            </Select>
          </Col>

          <Col xs={12} sm={8} md={8} lg={6}>
            <Select
              placeholder="Section"
              allowClear
              className="w-full"
              value={sectonID}
              onChange={(value) =>
               setsectonID(value)
              }
            >
                {
              sectionOptions?.map((res,i)=>(
                 <Option value={res?.value} key={i}>{res?.label}</Option>
              )) }
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
          dataSource={data?.data}
          rowKey="_id"
          scroll={{x:"max-content"}}
          pagination={{
            current: page,
            pageSize,
            total: data?.total,
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
          setImportModal(false);
         handleImport()
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

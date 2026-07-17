"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Modal,
  Select,
  Row,
  Col,
  Card,
} from "antd";
import { useRouter } from "next/navigation";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentFilerList,
  studentPromote,
} from "../../../../api/student.api";
import { toast } from "react-toastify";
import { classFilterList } from "../../../../api/class.api";
import { sectionFilterList } from "../../../../api/section.api";
import { GiJumpAcross } from "react-icons/gi";


const { Option } = Select;
export default function PromoteList() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modal, contextHolder] = Modal.useModal();

  const [classId, setclassId] = useState(null);
  const [sectionId, setsectionId] = useState(null);
  const [newClassId, setNewClassId] = useState(null);
  const [newSectonID, setNewSectonID] = useState(null);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const mutation = useMutation({
    mutationFn: studentPromote,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["studentFilter"],
        });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const showconfirmpopup = () => {
    modal.confirm({
      title: "Promote Student to next Class and section",
      content:
        "Are you sure you want to promote selected students for next Class and section?",
      okText: "Promote",
      cancelText: "Cancel",
     onOk: () => {
      mutation.mutateAsync({
        studentIds: selectedRowKeys,
        classId: newClassId,
        sectionId: newSectonID,
      });
    },
    });
  };

  // Queries
  const query = useQuery({
    queryKey: ["studentFilter", classId, sectionId],
    queryFn: () =>
      studentFilerList({
        classId,
        sectionId,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data, error, isPending } = query;

  const classQuery = useQuery({
    queryKey: ["classesFilter"],
    queryFn: classFilterList,
  });
  const classOptions = classQuery?.data?.data?.map((value) => ({
    value: value?._id,
    label: value?.className,
  }));

  const { data: sectionData } = useQuery({
    queryKey: ["sectionsFilter", classId],
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
        a.parentsDetails.father_name.localeCompare(
          b.parentsDetails.father_name,
        ),
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
  ];
useEffect(() => {
  if (data?.data?.length) {
    setSelectedRowKeys(data.data.map((student) => student._id));
  } else {
    setSelectedRowKeys([]);
  }
}, [data]);
  const rowSelection = {
  selectedRowKeys,
  onChange: (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  }, 
}

  return (
    <>
              {contextHolder}

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-slate-900">
          Promote Students List
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Promote student to next class and section
        </p>
      </div>

      <Row gutter={[16, 16]} className=" mb-3" justify="space-between">
        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <Card
            title="From: Current Class & Section "
            className="internal-card"
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Select
                  placeholder="Select Class"
                  allowClear
                  className="w-full"
                  value={classId}
                  onChange={(value) => setclassId(value)}
                  optionRender={classOptions}
                >
                  {classOptions?.map((res, i) => (
                    <Option value={res?.value} key={i}>
                      {res?.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col span={24}>
                <Select
                  placeholder="Select Section"
                  allowClear
                  className="w-full"
                  value={sectionId}
                  onChange={(value) => setsectionId(value)}
                >
                  {sectionOptions?.map((res, i) => (
                    <Option value={res?.value} key={i}>
                      {res?.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={10} xl={10}>
          <Card
            title="To: Promoted Class & Section"
            className="internal-card"
          >
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Select
                  placeholder="Select Class"
                  allowClear
                  className="w-full"
                  value={newClassId}
                  onChange={(value) => setNewClassId(value)}
                  optionRender={classOptions}
                >
                  {classOptions?.map((res, i) => (
                    <Option value={res?.value} key={i}>
                      {res?.label}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col span={24}>
                <Select
                  placeholder="Select Section"
                  allowClear
                  className="w-full"
                  value={newSectonID}
                  onChange={(value) => setNewSectonID(value)}
                >
                  {sectionOptions?.map((res, i) => (
                    <Option value={res?.value} key={i}>
                      {res?.label}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>{" "}
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <Button disabled={!newClassId || !selectedRowKeys.length} icon={<GiJumpAcross className="text-[22px]" />} className="!mb-3" onClick={showconfirmpopup}>
          Promote
        </Button>
<Table
  rowSelection={rowSelection}
  columns={columns}
  dataSource={data?.data}
  rowKey="_id"
  scroll={{ x: "max-content" }}
  pagination={false}
/>
      </div>
    </>
  );
}

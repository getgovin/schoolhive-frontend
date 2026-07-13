"use client";

import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Select,
  Input,
  InputNumber,
  Button,
  Table,
  Divider,
  DatePicker,
  Form,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { classFilterList } from "../../../../../api/class.api";
import { sectionFilterList } from "../../../../../api/section.api";
import { studentFilerList, studentView } from "../../../../../api/student.api";
import {
  feeSubmission,
  studentHistoryView,
} from "../../../../../api/feesubmisssion.api";
import { toast } from "react-toastify";
import moment from "moment";
const { TextArea } = Input;
const { Text } = Typography;

export default function SubmitFeePage() {
  const [form] = Form.useForm();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classId, setClassId] = useState(null);
  const [sectionId, setSectionId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Queries
  const query = useQuery({
    queryKey: ["classes"],
    queryFn: classFilterList,
  });
  const classOptions = query?.data?.data?.map((value) => ({
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

  const studentQuery = useQuery({
    queryKey: ["sections", classId, sectionId],
    queryFn: () => studentFilerList({ classId, sectionId }),
    enabled: !!classId && !!sectionId, // Only run when classId exists
  });
  const studentOption = studentQuery?.data?.data?.map((value) => ({
    value: value?._id,
    label: `${value?.studentInfo?.firstName} ${value?.studentInfo?.middleName} ${value?.studentInfo?.lastName}`,
  }));

  const studentDetailsQuery = useQuery({
    queryKey: ["studentsView", studentId],
    queryFn: () => studentView(studentId),
    enabled: !!studentId,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: feeSubmission,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        window.open(data?.downloadUrl, "_blank");
        queryClient.invalidateQueries({
          queryKey: ["studentDetailsQuery"],
        });
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

  const feeHistory = useQuery({
    queryKey: ["feeHistory", studentId],
    queryFn: () => studentHistoryView(studentId),
    enabled: !!studentId,
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "receiptDate",
      render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
      title: "Receipt No",
      dataIndex: "receiptNo",
    },
    {
      title: "Student",
      render: (_, record) =>
        `${record.studentId?.studentInfo?.firstName || ""} ${
          record.studentId?.studentInfo?.lastName || ""
        }`,
    },
    {
      title: "Class",
      render: (_, record) =>
        `${record.classId?.className || ""} - ${record.sectionId?.sectionName || ""}`,
    },
    {
      title: "Fee Details",
      render: (_, record) => (
        <>
          <div>Old Fee: ₹{record.oldFee}</div>
          <div>Tuition Fee: ₹{record.tuitionFee}</div>
          <div>Bus Fee: ₹{record.busFee}</div>
          <div>Other Charge: ₹{record.otherCharge}</div>
          <div>Fine: ₹{record.fine}</div>
          <div>Discount: -₹{record.discount}</div>

          <Divider style={{ margin: "6px 0" }} />

          <Text strong>Total: ₹{record.totalAmount}</Text>
        </>
      ),
    },
    {
      title: "Paid By",
      dataIndex: "paidBy",
    },
    {
      title: "Collected By",
      dataIndex: "receivedBy",
    },
    {
      title: "Payment",
      dataIndex: "paymentMode",
    },
    {
      title: "Remark",
      dataIndex: "remarks",
      ellipsis: true,
    },
    {
      title: "Action",
      render: (_, record) => <Button size="small">PDF</Button>,
    },
  ];

  const handleSubmit = async (values) => {
    const payload = {
      studentId: studentId,
      classId: classId,
      sectionId: sectionId,
      receiptNo: values?.receiptNo,
      receiptDate: values?.receiptDate,
      oldFee: values?.oldFee,
      tuitionFee: values?.tuitionFee,
      busFee: values?.busFee,
      otherCharge: values?.otherCharge,
      fine: values?.fine,
      discount: values?.discount,
      totalAmount: values?.totalAmount,
      paymentMode: values?.paymentMode,
      transactionId: values?.transactionId,
      receivedBy: values?.receivedBy,
      paidBy: values?.paidby,
      remarks: values?.remark,
    };
    try {
      console.log(payload);
      await mutation.mutateAsync(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Submit Fee</h2>

      <Row gutter={[16, 16]} className="mb-4">
        <Col xs={24} md={6}>
          <Select
            placeholder="Select Class"
            className="w-full"
            options={classOptions}
            onChange={(value) => setClassId(value)}
          />
        </Col>

        <Col xs={24} md={6}>
          <Select
            placeholder="Select Section"
            className="w-full"
            options={sectionOptions}
            onChange={(value) => setSectionId(value)}
          />
        </Col>

        <Col xs={24} md={12}>
          <Select
            placeholder="Select Student"
            className="w-full"
            onChange={(value) => {
              setSelectedStudent(true);
              setStudentId(value);
            }}
            options={studentOption}
          />
        </Col>
      </Row>
      {   studentId &&
         
       <>
      {/* STUDENT INFO */}
      <Card title="Student Details">
        <Row gutter={[48, 32]}>
          <Col xs={24} md={12}>
            <label> Adminssion Number:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.studentInfo?.adminssion_number}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Name:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.studentInfo?.firstName}{" "}
              {studentDetailsQuery?.data?.data?.studentInfo?.middleName}{" "}
              {studentDetailsQuery?.data?.data?.studentInfo?.lastName}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Class:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.studentInfo?.classId?.className}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Total Fee:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.fee}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Current Fee:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.currentFee}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Bus Fee:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.studentInfo?.busFee}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label> Old Fee:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.studentInfo?.oldFee}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label>Father Name:</label>
            <span className="view-value">
              {
                studentDetailsQuery?.data?.data?.parentsDetails?.father_name
              }{" "}
            </span>
          </Col>
          <Col xs={24} md={12}>
            <label>Father Number:</label>
            <span className="view-value">
              {
                studentDetailsQuery?.data?.data?.parentsDetails?.father_number
              }{" "}
            </span>
          </Col>
          <Col xs={24} md={24}>
            <label> Address:</label>
            <span className="view-value">
              {studentDetailsQuery?.data?.data?.addressInfo?.address},{" "}
              {studentDetailsQuery?.data?.data?.addressInfo?.village},{" "}
              {studentDetailsQuery?.data?.data?.addressInfo?.pincode},{" "}
              {studentDetailsQuery?.data?.data?.addressInfo?.tehssil},{" "}
              {studentDetailsQuery?.data?.data?.addressInfo?.distric},{" "}
              {studentDetailsQuery?.data?.data?.addressInfo?.state}{" "}
            </span>
          </Col>
        </Row>
      </Card>


      <Divider />

      {/* PAYMENT ENTRY */}
      <Card title="New Fee Payment">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            receiptDate: dayjs(),
            paymentMode: "Cash",
            discount: 0,
            busFee: 0,
            otherCharge: 0,
            fine: 0,
          }}
          onFinish={handleSubmit}
        >
          {/* ================= Receipt ================= */}

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Receipt Number"
                name="receiptNo"
                rules={[
                  { required: true, message: "Receipt number is required" },
                ]}
              >
                <Input placeholder="Enter Receipt Number" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Receipt Date"
                name="receiptDate"
                rules={[
                  { required: true, message: "Receipt date is required" },
                ]}
              >
                <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
              </Form.Item>
            </Col>

            {/* <Col xs={24} md={8}>
              <Form.Item label="Receipt PDF" name="receiptPdf">
                <Input placeholder="PDF URL (optional)" />
              </Form.Item>
            </Col> */}
          </Row>

          {/* ================= Fee Details ================= */}

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="Previous Due Fees" name="oldFee">
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Tution Fee"
                name="tuitionFee"
                rules={[{ required: true }]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Bus Fee" name="busFee">
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Other Charges" name="otherCharge">
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Fine" name="fine">
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Discount" name="discount">
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                label="Total Amount"
                name="totalAmount"
                rules={[
                  { required: true, message: "Total amount is required" },
                ]}
              >
                <InputNumber
                  className="w-full"
                  min={0}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* ================= Payment Details ================= */}

          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Payment Mode"
                name="paymentMode"
                rules={[{ required: true, message: "Select payment mode" }]}
              >
                <Select
                  options={[
                    { label: "Cash", value: "Cash" },
                    { label: "UPI", value: "UPI" },
                    { label: "Cheque", value: "Cheque" },
                    {
                      label: "Bank Transfer",
                      value: "Bank Transfer",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Transaction ID" name="transactionId">
                <Input placeholder="UPI / Cheque / Bank Ref No." />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Received By"
                name="receivedBy"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Employee Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Paid By"
                name="paidby"
                rules={[{ required: true, message: "Required" }]}
              >
                <Input placeholder="Parent / Guardian Name" />
              </Form.Item>
            </Col>
          </Row>

          {/* ================= Remarks ================= */}

          <Form.Item name="remark">
            <TextArea rows={4} placeholder="Remarks (optional)" />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button type="default" style={{ marginRight: 10 }}>
              Reset
            </Button>

            <Button type="primary" htmlType="submit">
              Submit Payment
            </Button>
          </div>
        </Form>
      </Card>

      <Divider />

      {/* HISTORY */}
      <Card title="Fee History">
        <Table
          columns={columns}
          dataSource={feeHistory?.data?.data}
          rowKey="_id"
          scroll={{ x: "max-content" }}
          pagination={{
            current: page,
            pageSize,
            total: feeHistory?.data?.total,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} students`,
            onChange: (newPage, newPageSize) => {
              setPage(newPage);
              setPageSize(newPageSize);
            },
          }}
        />
      </Card>
</>
            }
      {/* BACK BUTTON */}
      <div className="flex justify-end mt-4">
        <Button
          size="large"
          icon={<ArrowLeftOutlined />}
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </div>
  );
}

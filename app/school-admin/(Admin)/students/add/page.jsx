"use client";

import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Upload,
  DatePicker,
  Select,
  message,
} from "antd";
import {
  InboxOutlined,
  ArrowLeftOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useRouter } from "next/navigation";
import { studentCreate } from "../../../../../api/student.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {classList} from "../../../../../api/class.api"
import { sectionFilterList } from "../../../../../api/section.api";
import { toast } from "react-toastify";

const { Dragger } = Upload;
const { TextArea } = Input;

export default function AddStudentPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState([]);
  const [classId, setClassId] = useState(null);

    // Queries
  const query = useQuery({
    queryKey: ["classes"],
    queryFn: classList,
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
  const SectionOptions = sectionData?.data?.map((value) => ({
    value: value?._id,
    label: value?.sectionName,
  })); 
  // Mutations
  const mutation = useMutation({
    mutationFn: studentCreate,
    onSuccess: (data) => {
      if (data?.status) {
        toast.success(data?.message);
        queryClient.invalidateQueries({
          queryKey: ["students"],
        });
        router.back();
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });

const handleSubmit = async (values) => {
  const payload = {
    photo: values.photo || "",

    studentInfo: {
      firstName: values.firstName,
      middleName: values.middleName || "",
      lastName: values.lastName,
      gender: values.gender,
      dob: values.dateOfBirth,
      blood_group: values.bloodGroup,
      adminssion_number: values.admissionNumber,
      roll_number: values.rollNumber,
      joining_date: values.dateOfJoining,
      classId: values.class,
      sectionId: values.section,
      oldFee: values.oldFee || "0",
      busFee: values.busFee || "0",

    },

    parentsDetails: {
      father_name: values.fatherName,
      father_number: values.fatherMobile,
      father_whatsaappNumbr: values.fatherWhatsapp,
      mother_name: values.motherName,
      mother_number: values.motherMobile,
    },

    addressInfo: {
      village: values.village,
      tehssil: values.tehsil,
      distric: values.district,
      state: values.state,
      pincode: values.pincode,
      address: values.address || "",
    },

    emergency_info: {
      contact_person: values.emergencyContactPerson,
      relationshp: values.relationship,
      mobile_number: values.emergencyMobile,
    },
  };


  try {
    await mutation.mutateAsync(payload);
  } catch (error) {
    console.error(error);
  }
};



  // const onFinish = async (values) => {
  //   try {
  //     const payload = {
  //       ...values,
  //       dateOfBirth: values.dateOfBirth?.format("YYYY-MM-DD"),
  //       dateOfJoining: values.dateOfJoining?.format("YYYY-MM-DD"),
  //       photo: fileList?.[0]?.originFileObj || null,
  //     };

  //     console.log("Student Payload", payload);

  //     // API CALL HERE
  //     // await studentService.createStudent(payload);

  //     message.success("Student created successfully");
  //     router.push("/super-admin/students");
  //   } catch (error) {
  //     console.error(error);
  //     message.error("Something went wrong");
  //   }
  // };

  return (
    <Card
      title="Add Student"
  
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        {/* PHOTO */}
        <Row gutter={16}>
          <Col span={24}>
         <Form.Item
  label="Student Photo"
  required
>
  <ImgCrop
    rotationSlider
    showGrid
  >
    <Upload.Dragger
      accept="image/*"
      maxCount={1}
      beforeUpload={() => false}
      showUploadList={false}
      fileList={fileList}
      onChange={({ fileList }) =>
        setFileList(fileList)
      }
    >
      {fileList.length > 0 ? (
        <div className="relative flex justify-center">
          <img
            src={URL.createObjectURL(
              fileList[0].originFileObj
            )}
            alt="Student"
            className="h-48 w-48 object-cover rounded-lg border"
          />

          <Button
            danger
            shape="circle"
            size="small"
            icon={<DeleteOutlined />}
            className="!absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              setFileList([]);
            }}
          />
        </div>
      ) : (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>

          <p className="ant-upload-text">
            Click or drag student photo
          </p>

          <p className="ant-upload-hint">
            JPG, PNG up to 5MB
          </p>
        </>
      )}
    </Upload.Dragger>
  </ImgCrop>
</Form.Item>
          </Col>
        </Row>

        {/* STUDENT INFO */}
        <h5 className="text-lg font-semibold mb-4">
          Student Information
        </h5>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Enter first name",
                },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Middle Name"
              name="middleName"
            >
              <Input placeholder="Middle Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Enter last name",
                },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Gender"
                options={[
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                  {
                    label: "Other",
                    value: "Other",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Blood Group"
              name="bloodGroup"
            >
              <Select
                placeholder="Blood Group"
                options={[
                  { label: "A+", value: "A+" },
                  { label: "A-", value: "A-" },
                  { label: "B+", value: "B+" },
                  { label: "B-", value: "B-" },
                  { label: "AB+", value: "AB+" },
                  { label: "AB-", value: "AB-" },
                  { label: "O+", value: "O+" },
                  { label: "O-", value: "O-" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Admission Number"
              name="admissionNumber"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Admission Number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Roll Number"
              name="rollNumber"
            >
              <Input placeholder="Roll Number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Date Of Joining"
              name="dateOfJoining"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker className="w-full" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={7}>
            <Form.Item
              label="Class"
              name="class"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select Class" options={classOptions} onChange={(e) => setClassId(e)} />
            </Form.Item>
          </Col>

          <Col xs={24} md={7}>
            <Form.Item
              label="Section"
              name="section"
             
            >
              <Select placeholder="Select Section" options={SectionOptions} />
            </Form.Item>
          </Col>

          <Col xs={24} md={5}>
            <Form.Item
              label="Bus Fee"
              name="busFee"
            >
              <Input placeholder="Enter Bus fee" />
            </Form.Item>
          </Col>
                    <Col xs={24} md={5}>
            <Form.Item
              label="Old Fee"
              name="oldFee"
            >
              <Input placeholder="Enter old fee" />
            </Form.Item>
          </Col>
        </Row>

        {/* PARENT INFO */}

        <h5 className="text-lg font-semibold mb-4 mt-8">
          Parent Information
        </h5>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Father Name"
              name="fatherName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Father Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Father Mobile"
              name="fatherMobile"
              rules={[
                {
                  required: true,
                  pattern: /^[6-9]\d{9}$/,
                  message:
                    "Enter valid mobile number",
                },
              ]}
            >
              <Input placeholder="Father Mobile" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Father WhatsApp"
              name="fatherWhatsapp"
            >
              <Input placeholder="WhatsApp Number" />
            </Form.Item>
          </Col>

         
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Mother Name"
              name="motherName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Mother Name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Mother Mobile"
              name="motherMobile"
            >
              <Input placeholder="Mother Mobile" />
            </Form.Item>
          </Col>

        
        </Row>

        {/* ADDRESS */}

        <h5 className="text-lg font-semibold mb-4 mt-8">
          Address Information
        </h5>

        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item
              label="Village"
              name="village"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Village" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="Tehsil"
              name="tehsil"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Tehsil" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="District"
              name="district"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="District" />
            </Form.Item>
          </Col>

          <Col xs={24} md={6}>
            <Form.Item
              label="State"
              name="state"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="State" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Pincode"
              name="pincode"
              rules={[
                {
                  required:true,
                  pattern: /^\d{6}$/,
                  message: "Enter valid pincode",
                },
              ]}
            >
              <Input placeholder="Pincode" />
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              label="Address"
              name="address"
            >
              <TextArea
                rows={3}
                placeholder="Full Address"
              />
            </Form.Item>
          </Col>
        </Row>

        {/* EMERGENCY */}

        <h5 className="text-lg font-semibold mb-4 mt-8">
          Emergency Information
        </h5>

        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Form.Item
              label="Emergency Contact Person"
              name="emergencyContactPerson"
            >
              <Input placeholder="Contact Person" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Relationship"
              name="relationship"
            >
              <Input placeholder="Relationship" />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item
              label="Emergency Mobile"
              name="emergencyMobile"
            >
              <Input placeholder="Emergency Mobile" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-3 mt-8">
          <Button
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button
            type="primary"
            htmlType="submit"
          >
            Create Student
          </Button>
        </div>
      </Form>
    </Card>
  );
}
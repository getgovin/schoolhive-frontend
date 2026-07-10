import axiosInstance from "./axios";

export const studentCreate = async (body) => {
  const response = await axiosInstance.post("/school/student/create", body);
  return response.data;
};

export const studentList = async (params) => {
  const response = await axiosInstance.get("/school/student/list", {params});
  return response.data;
};

export const studentFilerList = async (params) => {
  const response = await axiosInstance.get("/school/student/filter/list", {params});
  return response.data;
};

export const studentDelete = async (id) => {
  const response = await axiosInstance.delete(`/school/student/delete/${id}`);
  return response.data;
};

export const studentView = async (id) => {
  const response = await axiosInstance.get(`/school/student/view/${id}`);
  return response.data;
};

export const studentUpdate = async (body , id) => {
  const response = await axiosInstance.put(`/school/student/update/${body?.id}`, body?.data);
  return response.data;
};

export const studentImport = async (body) => {
  const response = await axiosInstance.post(`/school/student/import`, body);
  return response.data;
}
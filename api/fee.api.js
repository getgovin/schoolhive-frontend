import axiosInstance from "./axios";

export const feeCreate = async (body) => {
  const response = await axiosInstance.post("/school/fee/create", body);
  return response.data;
};

export const feeList = async (params) => {
  const response = await axiosInstance.get("/school/fee/list", {params});
  return response.data;
};

export const feeDelete = async (id) => {
  const response = await axiosInstance.delete(`/school/fee/delete/${id}`);
  return response.data;
};

export const feeView = async (id) => {
  const response = await axiosInstance.get(`/school/fee/view/${id}`);
  return response.data;
};

export const feeUpdate = async (body , id) => {
  const response = await axiosInstance.put(`/school/fee/update/${body?.id}`, body?.data);
  return response.data;
};

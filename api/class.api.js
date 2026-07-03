import axiosInstance from "./axios";

export const classCreate = async (body) => {
  const response = await axiosInstance.post("/school/class/create", body);
  return response.data;
};

export const classList = async (params) => {
  const response = await axiosInstance.get("/school/class/list", {params,});
  return response.data;
};

export const classDelete = async (id) => {
  const response = await axiosInstance.delete(`/school/class/delete/${id}`);
  return response.data;
};

export const classView = async (id) => {
  const response = await axiosInstance.get(`/school/class/view/${id}`);
  return response.data;
};

export const classupdate = async (body , id) => {
  const response = await axiosInstance.put(`/school/class/update/${body?.id}`, body?.data);
  return response.data;
};

import axiosInstance from "./axios";

export const sectionCreate = async (body) => {
  const response = await axiosInstance.post("/school/section/create", body);
  return response.data;
};

export const sectionList = async (params) => {
  const response = await axiosInstance.get("/school/section/list", {params});
  return response.data;
};
export const sectionFilterList = async (params) => {
  const response = await axiosInstance.get("/school/section/filter/list", {params});
  return response.data;
};

export const sectionDelete = async (id) => {
  const response = await axiosInstance.delete(`/school/section/delete/${id}`);
  return response.data;
};

export const sectionView = async (id) => {
  const response = await axiosInstance.get(`/school/section/view/${id}`);
  return response.data;
};

export const sectionupdate = async (body , id) => {
  const response = await axiosInstance.put(`/school/section/update/${body?.id}`, body?.data);
  return response.data;
};

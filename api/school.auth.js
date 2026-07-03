import axiosInstance from "./axios";

export const schoolLogin = async (body) => {
  const response = await axiosInstance.post("/school/login", body);
  return response.data;
};
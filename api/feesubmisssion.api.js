import axiosInstance from "./axios";

export const feeSubmission = async (body) => {
  const response = await axiosInstance.post("/school/student/feeSubmission", body);
  return response.data;
};
export const studentHistoryView = async (id) => {
  const response = await axiosInstance.get(`/school/fee-collection/student/${id}`);
  return response.data;
};
export const studentallHistoryView = async (id) => {
  const response = await axiosInstance.get(`/school/fee-collection/list`);
  return response.data;
};
export const feepdfDownload = async (id) => {
  const response = await axiosInstance.get(`/school/fees/download/${id}`);
  return response.data;
};

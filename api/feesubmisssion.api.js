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
  const response = await axiosInstance.get(`/school/fee/download/${id}`, {
    responseType: "blob",
  });

  const disposition = response.headers["content-disposition"];

  let fileName = "Receipt.pdf";

  if (disposition) {
    const match = disposition.match(/filename="?([^"]+)"?/);
    if (match) {
      fileName = match[1];
    }
  }

  return {
    blob: response.data,
    fileName,
  };
};
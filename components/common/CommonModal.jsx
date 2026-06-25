"use client";

import { Modal } from "antd";

const CommonModal = ({
  open,
  title,
  children,
  onOk,
  onCancel,
  okText = "Submit",
  cancelText = "Cancel",
  confirmLoading = false,
  width = 600,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      width={width}
      destroyOnHidden
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
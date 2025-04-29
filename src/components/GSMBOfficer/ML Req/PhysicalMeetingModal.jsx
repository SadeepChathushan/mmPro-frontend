import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
  Space,
  notification,
} from "antd";
import { UploadOutlined, CloseOutlined } from "@ant-design/icons";
import "../../../styles/GSMBofficer/PhysicalMeetingModal.css";
import { physicalMeetingStatus } from "../../../services/officerService";
const PhysicalMeetingModal = ({
  visible,
  onCancel,
  onApprove,
  onReject,
  loading,
  form,
  recordId,
}) => {
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (visible && recordId) {
      console.log("Processing record ID:", recordId);
      // You can use the recordId here for any initialization
    }
  }, [visible, recordId]);

  const beforeUpload = (file) => {
    const isPDF = file.type === "application/pdf";
    if (!isPDF) {
      message.error("You can only upload PDF files!");
    }
    return isPDF || Upload.LIST_IGNORE;
  };

  const handleSubmit = async (action) => {
    try {
      setSubmitLoading(true);
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("mining_request_id", recordId);
      formData.append("comments", values.comments);
      
      if (values.receipt && values.receipt[0]?.originFileObj) {
        const file = values.receipt[0].originFileObj;
        formData.append("payment_receipt", file, file.name); // Append with filename
      }

      console.log("Submitting physical meeting status:", {
        mining_request_id: recordId,
        comments: values.comments,
        payment_receipt: values.receipt?.[0]?.name,
      });

      const response = await physicalMeetingStatus(formData);

      notification.success({
        message: "Success",
        description: `Physical meeting ${
          action === "approve" ? "approved" : "rejected"
        } successfully!`,
        duration: 2,
      });

      onCancel(); // Close the modal
      // You might want to add a callback here to refresh parent component data
    } catch (error) {
      console.error("Error updating physical meeting status:", error);
      notification.error({
        message: "Error",
        description:
          error.response?.data?.error ||
          error.message ||
          "Failed to update status",
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  return (
    <Modal
      title="Update Physical Meeting Status"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      className="meeting-status-modal"
      closeIcon={<CloseOutlined style={{ fontSize: "14px" }} />}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comments"
          label="Comments"
          rules={[{ required: true, message: "Please provide your comments" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Enter approval or rejection notes..."
            className="comments-textarea"
          />
        </Form.Item>

        <Form.Item
          name="receipt"
          label="Upload Receipt"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            { required: true, message: "Please upload the receipt (PDF only)" },
          ]}
          extra="Only PDF files are accepted"
        >
          <Upload
            beforeUpload={beforeUpload}
            accept=".pdf"
            maxCount={1}
            className="receipt-upload"
          >
            <div className="upload-container">
              <UploadOutlined />
              <div className="upload-instructions">
                Click or drag file to upload
              </div>
              <div className="upload-format">PDF format only</div>
            </div>
          </Upload>
        </Form.Item>

        <div className="modal-footer-actions">
          <Space>
            <Button
              danger
              onClick={() => handleAction("reject")}
              disabled={loading}
              className="action-button"
            >
              Reject
            </Button>
            <Button
              type="primary"
              onClick={() => handleSubmit("approve")}
              disabled={loading}
              className="action-button"
            >
              Approve
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default PhysicalMeetingModal;

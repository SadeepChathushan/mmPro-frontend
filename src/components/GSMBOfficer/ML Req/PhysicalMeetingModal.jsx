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
import { useLanguage } from "../../../contexts/LanguageContext";

const PhysicalMeetingModal = ({
  visible,
  onCancel,
  onApprove,
  onReject,
  loading,
  form,
  recordId,
}) => {

  const { language } = useLanguage();
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

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
         onClose: () => window.location.reload(),
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
      title={
        language === "en"
          ? "Update Physical Meeting Status"
          : language === "si"
          ? "භෞතික රැස්වීම් තත්ත්වය යාවත්කාලීන කරන්න"
          : "நிகழ்நிலை சந்திப்பு நிலையை புதுப்பிக்கவும்"
      }
      
      open={visible}
      onCancel={onCancel}

      footer={[
    //     <Button key="cancel" onClick={onCancel} disabled={loading}>
    //       {language === "en"
    // ? "Cancel"
    // : language === "si"
    // ? ""
    // : "ரத்து செய்க"}
    //     </Button>,
        <Button
          key="reject"
          type="default"
          danger
          onClick={() => handleAction('reject')}
          disabled={loading}
          style={{ marginRight: 8 }}
        >
          {language === "en"
    ? "Reject"
    : language === "si"
    ? "ප්‍රතික්ෂේප කරන්න"
    : "நிராகரிக்க"}
        </Button>,
        <Button
          key="approve"
          type="primary"
          onClick={() => handleAction('approve')}
          disabled={loading}
        >
           {language === "en"
    ? "Approve"
    : language === "si"
    ? "අනුමත කරන්න"
    : "அனுமதிக்க"}
        </Button>,
      ]}

//       footer={null}
//       centered
//       className="meeting-status-modal"
//       closeIcon={<CloseOutlined style={{ fontSize: "14px" }} />}

    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comments"

          label={
            language === "en"
              ? "Comments (Approval or Rejection Notes)"
              : language === "si"
              ? "අදහස් (අනුමත හෝ ප්‍රතික්ෂේප සටහන්)"
              : "கருத்துகள் (அனுமதி அல்லது நிராகரிப்பு குறிப்புகள்)"
          }
          rules={[
            {
              required: true,
              message: language === "en"
              ? "Please provide your comments"
              : language === "si"
              ? "කරුණාකර ඔබගේ අදහස් ලබා දෙන්න"
              : "தயவுசெய்து உங்கள் கருத்துகளை வழங்கவும்",
            },
          ]}

        >
          <Input.TextArea
            rows={4}
            placeholder={
              language === "en"
                ? "Enter approval or rejection notes..."
                : language === "si"
                ? "අනුමත හෝ ප්‍රතික්ෂේප සටහන් ඇතුළත් කරන්න..."
                : ""
            }
            className="comments-textarea"
          />
        </Form.Item>

        <Form.Item
          name="receipt"

          label={
            language === "en"
              ? "Upload Receipt (PDF only)"
              : language === "si"
              ? "රිසිට්පත උඩුගත කරන්න (PDF පමණි)"
              : " ரசீதை பதிவேற்றவும் (PDF மட்டும்)"
          }
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message:language === "en"
              ? "Please upload the receipt (PDF only)"
              : language === "si"
              ? "කරුණාකර රිසිට්පත උඩුගත කරන්න (PDF පමණි)"
              : "தயவுசெய்து ரசீதை பதிவேற்றவும் (PDF மட்டும்)",
            },

          ]}
          // extra="Only PDF files are accepted"
        >
          <Upload
            beforeUpload={beforeUpload}
            accept=".pdf"
            maxCount={1}
            className="receipt-upload"
          >

            {/* <Button icon={<UploadOutlined />}>{
  language === "en"
    ? "Click to Upload"
    : language === "si"
    ? ""
    : "பதிவேற்ற கிளிக் செய்யவும்"
}</Button> */}

             <div className="upload-container">
               <UploadOutlined />
               <div className="upload-instructions">
               {language === "en"
                ? "Click or drag file to upload"
                : language === "si"
                ? "උඩුගත කිරීම සඳහා ගොනුව ක්ලික් කරන්න හෝ ඇද දමන්න"
                : ""}
               </div>
               <div className="upload-format">
               {language === "en"
                ?"PDF format only"
                : language === "si"
                ? "PDF ආකෘතිය පමණි"
                : ""}
               </div>
            </div>

          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PhysicalMeetingModal;

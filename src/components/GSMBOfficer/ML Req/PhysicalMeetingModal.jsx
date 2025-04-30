import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useLanguage } from "../../../contexts/LanguageContext";

const PhysicalMeetingModal = ({
  visible,
  onCancel,
  onApprove,
  onReject,
  loading,
  form,
}) => {
  const { language } = useLanguage();
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  const beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    if (!isPDF) {
      message.error('You can only upload PDF files!');
    }
    return isPDF || Upload.LIST_IGNORE;
  };

  const handleAction = (type) => {
    setActionType(type);

    form.validateFields()
      .then((values) => {
        if (type === 'approve') {
          onApprove(values);
        } else {
          onReject(values);
        }
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Modal
      title={
        language === "en"
          ? "Update Physical Meeting Status"
          : language === "si"
          ? ""
          : "நிகழ்நிலை சந்திப்பு நிலையை புதுப்பிக்கவும்"
      }
      
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          {language === "en"
    ? "Cancel"
    : language === "si"
    ? ""
    : "ரத்து செய்க"}
        </Button>,
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
    ? ""
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
    ? ""
    : "அனுமதிக்க"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comments"
          label={
            language === "en"
              ? "Comments (Approval or Rejection Notes)"
              : language === "si"
              ? ""
              : "கருத்துகள் (அனுமதி அல்லது நிராகரிப்பு குறிப்புகள்)"
          }
          rules={[
            {
              required: true,
              message: language === "en"
              ? "Please provide your comments"
              : language === "si"
              ? ""
              : "தயவுசெய்து உங்கள் கருத்துகளை வழங்கவும்",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="receipt"
          label={
            language === "en"
              ? "Upload Receipt (PDF only)"
              : language === "si"
              ? ""
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
              ? ""
              : "தயவுசெய்து ரசீதை பதிவேற்றவும் (PDF மட்டும்)",
            },
          ]}
        >
          <Upload
            beforeUpload={beforeUpload}
            accept=".pdf"
            maxCount={1}
            listType="text"
          >
            <Button icon={<UploadOutlined />}>{
  language === "en"
    ? "Click to Upload"
    : language === "si"
    ? ""
    : "பதிவேற்ற கிளிக் செய்யவும்"
}</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PhysicalMeetingModal;

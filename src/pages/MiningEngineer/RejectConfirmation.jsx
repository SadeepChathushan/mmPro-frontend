import { useState } from 'react';
import { Modal, Button, Form, Input, Upload, message } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";

const RejectConfirmation = ({ onReject, recordId }) => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const translations = {
    en: {
      title: "Reject Appointment",
      confirmText: "Are you sure you want to reject this appointment?",
      commentLabel: "Reason for rejection",
      uploadLabel: "Upload Report (PDF)",
      buttonText: "Reject",
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      submit: "Confirm ML Rejection",
      fileError: "Please upload a PDF file only.",
      fileSizeError: "File must be smaller than 5MB!"
    },
    si: {
      title: "හමුවීම ප්‍රතික්ෂේප කරන්න",
      confirmText: "ඔබට මෙම හමුවීම ප්‍රතික්ෂප කිරීමට අවශ්‍යද?",
      commentLabel: "ප්‍රතික්ෂප කිරීමට හේතුව",
      uploadLabel: "වාර්තාව උඩුගත කරන්න (PDF)",
      buttonText: "ප්‍රතික්ෂප කරන්න",
      yes: "ඔව්",
      no: "නැහැ",
      cancel: "අවලංගු කරන්න",
      submit: "ඉදිරිපත් කරන්න",
      fileError: "කරුණාකර PDF ගොනුවක් පමණක් උඩුගත කරන්න.",
      fileSizeError: "ගොනුව MB 5 ට වඩා කුඩා විය යුතුය!"
    },
    ta: {
      title: "சந்திப்பை நிராகரிக்கவும்",
      confirmText: "இந்த சந்திப்பை நிராகரிக்க விரும்புகிறீர்களா?",
      commentLabel: "நிராகரிப்பதற்கான காரணம்",
      uploadLabel: "அறிக்கையை பதிவேற்றவும் (PDF)",
      buttonText: "நிராகரி",
      yes: "ஆம்",
      no: "இல்லை",
      cancel: "ரத்து செய்",
      submit: "சமர்ப்பிக்கவும்",
      fileError: "PDF கோப்பு மட்டுமே பதிவேற்றவும்.",
      fileSizeError: "கோப்பு 5MB ஐ விட சிறியதாக இருக்க வேண்டும்!"
    }
  };

  const t = translations[language] || translations.en;

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setVisible(false);
  };

  const beforeUpload = (file) => {
    const isPDF = file.type === 'application/pdf';
    const isLt5MB = file.size / 1024 / 1024 < 5;

    if (!isPDF) {
      message.error(t.fileError);
      return Upload.LIST_IGNORE;
    }

    if (!isLt5MB) {
      message.error(t.fileSizeError);
      return Upload.LIST_IGNORE;
    }

    setFileList([file]);
    return false;
  };

  const onRemove = () => {
    setFileList([]);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formData = new FormData();
      formData.append('comment', values.comment);
      if (fileList.length > 0) {
        formData.append('report', fileList[0]);
      }
      
      onReject(recordId, formData);
      handleCancel();
    });
  };

  return (
    <>
      <Button danger icon={<CloseOutlined />} onClick={showModal}>
        {t.buttonText}
      </Button>
      
      <Modal
        title={t.title}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button 
            key="submit" 
            type="primary" 
            danger 
            style={{
              display: 'block',
              margin: '0 auto'
            }}
            onClick={handleSubmit}
          >
            {t.submit}
          </Button>,
        ]}
      >
        <p>{t.confirmText}</p>
        
        <Form form={form} layout="vertical">
          <Form.Item
            name="comment"
            label={t.commentLabel}
            rules={[{ required: true, message: t.commentLabel }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          
          <Form.Item
            label={t.uploadLabel}
          >
            <Upload
              beforeUpload={beforeUpload}
              onRemove={onRemove}
              fileList={fileList}
              accept=".pdf"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>{t.uploadLabel}</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RejectConfirmation;
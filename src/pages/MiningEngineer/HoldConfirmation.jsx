// src/components/MiningEngineer/HoldConfirmation.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form, Input } from 'antd';
import { PauseOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";

const HoldConfirmation = ({ onHold, recordId }) => {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const translations = {
    en: {
      title: "Hold Appointment",
      confirmText: "Are you sure you want to put this appointment on hold?",
      commentLabel: "Reason for holding",
      uploadLabel: "Upload Supporting Document (PDF)",
      buttonText: "Hold",
      yes: "Yes",
      no: "No",
      cancel: "Cancel",
      submit: "HOLD",
      fileError: "Please upload a PDF file only.",
      fileSizeError: "File must be smaller than 5MB!"
    },
    si: {
      title: "හමුවීම තාවකාලිකව නවතන්න",
      confirmText: "ඔබට මෙම හමුවීම තාවකාලිකව නවතා දැමීමට අවශ්‍යද?",
      commentLabel: "තාවකාලිකව නවතා දැමීමට හේතුව",
      uploadLabel: "සහාය ලියකියවිලි උඩුගත කරන්න (PDF)",
      buttonText: "තාවකාලිකව නවතන්න",
      yes: "ඔව්",
      no: "නැහැ",
      cancel: "අවලංගු කරන්න",
      submit: "ඉදිරිපත් කරන්න",
      fileError: "කරුණාකර PDF ගොනුවක් පමණක් උඩුගත කරන්න.",
      fileSizeError: "ගොනුව MB 5 ට වඩා කුඩා විය යුතුය!"
    },
    ta: {
      title: "சந்திப்பை தற்காலிகமாக நிறுத்து",
      confirmText: "இந்த சந்திப்பை தற்காலிகமாக நிறுத்த விரும்புகிறீர்களா?",
      commentLabel: "தற்காலிகமாக நிறுத்துவதற்கான காரணம்",
      uploadLabel: "ஆதரவு ஆவணத்தை பதிவேற்றவும் (PDF)",
      buttonText: "தற்காலிகமாக நிறுத்து",
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

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formData = new FormData();
      formData.append('comment', values.comment);
      if (fileList.length > 0) {
        formData.append('document', fileList[0]);
      }
      
      onHold(recordId, formData);
      handleCancel();
    });
  };

  return (
    <>
      <Button 
        icon={<PauseOutlined />} 
        onClick={showModal}
        style={{ color: '#faad14', borderColor: '#faad14' }}
      >
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
            style={{ backgroundColor: '#faad14', borderColor: '#faad14' }}
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
        </Form>
      </Modal>
    </>
  );
};

HoldConfirmation.propTypes = {
  onHold: PropTypes.func.isRequired,
  recordId: PropTypes.string.isRequired,
};

export default HoldConfirmation;
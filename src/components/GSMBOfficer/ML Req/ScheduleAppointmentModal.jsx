import React from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';
import { useLanguage } from "../../../contexts/LanguageContext";
import moment from 'moment';

const { TextArea } = Input;

const ScheduleAppointmentModal = ({
  
  visible,
  onCancel,
  onSubmit,
  loading,
  form,
  miningRequestId,
  assignedToId,
  
}) => {
  const { language } = useLanguage();
  return (
    <Modal
      title={language === "en"
        ? "Schedule Appointment"
        : language === "si"
        ? ""
        : "சந்திப்பை திட்டமிடு"}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          {language === "en"
    ? "Cancel"
    : language === "si"
    ? ""
    : "ரத்து செய்க"}
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => onSubmit({ miningRequestId, assignedToId })}
        >
{language === "en"
    ? "Schedule"
    : language === "si"
    ? ""
    : "திட்டமிடு"}        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label={language === "en"
            ? "Appointment Date"
            : language === "si"
            ? ""
            : "சந்திப்புத் திகதி"}
          name="date"
          rules={[{ required: true, message: language === "en" ? "Please select a date" : language === "si" ? "" : "தயவுசெய்து ஒரு திகதியை தேர்ந்தெடுக்கவும்" },
            {
      validator: (_, value) => {
        if (!value) return Promise.resolve(); // required rule handles empty
        if (value.isBefore(moment(), 'day')) {
          return Promise.reject(new Error(language === "en" ? "Date cannot be in the past" : language === "si" ? "" : "திகதி கடந்த காலம் இருக்க முடியாது"));
        }
        return Promise.resolve();
      },
    },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label={ language === "en"
            ? "Location"
            : language === "si"
            ? ""
            : "இடம்"}
          name="location"
          rules={[{ required: true, message: language === "en" ? "Please enter the location" : language === "si" ? "" : "தயவுசெய்து இடத்தை உள்ளிடவும்" }]}
        >
          <Input placeholder={language === "en" ? "Enter meeting location" : language === "si" ? "" : "சந்திப்பு இடத்தை உள்ளிடவும்"} />
        </Form.Item>

        <Form.Item label={language === "en" ? "Purpose/Notes" : language === "si" ? "" : "நோக்கம்/குறிப்புகள்"} name="notes">
          <TextArea
            rows={4}
            placeholder={
              language === "en"
                ? "Enter any additional notes or purpose of the meeting"
                : language === "si"
                ? ""
                : "கூட்டத்தின் மேலதிக குறிப்புகள் அல்லது நோக்கத்தை உள்ளிடவும்."}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleAppointmentModal;
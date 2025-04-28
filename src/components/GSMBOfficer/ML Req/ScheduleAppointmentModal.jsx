import React from 'react';
import { Modal, Form, Input, Button, DatePicker } from 'antd';

const { TextArea } = Input;

const ScheduleAppointmentModal = ({
  visible,
  onCancel,
  onSubmit,
  loading,
  form,
}) => {
  return (
    <Modal
      title="Schedule Appointment"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={onSubmit}
        >
          Schedule
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Appointment Date"
          name="date"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please enter the location" }]}
        >
          <Input placeholder="Enter meeting location" />
        </Form.Item>

        <Form.Item label="Purpose/Notes" name="notes">
          <TextArea
            rows={4}
            placeholder="Enter any additional notes or purpose of the meeting"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ScheduleAppointmentModal;
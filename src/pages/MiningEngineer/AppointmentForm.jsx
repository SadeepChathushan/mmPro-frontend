import React from 'react';
import { Form, Input, DatePicker, TimePicker } from 'antd';

const AppointmentForm = ({ form }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Customer Name"
        name="customerName"
        rules={[{ required: true, message: 'Please enter customer name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Service"
        name="service"
        rules={[{ required: true, message: 'Please enter service' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: 'Please select date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        label="Time"
        name="time"
        rules={[{ required: true, message: 'Please select time' }]}
      >
        <TimePicker style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export default AppointmentForm;

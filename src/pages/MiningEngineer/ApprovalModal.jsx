import React from 'react';
import { Modal, Form, Input, InputNumber, Row, Col, DatePicker } from 'antd';

const ApprovalModal = ({ visible, onCancel, onOk, appointmentId }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Approve Mining License"
      visible={visible}
      onOk={() => {
        form.validateFields().then(values => {
          onOk(appointmentId, values);
        });
      }}
      onCancel={onCancel}
      width={600}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Total Capacity (m³)"
          name="totalCapacity"
          rules={[{ required: true, message: 'Please enter total capacity' }]}
        >
          <InputNumber 
            style={{ width: '100%' }} 
            min={1} 
            placeholder="Enter total capacity in cubic meters" 
          />
        </Form.Item>

        <Form.Item
          label="Monthly Maximum Capacity (m³)"
          name="monthlyCapacity"
          rules={[{ required: true, message: 'Please enter monthly capacity' }]}
        >
          <InputNumber 
            style={{ width: '100%' }} 
            min={1} 
            placeholder="Enter monthly maximum capacity" 
          />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Start Date"
              name="startDate"
              rules={[{ required: true, message: 'Please select start date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Due Date"
              name="dueDate"
              rules={[{ required: true, message: 'Please select due date' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Comments"
          name="comments"
        >
          <Input.TextArea rows={4} placeholder="Enter any additional comments" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ApprovalModal;
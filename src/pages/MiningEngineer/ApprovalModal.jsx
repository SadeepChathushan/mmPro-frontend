import React from 'react';
import { Modal, Form, Input, InputNumber, Row, Col, DatePicker, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ApprovalModal = ({ visible, onCancel, onOk, appointmentId }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = React.useState([]);
  const [uploading, setUploading] = React.useState(false);

  const beforeUpload = (file) => {
    const isPdfOrImage = file.type === 'application/pdf' || 
                        file.type === 'image/jpeg' || 
                        file.type === 'image/png';
    if (!isPdfOrImage) {
      message.error('You can only upload PDF, JPG, or PNG files!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('File must be smaller than 5MB!');
    }
    return isPdfOrImage && isLt5M;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter(f => f.uid !== file.uid);
    setFileList(newFileList);
  };

  const handleSubmit = () => {
    form.validateFields().then(values => {
      setUploading(true);
      
      // Here you would typically upload the files to your server
      // and then call onOk with both form values and file references
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files', file.originFileObj);
      });
      
      // Simulate file upload
      setTimeout(() => {
        onOk(appointmentId, {
          ...values,
          attachments: fileList.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file.originFileObj) // In real app, this would be server URL
          }))
        });
        setUploading(false);
      }, 1500);
    });
  };

  return (
    <Modal
      title="Approve Mining License"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={600}
      confirmLoading={uploading}
      okText={uploading ? 'Uploading...' : 'Submit'}
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
          label="Upload Report"
          name="attachments"
          extra="Supports PDF, JPG, PNG (max 5MB)"
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleUploadChange}
            onRemove={handleRemove}
            fileList={fileList}
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>Select Files</Button>
          </Upload>
        </Form.Item>

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
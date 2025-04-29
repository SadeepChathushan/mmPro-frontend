import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message, Space } from 'antd';
import { UploadOutlined ,CloseOutlined} from '@ant-design/icons';
import '../../../styles/GSMBofficer/PhysicalMeetingModal.css';

const PhysicalMeetingModal = ({
  visible,
  onCancel,
  onApprove,
  onReject,
  loading,
  form,
}) => {
  const [actionType, setActionType] = useState(null);

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
        type === 'approve' ? onApprove(values) : onReject(values);
      })
      .catch(console.error);
  };

  const normFile = (e) => Array.isArray(e) ? e : e?.fileList;

  return (
    <Modal
      title="Update Physical Meeting Status"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      className="meeting-status-modal"
      closeIcon={<CloseOutlined style={{ fontSize: '14px' }} />}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comments"
          label="Comments"
          rules={[{ required: true, message: 'Please provide your comments' }]}
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
          rules={[{ required: true, message: 'Please upload the receipt (PDF only)' }]}
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
              <div className="upload-instructions">Click or drag file to upload</div>
              <div className="upload-format">PDF format only</div>
            </div>
          </Upload>
        </Form.Item>

        <div className="modal-footer-actions">
          <Space>
            <Button
              danger
              onClick={() => handleAction('reject')}
              disabled={loading}
              className="action-button"
            >
              Reject
            </Button>
            <Button
              type="primary"
              onClick={() => handleAction('approve')}
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
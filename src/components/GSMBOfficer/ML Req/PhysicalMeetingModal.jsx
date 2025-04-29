import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const PhysicalMeetingModal = ({
  visible,
  onCancel,
  onApprove,
  onReject,
  loading,
  form,
}) => {
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
      title="Update Physical Meeting Status"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>,
        <Button
          key="reject"
          type="default"
          danger
          onClick={() => handleAction('reject')}
          disabled={loading}
          style={{ marginRight: 8 }}
        >
          Reject
        </Button>,
        <Button
          key="approve"
          type="primary"
          onClick={() => handleAction('approve')}
          disabled={loading}
        >
          Approve
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="comments"
          label="Comments (Approval or Rejection Notes)"
          rules={[
            {
              required: true,
              message: 'Please provide your comments',
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="receipt"
          label="Upload Receipt (PDF only)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please upload the receipt (PDF only)',
            },
          ]}
        >
          <Upload
            beforeUpload={beforeUpload}
            accept=".pdf"
            maxCount={1}
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PhysicalMeetingModal;

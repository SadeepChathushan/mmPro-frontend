import React from 'react';
import { Modal, Button, Space } from 'antd';
import "../../../styles/GSMBofficer/confimationmodal.css";

const ConfirmationModal = ({ 
  visible, 
  onCancel, 
  onApprove, 
  onReject,
  loading 
}) => {
  return (
    <Modal
      title="Update Physical Meeting Status"
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={400}
      className="confirmation-modal"
    >
      <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <p className="confirmation-text">How would you like to proceed with the mining license process?</p>
      <Space>
          <Button 
            type="default" 
            danger
            onClick={onReject}
            disabled={loading}
            style={{ minWidth: 100 }}
          >
            Reject
          </Button>
          <Button 
            type="primary" 
            onClick={onApprove}
            disabled={loading}
            style={{ minWidth: 100 }}
          >
            Approve
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;

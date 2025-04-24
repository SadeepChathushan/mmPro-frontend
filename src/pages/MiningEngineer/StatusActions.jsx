import React from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { CheckOutlined, CloseOutlined, PauseOutlined } from '@ant-design/icons';

const StatusActions = ({ record, onApprove, onHold, onReject }) => {
  return (
    <Space>
      <Button 
        type="primary" 
        icon={<CheckOutlined />} 
        ghost
        onClick={() => onApprove(record.id)}
      >
        Approve
      </Button>

      <Popconfirm
        title="Are you sure you want to put this appointment on hold?"
        onConfirm={() => onHold(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button icon={<PauseOutlined />} style={{ color: '#faad14', borderColor: '#faad14' }}>
          Hold
        </Button>
      </Popconfirm>

      <Popconfirm
        title="Are you sure you want to reject this appointment?"
        onConfirm={() => onReject(record.id)}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<CloseOutlined />}>
          Reject
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default StatusActions;
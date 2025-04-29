import React from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { CheckOutlined, CloseOutlined, PauseOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";


const StatusActions = ({ record, onApprove, onHold, onReject }) => {
    const { language } = useLanguage();
  
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
        title={
          language === "en"
            ? "Are you sure you want to put this appointment on hold?"
            : language === "si"
            ? ""
            : "இந்த சந்திப்பை தற்காலிகமாக நிறுத்த விரும்புகிறீர்களா?"
        }
        onConfirm={() => onHold(record.id)}
        okText={
          language === "en"
            ? "Yes"
            : language === "si"
            ? ""
            : "ஆம்"
        }
        cancelText={
          language === "en"
            ? "No"
            : language === "si"
            ? ""
            : "இல்லை"
        }
      >
        <Button icon={<PauseOutlined />} style={{ color: '#faad14', borderColor: '#faad14' }}>
          Hold
        </Button>
      </Popconfirm>

      <Popconfirm
        title={
          language === "en"
            ? "Are you sure you want to reject this appointment?"
            : language === "si"
            ? ""
            : "இந்த சந்திப்பை நிராகரிக்க விரும்புகிறீர்களா?"
        }
        onConfirm={() => onReject(record.id)}
        okText={
          language === "en"
            ? "Yes"
            : language === "si"
            ? ""
            : "ஆம்"
        }
        cancelText={
          language === "en"
            ? "No"
            : language === "si"
            ? ""
            : "இல்லை"
        }
      >
        <Button danger icon={<CloseOutlined />}>
          Reject
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default StatusActions;
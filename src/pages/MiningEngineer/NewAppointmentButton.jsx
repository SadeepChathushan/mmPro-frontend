import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const NewAppointmentButton = ({ onCreate }) => {
  return (
    <Button 
      type="primary" 
      icon={<PlusOutlined />}
      onClick={onCreate}
    >
      New Appointment
    </Button>
  );
};

export default NewAppointmentButton;
import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";

const NewAppointmentButton = ({ onCreate }) => {
  const { language } = useLanguage();

  return (
    <Button 
      type="primary" 
      icon={<PlusOutlined />}
      onClick={onCreate}
    >
     {language === "en" 
    ? "New Appointment" 
    : language === "si" 
    ? "" 
    : "புதிய சந்திப்பு"}
    </Button>
  );
};

export default NewAppointmentButton;
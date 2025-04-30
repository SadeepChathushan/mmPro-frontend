import React from 'react';
import { Modal, Descriptions, Tag, Button, Space } from 'antd';
import { CloseCircleOutlined, FilePdfOutlined } from '@ant-design/icons';

const ViewLicenseModal = ({ 
  visible, 
  onClose, 
  selectedLicense, 
  language 
}) => {
  if (!selectedLicense) return null;

  return (
    <Modal
      title={language === "en" ? "License Details" : "உரிம விவரங்கள்"}
      visible={visible}
      onCancel={onClose}
      width={800}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label={language === "en" ? "License Number" : "உரிம எண்"}>
          <Tag color="red">{selectedLicense.licenseNumber}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Owner Name" : "உரிமையாளர் பெயர்"}>
          {selectedLicense.owner}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Business Name" : "வணிகப் பெயர்"}>
          {selectedLicense.businessName}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Location" : "இடம்"}>
          {selectedLicense.location}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "License Type" : "உரிம வகை"}>
          {selectedLicense.type}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Applied Date" : "விண்ணப்பித்த தேதி"}>
          {selectedLicense.appliedDate}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Name of Land" : "நிலத்தின் பெயர்"}>
          {selectedLicense.landName}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Land Google Location" : "நிலத்தின் Google இடம்"}>
          <a href={selectedLicense.landLocation} target="_blank" rel="noopener noreferrer">
            {selectedLicense.landLocation}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Land Owner's Name" : "நில உரிமையாளர் பெயர்"}>
          {selectedLicense.landOwnerName}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Name of Village" : "கிராமத்தின் பெயர்"}>
          {selectedLicense.village}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Grama Niladhari Division" : "கிராம நிர்வாக பிரிவு"}>
          {selectedLicense.gramaNiladhariDivision}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Administrative District" : "நிர்வாக மாவட்டம்"}>
          {selectedLicense.administrativeDistrict}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Divisional Secretary's Division" : "பிரிவின் செயலகம்"}>
          {selectedLicense.divisionalSecretariat}
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Status" : "நிலை"}>
          <Tag icon={<CloseCircleOutlined />} color="error">
            {language === "en" ? "Rejected" : "நிராகரிக்கப்பட்டது"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label={language === "en" ? "Rejection Reason" : "நிராகரிப்பதற்கான காரணம்"}>
          {selectedLicense.rejectionReason || 
           (language === "en" ? "Not specified" : "குறிப்பிடப்படவில்லை")}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 20 }}>
        <h4>{language === "en" ? "Attached Documents:" : "இணைக்கப்பட்ட ஆவணங்கள்:"}</h4>
        <Space size="large" wrap>

          <Button 
            type="link" 
            icon={<FilePdfOutlined />} 
            href={selectedLicense.documents?.deedAndSurveyPlan}
            target="_blank"
          >
            {language === "en" ? "Deed and Survey Plan" : "உரிமம் மற்றும் கணக்கீட்டு திட்டம்"}
          </Button>
          <Button 
            type="link" 
            icon={<FilePdfOutlined />} 
            href={selectedLicense.documents?.mineRestorationPlan}
            target="_blank"
          >
            {language === "en" ? "Mine Restoration Plan" : "பாதுகாப்பு திட்டம்"}
          </Button>
        </Space>
      </div>
    </Modal>
  );
};

export default ViewLicenseModal;
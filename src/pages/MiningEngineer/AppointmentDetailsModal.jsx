import React from 'react';
import { Modal, Descriptions, Tabs, Divider, Space, Tag, Button } from 'antd';
import { FilePdfOutlined, FileImageOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

const AppointmentDetailsModal = ({ 
  visible, 
  onCancel, 
  appointment 
}) => {
  if (!appointment) return null;

  return (
    <Modal
      title="Appointment Details"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>
      ]}
      width={800}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="Basic Information" key="1">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ML Owner">{appointment.mlOwner}</Descriptions.Item>
            <Descriptions.Item label="GSMB Officer">{appointment.gsmbOfficer}</Descriptions.Item>
            <Descriptions.Item label="Location">{appointment.location}</Descriptions.Item>
            <Descriptions.Item label="Cube Count">{appointment.cubeCount} m³</Descriptions.Item>
            <Descriptions.Item label="Appointment Date">{appointment.date}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={appointment.status === 'pending' ? 'orange' : 'green'}>
                {appointment.status.toUpperCase()}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane tab="License Details" key="2">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="License Status">{appointment.licenseDetails.status}</Descriptions.Item>
            <Descriptions.Item label="Exploration License No.">
              {appointment.licenseDetails.explorationLicenseNo}
            </Descriptions.Item>
            <Descriptions.Item label="Land Name">{appointment.licenseDetails.landName}</Descriptions.Item>
            <Descriptions.Item label="Land Owner">{appointment.licenseDetails.landOwner}</Descriptions.Item>
            <Descriptions.Item label="Royalty">{appointment.licenseDetails.royalty}</Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane tab="Location Details" key="3">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Village">{appointment.locationDetails.village}</Descriptions.Item>
            <Descriptions.Item label="Grama Niladhari Division">
              {appointment.locationDetails.gramaNiladhariDivision}
            </Descriptions.Item>
            <Descriptions.Item label="Divisional Secretary Division">
              {appointment.locationDetails.divisionalSecretaryDivision}
            </Descriptions.Item>
            <Descriptions.Item label="District">{appointment.locationDetails.district}</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Button 
            type="primary" 
            icon={<EnvironmentOutlined />} 
            href={appointment.documents.googleLocation}
            target="_blank"
          >
            View on Google Maps
          </Button>
        </TabPane>

        <TabPane tab="Capacity & Timeline" key="4">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Total Capacity">{appointment.capacity.total} m³</Descriptions.Item>
            <Descriptions.Item label="Used Capacity">{appointment.capacity.used} m³</Descriptions.Item>
            <Descriptions.Item label="Remaining Capacity">
              {appointment.capacity.remaining} m³
            </Descriptions.Item>
            <Descriptions.Item label="Monthly Capacity">
              {appointment.capacity.monthCapacity}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Start Date">{appointment.timeline.startDate}</Descriptions.Item>
            <Descriptions.Item label="Due Date">{appointment.timeline.dueDate}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={appointment.timeline.status.includes('late') ? 'red' : 'green'}>
                {appointment.timeline.status}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        </TabPane>

        <TabPane tab="Documents" key="5">
          <Space direction="vertical" style={{ width: '100%' }}>
            <Button 
              icon={<FilePdfOutlined />} 
              href={appointment.documents.restorationPlan}
              target="_blank"
            >
              Restoration Plan
            </Button>
            <Button 
              icon={<FilePdfOutlined />} 
              href={appointment.documents.paymentReceipt}
              target="_blank"
            >
              Payment Receipt
            </Button>
            <Button 
              icon={<FileImageOutlined />} 
              href={appointment.documents.deedAndSurvey}
              target="_blank"
            >
              Deed & Survey Plans
            </Button>
          </Space>
        </TabPane>

        {appointment.approvalComments && (
          <TabPane tab="Approval Comments" key="6">
            <div style={{ padding: '16px', background: '#f0f0f0', borderRadius: '4px' }}>
              {appointment.approvalComments}
            </div>
          </TabPane>
        )}
      </Tabs>
    </Modal>
  );
};

export default AppointmentDetailsModal;
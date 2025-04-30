import React, { useState } from 'react';
import { Table, Tag, Space, Tabs, Card, Typography } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";

const { TabPane } = Tabs;
const { Title } = Typography;

const RejectedApprovedLisenceTable = ({ appointments, onViewDetails, language }) => {
  const [activeTab, setActiveTab] = useState('approved');

  const commonColumns = [
    {
      title: language === "en" ? "License No" : "அனுமதி எண்",
      dataIndex: ['licenseDetails', 'explorationLicenseNo'],
      key: 'licenseNo',
      render: (text, record) => (
        <Tag color={record.status === 'completed' ? 'green' : 'red'}>
          {text}
        </Tag>
      )
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: 'mlOwner',
      key: 'mlOwner'
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: language === "en" ? "Date" : "தேதி",
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onViewDetails(record)}>
            {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
          </a>
          <a href={record.documents.restorationPlan} target="_blank" rel="noopener noreferrer">
            <FilePdfOutlined /> {language === "en" ? "Plan" : "திட்டம்"}
          </a>
        </Space>
      )
    }
  ];

  const approvedColumns = [
    ...commonColumns,
    {
      title: language === "en" ? "Status" : "நிலை",
      dataIndex: ['licenseDetails', 'status'],
      key: 'status',
      render: () => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
        </Tag>
      )
    }
  ];

  const rejectedColumns = [
    ...commonColumns,
    {
      title: language === "en" ? "Status" : "நிலை",
      dataIndex: ['licenseDetails', 'status'],
      key: 'status',
      render: () => (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {language === "en" ? "Rejected" : "நிராகரிக்கப்பட்டது"}
        </Tag>
      )
    }
  ];

  return (
    <Card>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane
          tab={
            <span>
              <CheckCircleOutlined />
              {language === "en" ? " Approved Licenses" : " அங்கீகரிக்கப்பட்ட உரிமைகள்"}
            </span>
          }
          key="approved"
        >
          <Table
            columns={approvedColumns}
            dataSource={appointments.filter(app => app.status === 'completed')}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <CloseCircleOutlined />
              {language === "en" ? " Rejected Licenses" : " நிராகரிக்கப்பட்ட உரிமைகள்"}
            </span>
          }
          key="rejected"
        >
          <Table
            columns={rejectedColumns}
            dataSource={appointments.filter(app => app.status === 'rejected')}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default RejectedApprovedLisenceTable;
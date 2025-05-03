import React from 'react';
import { Table, Tag, Space } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';

const ApprovedLicensesTable = ({ data, onViewDetails, language }) => {
  const columns = [
    {
      title: language === "en" ? "License No" : "அனுமதி எண்",
      dataIndex: 'licenseNumber',
      key: 'licenseNo',
      render: (text) => <Tag color="green">{text}</Tag>
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: language === "en" ? "Approved Date" : "அங்கீகரிக்கப்பட்ட தேதி",
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: language === "en" ? "Status" : "நிலை",
      key: 'status',
      render: () => (
        <Tag color="success">
          {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
        </Tag>
      )
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onViewDetails(record)}>
            {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
          </a>
        </Space>
      )
    }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default ApprovedLicensesTable;
import React, { useState } from 'react';
import { Table, Row, Col, DatePicker, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // for navigation
import moment from 'moment';
import { useLanguage } from "../../contexts/LanguageContext";

const Licenses = () => {
  const { language } = useLanguage();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [licenses, setLicenses] = useState([
    {
      licenseNumber: "IML/B/TEST/5178/LRS",
      owner: "Jayantha",
      location: "Rathnapura",
      startDate: "2023-10-10",
      endDate: "2025-10-15"
    },
    {
      licenseNumber: "IML/B/TEST/5175/LRS",
      owner: "Jayantha",
      location: "Kahawatta",
      startDate: "2023-10-05",
      endDate: "2023-10-10"
    },
    {
      licenseNumber: "IML/B/TEST/5054/LRS",
      owner: "Jayantha",
      location: "Rathnapura",
      startDate: "2023-10-01",
      endDate: "2023-10-05"
    },
  ]);

  const handleStartDateChange = (date) => {
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const filteredLicenses = licenses.filter((license) => {
    if (startDate && endDate) {
      const licenseStartDate = new Date(license.startDate);
      const licenseEndDate = new Date(license.endDate);
      return (
        licenseStartDate >= new Date(startDate) && licenseEndDate <= new Date(endDate)
      );
    } else {
      return true; // Show all licenses if no dates are selected
    }
  });

  // Determine status based on the endDate (whether it's expired or not)
  const getStatus = (endDate) => {
    return moment(endDate).isAfter(moment()) ? 'ACTIVE' : 'INACTIVE';
  };

  const columns = [
    {
      title: `${language == "en" ? 'License Number': 'බලපත්‍ර අංකය'}`,
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: `${language == "en" ? 'Owner' : 'අයිතිකරු'}`,
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: `${language == "en" ? 'Location' : 'ස්ථානය'}`,
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Start Date',
      dataIndex: `${language == "en" ? 'start Date' : 'ආරම්භක දිනය'}`,
      key: 'startDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: `${language == "en" ? 'End Date' : 'අවලංගු වන දිනය'}`,
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: `${language == "en" ? 'Status' : 'තත්වය'}`,
      key: 'status',
      render: (text, record) => (
        <span style={{ color: getStatus(record.endDate) === 'ACTIVE' ? 'green' : 'red' }}>
          {getStatus(record.endDate)}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Licenses of MLOwner</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleStartDateChange}
            placeholder={language == "en" ? "Start Date" : "ආරම්භක දිනය"}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder={language == "en" ? "End Date" : "අවසාන දිනය"}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      <Table
        dataSource={filteredLicenses}
        columns={columns}
        scroll={{ x: 'max-content' }} // Enable horizontal scroll for small screens
        style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        pagination={false} // Disable pagination (optional)
      />

      {/* Back to Home Button */}
      <div style={{ textAlign: 'center' }}>
        <Link to="/mlowner/home/">
          <Button
            type="primary"
            style={{
              backgroundColor: '#FFA500',
              borderColor: '#FFA500',
              color: 'white',
              width: '200px',
              borderRadius: '8px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgb(211, 153, 61)')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#FFA500')}
          >
            {language == "en" ? "Back to Home" : "ආපසු"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Licenses;

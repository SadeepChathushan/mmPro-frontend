import React, { useState } from 'react';
import { Table, Row, Col, DatePicker, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // for navigation
import moment from 'moment'; // For date formatting
import { SiJinja } from 'react-icons/si';
import { useLanguage } from "../../contexts/LanguageContext";


const History = () => {
  const { language } = useLanguage();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  
  const [dispatchHistory, setDispatchHistory] = useState([
    {
      licenseNumber: "LE-8595",
      owner: "Jayantha",
      location: "Madampe",
      cubes: 10,
      dispatchDate: "2023-10-10 12:00:00",
      lorryDriverContact: "0771234567", // Added contact number
    },
    {
      licenseNumber: "LE-8595",
      owner: "Jayantha",
      location: "Anuradhapura",
      cubes: 20,
      dispatchDate: "2023-10-12 15:30:00",
      lorryDriverContact: "0782345678", // Added contact number
    },
  ]);

  const handleStartDateChange = (date) => {
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const filteredDispatchHistory = dispatchHistory.filter((dispatch) => {
    if (startDate && endDate) {
      const dispatchDate = new Date(dispatch.dispatchDate);
      return (
        dispatchDate >= new Date(startDate) && dispatchDate <= new Date(endDate)
      );
    } else {
      return true; // Show all dispatches if no dates are selected
    }
  });

  const columns = [
    {
      title: `${language == "en" ? 'License Number': 'බලපත්‍ර අංකය'}`,
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: `${language == "en" ? 'Lorry Driver Contact Number' : 'ලොරි රියදුරුගේ දුරකථන අංකය'}`,
      dataIndex: 'lorryDriverContact',
      key: 'lorryDriverContact',
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
      title: `${language == "en" ? 'Cubes' : 'කියුබ් ගණන'}`,
      dataIndex: 'cubes',
      key: 'cubes',
    },
    {
      title: `${language == "en" ? 'Dispatch Date' : 'යවන ලද දිනය'}`,
      dataIndex: 'dispatchDate',
      key: 'dispatchDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>, 
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{language == "en" ? "Dispatch History" : "පෙර යවන ලද ප්‍රමාණ"}</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker onChange={handleStartDateChange} placeholder={language == "en" ? "Start Date" : "ආරම්භක දිනය"} style={{ width: '100%' }} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker onChange={handleEndDateChange} placeholder={language == "en" ? "End Date" : "අවසාන දිනය"} style={{ width: '100%' }} />
        </Col>
      </Row>

      <Table
        dataSource={filteredDispatchHistory}
        columns={columns}
        scroll={{ x: 'max-content' }} // Enable horizontal scroll for small screens
        style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}
        pagination={false} // Disable pagination (optional)
      />

      {/* Back to Home Button */}
      <div style={{ textAlign: 'center' }}>
        <Link to="/mlowner/home">
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

export default History;



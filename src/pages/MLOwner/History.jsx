import React, { useState, useEffect } from 'react';
import { Table, Row, Col, DatePicker, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useLanguage } from "../../contexts/LanguageContext";

const History = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dispatchHistory, setDispatchHistory] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [clickCounts, setClickCounts] = useState({}); // Track click counts for each row
  const { language } = useLanguage();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const extractedLicenseNumber = queryParams.get('licenseNumber');
    if (extractedLicenseNumber) {
      setLicenseNumber(extractedLicenseNumber); // Set the license number from URL
    }

    const fetchDispatchHistory = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";

        const response = await axios.get('/api/projects/gsmb/issues.json', {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        });

        if (response.data && response.data.issues) {
          const issues = response.data.issues;

          // Filter issues related to the 'TPL' tracker (tracker.id === 8)
          const filteredIssues = issues.filter(issue => issue.tracker.id === 8);

          const formattedDispatchHistory = filteredIssues.map((issue) => {
            const customFields = issue.custom_fields.reduce((acc, field) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            return {
              licenseNumber: customFields['License Number'] || '',
              owner: customFields['Owner Name'] || '',
              location: customFields['Location'] || '',
              Destination: customFields['Destination'] || '',
              cubes: customFields['Cubes'] || '',
              dispatchDate: issue.start_date || '',
              lorryDriverContact: customFields['Driver Contact'] || '',
            };
          });

          setDispatchHistory(formattedDispatchHistory);
        }
      } catch (error) {
        console.error('Error fetching dispatch history:', error);
      }
    };

    fetchDispatchHistory();
  }, [location.search]);

  // Filter dispatch history based on the extracted license number and date range
  const filteredDispatchHistory = dispatchHistory.filter((dispatch) => {
    let isLicenseMatch = true;
    if (licenseNumber) {
      isLicenseMatch = dispatch.licenseNumber === licenseNumber;
    }

    if (startDate && endDate) {
      const dispatchDate = new Date(dispatch.dispatchDate);
      return (
        dispatchDate >= new Date(startDate) &&
        dispatchDate <= new Date(endDate) &&
        isLicenseMatch
      );
    } else {
      return isLicenseMatch; // Only license number filter applied
    }
  });

  // Handle button click for each row
  const handleButtonClick = (licenseNumber) => {
    setClickCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      newCounts[licenseNumber] = (newCounts[licenseNumber] || 0) + 1;
      return newCounts;
    });

    // Navigate to the receipt page
    navigate(`/mlowner/home/dispatchload/receipt?licenseNumber=${licenseNumber}`);
  };

  const columns = [
    { title: `${language === "en" ? 'License Number' : language == "si" ? 'බලපත්‍ර අංකය' : ''}`, dataIndex: 'licenseNumber', key: 'licenseNumber' },
    { title: `${language === "en" ? 'Driver Contact' : language == "si" ? 'රියදුරුගේ දුරකථනය' : ''}`, dataIndex: 'lorryDriverContact', key: 'lorryDriverContact' },
    { title: `${language === "en" ? 'Owner' : language == "si" ? 'අයිතිකරු' : ''}`, dataIndex: 'owner', key: 'owner' },
    { title: `${language === "en" ? 'Location' : language == "si" ? 'ස්ථානය' : ''}`, dataIndex: 'location' , key: 'location' },
    { title: `${language === "en" ? 'Destination' : language == "si" ? 'ගමනාන්තය' : ''}`, dataIndex: 'Destination', key: 'Destination' },
    { title: `${language === "en" ?'Cubes' : language == "si" ? 'කියුබ් ගණන' : ''}`, dataIndex: 'cubes', key: 'cubes' },
    { title: `${language === "en" ? 'Dispatched Date' : language == "si" ? 'යවන ලද දිනය' : '' }`, dataIndex: 'dispatchDate', key: 'dispatchDate', render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span> },

    // New column for "Print Your Missed Receipt" button
    {
      title: `${language === "en" ? 'Action' : language == "si" ? 'ක්‍රියාමාර්ග' : ''}`,
      key: 'action',
      render: (_, record) => {
        const buttonDisabled = (clickCounts[record.licenseNumber] || 0) >= 3; // Disable button after 3 clicks

        return (
          <Button
            type="primary"
            style={{
              backgroundColor: buttonDisabled ? '#d6d6d6' : '#28a745', // Grey out the button if disabled
              borderColor: buttonDisabled ? '#d6d6d6' : '#28a745',
              color: buttonDisabled ? '#a0a0a0' : 'white',
              width: '200px',
              borderRadius: '8px',
            }}
            onClick={() => !buttonDisabled && handleButtonClick(record.licenseNumber)} // Disable onClick if button is disabled
            disabled={buttonDisabled} // Disable button
          >
            {buttonDisabled ? `${language == "en" ? 'Max Clicks Reached' : language == "si" ? 'උපරිම ක්ලික් ගණන අවසන්' : '' }`: `${language == "en" ? 'Print Your Missed Receipts' : language == "si" ? 'රිසිට්පත මුද්‍රණය කරගන්න' : '' }`}
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>{language == "en" ? "Dispatch History" : language == "si" ? "යවන ලද ප්‍රමාණ" : ""}</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker onChange={(date) => setStartDate(moment(date).format('YYYY-MM-DD'))} placeholder={language == "en" ? "Start Date" : language == "si" ? "ආරම්භක දිනය" : ""} style={{ width: '100%' }} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker onChange={(date) => setEndDate(moment(date).format('YYYY-MM-DD'))} placeholder={language == "en" ? "End Date" : language == "si" ? "අවසන් දිනය" : ""} style={{ width: '100%' }} />
        </Col>
      </Row>

      <Table
        dataSource={filteredDispatchHistory}
        columns={columns}
        scroll={{ x: 'max-content' }}
        style={{
          marginBottom: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        pagination={false}
      />

      <div style={{ textAlign: 'center' }}>
        <Button
          type="primary"
          style={{
            backgroundColor: '#FFA500',
            borderColor: '#FFA500',
            color: 'white',
            width: '200px',
            borderRadius: '8px',
            marginBottom: '12px',
          }}
          onClick={() => navigate('/mlowner/home')}
        >
          {language == "en" ? 'Back to Home' : language == "si" ? 'ආපසු' : ''}
        </Button>
      </div>
    </div>
  );
};

export default History;

import React, { useState, useEffect } from 'react';
import { Table, Row, Col, DatePicker, Button } from 'antd';
import { Link } from 'react-router-dom'; // for navigation
import moment from 'moment'; // For date formatting
import axios from 'axios'; // Make sure to install axios or use any other method for fetching data

const History = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dispatchHistory, setDispatchHistory] = useState([]);

  // Fetch dispatch history from the API
  useEffect(() => {
    const fetchDispatchHistory = async () => {
      try {
        const username = "@achinthamihiran"; // Replace with actual username
        const password = "Ab2#*De#"; // Replace with actual password

        const response = await axios.get('/api/projects/dispatching-history/issues.json', {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        });

        console.log('API Response:', response); // Log the entire response to inspect its structure

        if (response.data && response.data.issues) {
          const issues = response.data.issues;

          const formattedDispatchHistory = issues.map((issue) => {
            const customFields = issue.custom_fields.reduce((acc, field) => {
              acc[field.name] = field.value;
              return acc;
            }, {});

            return {
              licenseNumber: customFields['License Number'] || '',
              owner: customFields['Owner Name'] || '', // Use the Owner Name directly from backend
              location: customFields['Location'] || '',
              cubes: customFields['Cubes'] || '',
              dispatchDate: customFields['Dispatched Date'] || '',
              lorryDriverContact: customFields['Driver Contact'] || '',
            };
          });

          setDispatchHistory(formattedDispatchHistory);
        } else {
          console.error('No issues found in the response');
        }
      } catch (error) {
        console.error('Error fetching dispatch history:', error);
        // If the response is HTML, it's possible the URL or authentication is wrong.
        if (error.response && error.response.data) {
          console.error('Received HTML response:', error.response.data);
        }
      }
    };

    fetchDispatchHistory();
  }, []); // Empty dependency array means this will run only once on component mount

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
      title: 'License Number',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: 'Lorry Driver Contact Number',
      dataIndex: 'lorryDriverContact',
      key: 'lorryDriverContact',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Cubes',
      dataIndex: 'cubes',
      key: 'cubes',
    },
    {
      title: 'Dispatch Date',
      dataIndex: 'dispatchDate',
      key: 'dispatchDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dispatch History</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker onChange={handleStartDateChange} placeholder="Start Date" style={{ width: '100%' }} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker onChange={handleEndDateChange} placeholder="End Date" style={{ width: '100%' }} />
        </Col>
      </Row>

      <Table
        dataSource={filteredDispatchHistory}
        columns={columns}
        scroll={{ x: 'max-content' }} // Enable horizontal scroll for small screens
        style={{
          marginBottom: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
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
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default History;

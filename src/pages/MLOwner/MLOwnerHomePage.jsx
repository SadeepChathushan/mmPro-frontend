import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Row, Col, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for API requests
import { useLanguage } from "../../contexts/LanguageContext";

const { Title } = Typography;

const MLOwnerHomePage = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);

  // Table columns
  const columns = [
    {
      title: `${language == "en" ? 'LICENSE NUMBER' : 'බලපත්‍ර අංකය'}`,
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    { title: `${language == "en" ? 'OWNER' : 'අයිතිකරු'}`, dataIndex: 'owner', key: 'owner' },
    { title: `${language == "en" ? 'LOCATION' : 'ස්ථානය'}`, dataIndex: 'location', key: 'location' },
    { title: `${language == "en" ? 'START DATE' : 'ආරම්භක දිනය'}`, dataIndex: 'startDate', key: 'startDate' },
    { title: `${language == "en" ? 'VALID TILL' : 'අවලංගු වන දිනය'}`, dataIndex: 'endDate', key: 'endDate' },
    { title: `${language == "en" ? 'CAPACITY (CUBES)' : 'කියුබ් ගණන'}`, dataIndex: 'capacity', key: 'capacity' },
    {
      title: `${language == "en" ? 'USED' : 'භාවිතය'}`,
      dataIndex: 'used',
      key: 'used',
      render: (text) => (
        <span style={{ color: 'red' }}>{text}</span>
      ),
    },
    {
      title: `${language == "en" ? 'REMAINING' : 'ඉතිරි'}`,
      dataIndex: 'remaining',
      key: 'remaining',
      render: (text) => (
        <span style={{ color: 'green' }}>{text}</span>
      ),
    },
    {
      title: `${language == "en" ? 'STATUS' : 'තත්වය'}`,
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span style={{ color: text === 'ACTIVE' ? 'green' : 'red' }}>{text}</span>
      ),
    },
    {
      title: `${language == "en" ? 'ROYALTY (SAND) DUE' : 'රෝයල්ටි'}`,
      dataIndex: 'royalty',
      key: 'royalty',
      render: (text) => (
        <span style={{ color: 'blue' }}>{text}</span>
      ),
    },
    {
      title: `${language == "en" ? 'ACTION' : 'ක්‍රියාමාර්ග'}`,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Dispatch Load Button */}
          <Link to="/mlowner/home/dispatchload">
            <Button 
              style={{ 
                backgroundColor: '#FFA500', 
                borderColor: '#FFA500', 
                borderRadius: '10%' 
              }}
              disabled={record.status === 'INACTIVE' || record.remaining === 0}  // Disable if Inactive or Remaining cubes = 0
              title={record.status === 'INACTIVE' || record.remaining === 0 ? "Cannot dispatch: License inactive or no remaining cubes" : "Dispatch Load"}
            >
              {language == "en" ? "Dispatch Load" : "යවන ලද ප්‍රමාණය"}
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "@achinthamihiran"; // Replace with actual username
        const password = "Ab2#*De#"; // Replace with actual password

        const response = await axios.get('/api/projects/gsmb-officer/issues.json', {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username,
            password,
          },
        });

        // Filter issues with tracker name 'ML'
        const filteredData = response.data.issues.filter(issue => issue.tracker.name === 'ML').map(issue => ({
          licenseNumber: issue.custom_fields.find(field => field.name === 'License Number')?.value,
          owner: issue.custom_fields.find(field => field.name === 'Owner Name')?.value,
          location: issue.custom_fields.find(field => field.name === 'Location')?.value,
          startDate: issue.custom_fields.find(field => field.name === 'Start Date')?.value,
          endDate: issue.custom_fields.find(field => field.name === 'End Date')?.value,
          capacity: 100, // Example value, replace as needed
          used: 20, // Example value, replace as needed
          remaining: 80, // Example value, replace as needed
          status: 'ACTIVE', // Example value, replace as needed
          royalty: '45265.20', // Example value, replace as needed
        }));

        setData(filteredData); // Set filtered data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div style={{ backgroundColor: '#f0f2f5', height: '100%' }}>
      <div style={{ padding: '24px' }}>
        <Row gutter={16} justify="space-between" align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            <Input
              placeholder={language == "en" ? "Search" : "සොයන්න"}
              prefix={<SearchOutlined />}
              style={{
                width: '100%',
                borderRadius: '4px',
                padding: '8px 16px',
              }}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: 'center', marginTop: '16px' }}>
            <Link to="/mlowner/home/viewlicenses">
              <Button
                type="primary"
                style={{
                  backgroundColor: '#a52a2a',  
                  color: 'white',
                  borderColor: '#a52a2a',  
                  borderRadius: '8px',
                  width: '100%',  
                  marginBottom: '12px',  
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#a52a2a'}
              >
                {language == "en" ? "View Licenses" : "බලපත්‍ර බලන්න"}
              </Button>
            </Link>

            <Link to="/mlowner/history">
              <Button
                type="primary"
                style={{
                  backgroundColor: '#a52a2a',  
                  color: 'white',
                  borderColor: '#a52a2a',  
                  borderRadius: '8px',
                  width: '100%',  
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#a52a2a'}
              >
                {language == "en" ? "View History" : "පෙර යවන ලද ප්‍රමාණ බලන්න"}
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '24px',
          }}
          scroll={{ x: 'max-content' }}  
        />
      </div>
    </div>
  );
};

export default MLOwnerHomePage;

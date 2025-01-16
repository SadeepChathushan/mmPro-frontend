import React from 'react';
import { Button, Input, Table, Row, Col, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const MLOwnerHomePage = () => {
  // Table columns
  const columns = [
    {
      title: 'LICENSE NUMBER',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    { title: 'OWNER', dataIndex: 'owner', key: 'owner' },
    { title: 'LOCATION', dataIndex: 'location', key: 'location' },
    { title: 'START DATE', dataIndex: 'startDate', key: 'startDate' },
    { title: 'VALID TILL', dataIndex: 'endDate', key: 'endDate' },
    { title: 'CAPACITY (CUBES)', dataIndex: 'capacity', key: 'capacity' },
    {
      title: 'USED',
      dataIndex: 'used',
      key: 'used',
      render: (text) => (
        <span style={{ color: 'red' }}>{text}</span>
      ),
    },
    {
      title: 'REMAINING',
      dataIndex: 'remaining',
      key: 'remaining',
      render: (text) => (
        <span style={{ color: 'green' }}>{text}</span>
      ),
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <span style={{ color: text === 'ACTIVE' ? 'green' : 'red' }}>{text}</span>
      ),
    },
    {
      title: 'ROYALTY (SAND) DUE',
      dataIndex: 'royalty',
      key: 'royalty',
      render: (text) => (
        <span style={{ color: 'blue' }}>{text}</span>
      ),
    },
    {
      title: 'ACTION',
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
              Dispatch Load
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Table data
  const data = [
    {
      licenseNumber: 'IML/B/TEST/5178/LRS',
      owner: 'Jayantha Perera',
      location: 'Rathnapura',
      capacity: 100,
      used: 20,
      remaining: 80,
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      status: 'ACTIVE',
      royalty: '45265.20',
    },
    {
      licenseNumber: 'IML/B/TEST/5178/LRS',
      owner: 'Jayantha Perera',
      location: 'Rathnapura',
      capacity: 100,
      used: 100,
      remaining: 0,
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      status: 'INACTIVE',
      royalty: '45265.20',
    },
  ];

  return (
    <div style={{ backgroundColor: '#f0f2f5',  height: '100%'  }}>
      {/* Image centered in mobile view */}
      {/* <img 
        src="https://th.bing.com/th/id/OIP.lXqWzX4gCjamrXtOz172qAHaHa?rs=1&pid=ImgDetMain" 
        alt="Logo" 
        style={{
          width: '80px', 
          height: '80px', 
          borderRadius: '50%',  // Round effect for the image
          display: 'block', 
          margin: '0 auto', // Center the image horizontally
          // Make it responsive for mobile screens
          '@media (max-width: 768px)': {
            marginBottom: '20px', // Add margin below on smaller screens for spacing
          },
        }} 
      /> */}
      {/* Content Section */}
      <div style={{ padding: '24px' }}>
        <Row gutter={16} justify="space-between" align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            {/* Image with round effect and proper sizing */}

            <Input
              placeholder="Search"
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
                  backgroundColor: '#a52a2a',  // Initial color (brownish)
                  color: 'white',
                  borderColor: '#a52a2a',  // Match the border with the background color
                  borderRadius: '8px',
                  width: '100%',  // Full width on mobile
                  marginBottom: '12px',  // Spacing between buttons
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#a52a2a'}
              >
                View Licenses
              </Button>
            </Link>

            <Link to="/mlowner/history">
              <Button
                type="primary"
                style={{
                  backgroundColor: '#a52a2a',  // Initial color (brownish)
                  color: 'white',
                  borderColor: '#a52a2a',  // Match the border with the background color
                  borderRadius: '8px',
                  width: '100%',  // Full width on mobile
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#a52a2a'}
              >
                View History
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
          scroll={{ x: 'max-content' }}  // Ensure table scrolls horizontally on small screens
        />
      </div>
    </div>
  );
};

export default MLOwnerHomePage;

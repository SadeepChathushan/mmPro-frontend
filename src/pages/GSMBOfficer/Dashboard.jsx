import React from 'react';
import { Button, Input, Table, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Table columns
  const columns = [
    { title: 'LICENSE NUMBER', dataIndex: 'licenseNumber', key: 'licenseNumber' },
    { title: 'OWNER NAME', dataIndex: 'ownerName', key: 'ownerName' },
    { title: 'LOCATION', dataIndex: 'location', key: 'location' },
    { title: 'CAPACITY (CUBES)', dataIndex: 'capacity', key: 'capacity' },
    {
      title: 'Action',
      key: 'action',
      render: () => <Button type="link" style={{ color: '#FFA500' }}>View</Button>
    },
  ];

  // Table data
  const data = [
    { licenseNumber: '01 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
    { licenseNumber: '02 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
    { licenseNumber: '01 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
    { licenseNumber: '02 IML/B/TEST/1578/LRS', ownerName: 'Jayantha Perera', location: 'Rathnapura', capacity: 100 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f2f5' }}>
      {/* Content Section */}
      <div style={{ padding: '24px' }}>
        <Row gutter={16} justify="space-between" align="middle">
          <Col span={12}>
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              style={{ width: '100%', borderRadius: '4px', padding: '8px 16px' }}
            />
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Link to="/register-owner">
              <Button
                type="primary"
                style={{
                  backgroundColor: '#950C33',
                  color: 'white',
                  borderColor: '#950C33',
                  padding: '10px 24px',
                  fontSize: '16px',
                  marginRight: '8px',
                }}
                className="hover:bg-[#8B0A2E]"
              >
                Register New Owner
              </Button>
            </Link>
            <Link to="/add-license">
              <Button
                type="default"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#d9d9d9',
                  color: '#595959',
                  padding: '10px 24px',
                  fontSize: '16px',
                }}
                className="hover:bg-[#f5f5f5]"
              >
                + Add New License
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
        />
      </div>

      {/* Footer Section */}
      <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0f2f5' }}>
        <img src="/path-to-your-logo.png" alt="logo" style={{ width: '48px' }} />
      </div>
    </div>
  );
};

export default Dashboard;

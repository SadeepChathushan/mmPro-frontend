import React, { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Typography, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TabPane } = Tabs;

const Appointments = () => {
  // Sample appointments data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      mlOwner: 'ABC Mining Co.',
      gsmbOfficer: 'John Smith',
      location: 'Pit 3, Sector B',
      cubeCount: 1500,
      status: 'pending',
      date: '2023-06-15'
    },
    {
      id: 2,
      mlOwner: 'XYZ Minerals',
      gsmbOfficer: 'Sarah Johnson',
      location: 'North Field',
      cubeCount: 2300,
      status: 'approved',
      date: '2023-06-10'
    },
    {
      id: 3,
      mlOwner: 'Global Resources',
      gsmbOfficer: 'Michael Brown',
      location: 'Southwest Zone',
      cubeCount: 1800,
      status: 'rejected',
      date: '2023-06-05'
    },
    {
      id: 4,
      mlOwner: 'Mineral Corp',
      gsmbOfficer: 'Emma Wilson',
      location: 'Eastern Block',
      cubeCount: 3200,
      status: 'pending',
      date: '2023-06-18'
    },
    {
      id: 5,
      mlOwner: 'Ore Ltd',
      gsmbOfficer: 'David Lee',
      location: 'Central Pit',
      cubeCount: 2100,
      status: 'approved',
      date: '2023-06-12'
    }
  ]);

  // Filter appointments by status
  const pendingAppointments = appointments.filter(app => app.status === 'pending');
  const approvedAppointments = appointments.filter(app => app.status === 'approved');
  const rejectedAppointments = appointments.filter(app => app.status === 'rejected');

  // Columns for the appointments table
  const columns = [
    {
      title: 'ML Owner',
      dataIndex: 'mlOwner',
      key: 'mlOwner'
    },
    {
      title: 'GSMB Officer',
      dataIndex: 'gsmbOfficer',
      key: 'gsmbOfficer'
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: 'Cube Count',
      dataIndex: 'cubeCount',
      key: 'cubeCount',
      render: count => `${count} m³`
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => viewAppointmentDetails(record.id)}>
          View Details
        </Button>
      )
    }
  ];

  const viewAppointmentDetails = (id) => {
    // Navigate to appointment details page
    console.log('Viewing appointment:', id);
  };

  const createNewAppointment = () => {
    // Open modal or navigate to create appointment page
    console.log('Creating new appointment');
  };

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="appointments-page">
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>Appointments</Title>
        </Col>
        <Col>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={createNewAppointment}
          >
            New Appointment
          </Button>
        </Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="pending">
          <TabPane 
            tab={`Pending (${pendingAppointments.length})`} 
            key="pending"
          >
            <Table 
              columns={[
                ...columns,
                {
                  title: 'Status Action',
                  key: 'statusAction',
                  render: (_, record) => (
                    <div>
                      <Button 
                        type="link" 
                        style={{ color: 'green' }}
                        onClick={() => handleStatusChange(record.id, 'approved')}
                      >
                        Approve
                      </Button>
                      <Button 
                        type="link" 
                        danger
                        onClick={() => handleStatusChange(record.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  )
                }
              ]} 
              dataSource={pendingAppointments} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane 
            tab={`Approved (${approvedAppointments.length})`} 
            key="approved"
          >
            <Table 
              columns={columns} 
              dataSource={approvedAppointments} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          
          <TabPane 
            tab={`Rejected (${rejectedAppointments.length})`} 
            key="rejected"
          >
            <Table 
              columns={columns} 
              dataSource={rejectedAppointments} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Appointments;
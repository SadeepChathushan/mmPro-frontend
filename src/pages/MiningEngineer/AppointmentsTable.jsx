import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popover, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import StatusActions from './StatusActions';
import moment from 'moment';
import { getMeAwatingList } from '../../services/miningEngineerService';
import { 
  EnvironmentOutlined, 
  CompassOutlined,
  PushpinOutlined,
  GlobalOutlined,
  AimOutlined
} from '@ant-design/icons';

const AppointmentsTable = ({ 
  
  activeTab, 
  onViewDetails, 
  onShowApproval,
  onHold,
  onReject,
  onDateChange
}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await getMeAwatingList();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [activeTab]); 

  const columns = [
    {
      title: 'ML Owner',
      dataIndex: 'assigned_to',
      key: 'mlOwner'
    },
    {
      title: 'GSMB Officer',
      dataIndex: 'gsmbOfficer',
      key: 'gsmbOfficer'
    },
    {
      title: 'Location',
      dataIndex: 'Google_location',
      key: 'location',
      render: (location) => (
        <Space>
          <EnvironmentOutlined style={{ 
            color: '#52c41a', 
            fontSize: '18px',
            background: '#f6ffed',
            padding: '4px',
            borderRadius: '50%'
          }} />
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#389e0d' }}
          >
            View on Map
          </a>
        </Space>
      )
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
        <Button type="link" onClick={() => onViewDetails(record)}>
          View Details
        </Button>
      )
    }
  ];

  if (activeTab === 'pending') {
    columns.splice(columns.length - 1, 0, {
      title: 'Set Date',
      key: 'setDate',
      render: (_, record) => (
        <Popover 
          content={(
            <Space>
              <DatePicker 
                defaultValue={record.date ? moment(record.date, 'YYYY-MM-DD') : null}
                onChange={(date, dateString) => onDateChange(record.id, date, dateString)}
                style={{ marginRight: 8 }}
              />
              <Button 
                type="primary" 
                onClick={() => onShowApproval(record.id)}
              >
                Confirm
              </Button>
            </Space>
          )} 
          title="Select Appointment Date"
          trigger="click"
        >
          <Button icon={<CalendarOutlined />}>Set Date</Button>
        </Popover>
      )
    });
  }

  if (activeTab === 'approved') {
    columns.splice(columns.length - 1, 0, {
      title: 'Actions',
      key: 'statusActions',
      render: (_, record) => (
        <StatusActions 
          record={record} 
          onApprove={onShowApproval}
          onHold={onHold}
          onReject={onReject}
        />
      )
    });
  }

  return (
    <Table 
      columns={columns} 
      dataSource={appointments} 
      rowKey="id"
      pagination={{ pageSize: 5 }}
    />
  );
};

export default AppointmentsTable;

import React from 'react';
import { Table, Space, Button, Popover, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import StatusActions from './StatusActions';
import moment from 'moment';

const AppointmentsTable = ({ 
  appointments, 
  activeTab, 
  onViewDetails, 
  onShowApproval,
  onHold,
  onReject,
  onDateChange
}) => {
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
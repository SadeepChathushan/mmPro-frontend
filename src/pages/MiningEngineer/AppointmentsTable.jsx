import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Popover, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import StatusActions from './StatusActions';
import moment from 'moment';

import { useLanguage } from "../../contexts/LanguageContext";

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

  const { language } = useLanguage();

  const columns = [
    {
      title: language === "en"
        ? "ML Owner"
        : language === "si"
          ? ""
          : "ML உரிமையாளர்",
      dataIndex: 'mlOwner',

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
      title: language === "en"
  ? "GSMB Officer"
  : language === "si"
  ? ""
  : "GSMB அதிகாரி",
      dataIndex: 'gsmbOfficer',
      key: 'gsmbOfficer'
    },
    {

      title: language === "en"
  ? "Location"
  : language === "si"
  ? ""
  : "இடம்",
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: language === "en"
      ? "Cube Count"
      : language === "si"
      ? ""
      : "கனசதுரங்களின் எண்ணிக்கை",
      dataIndex: 'cubeCount',
      key: 'cubeCount',
      render: count => `${count} m³`

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
      title: language === "en"
      ? "Date"
      : language === "si"
      ? ""
      : "திகதி",
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: language === "en"
  ? "Action"
  : language === "si"
  ? " "
  : "நடவடிக்கை",
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => onViewDetails(record)}>
          {language === "en" 
  ? "View Details" 
  : language === "si" 
  ? "" 
  : "விவரங்களை பார்வையிட"}
        </Button>
      )
    }
  ];

  if (activeTab === 'pending') {
    columns.splice(columns.length - 1, 0, {
      title: language === "en"
  ? "Set Date"
  : language === "si"
  ? ""
  : "திகதி அமைக்கவும்",
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
               {language === "en" 
  ? "Confirm" 
  : language === "si" 
  ? "" 
  : "உறுதிப்படுத்தவும்"}
              </Button>
            </Space>
          )}
          title={
            language === "en"
              ? "Select Appointment Date"
              : language === "si"
              ? ""
              : "சந்திப்பு திகதியை தேர்வு செய்யவும்"
          }
          trigger="click"
        >
          <Button icon={<CalendarOutlined />}>{language === "en" 
  ? "Set Date" 
  : language === "si" 
  ? "" 
  : "திகதியை அமைக்கவும்"}</Button>
        </Popover>
      )
    });
  }

  if (activeTab === 'approved') {
    columns.splice(columns.length - 1, 0, {
      title: language === "en"
  ? "Action"
  : language === "si"
  ? " "
  : "நடவடிக்கை",
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

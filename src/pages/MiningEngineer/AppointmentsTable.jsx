import React from 'react';
import { Table, Space, Button, Popover, DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import StatusActions from './StatusActions';
import moment from 'moment';
import { useLanguage } from "../../contexts/LanguageContext";


const AppointmentsTable = ({
  appointments,
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
import React, { useState, useEffect } from 'react';
import { Table, Row, Col, DatePicker, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

const Licenses = () => {
  const [tableData, setTableData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [expiryDate, setEndDate] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = '@achinthamihiran';
        const password = 'Ab2#*De#';

        const response = await axios.get(
          '/api/projects/new-license/issues.json',
          {
            headers: {
              'Content-Type': 'application/json',
            },
            auth: {
              username,
              password,
            },
          }
        );

        const transformedData = response.data.issues.map((issue) => ({
          licenseId: issue.id,
          licenseNumber: issue.custom_fields.find((field) => field.name === 'License Number')?.value || 'N/A',
          ownerName: issue.custom_fields.find((field) => field.name === 'Owner Name')?.value || 'N/A',
          location: issue.custom_fields.find((field) => field.name === 'Location')?.value || 'N/A',
          capacity: issue.custom_fields.find((field) => field.name === 'Capacity')?.value || 'N/A',
          startDate: issue.custom_fields.find((field) => field.name === 'Stare Date')?.value || 'N/A',
          expiryDate: issue.custom_fields.find((field) => field.name === 'End Date')?.value || 'N/A',
          mobile: issue.custom_fields.find((field) => field.name === 'Mobile Number')?.value || '',
        }));

        setTableData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStartDateChange = (date) => {
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const filteredLicenses = tableData.filter((license) => {
    if (startDate && expiryDate) {
      const licenseStartDate = moment(license.startDate, 'YYYY-MM-DD');
      const licenseEndDate = moment(license.expiryDate, 'YYYY-MM-DD');
      return (
        licenseStartDate.isSameOrAfter(moment(startDate)) &&
        licenseEndDate.isSameOrBefore(moment(expiryDate))
      );
    } else {
      return true; // Show all licenses if no dates are selected
    }
  });

  const getStatus = (expiryDate) => {
    return moment(expiryDate, 'YYYY-MM-DD').isAfter(moment()) ? 'ACTIVE' : 'INACTIVE';
  };

  const columns = [
    {
      title: 'License Number',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: 'Owner',
      dataIndex: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => <span>{moment(text, 'YYYY-MM-DD').format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'End Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      render: (text) => <span>{moment(text, 'YYYY-MM-DD').format('YYYY-MM-DD')}</span>,
    },
    {
      title: 'Status',
      key: 'status',
      render: (text, record) => (
        <span style={{ color: getStatus(record.expiryDate) === 'ACTIVE' ? 'green' : 'red' }}>
          {getStatus(record.expiryDate)}
        </span>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Licenses of MLOwner</h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleStartDateChange}
            placeholder="Start Date"
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder="End Date"
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      <Table
        dataSource={filteredLicenses}
        columns={columns}
        rowKey="licenseId"
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
        <Link to="/mlowner/home/">
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

export default Licenses;

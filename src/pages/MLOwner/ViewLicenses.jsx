import React, { useState, useEffect } from 'react';
import { Table, Row, Col, DatePicker, Button, Input, AutoComplete, Space, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from "../../contexts/LanguageContext";
import moment from 'moment';

const { Title } = Typography;

const Licenses = () => {
  const { language } = useLanguage();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [licenses, setLicenses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredLicenses, setFilteredLicenses] = useState([]);

  // Function to fetch licenses data
  const fetchLicenses = async () => {
    try {
      const username = "@achinthamihiran"; // Replace with actual username
      const password = "Ab2#*De#"; // Replace with actual password

      const response = await axios.get('/api/projects/gsmb/issues.json', {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username,
          password,
        },
      });

      if (response.data && response.data.issues) {
        const issues = response.data.issues;

        // Map the API data to the table format
        const formattedLicenses = issues.map((issue) => {
          const customFields = issue.custom_fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
          }, {});

          const startDate = customFields['Start Date'] || '';
          const endDate = customFields['End Date'] || '';
          const dueDate = issue.due_date;

          // Check if the license is active or inactive based on the due date
          const currentDate = new Date();
          const isActive = currentDate <= new Date(dueDate); // Active if current date is before or on the due date

          return {
            licenseNumber: issue.custom_fields.find(field => field.name === 'License Number')?.value,
            owner: issue.custom_fields.find(field => field.name === 'Owner Name')?.value,
            location: issue.custom_fields.find(field => field.name === 'Address')?.value, // Using Address for location
            startDate: issue.start_date,
            endDate: issue.due_date,
            capacity: issue.custom_fields.find(field => field.name === 'Capacity')?.value,
            dispatchedCubes: issue.custom_fields.find(field => field.name === 'Used')?.value, // Mapped to Used for dispatched cubes
            remainingCubes: issue.custom_fields.find(field => field.name === 'Remaining')?.value, // Using Remaining field for cubes
            royalty: issue.custom_fields.find(field => field.name === 'Royalty(sand)due')?.value, // Added royalty mapping
            status: isActive ? 'Active' : 'Inactive', // Active if current date is before or on the due date
          };
        });

        setLicenses(formattedLicenses);
        setFilteredLicenses(formattedLicenses);
      } else {
        console.error('No issues found in the response');
      }
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  };

  // Fetch licenses when the component mounts
  useEffect(() => {
    fetchLicenses();
  }, []);

  // Handle date changes
  const handleStartDateChange = (date) => {
    setStartDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date ? moment(date).format('YYYY-MM-DD') : null);
  };

  // Handle search input change
  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredResults = licenses.filter(item =>
        item.licenseNumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLicenses(filteredResults);
    } else {
      setFilteredLicenses(licenses); // Reset to show all data if search text is empty
    }
  };

  // Filter the licenses based on the selected date range
  const filteredLicensesByDate = filteredLicenses.filter((license) => {
    if (startDate && endDate) {
      const licenseStartDate = new Date(license.startDate);
      const licenseEndDate = new Date(license.endDate);
      return (
        licenseStartDate >= new Date(startDate) && licenseEndDate <= new Date(endDate)
      );
    } else {
      return true; // Show all licenses if no dates are selected
    }
  });

  // Define columns for the table
  const columns = [
    {
      title: `${language === "en" ? 'License Number' : 'බලපත්‍ර අංකය'}`,
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: `${language === "en" ? 'Owner' : 'අයිතිකරු'}`,
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: `${language === "en" ? 'Location' : 'ස්ථානය'}`,
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: `${language === "en" ? 'Start Date' : 'ආරම්භක දිනය'}`,
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: `${language === "en" ? 'Due Date' : 'අවලංගු වන දිනය'}`,
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>,
    },
    {
      title: `${language === "en" ? 'Status' : 'තත්වය'}`,
      key: 'status',
      render: (text, record) => (
        <span style={{ color: record.status === 'Active' ? 'green' : 'red' }}>
          {record.status}
        </span>
      ),
    },
    {
      title: `${language === "en" ? 'Action' : 'ක්‍රියාමාර්ග'}`,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
            <Button
              type="primary"
              disabled={record.status === 'Inactive'}  // Disable if the license is inactive
              style={{
                backgroundColor: record.status === 'Inactive' ? '#d9d9d9' : '#FFA500', // Gray out the button if inactive
                borderColor: '#FFA500',
                color: record.status === 'Inactive' ? '#888' : 'white',  // Adjust text color
                width: '200px',
                borderRadius: '8px',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = record.status === 'Inactive' ? '#d9d9d9' : '#FFA500'}
            >
              {language === "en" ? "Dispatch Load" : "ලෝඩ් ප්‍රිථිලි"}
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px', backgroundColor: '#f0f2f5' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {language === "en" ? 'Licenses of MLOwner' : 'MLOwner හි බලපත්‍ර'}
      </h1>

      <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleStartDateChange}
            placeholder={language === "en" ? "Start Date" : "ආරම්භක දිනය"}
            style={{ width: '100%' }} // Ensures the width is consistent
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <DatePicker
            onChange={handleEndDateChange}
            placeholder={language === "en" ? "Due Date" : "අවසාන දිනය"}
            style={{ width: '100%' }} // Ensures the width is consistent
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AutoComplete
            value={searchText}
            onSearch={handleSearch}
            style={{ width: '100%' }} // Ensures the width is consistent with DatePickers
            options={filteredLicenses.map(result => ({
              value: result.licenseNumber,
            }))}
          >
            <Input
              prefix={<SearchOutlined />}
              placeholder={language === "en" ? "Search by License Number" : "සොයන්න"}
              style={{ width: '100%' }} // Ensures the width is consistent with DatePickers
            />
          </AutoComplete>
        </Col>
      </Row>

      <Table
        dataSource={filteredLicensesByDate}
        columns={columns}
        scroll={{ x: 'max-content' }} // Enable horizontal scroll for small screens
        style={{
          marginBottom: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
        pagination={false}
      />

      {/* Back to Home Button */}
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
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFA500'}
          >
            {language === "en" ? "Back to Home" : "ආපසු"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Licenses;

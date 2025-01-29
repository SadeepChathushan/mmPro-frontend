import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Typography, Row, Col, AutoComplete, Input } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";
import authService from '../../services/authService';
import MLOService from '../../services/MLOService';
import "../../styles/MLOwner/MLOwnerHomePage.css";

const { Title } = Typography;

const MLOwnerHomePage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [licenseNumberQuery, setLicenseNumberQuery] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const licenseNumber = queryParams.get('licenseNumber');
    if (licenseNumber) {
      setLicenseNumberQuery(licenseNumber);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = localStorage.getItem("API_Key");
        if (!apiKey) {
          console.error("API Key not found in localStorage");
          return;
        }

        const projects = await MLOService.fetchProjects(apiKey);
        let mappedData = MLOService.mapProjectData(projects);

        if (user && user.firstname && user.lastname) {
          const fullName = `${user.firstname} ${user.lastname}`;
          mappedData = mappedData.filter(item => item.owner === fullName);
        }

        const sortedData = mappedData.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        const recentActiveData = sortedData.slice(0, 5);

        setData(recentActiveData);
        setFilteredData(recentActiveData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredResults = data.filter(item =>
        item.licenseNumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(data);
    }
  };

  const columns = [
    { title: 'LICENSE NUMBER', dataIndex: 'licenseNumber', key: 'licenseNumber' },
    { title: 'OWNER', dataIndex: 'owner', key: 'owner' },
    { title: 'LOCATION', dataIndex: 'location', key: 'location' },
    { title: 'START DATE', dataIndex: 'startDate', key: 'startDate' },
    { title: 'DUE DATE', dataIndex: 'dueDate', key: 'dueDate' },
    { title: 'CAPACITY (CUBES)', dataIndex: 'capacity', key: 'capacity' },
    { title: 'DISPATCHED (CUBES)', dataIndex: 'dispatchedCubes', key: 'dispatchedCubes' },
    { title: 'REMAINING (CUBES)', dataIndex: 'remainingCubes', key: 'remainingCubes' },
    { title: 'ROYALTY(SAND) DUE [RS.]', dataIndex: 'royalty', key: 'royalty' },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const isActive = new Date() <= new Date(record.dueDate);
        return <span style={{ color: isActive ? 'green' : 'red' }}>{isActive ? 'Active' : 'Inactive'}</span>;
      },
    },
    {
      title: 'ACTION',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
            <Button style={{ backgroundColor: '#FFA500' }} disabled={parseInt(record.remainingCubes, 10) === 0 || new Date(record.dueDate) < new Date()}>
              Dispatch Load
            </Button>
          </Link>
          <Link to={{ pathname: "/mlowner/history", search: `?licenseNumber=${record.licenseNumber}` }}>
            <Button style={{ backgroundColor: '#0066cc' }}>History</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <Row gutter={16} justify="space-between" align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            <AutoComplete
              value={searchText}
              onSearch={handleSearch}
              style={{ width: '100%', borderRadius: '4px', padding: '8px 16px' }}
              options={filteredData.map(result => ({
                value: result.licenseNumber,
              }))}
            >
              <Input
                prefix={<SearchOutlined />}
                placeholder="Search License Number"
              />
            </AutoComplete>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} className="search-col">
            <Link to="/mlowner/home/viewlicenses">
              <Button
                type="primary"
                className="view-licenses-button"
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(211, 153, 61)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#a52a2a'}
              >
                View Licenses
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          className="table-container"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default MLOwnerHomePage;
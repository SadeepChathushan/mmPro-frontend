import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Row, Col, Space, Typography, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from "../../contexts/LanguageContext";
import authService from '../../services/authService';
import apiService from '../../services/MLOServices'; // Import the new service
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

  const columns = [
    // Define your columns here (no changes required)
  ];

  // Fetch data from API using the new apiService
  useEffect(() => {
    const fetchData = async () => {
      const apiKey = localStorage.getItem("API_Key");

      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return;
      }

      try {
        const issues = await apiService.fetchData(apiKey);

        let mappedData = issues
          .filter(issue => {
            const capacity = issue.custom_fields.find(field => field.name === 'Capacity')?.value;
            return issue.tracker.name === "ML" && (parseInt(capacity, 10) >= 0);
          })
          .map(issue => {
            const currentDate = new Date();
            const dueDate = new Date(issue.due_date);
            const isActive = currentDate <= dueDate;

            return {
              licenseNumber: issue.custom_fields.find(field => field.name === 'License Number')?.value,
              owner: issue.custom_fields.find(field => field.name === 'Owner Name')?.value,
              location: issue.custom_fields.find(field => field.name === 'Location')?.value,
              startDate: issue.start_date,
              dueDate: issue.due_date,
              capacity: issue.custom_fields.find(field => field.name === 'Capacity')?.value,
              dispatchedCubes: issue.custom_fields.find(field => field.name === 'Used')?.value,
              remainingCubes: issue.custom_fields.find(field => field.name === 'Remaining')?.value,
              royalty: issue.custom_fields.find(field => field.name === 'Royalty(sand)due')?.value,
              status: issue.status.name,
            };
          });

        mappedData = mappedData.filter(item => item.status === 'Valid');

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
                placeholder={language === "en" ? "Search License Number" : language == 'si' ? "සොයන්න" : 'தேடல் உரிம எண்'}
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
                {language === "en" ? "View Licenses" : language == 'si' ? "බලපත්‍ර බලන්න" : ""}
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

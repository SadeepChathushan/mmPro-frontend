import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Row, Col, Space, Typography, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from "../../contexts/LanguageContext";
import authService from '../../services/authService';
import "../../styles/MLOwner/MLOwnerHomePage.css";

 // Import the CSS file

const { Title } = Typography;

const MLOwnerHomePage = () => {
  const { language } = useLanguage();
  const location = useLocation(); // Get the current location (which includes the search query)
  const [data, setData] = useState([]); // All data fetched from API
  const [filteredData, setFilteredData] = useState([]); // Filtered data for table display
  const [searchText, setSearchText] = useState(""); // State to handle search input
  const [licenseNumberQuery, setLicenseNumberQuery] = useState(""); // Store the license number from query
  const [user, setUser] = useState(null); // State to store the logged-in user

  // Fetch the current logged-in user from local storage or auth service
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Get the license number from the URL query (if any)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const licenseNumber = queryParams.get('licenseNumber');
    if (licenseNumber) {
      setLicenseNumberQuery(licenseNumber); // Set the license number from the URL query
    }
  }, [location.search]);

  // Table columns
  const columns = [
    {
      title: `${language === "en" ? 'LICENSE NUMBER' : language == "si" ? 'බලපත්‍ර අංකය' : 'உரிம எண்'}`,
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
      render: (text) => <span style={{ fontWeight: 'bold' }}>{text}</span>,
    },
    { title: `${language === "en" ? 'OWNER' : language == "si" ? 'අයිතිකරු' : 'உரிமையாளர்'}`, dataIndex: 'owner', key: 'owner' },
    { title: `${language === "en" ? 'LOCATION' : language == "si" ? 'ස්ථානය' : 'இடம்'}`, dataIndex: 'location', key: 'location' },
    { title: `${language === "en" ? 'START DATE' : language == "si" ? 'ආරම්භක දිනය' : 'தொடக்க தேதி'}`, dataIndex: 'startDate', key: 'startDate' },
    { title: `${language === "en" ? 'DUE DATE' : language == "si" ? 'අවශ්‍ය වන දිනය' : 'இறுதி தேதி'}`, dataIndex: 'dueDate', key: 'dueDate' },
    { title: `${language === "en" ? 'CAPACITY (CUBES)' : language == "si" ? 'කියුබ් ගණන (CUBES)' : 'திறன் (CUBES)'}`, dataIndex: 'capacity', key: 'capacity' },
    { title: `${language === "en" ? 'DISPATCHED (CUBES)' : language == "si" ? 'යවන ලද ප්‍රමාණය (CUBES)' : 'அனுப்பப்பட்டது (CUBES)'}`, dataIndex: 'dispatchedCubes', key: 'dispatchedCubes' },
    { title: `${language === "en" ? 'REMAINING (CUBES)' : language == "si" ? 'ඉතිරි ප්‍රමාණය (CUBES)' : 'மீதமுள்ளவை (CUBES)'}`, dataIndex: 'remainingCubes', key: 'remainingCubes' },
    {
      title: `${language === "en" ? 'ROYALTY(SAND) DUE [RS.]' : language == "si" ? 'රෝයල්ටි (රු.)' : 'ராயல்டி(மணல்) வரவு [ஆர்.எஸ்.]'}`,
      dataIndex: 'royalty',
      key: 'royalty',
      render: (text) => {
        const royaltyAmount = text ? parseInt(text, 10) : 0;
        const formattedAmount = new Intl.NumberFormat().format(royaltyAmount); // Format number with commas
        return <span style={{ color: 'blue' }}>{formattedAmount}</span>;
      },
    },
    {
      title: `${language === "en" ? 'STATUS' : language == 'si' ? 'තත්වය' : 'நிலை'}`,
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const currentDate = new Date();
        const dueDate = new Date(record.dueDate);
        const isActive = currentDate <= dueDate;
        return (
          <span style={{ color: isActive ? 'green' : 'red' }}>
            {record.status === 'Valid' && isActive ? 'Active' : 'Inactive'}
          </span>
        );
      },
    },
    {
      title: `${language === "en" ? 'ACTION' : language == 'si' ? 'ක්‍රියාමාර්ග': 'நடவடிக்கை'}`,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          {/* Dispatch Load Button */}
          <Link
            to={`/mlowner/home/dispatchload/${record.licenseNumber}`}
          >
            <Button
              style={{
                backgroundColor: '#FFA500',
                borderColor: '#FFA500',
                borderRadius: '10%',
                color: 'black',
              }}
              disabled={parseInt(record.remainingCubes, 10) === 0 || new Date(record.dueDate) < new Date()}
              title={
                parseInt(record.remainingCubes, 10) === 0 || new Date(record.dueDate) < new Date()
                  ? "Cannot dispatch: No remaining cubes or due date exceeded"
                  : "Dispatch Load"
              }
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "rgb(211, 153, 61)")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  record.status === "Valid" ? "#FFA500":"#d9d9d9")
              }
            >
              {language === "en" ? "Dispatch Load" : language == 'si' ? "පැටවීම" : 'அனுப்புதல் சுமை'}
            </Button>
          </Link>

          {/* History Button */}
          <Link
            to={{
              pathname: "/mlowner/history",
              search: `?licenseNumber=${record.licenseNumber}`, // Pass license number as query param
            }}
          >
            <Button
              style={{
                backgroundColor: '#0066cc',
                borderColor: '#0066cc',
                borderRadius: '10%',
              }}
            >
              {language === "en" ? "History" : language == 'si' ? "ඉතිහාසය" : 'வரலாறு'}
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the API Key from localStorage
        const apiKey = localStorage.getItem("API_Key");
  
        console.log("API Key from localStorage:", apiKey);
  
        if (!apiKey) {
          console.error("API Key not found in localStorage");
          return;
        }
  
        // Fetch data from API with API Key in Authorization header
        const response = await axios.get('/api/projects/gsmb/issues.json', {
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": apiKey, // Pass the API Key in the header
          },
        });
  
        // Map the API data to the table format
        let mappedData = response.data.issues
          .filter(issue => {
            // Filter by tracker name "ML" and capacity >= 0
            const capacity = issue.custom_fields.find(field => field.name === 'Capacity')?.value;
            return issue.tracker.name === "ML" && (parseInt(capacity, 10) >= 0);
          })
          .map(issue => {
            const currentDate = new Date();
            const dueDate = new Date(issue.due_date);
            const isActive = currentDate <= dueDate;
            console.log("Mapped status:", issue.status.name);
  
            return {
              licenseNumber: issue.custom_fields.find(field => field.name === 'License Number')?.value,
              owner: issue.custom_fields.find(field => field.name === 'Owner Name')?.value,
              location: issue.custom_fields.find(field => field.name === 'Location')?.value, // Using Address for location
              startDate: issue.start_date,
              dueDate: issue.due_date,
              capacity: issue.custom_fields.find(field => field.name === 'Capacity')?.value,
              dispatchedCubes: issue.custom_fields.find(field => field.name === 'Used')?.value, // Mapped to Used for dispatched cubes
              remainingCubes: issue.custom_fields.find(field => field.name === 'Remaining')?.value, // Using Remaining field for cubes
              royalty: issue.custom_fields.find(field => field.name === 'Royalty(sand)due')?.value, // Added royalty mapping
              status: issue.status.name, // Active if not overdue, inactive otherwise
            };
          });
  
        // **New**: Filter only active licenses
        mappedData = mappedData.filter(item => item.status === 'Valid');
        
  
        // **New**: Filter licenses by the logged-in user's full name
        if (user && user.firstname && user.lastname) {
          const fullName = `${user.firstname} ${user.lastname}`; // Construct full name
          mappedData = mappedData.filter(item => item.owner === fullName);
        }
  
        // Sort the data by due date (most recent first)
        const sortedData = mappedData.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  
        // **New**: Take only the top 5 most recent active licenses
        const recentActiveData = sortedData.slice(0, 5);
  
        setData(recentActiveData); // Set all filtered data
        setFilteredData(recentActiveData); // Set filtered data for initial display
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [user]); // Re-fetch when user changes
  
   
  // Handle search input change
  const handleSearch = (value) => {
    setSearchText(value);
    if (value) {
      const filteredResults = data.filter(item =>
        item.licenseNumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(data); // Reset to show all data if search text is empty
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

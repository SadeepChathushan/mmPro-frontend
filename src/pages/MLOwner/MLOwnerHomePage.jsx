import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Typography, Row, Col, AutoComplete, Input } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useLanguage } from "../../contexts/LanguageContext";
import MLOService from '../../services/MLOService';
import "../../styles/MLOwner/MLOwnerHomePage.css";

const { Title } = Typography;

const MLOwnerHomePage = () => {
  const { language } = useLanguage();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // Translation object for text and table headers
  // const translations = {
  //   en: {
  //     searchPlaceholder: "Search License Number",
  //     viewLicensesButton: "View Licenses",
  //     columns: {
  //       licenseNumber: "LICENSE NUMBER",
  //       owner: "OWNER",
  //       location: "LOCATION",
  //       startDate: "START DATE",
  //       dueDate: "DUE DATE",
  //       capacity: "CAPACITY (CUBES)",
  //       dispatchedCubes: "DISPATCHED (CUBES)",
  //       remainingCubes: "REMAINING (CUBES)",
  //       royalty: "ROYALTY(SAND) DUE [RS.]",
  //       status: "STATUS",
  //       action: "ACTION"
  //     }
  //   },
  //   // Other languages omitted for brevity
  // };


  const translations = {
    en: {
      searchPlaceholder: "Search License Number",
      viewLicensesButton: "View Licenses",
      columns: {
        licenseNumber: "LICENSE NUMBER",
        owner: "OWNER",
        location: "LOCATION",
        startDate: "START DATE",
        dueDate: "DUE DATE",
        capacity: "CAPACITY (CUBES)",
        dispatchedCubes: "DISPATCHED (CUBES)",
        remainingCubes: "REMAINING (CUBES)",
        royalty: "ROYALTY(SAND) DUE [RS.]",
        status: "STATUS",
        action: "ACTION"
      }
    },
    si: {
      searchPlaceholder: "සර්වකරණ අංකය සෙවීම",
      viewLicensesButton: "ලයිසන්ස් බැලීම",
      columns: {
        licenseNumber: "ලයිසන්ස් අංකය",
        owner: "අයිතිකරු",
        location: "ස්ථානය",
        startDate: "ආරම්භ දිනය",
        dueDate: "ඉවතලීමේ දිනය",
        capacity: "කූබ් (කොටස්)",
        dispatchedCubes: "ප්‍රවේශිත කොටස්",
        remainingCubes: "බැකෑම කූබ්",
        royalty: "රොයල්ටි (කන්ක්) පවසයි [රු.]",
        status: "තත්වය",
        action: "ක්‍රියා"
      }
    },
    ta: {
      searchPlaceholder: "லائسன்ஸ் எண் தேடல்",
      viewLicensesButton: "லையசன்ஸ் பார்வை",
      columns: {
        licenseNumber: "லையசன்ஸ் எண்",
        owner: "உரிமையாளர்",
        location: "இடம்",
        startDate: "தொடக்கம் தேதி",
        dueDate: "கடைசி தேதி",
        capacity: "திறன் (கியூப்ஸ்)",
        dispatchedCubes: "வெளியே அனுப்பப்பட்ட கியூப்ஸ்",
        remainingCubes: "மீதமுள்ள கியூப்ஸ்",
        royalty: "ராயல் (சந்தி) கட்டணம் [ரூ.]",
        status: "நிலை",
        action: "செயல்"
      }
    }
  };

  const currentTranslations = translations[language] || translations['en'];


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching and mapping data from the service
        const projects = await MLOService.fetchProjects();
        if (projects.length === 0) {
          console.log("No projects found");
          return;
        }

        // Mapping project data using mapProjectData
        const mappedData = MLOService.mapProjectData(projects);

        // Set the data state
        setData(mappedData);
        setFilteredData(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
    { title: currentTranslations.columns.licenseNumber, dataIndex: 'licenseNumber', key: 'licenseNumber' },
    { title: currentTranslations.columns.owner, dataIndex: 'owner', key: 'owner' },
    { title: currentTranslations.columns.location, dataIndex: 'location', key: 'location' },
    { title: currentTranslations.columns.startDate, dataIndex: 'startDate', key: 'startDate' },
    { title: currentTranslations.columns.dueDate, dataIndex: 'dueDate', key: 'dueDate' },
    { title: currentTranslations.columns.capacity, dataIndex: 'capacity', key: 'capacity' },
    { title: currentTranslations.columns.dispatchedCubes, dataIndex: 'dispatchedCubes', key: 'dispatchedCubes' },
    { title: currentTranslations.columns.remainingCubes, dataIndex: 'remainingCubes', key: 'remainingCubes' },
    { title: currentTranslations.columns.royalty, dataIndex: 'royalty', key: 'royalty' },
    {
      title: currentTranslations.columns.status,
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        const isActive = new Date() <= new Date(record.dueDate);
        const statusText = isActive ? (language === "en" ? "Active" : language === "si" ? "සක්‍රිය" : "செயலில்") 
                                   : (language === "en" ? "Inactive" : language === "si" ? "අසක්‍රිය" : "செயலற்ற");
        return (
          <span className={isActive ? "valid-status" : "expired-status"}>
            {statusText}
          </span>
        );
      },
    },
    
    {
      title: currentTranslations.columns.action,
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/mlowner/home/dispatchload/${record.licenseNumber}`}>
            <Button
              className="dispatch-load-button"
              disabled={parseInt(record.remainingCubes, 10) === 0 || new Date(record.dueDate) < new Date()}
            >
              Dispatch Load
            </Button>
          </Link>
          <Link to={{ pathname: "/mlowner/history", search: `?licenseNumber=${record.licenseNumber}` }}>
            <Button className="history-button1">
              History
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container1">
      <div className="page-content1">
        <Row gutter={16} justify="space-between" align="middle">
          <Col xs={24} sm={24} md={12} lg={12}>
            <AutoComplete
              value={searchText}
              onSearch={handleSearch}
              style={{ width: '100%' }}
              options={filteredData.map(result => ({
                value: result.licenseNumber,
              }))}
            >
              <Input
                prefix={<SearchOutlined />}
                placeholder={currentTranslations.searchPlaceholder}
              />
            </AutoComplete>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} className="search-col">
            <Link to="/mlowner/home/viewlicenses">
              <Button
                type="primary"
                className="view-licenses-button"
              >
                {currentTranslations.viewLicensesButton}
              </Button>
            </Link>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={false}
          className="table-container1"
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default MLOwnerHomePage;

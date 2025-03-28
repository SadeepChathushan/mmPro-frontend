import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import officerService from "../../services/officerService";
import { useLanguage } from "../../contexts/LanguageContext";
import StatsBox from "../../components/GSMBOfficer/StatsBox";
import TabSection from "../../components/GSMBOfficer/TabSection";
import LicenseTable from "../../components/GSMBOfficer/LicenseTable";
import MlOwnersTable from "../../components/GSMBOfficer/MlOwnersTable";

const { Text } = Typography;

const Dashboard = () => {
  const { language } = useLanguage();
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("MLOWNER");
  const [mlOwnersCount, setMlOwnersCount] = useState(0);
  const [tplData, setTplData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mlData, setMlData] = useState([]);

  const tabs = [
    { 
      key: "MLOWNER", 
      label: language === "en" ? "ML Owners" : language === "si" ? "ML හිමියන්" : "ML உரிமையாளர்கள்" 
    },
    { 
      key: "ML", 
      label: language === "en" ? "Mining License" : language === "si" ? "බලපත්‍ර" : "சுரங்க அனுமதி" 
    },
    { 
      key: "TPL", 
      label: language === "en" ? "Transport License" : language === "si" ? "ප්‍රවාහන බලපත්‍ර" : "போக்குவரத்து அனுமதி" 
    },
    { 
      key: "CMPLN", 
      label: language === "en" ? "Complaints" : language === "si" ? "පැමිණිලි" : "முறையீடுகள்" 
    },
    { 
      key: "MEA", 
      label: language === "en" ? "ME Approved" : language === "si" ? "පතල් ඉංජිනේරු අනුමත කර ඇත" : "சுரங்கப் பொறியாளர் ஒப்புதல் அளித்துள்ளார்" 
    },
  ];

  // Fetch ML owners and issues data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch ML owners count
        const mlOwners = await officerService.getMlOwners();
        setMlOwnersCount(mlOwners.length);

        // Fetch issues data (for ML and Complaints)
        const issuesData = await officerService.getIssuesData();
        
        if (Array.isArray(issuesData)) {
          const transformedData = issuesData.map((issue) => ({
            id: issue.id,
            tracker:
              issue.tracker.name === "Complaints"
                ? "CMPLN"
                : issue.tracker.name === "TPL"
                ? "TPL"
                : "ML",
            licenseNumber:
              issue.custom_fields.find(f => f.name === "License Number")?.value || "N/A",
            ownerName:
              issue.custom_fields.find(f => f.name === "Owner Name")?.value || "N/A",
            mobileNumber:
              issue.custom_fields.find(f => f.name === "Mobile Number")?.value || "N/A",
            lorryNumber:
              issue.custom_fields.find(f => f.name === "Lorry Number")?.value || "N/A",
            assignee:
              issue.custom_fields.find(f => f.name === "Assignee")?.value || "N/A",
            start_date:
              issue.custom_fields.find(f => f.name === "startDate")?.value ||
              issue.start_date ||
              "N/A",
          }));
          setTableData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch TPL data separately
  useEffect(() => {
    const fetchTplData = async () => {
      try {
        setLoading(true);
        const tplData = await officerService.getAllTpls();
        console.log("TPL Data from service:", tplData);
        
        // Transform TPL data if needed
        const formattedTplData = tplData.map(tpl => ({
          ...tpl,
          tracker: "TPL" // Explicitly set tracker for TPL items
        }));
        
        setTplData(formattedTplData);
      } catch (error) {
        console.error("Error fetching TPL data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTplData();
  }, []);

  useEffect(() => {
    const fetchMlData = async () => {
      try {
        setLoading(true);
        const mlData = await officerService.getMiningLicenses();
        console.log("ML Data from service:", mlData);
        
        // Transform ML data if needed
        const formattedMlData = mlData.map(ml => ({
          ...ml,
          tracker: "ML" // Explicitly set tracker for ML items
        }));
        
        setMlData(formattedMlData);
      } catch (error) {
        console.error("Error fetching ML data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMlData();
  }, []);

  // Update filtered data when tab or data changes
  useEffect(() => {
    if (activeTab === "MLOWNER") {
      setFilteredData([]);
    } else if (activeTab === "TPL") {
      setFilteredData(tplData);
    } else if (activeTab === "ML") {
      setFilteredData(mlData);
    } else {
      const filtered = tableData.filter(item => item.tracker === activeTab);
      setFilteredData(filtered);
    }
  }, [activeTab, tableData, tplData, mlData]);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    
    if (activeTab === "TPL") {
      const filtered = tplData.filter(item =>
        (item.mining_license_number?.toLowerCase().includes(value.toLowerCase())) ||
        (item.lorry_number?.toLowerCase().includes(value.toLowerCase())) ||
        (item.driver_contact?.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredData(filtered);
          } else if (activeTab === "ML") {
      const filtered = mlData.filter(item =>
        (item.subject?.toLowerCase().includes(value.toLowerCase())) ||
        (item.author?.toLowerCase().includes(value.toLowerCase())) ||
        (item.mobile_number?.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredData(filtered);
    } else {
      const filtered = tableData
        .filter(item => item.tracker === activeTab)
        .filter(item =>
          item.licenseNumber.toLowerCase().includes(value.toLowerCase()) ||
          item.ownerName.toLowerCase().includes(value.toLowerCase())
        );
      setFilteredData(filtered);
    }
  };

  // Stats boxes data
  const statsBoxes = [
    { 
      title: language === "en" ? "ML Owners" : language === "si" ? "ML හිමියන්" : "ML உரிமையாளர்கள்", 
      count: mlOwnersCount, 
      color: "#FF8C00" 
    },
    { 
      title: language === "en" ? "Mining Licenses" : language === "si" ? "පතල් බලපත්‍ර" : "சுரங்க உரிமங்கள்", 
      count: mlData.length,
      color: "#1890ff" 
    },
    { 
      title: language === "en" ? "Transport Licenses" : language === "si" ? "ප්‍රවාහන බලපත්‍ර" : "போக்குவரத்து உரிமங்கள்", 
      count: tplData.length, 
      color: "#408220" 
    },
    { 
      title: language === "en" ? "Complaints" : language === "si" ? "පැමිණිලි" : "முறையீடுகள்", 
      count: tableData.filter(item => item.tracker === "CMPLN").length, 
      color: "#950C33" 
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5", padding: "16px" }}>
      {/* Stats Section */}
      <Row gutter={[16, 16]} justify="space-around">
        {statsBoxes.map((box, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <StatsBox title={box.title} count={box.count} color={box.color} />
          </Col>
        ))}
      </Row>

      {/* Tab Section */}
      <TabSection tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {/* Search and buttons */}
      <Row gutter={[16, 16]} align="middle" style={{ marginTop: "16px" }}>
        <Col xs={24} sm={16}>
          <Input
            placeholder={language === "en" ? "Search" : language === "si" ? "සොයන්න" : "சேர்"}
            prefix={<SearchOutlined />}
            style={{
              width: "100%",
              borderRadius: "4px",
              padding: "8px 16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={8} style={{ textAlign: "right" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            <Link to="/gsmb/register-new-owner">
              <Button type="primary" style={{ backgroundColor: "#950C33", color: "white" }}>
                {language === "en"
                  ? "+ Register New Owner"
                  : language === "si"
                  ? "+ අයිතිකරු ලියාපදිංචි කරන්න"
                  : "+ புதிய உரிமையாளரை பதிவு செய்"}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      {/* Table Section */}
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          padding: "12px",
          marginTop: "16px",
        }}
      >
        {activeTab === "MLOWNER" ? (
          <MlOwnersTable data={filteredData} />
        ) : (
          <LicenseTable data={filteredData} tracker={activeTab} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import officerService from "../../services/officerService"; // Import the officerService
import { useLanguage } from "../../contexts/LanguageContext";
import StatsBox from "../../components/GSMBOfficer/StatsBox";
import TabSection from "../../components/GSMBOfficer/TabSection";
import LicenseTable from "../../components/GSMBOfficer/LicenseTable";

const { Text } = Typography;

const Dashboard = () => {
  const { language } = useLanguage();
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("CMPLN");

  const tabs = [
    { key: "ML", label: language === "en" ? "Mining License" : "බලපත්‍ර" },
    { key: "TPL", label: language === "en" ? "Transport License" : "ප්‍රවාහන බලපත්‍ර" },
    { key: "CMPLN", label: language === "en" ? "Complaints" : "පැමිණිලි" },
  ];

  useEffect(() => {
    console.log("Fetching data for the dashboard...");
    const fetchData = async () => {
      try {
        const issuesData = await officerService.getIssuesData(); // Use the service to get data
        if (Array.isArray(issuesData)) {
          const transformedData = issuesData.map((issue) => ({
            id: issue.id,
            tracker: issue.tracker.name === "Complaints"
              ? "CMPLN"
              : issue.tracker.name === "TPL"
              ? "TPL"
              : "ML",
            licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "N/A",
            ownerName: issue.custom_fields.find((field) => field.name === "Owner Name")?.value || "N/A",
            mobileNumber: issue.custom_fields.find((field) => field.name === "Mobile Number")?.value || "N/A",
            lorryNumber: issue.custom_fields.find((field) => field.name === "Lorry Number")?.value || "N/A",
            assignee: issue.custom_fields.find((field) => field.name === "Assignee")?.value || "N/A",
            complaintID: issue.custom_fields.find((field) => field.name === "Complaint ID")?.value || "N/A",
            start_date: issue.custom_fields.find((field) => field.name === "startDate")?.value || issue.start_date || "N/A",
          }));
          setTableData(transformedData);
          setFilteredData(transformedData.filter((item) => item.tracker === "ML"));
        } else {
          console.error("Issues data is not an array:", issuesData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = tableData.filter((item) => item.tracker === activeTab);
    setFilteredData(filtered);
  }, [activeTab, tableData]);

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = tableData
      .filter((item) => item.tracker === activeTab)
      .filter(
        (item) =>
          item.licenseNumber.toLowerCase().includes(value.toLowerCase()) ||
          item.ownerName.toLowerCase().includes(value.toLowerCase())
      );
    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5", padding: "16px" }}>
      <Row gutter={[16, 16]} justify="space-around">
        {[{
          title: language === "en" ? "Total Licenses" : "මුළු බලපත්‍ර",
          count: tableData.filter((item) => item.tracker === "ML").length,
          color: "#1890ff",
        }, {
          title: language === "en" ? "Transport Licenses" : "ප්‍රවාහන බලපත්‍ර",
          count: tableData.filter((item) => item.tracker === "TPL").length,
          color: "#408220",
        }, {
          title: language === "en" ? "Complaints" : "පැමිණිලි",
          count: tableData.filter((item) => item.tracker === "CMPLN").length,
          color: "#950C33",
        }].map((box, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <StatsBox title={box.title} count={box.count} color={box.color} />
          </Col>
        ))}
      </Row>

      <TabSection tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={16}>
          <Input
            placeholder={language === "en" ? "Search" : "සොයන්න"}
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
              <Button
                type="primary"
                style={{ backgroundColor: "#950C33", color: "white" }}
              >
                {language === "en" ? "+ Register New Owner" : "+ අයිතිකරු ලියාපදිංචි කරන්න"}
              </Button>
            </Link>
            <Link to="/gsmb/add-new-license">
              <Button
                type="default"
                style={{ backgroundColor: "white", borderColor: "#d9d9d9" }}
              >
                {language === "en" ? "+ Add New License" : "+ නව අවසරපත්‍රයක් එකතු කරන්න"}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

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
        <LicenseTable data={filteredData} tracker={activeTab} />
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { Button, Input, Row, Col, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../../contexts/LanguageContext";
import StatsBox from "../../components/GSMBOfficer/StatsBox";
import TabSection from "../../components/GSMBOfficer/TabSection";
import LicenseTable from "../../components/GSMBOfficer/LicenseTable";

const { Text } = Typography;

const Dashboard = () => {
  const { language } = useLanguage();
  const [searchText, setSearchText] = useState("");
  const [tableData, setTableData] = useState([]);
  const [activeTab, setActiveTab] = useState("ML");

  const tabs = [
    { key: "ML", label: language === "en" ? "Mining License" : "බලපත්‍ර" },
    { key: "TPL", label: language === "en" ? "Transport License" : "ප්‍රවාහන බලපත්‍ර" },
    { key: "CMPLN", label: language === "en" ? "Complains" : "පැමිණිලි" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "@achinthamihiran"; // Replace with actual username
        const password = "Ab2#*De#"; // Replace with actual password

        const response = await axios.get(
          "/api/projects/new-license/issues.json",
          {
            headers: { "Content-Type": "application/json" },
            auth: { username, password },
          }
        );

        const transformedData = response.data.issues.map((issue) => ({
          licenseId: issue.id,
          licenseNumber:
            issue.custom_fields.find(
              (field) => field.name === "License Number"
            )?.value || "N/A",
          ownerName:
            issue.custom_fields.find((field) => field.name === "Owner Name")
              ?.value || "N/A",
          location:
            issue.custom_fields.find((field) => field.name === "Location")
              ?.value || "N/A",
          capacity:
            issue.custom_fields.find((field) => field.name === "Capacity")
              ?.value || "N/A",
        }));

        setTableData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = tableData.filter(
      (item) =>
        item.licenseNumber.toLowerCase().includes(value.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#f0f2f5", padding: "16px" }}
    >
      {/* Stats Section */}
      <Row gutter={[16, 16]} justify="space-around">
        {[
          {
            title: language === "en" ? "Total Licenses" : "මුළු බලපත්‍ර",
            count: tableData.length,
            color: "#1890ff",
          },
          {
            title: language === "en" ? "Pending Approvals" : "අනුමත කිරීම්",
            count: 5,
            color: "#950C33",
          },
          {
            title: language === "en" ? "Active Licenses" : "සක්‍රීය බලපත්‍ර",
            count: 20,
            color: "#408220",
          },
        ].map((box, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <StatsBox title={box.title} count={box.count} color={box.color} />
          </Col>
        ))}
      </Row>

      {/* Tabs Section */}
      <TabSection tabs={tabs} activeKey={activeTab} onChange={setActiveTab} />

      {/* Search and Buttons */}
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={16}>
          <Input
            placeholder={
              language === "en" ? "Search" : "සොයන්න"
            }
            prefix={<SearchOutlined />}
            style={{
              width: "100%",
              borderRadius: "4px",
              padding: "8px 16px",
              backgroundColor: "#ffffff",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
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
        <LicenseTable data={tableData} />
      </div>
    </div>
  );
};

export default Dashboard;

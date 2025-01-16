import React, { useState } from "react";
import { Button, Input, Table, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DashboardSinhala = () => {
  const [searchText, setSearchText] = useState('');
  const [tableData, setTableData] = useState([
    {
      licenseId: "1",
      licenseNumber: "IML/B/TEST/1578/LRS",
      ownerName: "ජයන්ථ පෙරේරා",
      location: "රත්නපුර",
      capacity: 100,
    },
    {
      licenseId: "2",
      licenseNumber: "IML/B/TEST/1579/LRS",
      ownerName: "නිමල් පෙරේරා",
      location: "කොළඹ",
      capacity: 150,
    },
    // ... other data objects with unique keys
  ]);

  const columns = [
    {
      title: "අංකය",
      dataIndex: "licenseId",
      key: "licenseId",
    },
    {
      title: "බලපත්‍ර අංකය",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
    },
    { title: "අයිතිකරුගේ නම", dataIndex: "ownerName", key: "ownerName" },
    { title: "ස්ථානය", dataIndex: "location", key: "location" },
    { title: "ධාරිතාවය (කියුබ්)", dataIndex: "capacity", key: "capacity" },
    {
      title: "ක්‍රියාව",
      key: "action",
      render: (_, record) => (
        <Link
          to={`/sgsmb/slicense/${record.licenseId}`}
          state={{ license: record }}
        >
          <Button type="link" style={{ backgroundColor: "#05CD99", color: "#000000" }}>
            නරඹන්න
          </Button>
        </Link>
      ),
    },
  ];

  const handleSearch = (value) => {
    setSearchText(value);
    const filteredData = tableData.filter((item) =>
      item.licenseNumber.toLowerCase().includes(value.toLowerCase()) ||
      item.ownerName.toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
      {/* Content Section */}
      <div style={{ padding: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          {/* Search Bar */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Input
              placeholder="සොයන්න"
              prefix={<SearchOutlined />}
              style={{
                width: "100%",
                borderRadius: "4px",
                padding: "8px 16px",
              }}
            />
          </Col>
          {/* Buttons */}
          <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: "right" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                flexWrap: "wrap",
              }}
            >
              <Link to="/sgsmb/sregister-new-owner">
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#950C33",
                    color: "white",
                    borderColor: "#950C33",
                    padding: "10px 24px",
                    fontSize: "16px",
                  }}
                >
                  + නව අයිතිකරු ලියාපදිංචි කරන්න
                </Button>
              </Link>
              <Link to="/sgsmb/sadd-new-license">
                <Button
                  type="default"
                  style={{
                    backgroundColor: "white",
                    borderColor: "#d9d9d9",
                    color: "#595959",
                    padding: "10px 24px",
                    fontSize: "16px",
                  }}
                >
                  + නව බලපත්‍රයක් එක් කරන්න
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        {/* Responsive Table */}
        <div
          style={{
            marginTop: "24px",
            overflowX: "auto", // Enable horizontal scrolling
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            style={{ minWidth: "600px" }} // Ensure table doesn't shrink below this width
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSinhala;

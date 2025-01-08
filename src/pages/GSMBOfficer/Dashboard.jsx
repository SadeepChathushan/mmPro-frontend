import React from "react";
import { Button, Input, Table, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Table columns
  const columns = [
    {
      title: "LICENSE NUMBER",
      dataIndex: "licenseNumber",
      key: "licenseNumber",
    },
    { title: "OWNER NAME", dataIndex: "ownerName", key: "ownerName" },
    { title: "LOCATION", dataIndex: "location", key: "location" },
    { title: "CAPACITY (CUBES)", dataIndex: "capacity", key: "capacity" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="link"
          style={{ backgroundColor: "#05CD99", color: "#000000" }}
        >
          View
        </Button>
      ),
    },
  ];

  // Table data
  const data = [
    {
      licenseNumber: "01 IML/B/TEST/1578/LRS",
      ownerName: "Jayantha Perera",
      location: "Rathnapura",
      capacity: 100,
    },
    {
      licenseNumber: "02 IML/B/TEST/1578/LRS",
      ownerName: "Jayantha Perera",
      location: "Rathnapura",
      capacity: 100,
    },
    {
      licenseNumber: "01 IML/B/TEST/1578/LRS",
      ownerName: "Jayantha Perera",
      location: "Rathnapura",
      capacity: 100,
    },
    {
      licenseNumber: "02 IML/B/TEST/1578/LRS",
      ownerName: "Jayantha Perera",
      location: "Rathnapura",
      capacity: 100,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
      {/* Content Section */}
      <div style={{ padding: "24px" }}>
        <Row gutter={[16, 16]} align="middle">
          {/* Search Bar */}
          <Col xs={24} sm={24} md={12} lg={12}>
            <Input
              placeholder="Search"
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
              <Link to="/gsmb/register-new-owner">
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
                + Register New Owner
                </Button>
              </Link>
              <Link to="/gsmb/add-new-license">
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
                  + Add New License
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
            dataSource={data}
            pagination={false}
            style={{ minWidth: "600px" }} // Ensure table doesn't shrink below this width
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

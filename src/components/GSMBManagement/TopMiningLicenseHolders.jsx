import React, { useState, useEffect } from "react";
import { Card, Progress, Col, Typography, Spin } from "antd";
import { fetchTopMiningHolders } from "../../services/management"; // Import the API function

const { Title } = Typography;

const TopMiningLicenseHolders = ({ getDynamicColor }) => {
  const [topMiningHolders, setTopMiningHolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMiningData = async () => {
      try {
        const miningData = await fetchTopMiningHolders();
        
        // Ensure the data returned from the service is in the correct format
        if (Array.isArray(miningData)) {
          setTopMiningHolders(miningData);
        } else {
          setError("Invalid data format received from the API.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMiningData();
  }, []);

  if (loading) {
    return (
      <Col xs={24} md={8}>
        <Card
          bordered={false}
          style={{
            backgroundColor: "rgba(254, 118, 118, 0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <Title level={5} style={{ color: "#fff", marginBottom: "20px" }}>
            Top Mining License Holders (by Capacity)
          </Title>
          <Spin size="large" />
        </Card>
      </Col>
    );
  }

  if (error) {
    return (
      <Col xs={24} md={8}>
        <Card
          bordered={false}
          style={{
            backgroundColor: "rgba(254, 118, 118, 0.1)",
            borderRadius: "8px",
            color: "#fff",
          }}
        >
          <Title level={5} style={{ color: "#fff", marginBottom: "20px" }}>
            Error
          </Title>
          <p style={{ color: "#fff" }}>{error}</p>
        </Card>
      </Col>
    );
  }

  return (
    <Col xs={24} md={8}>
      <Card
        bordered={false}
        style={{
          backgroundColor: "rgba(254, 118, 118, 0.1)",
          borderRadius: "8px",
          color: "#fff",
        }}
      >
        <Title level={5} style={{ color: "#fff", marginBottom: "20px" }}>
          Top Mining License Holders (by Capacity)
        </Title>
        {topMiningHolders.length === 0 ? (
          <p style={{ color: "#fff" }}>No data available</p>
        ) : (
          topMiningHolders.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span style={{ color: "#fff", flex: 1 }}>{item.label}</span>
              <Progress
                percent={item.value}
                showInfo={false}
                strokeColor={getDynamicColor(item.value)}
                trailColor="#d9d9d9"
                style={{ width: "70%", margin: "0 12px" }}
              />
              <span style={{ color: "#fff", width: "30px", textAlign: "right" }}>
                {item.value}%
              </span>
            </div>
          ))
        )}
      </Card>
    </Col>
  );
};

export default TopMiningLicenseHolders;

import React from 'react';
import { Card, Progress, Col } from 'antd';

export const LicenseCategories = ({ data }) => {
  return (
    <Col xs={24} md={8}>
      <Card
        title={<span style={{ color: "#fff", fontWeight: "bold" }}>Annual Top Mining License Categories</span>}
        style={{
          backgroundColor: "rgba(254, 118, 118, 0.1)",
          borderRadius: "8px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "none",
          outline: "none",
        }}
      >
        <div style={{ color: "#fff" }}>
          {data.map(item => (
            <div key={item.label}>
              <p>{item.label}</p>
              <Progress
                percent={item.totalPercent}
                success={{ percent: item.successPercent }}
                format={() => <span style={{ color: "#fff" }}>{item.value}</span>}
                strokeColor="#ffef2f"
                style={{ height: "30px" }}
              />
            </div>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default LicenseCategories;
import React from 'react';
import { Card, Progress, Col, Typography } from 'antd';

const { Title } = Typography;

const getDynamicColor = (value) => {
  if (value > 30) return "#28a745"; // Green for high values
  if (value > 20) return "#ffc107"; // Yellow for medium values
  return "#dc3545"; // Red for low values                    // Red
};

export const MiningAreas = ({data}) => {

  const displayData = data.length > 0 ? data : defaultData;

  return (
    <Col xs={24} md={8}>
      <Card
        bordered={false}
        style={{
          backgroundColor: "rgba(254, 118, 118, 0.1)",
          borderRadius: "8px",
          color: "#fff",
          height: "100%",
        }}
      >
        <Title
          level={5}
          style={{
            color: "#fff",
            marginBottom: "20px",
            marginTop: 0,
          }}
        >
          Mining Areas
        </Title>
        
        <div className="mining-areas-container">
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: index === displayData.length - 1 ? 0 : "12px",
              }}
            >
              <span 
                style={{ 
                  color: "#fff", 
                  flex: 1,
                  // whiteSpace: "nowrap",
                  // overflow: "hidden",
                  // textOverflow: "ellipsis",
                  // paddingRight: "8px",
                }}
              >
                {item.label}
              </span>
              
              <Progress
                percent={item.value}
                showInfo={false}
                strokeColor={getDynamicColor(item.value)}
                trailColor="#d9d9d9"
                style={{
                  width: "70%",
                  margin: "0 12px",
                }}
              />
              
              <span 
                style={{ 
                  color: "#fff", 
                  width: "30px", 
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </Card>
    </Col>
  );
};

export default MiningAreas;
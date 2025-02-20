import React from 'react';
import { Card, Typography } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const { Title } = Typography;

export const TransportLicense = ({ pieData = [], colors = [] }) => {
  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "rgba(254, 118, 118, 0.1)",
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <Title level={5} style={{ color: "#fff", textAlign: "center" }}>
        Transport License Destinations
      </Title>
      
      <p style={{color: "#ffef2f",textAlign: "center",marginBottom: "20px"}}>
        Most Mining areas are located in Rathnapura District
      </p>
      
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="100%"
            innerRadius="0%"
            paddingAngle={2}
          >
            {pieData.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [value, name]}
            contentStyle={{
              backgroundColor: "#333",
              border: "none",
              color: "#fff",
              borderRadius: "6px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TransportLicense;
import React from 'react';
import { Card, Space, Typography, Col } from 'antd';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const { Title } = Typography;

export const MonthlyChart = ({ lineData }) => {
  return (
    <Col xs={24} md={16}>
      <Card 
        bordered={false} 
        style={{ 
          backgroundColor: "rgba(254, 118, 118, 0.1)", 
          borderRadius: "8px", 
          padding: "20px" 
        }}
      >
        <Title level={5} style={{ color: "#fff", textAlign: "center", margin: "0 0 20px 0" }}>
          Monthly Cube Count (Sand, Graphite, and Mines)
        </Title>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={lineData}>
            <XAxis 
              dataKey="month" 
              stroke="#ffffff" 
              tick={{ fill: "#ffffff", fontSize: 14 }} 
              tickLine={false} 
            />
            <YAxis 
              stroke="#ffffff" 
              tick={{ fill: "#ffffff", fontSize: 14 }} 
              tickLine={false} 
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#333", 
                border: "none", 
                color: "#fff", 
                borderRadius: "6px" 
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="sand" 
              stroke="url(#sandGradient)" 
              strokeWidth={4} 
              dot={{ stroke: "url(#sandDotGradient)", strokeWidth: 3, r: 6 }} 
              activeDot={{ stroke: "url(#sandDotGradient)", strokeWidth: 4, r: 8 }} 
              animationDuration={1000} 
            />
            <Line 
              type="monotone" 
              dataKey="graphite" 
              stroke="url(#graphiteGradient)" 
              strokeWidth={4} 
              dot={{ stroke: "url(#graphiteDotGradient)", strokeWidth: 3, r: 6 }} 
              activeDot={{ stroke: "url(#graphiteDotGradient)", strokeWidth: 4, r: 8 }} 
              animationDuration={1000} 
            />
            <Line 
              type="monotone" 
              dataKey="mines" 
              stroke="url(#minesGradient)" 
              strokeWidth={4} 
              dot={{ stroke: "url(#minesDotGradient)", strokeWidth: 3, r: 6 }} 
              activeDot={{ stroke: "url(#minesDotGradient)", strokeWidth: 4, r: 8 }} 
              animationDuration={1000} 
            />
            
            {/* Gradient definitions */}
            <defs>
              {/* Sand Gradient */}
              <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: "#B8860B", stopOpacity: 0.8 }} />
              </linearGradient>

              {/* Graphite Gradient */}
              <linearGradient id="graphiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: "#FF8C00", stopOpacity: 0.8 }} />
              </linearGradient>

              {/* Mines Gradient */}
              <linearGradient id="minesGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" style={{ stopColor: "#B8860B", stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: "#FFD700", stopOpacity: 0.8 }} />
              </linearGradient>

              {/* Dots Gradients */}
              <linearGradient id="sandDotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" style={{ stopColor: "#FF8C00", stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: "#B8860B", stopOpacity: 0.6 }} />
              </linearGradient>

              <linearGradient id="graphiteDotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: "#FF8C00", stopOpacity: 0.6 }} />
              </linearGradient>

              <linearGradient id="minesDotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="5%" style={{ stopColor: "#B8860B", stopOpacity: 1 }} />
                <stop offset="95%" style={{ stopColor: "#FFD700", stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>

        <div style={{ textAlign: "center", marginTop: "10px", color: "#fff" }}>
          <p style={{ fontSize: "12px", color: "#ffef2f", margin: 0 }}>
            + 50% of cube count increased
          </p>
        </div>
      </Card>
    </Col>
  );
};

export default MonthlyChart;
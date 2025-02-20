import React from 'react';
import { Card, Space, Typography, Row, Col } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { UserOutlined, FileTextOutlined, ExclamationCircleOutlined, MoneyCollectOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
// In your parent component:
const colors = ['#ff4d4f', '#1890ff', '#52c41a', '#faad14']; // Define your colors

const handlePieChartClick = (event, index) => {
  // Handle click event
  console.log('Clicked:', event, 'at index:', index);
};

export const KPICard = ({ kpi, colors, handlePieChartClick, index }) => {
  return (
    <Card 
      bordered={false} 
      style={{ 
        background: "linear-gradient(135deg,rgb(50, 0, 0),rgb(84, 1, 1),rgb(130, 0, 0))" 
      }}
    >
      <Space
        direction="horizontal"
        size="middle"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {kpi.icon}
        
        <div>
          <Title level={5} style={{ color: "white", margin: 0 }}>
            {kpi.title}
          </Title>
          <Text style={{ color: "white", fontSize: "24px", display: "block" }}>
            {kpi.value}
          </Text>
          {kpi.description && (
            <p style={{ color: "white", margin: 0 }}>
              {kpi.description}
            </p>
          )}
        </div>

        {kpi.donutData && (
          <ResponsiveContainer width={80} height={80}>
            <PieChart>
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const { name, value } = payload[0];
                    return (
                      <div
                        style={{
                          background: "white",
                          padding: "8px",
                          borderRadius: "4px",
                          color: "black",
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        <p style={{ margin: 0 }}>
                          {name}: {value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={kpi.donutData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={20}
                outerRadius={35}
                fill="#8884d8"
                onClick={(e) => handlePieChartClick(e, index)}
              >
                {kpi.donutData.map((_, cellIndex) => (
                  <Cell 
                    key={`cell-${cellIndex}`} 
                    fill={colors[cellIndex % colors.length]} 
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </Space>
    </Card>
  );
};

// Example data structure
export const getDefaultKPIData = (roleCounts, licenseCounts, TotalComplaint, TotalRoyalty) => [
  {
    title: "Overall user Stats (ACTIVE)",
    icon: <UserOutlined style={{ fontSize: "30px", color: "#52c41a" }} />,
    color: "#3f51b5",
    donutData: [
      { name: "Licence Owner", value: roleCounts?.licenceOwner || 10 },
      { name: "GSMB officer", value: roleCounts?.activeGSMBOfficers || 0 },
      { name: "Police officers", value: roleCounts?.policeOfficers || 0 },
      { name: "Public", value: roleCounts?.public || 0 },
    ],
  },
  {
    title: "Total License Stats",
    value: licenseCounts?.total || 0,
    icon: <FileTextOutlined style={{ fontSize: "30px", color: "#1890ff" }} />,
    color: "#1890ff",
    donutData: [
      { name: "Valid", value: licenseCounts?.valid || 0 },
      { name: "Expired", value: licenseCounts?.expired || 0 },
      { name: "Rejected", value: licenseCounts?.rejected || 0 },
    ],
  },
  {
    title: "Complaint Stats",
    value: TotalComplaint?.total || 0,
    icon: <ExclamationCircleOutlined style={{ fontSize: "30px", color: "#faad14" }} />,
    color: "#faad14",
    donutData: [
      { name: "New", value: TotalComplaint?.New || 0 },
      { name: "Rejected", value: TotalComplaint?.Rejected || 0 },
      { name: "In Progress", value: TotalComplaint?.InProgress || 0 },
      { name: "Executed", value: TotalComplaint?.Executed || 0 },
    ],
  },
  {
    title: "Total Royalty",
    value: `LKR ${(TotalRoyalty || 0).toLocaleString()}`,
    icon: <MoneyCollectOutlined style={{ fontSize: "30px", color: "#ff4d4f" }} />,
    color: "#ff4d4f",
  },
];

export default KPICard;
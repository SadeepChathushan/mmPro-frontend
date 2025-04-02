import React from "react";
import { Card, Space, Typography, Row, Col } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  UserOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useLanguage } from "../../contexts/LanguageContext";

const { Title, Text } = Typography;
// In your parent component:
const colors = ["#ff4d4f", "#1890ff", "#52c41a", "#faad14"]; // Define your colors

export const KPICard = ({ kpi, colors, handlePieChartClick, index }) => {
  return (
    <Card
      bordered={false}
      style={{
        background:
          "linear-gradient(135deg,rgb(50, 0, 0),rgb(84, 1, 1),rgb(130, 0, 0))",
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
            <p style={{ color: "white", margin: 0 }}>{kpi.description}</p>
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

export const getDefaultKPIData = (
  roleCounts={},
  licenseCounts,
  TotalComplaint,
  TotalRoyalty = 0,
  language
) => {
  
  return [
    {
      title:
        language === "en"
          ? "Overall User Stats (ACTIVE)"
          : language === "si"
          ? "මුළු පරිශීලක සංඛ්‍යාන (සක්‍රීය)"
          : "மொத்த பயனர் புள்ளிவிவரங்கள் (செயலில்)",
      icon: <UserOutlined style={{ fontSize: "30px", color: "#52c41a" }} />,
      color: "#3f51b5",
      donutData: [
        {
          name:
            language === "en"
              ? "Licence Owner"
              : language === "si"
              ? "බලපත්‍ර හිමියන්"
              : "உரிமை உரிமையாளர்",
          value: roleCounts?.licenceOwner || 10,
        },
        {
          name:
            language === "en"
              ? "GSMB Officer"
              : language === "si"
              ? "GSMB නිලධාරී"
              : "GSMB அதிகாரி",
          value: roleCounts?.activeGSMBOfficers || 0,
        },
        {
          name:
            language === "en"
              ? "Police Officers"
              : language === "si"
              ? "පොලිස් නිලධාරීන්"
              : "காவல்துறையினர்",
          value: roleCounts?.policeOfficers || 0,
        },
        {
          name:
            language === "en"
              ? "Public"
              : language === "si"
              ? "පොදු ජනතාව"
              : "பொது",
          value: roleCounts?.public || 0,
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Total License Stats"
          : language === "si"
          ? "මුළු බලපත්‍ර සංඛ්‍යානය"
          : "மொத்த உரிமப் புள்ளிவிவரம்",
      value: licenseCounts?.total || 0,
      icon: <FileTextOutlined style={{ fontSize: "30px", color: "#1890ff" }} />,
      color: "#1890ff",
      donutData: [
        {
          name:
            language === "en"
              ? "Valid"
              : language === "si"
              ? "වලංගු"
              : "செல்லுபடியாகும்",
          value: licenseCounts?.valid || 0,
        },
        {
          name:
            language === "en"
              ? "Expired"
              : language === "si"
              ? "කල් ඉකුත්"
              : "காலாவதியானது",
          value: licenseCounts?.expired || 0,
        },
        {
          name:
            language === "en"
              ? "Rejected"
              : language === "si"
              ? "ප්‍රතික්ෂේප කළ"
              : "நிராகரிக்கப்பட்டது",
          value: licenseCounts?.rejected || 0,
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Complaint Stats"
          : language === "si"
          ? "පැමිණිලි සංඛ්‍යානය"
          : "முறையீட்டு புள்ளிவிவரம்",
      value: TotalComplaint?.total || 0,
      icon: (
        <ExclamationCircleOutlined
          style={{ fontSize: "30px", color: "#faad14" }}
        />
      ),
      color: "#faad14",
      donutData: [
        {
          name:
            language === "en" ? "New" : language === "si" ? "නව" : "புதியது",
          value: TotalComplaint?.New || 0,
        },
        {
          name:
            language === "en"
              ? "Rejected"
              : language === "si"
              ? "ප්‍රතික්ෂේප කළ"
              : "நிராகரிக்கப்பட்டது",
          value: TotalComplaint?.Rejected || 0,
        },
        {
          name:
            language === "en"
              ? "In Progress"
              : language === "si"
              ? "ප්‍රවාහනයේදී"
              : "நடந்து வருகிறது",
          value: TotalComplaint?.InProgress || 0,
        },
        {
          name:
            language === "en"
              ? "Executed"
              : language === "si"
              ? "ක්‍රියාත්මක කළ"
              : "செயல்படுத்தப்பட்டது",
          value: TotalComplaint?.Executed || 0,
        },
      ],
    },
    {
      title:
        language === "en"
          ? "Total Royalty"
          : language === "si"
          ? "මුළු Royalty ගාස්තුව"
          : "மொத்த காப்புரிமை",
      value: `LKR ${(TotalRoyalty || 0).toLocaleString()}`,
      icon: (
        <MoneyCollectOutlined style={{ fontSize: "30px", color: "#ff4d4f" }} />
      ),
      color: "#ff4d4f",
    },
  ];
};

export default KPICard;

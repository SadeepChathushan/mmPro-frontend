import { Card, Typography } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../../contexts/LanguageContext';
import { useFetchMiningData } from '../../services/management';

const { Title } = Typography;

export const MiningLicenseChart = () => {
  const { language } = useLanguage();
  const miningLicenseData = useFetchMiningData();

  return (
    <Card
      bordered={false}
      style={{
        backgroundColor: "rgba(254, 118, 118, 0.1)",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <Title level={5} style={{ color: "#fff", textAlign: "center" }}>
        {language === "en"
          ? "Monthly Mining License Issues Count"
          : language === "si"
          ? "මාසික පතල් බලපත්‍ර නිකුත් කිරීමේ ගණන"
          : "மாதாந்திர சுரங்க உரிமம் வெளியீட்டு எண்ணிக்கை"}
      </Title>

      <ResponsiveContainer width="100%" height={350}>
        <div style={{ textAlign: "center", marginBottom: "10px", color: "#fff" }}>
          <p style={{ fontSize: "12px", color: "#ffef2f" }}>
            {language === "en"
              ? "Overall Mining License issues have increased"
              : language === "si"
              ? "මුළු පතල් බලපත්‍ර නිකුතුව වැඩි වී ඇත"
              : "மொத்த சுரங்க உரிமம் பிரச்சினைகள் அதிகரித்துள்ளன"}
          </p>
        </div>

        <BarChart data={miningLicenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="month" stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 14 }} tickLine={false} />
          <YAxis stroke="#ffffff" tick={{ fill: "#ffffff", fontSize: 14 }} tickLine={false} />
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <Tooltip
            formatter={(value, name) => [value, name]}
            contentStyle={{
              background: "linear-gradient(135deg, rgb(255, 197, 197), rgb(255, 83, 83))",
              border: "2px solid rgb(187, 57, 57)",
              color: "#000",
              borderRadius: "5px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Bar dataKey="miningLicense" fill="url(#miningLicenseGradient)" barSize={30} />

          <defs>
            <linearGradient id="miningLicenseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="5%" style={{ stopColor: "#FFD700", stopOpacity: 1 }} />
              <stop offset="95%" style={{ stopColor: "#FF8C00", stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
import { useEffect, useState } from "react";
import { Layout, Row, Col, Typography } from "antd";
import {
  KPICard,
  getDefaultKPIData,
} from "../../components/GSMBManagement/KPICard";
import { MonthlyChart } from "../../components/GSMBManagement/MonthlyChart";
import TopMiningLicenseHolders from "../../components/GSMBManagement/TopMiningLicenseHolders";
import { TopContributors } from "../../components/GSMBManagement/TopContributors";
import { TransportLicense } from "../../components/GSMBManagement/PieChart";
import { MapComponent } from "../../components/GSMBManagement/MiningMap";
import { MiningLicenseChart } from "../../components/GSMBManagement/MLChart";
import {
  fetchComplaintCounts,
  fetchRoleCounts,
  fetchMiningLicenseCounts,
  fetchRoyaltyCounts,
} from "../../services/management";
import { useLanguage } from "../../contexts/LanguageContext";
import { fetchTotalLocationML } from "../../services/management";
import { fetchTransportLicenseDestinations } from "../../services/management";

const { Header, Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const { language } = useLanguage();

  const [startLocationData, setStartLocationData] = useState([]);
  const [transportData, setTransportData] = useState([]);

  const [roleCounts, setRoleCounts] = useState({
    licenceOwner: 0,
    activeGSMBOfficers: 0,
    policeOfficers: 0,
    public: 0,
  });

  const [licenseCounts, setLicenseCounts] = useState({
    valid: 0,
    expired: 0,
    rejected: 0,
    total: 0,
  });

  const [TotalRoyalty, setTotalRoyalty] = useState(0);
 
  const [TotalComplaint, setTotalComplaint] = useState({
    New: 0,
    Rejected: 0,
    InProgress: 0,
    Executed: 0,
    total: 0,
  });

  const colors = [
    "#FFD700",
    "#FF8C00",
    "#B8860B",
    "#DAA520",
    "#FF4500",
    "#FF0000",
    "#B22222",
    "#8B0000",
    "#FF6347",
    "#CD5C5C",
  ];

  // Load data from services
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [complaints, roles, licenses, royalty] = await Promise.all([
          fetchComplaintCounts(),
          fetchRoleCounts(),
          fetchMiningLicenseCounts(),
          fetchRoyaltyCounts(),
        ]);

        // Extract nested data from responses
        const complaintData = complaints.issues; // Extract issues from complaints
        const roleData = roles.issues; // Extract issues from roles
        const licenseData = licenses.issues; // Extract issues from licenses
        const royaltyData = royalty.totalRoyalty; // Extract totalRoyalty from royalty

        setTotalComplaint(complaintData);
        setRoleCounts(roleData);
        setLicenseCounts(licenseData);
        setTotalRoyalty(royaltyData);

        console.log("State After Update:", {
          TotalComplaint: complaintData,
          roleCounts: roleData,
          licenseCounts: licenseData,
          TotalRoyalty: royaltyData,
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();
  }, []);

  useEffect(() => {
    fetchTotalLocationML(setStartLocationData);
  }, []);

  useEffect(() => {
    fetchTransportLicenseDestinations(setTransportData);
  }, []);

  const handlePieChartClick = (e, index) => {
    console.log(`Clicked pie chart ${index}:`, e);
  };

  const getDynamicColor = (value) => {
    if (value > 30) return "#28a745";
    if (value > 20) return "#ffc107";
    return "#dc3545";
  };

  // In Dashboard.js
  const kpiData = getDefaultKPIData(
    roleCounts,
    licenseCounts,
    TotalComplaint,
    TotalRoyalty,
    language
  );

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#1e0000" }}>
      <Header
        style={{
          background: "rgba(0, 0, 0, 0.01)",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Row justify="space-between" align="middle">
          <Title
            level={3}
            style={{
              background: "linear-gradient(to right, #cacaca, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            {language === "en"
              ? "Dashboard"
              : language === "si"
              ? "උපකරණ පුවරුව"
              : "டாஷ்போர்டு"}
          </Title>
        </Row>
      </Header>

      <Content style={{ padding: "20px", backgroundColor: "#1e0000" }}>
        {/* KPI Cards */}
        <Row gutter={16}>
          {kpiData.map((kpi, index) => (
            <Col xs={24} md={6} key={index}>
              <KPICard
                kpi={kpi}
                colors={colors}
                handlePieChartClick={handlePieChartClick}
                index={index}
              />
            </Col>
          ))}
        </Row>

        {/* Charts Row */}
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <MonthlyChart />
          <TopMiningLicenseHolders getDynamicColor={getDynamicColor} />
        </Row>

        {/* Bottom Row */}
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <TopContributors />
          <Col xs={24} md={8}>
            <TransportLicense
              pieData={startLocationData}
              colors={colors}
              title={
                language === "en"
                  ? "Top Regions for Mining License Issuance"
                  : language === "si"
                  ? "වැඩිම පතල් බලපත්‍ර නිකුත් කිරීමේ ප්‍රදේශ"
                  : "சுரங்க அனுமதி வழங்கப்பட்ட முக்கிய பகுதிகள்"
              }
              description={
                language === "en"
                  ? "Areas with the Highest Number of Approved Mining Licenses"
                  : language === "si"
                  ? "අනුමත කළ ඉහළම පතල් බලපත්‍ර ගණනක් ඇති ප්‍රදේශ"
                  : "அங்கீகரிக்கப்பட்ட சுரங்க அனுமதிகளின் அதிக எண்ணிக்கையுள்ள பகுதிகள்"
              }
            />
          </Col>
          <Col xs={24} md={8}>
            <TransportLicense
              pieData={transportData}
              colors={colors}
              title={
                language === "en"
                  ? "Top Destinations"
                  : language === "si"
                  ? "ප්‍රමුඛ ගමනාන්ත"
                  : "சிறந்த இலக்குகள்"
              }
              description={
                language === "en"
                  ? "Permitted locations for transport operations under license."
                  : language === "si"
                  ? "බලපත්‍රය යටතේ ප්‍රවාහන මෙහෙයුම් සඳහා අනුමත ප්‍රදේශ."
                  : "உரிமையின் கீழ் போக்குவரத்து செயல்பாடுகளுக்கான அனுமதியளிக்கப்பட்ட இடங்கள்."
              }
            />
          </Col>
        </Row>
        <Row
          gutter={16}
          style={{ marginTop: "20px", width: "100%", display: "flex" }}
        >
          <Col xs={24} md={8}>
            <MapComponent />
          </Col>
          <Col xs={24} md={16}>
            <MiningLicenseChart />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;


import React, { useEffect, useState } from 'react';
import { Layout, Row, Col, DatePicker, Typography } from 'antd';
import { KPICard, getDefaultKPIData } from "../../components/GSMBManagement/KPICard";
import { MonthlyChart } from "../../components/GSMBManagement/MonthlyChart";
import { MiningAreas } from "../../components/GSMBManagement/MiningAreas";
import { TopContributors } from "../../components/GSMBManagement/TopContributors";
import { TransportLicense } from "../../components/GSMBManagement/TransportLicense";
import { LicenseCategories } from "/src/components/GSMBManagement/LicenseCategories.jsx";
import { 
  fetchComplaintCounts, 
  fetchRoleCounts, 
  fetchMiningLicenseCounts, 
  fetchRoyaltyCounts 
} from '../../services/management';

const { Header, Content } = Layout;
const { Title } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);
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
  });

  
  const [TotalRoyalty, setTotalRoyalty] = useState(0);
  
  const [TotalComplaint, setTotalComplaint] = useState({
    New: 0,
    Rejected: 0,
    InProgress: 0,
    Executed: 0,
  });


  // Sample chart data
  const data = [
    { name: 'Rathnapura', value: 400 },
    { name: 'Galle', value: 300 },
    { name: 'Matara', value: 200 },
    { name: 'Colombo', value: 100 },
  ];

  const licenseData = [
    { label: "Sand", value: 750, totalPercent: 100, successPercent: 75 },
    { label: "Graphite", value: 500, totalPercent: 75, successPercent: 50 },
    { label: "Gravel", value: 150, totalPercent: 53, successPercent: 20 },
    { label: "Rutile", value: 30, totalPercent: 27, successPercent: 5 }
  ];

  const areadata = [
    { label: "Lanka Sands Ltd", value: 45 },
    { label: "Iluka Ltd", value: 28 },
    { label: "Mahaweli River", value: 19 },
    { label: "Pulmudai Beach", value: 10 },
    { label: "Bogala Graphite", value: 4 },
    { label: "Kahatagaha", value: 22 },
    { label: "Eppawala Rock", value: 2 },
    { label: "Puttalam", value: 30 },
  ];

  const monthlyData = [
    { month: "Jan", sand: 1000, graphite: 800, mines: 1200 },
    { month: "Feb", sand: 1100, graphite: 850, mines: 1300 },
    { month: "Mar", sand: 1200, graphite: 900, mines: 1400 },
    { month: "Apr", sand: 1050, graphite: 950, mines: 1500 },
    { month: "May", sand: 1350, graphite: 1000, mines: 1600 },
    { month: "Jun", sand: 1500, graphite: 1000, mines: 1700 },
    { month: "Jul", sand: 1600, graphite: 1200, mines: 1800 },
    { month: "Aug", sand: 1400, graphite: 1300, mines: 2300 },
    { month: "Sep", sand: 1800, graphite: 1400, mines: 2000 },
    { month: "Oct", sand: 1900, graphite: 1200, mines: 2100 },
    { month: "Nov", sand: 2000, graphite: 1600, mines: 1200 },
    { month: "Dec", sand: 2100, graphite: 1200, mines: 1300 },
  ];

  const transportData = [
    { name: "Rathnapura", value: 15 },
    { name: "Monaragala", value: 10 },
    { name: "Kegalle", value: 8 },
    { name: "Kurunegala", value: 12 },
    { name: "Galle", value: 7 },
    { name: "Matale", value: 5 },
    { name: "Badulla", value: 10 },
    { name: "Hambantota", value: 6 },
    { name: "Colombo", value: 3 },
    { name: "Anuradhapura", value: 4 },
  ];

  const recentOrders = [
    {
      title: "LLL/100/102",
      description: "Kasun Nuwan - RS 50000",
      avatar: "https://via.placeholder.com/40",
    },
    {
      title: "LLL/100/105",
      description: "Nimal Perera - Rs 35000",
      avatar: "https://via.placeholder.com/40",
    },
    {
      title: "LLL/100/106",
      description: "Sahan Thathsara - Rs 18345",
      avatar: "https://via.placeholder.com/40",
    },
    {
      title: "LLL/100/110",
      description: "Pasindu Lakshan - Rs 10234",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const colors = [

    "#FFD700", "#FF8C00", "#B8860B", "#DAA520", "#FF4500",
    "#FF0000", "#B22222", "#8B0000", "#FF6347", "#CD5C5C",
  ];

  // Load data from services
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [complaints, roles, licenses, royalty] = await Promise.all([
          fetchComplaintCounts(),
          fetchRoleCounts(),
          fetchMiningLicenseCounts(),
          fetchRoyaltyCounts()
        ]);

        setTotalComplaint(complaints);
        setRoleCounts(roles);
        setLicenseCounts(licenses);
        setTotalRoyalty(royalty);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    loadDashboardData();
  }, []);

  const handlePieChartHover = (index) => {
    setActiveIndex(index);
  };

  const handlePieChartLeave = () => {
    setActiveIndex(null);
  };

  const handlePieChartClick = (e, index) => {
    console.log(`Clicked pie chart ${index}:`, e);
  };

  const getDynamicColor = (value) => {
    if (value > 30) return "#28a745";
    if (value > 20) return "#ffc107";
    return "#dc3545";
  };

  const kpiData = getDefaultKPIData(roleCounts, licenseCounts, TotalComplaint, TotalRoyalty);

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#1e0000" }}>
      <Header 
        style={{ 
          background: "rgba(0, 0, 0, 0.01)", 
          padding: "20px", 
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
          borderRadius: "8px" 
        }}
      >
        <Row justify="space-between" align="middle">
          <Title
            level={3}
            style={{
              WebkitBackgroundClip: "text",
              color: "#cacaca",
              margin: 0,
            }}
          >
            DASHBOARD
          </Title>
          <RangePicker />
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

          <MonthlyChart lineData={monthlyData} />
          <MiningAreas data={areadata} getDynamicColor={getDynamicColor} />
        </Row>


        {/* Bottom Row */}
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <TopContributors orders = {recentOrders}/>
          <LicenseCategories data = {licenseData} />
          <Col xs={24} md={8}>

            <TransportLicense pieData={transportData} colors={colors} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Typography,
  Divider,
  List,
  Avatar,
  DatePicker,
  Space,
} from "antd";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  UserOutlined,
  RiseOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { Progress } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const Dashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handlePieChartHover = (index) => {
    setActiveIndex(index);
  };

  const handlePieChartLeave = () => {
    setActiveIndex(null);
  };
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
  const [TotalRoyalty, setTotalRoyalty] = useState({
    totalRoyalty: 0,
  });

  const [TotalComplaint, setTotalComplaint] = useState({
    New: 0,
    Rejected: 0,
    InProgress: 0,
    Executed: 0,
  });

  // Fetch Complaint
  useEffect(() => {
    const fetchComplaintCounts = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";
        const credentials = btoa(`${username}:${password}`);
        const response = await fetch("/api/projects/GSMB/issues.json", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const counts = {
          New: 0,
          Rejected: 0,
          InProgress: 0,
          Executed: 0,
        };

        const filteredIssues = data.issues.filter((issue) => {
          const tracker = issue.tracker || {};
          return tracker.id === 26 && tracker.name === "Complaints";
        });

        counts.total = filteredIssues.length;

        filteredIssues.forEach((issue) => {
          const status = issue.status?.name || "";
          if (status === "New") counts.New++;
          if (status === "Rejected") counts.Rejected++;
          if (status === "In Progress") counts.InProgress++;
          if (status === "Executed") counts.Executed++;
        });

        setTotalComplaint(counts);
      } catch (error) {
        console.error("Error fetching license data:", error);
      }
    };
    fetchComplaintCounts();
  }, []);

  useEffect(() => {
    // Fetch Total count users from the API
    const fetchRoleCounts = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";
        const credentials = btoa(`${username}:${password}`);
        const response = await fetch("/api/projects/GSMB/memberships.json", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const counts = {
          licenceOwner: 0,
          activeGSMBOfficers: 0,
          policeOfficers: 0,
          public: 0,
        };

        data.memberships.forEach((membership) => {
          const roleName = membership.roles[0]?.name || "";
          if (roleName === "MLOwner") counts.licenceOwner++;
          if (roleName === "GSMBOfficer") counts.activeGSMBOfficers++;
          if (roleName === "PoliceOfficer") counts.policeOfficers++;
          if (roleName === "Public") counts.public++;
        });

        setRoleCounts(counts);
      } catch (error) {
        console.error("Error fetching role data:", error);
      }
    };

    fetchRoleCounts();
  }, []);

  // Fetch Mining License Counts
  useEffect(() => {
    const fetchMiningLicenseCounts = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";
        const credentials = btoa(`${username}:${password}`);
        const response = await fetch("/api/projects/GSMB/issues.json", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const counts = {
          valid: 0,
          expired: 0,
          rejected: 0,
        };

        const filteredIssues = data.issues.filter((issue) => {
          const tracker = issue.tracker || {};
          return tracker.id === 7 && tracker.name === "ML";
        });

        counts.total = filteredIssues.length;

        filteredIssues.forEach((issue) => {
          const status = issue.status?.name || "";
          if (status === "Valid") counts.valid++;
          if (status === "Expired") counts.expired++;
          if (status === "Rejected") counts.rejected++;
        });

        setLicenseCounts(counts);
      } catch (error) {
        console.error("Error fetching license data:", error);
      }
    };
    fetchMiningLicenseCounts();
  }, []);

  // Fetch Royalty Counts
  useEffect(() => {
    const fetchRoyaltyCounts = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";
        const credentials = btoa(`${username}:${password}`);
        const response = await fetch("/api/projects/GSMB/issues.json", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials}`,
          },
        });
        <Layout
          style={{ minHeight: "100vh", backgroundColor: " #1e0000" }}
        ></Layout>;
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const counts = {
          totalRoyalty: 0,
        };
        const filteredIssues = data.issues.filter((issue) => {
          const tracker = issue.tracker || {};
          return tracker.id === 7 && tracker.name === "ML";
        });

        const total = filteredIssues.reduce((sum, issue) => {
          const royaltyField = issue.custom_fields?.find(
            (field) => field.name === "Royalty(sand)due"
          );

          if (royaltyField && royaltyField.value) {
            // Extract numeric value from "Rs 10,234"
            const numericValue = parseFloat(
              royaltyField.value.replace(/[^\d.]/g, "").replace(",", "")
            );
            return sum + numericValue;
          }
          return sum;
        }, 0);

        setTotalRoyalty(total);
      } catch (error) {
        console.error("Error fetching license data:", error);
      }
    };
    fetchRoyaltyCounts();
  }, []);

  const kpiData = [
    {
      title: "Overall user Stats (ACTIVE)",
      icon: <UserOutlined style={{ fontSize: "30px", color: "#52c41a" }} />,
      color: "#3f51b5",
      donutData: [
        { name: "Licence Owner", value: roleCounts.licenceOwner || 10 },
        { name: "GSMB officer", value: roleCounts.activeGSMBOfficers },
        { name: "Police officers", value: roleCounts.policeOfficers },
        { name: "Public", value: roleCounts.public },
      ],
    },
    {
      title: "Total License Stats",
      value: licenseCounts.total,
      icon: <FileTextOutlined style={{ fontSize: "30px", color: "#1890ff" }} />,
      color: "#1890ff",
      donutData: [
        { name: "Valid", value: licenseCounts.valid },
        { name: "Expired", value: licenseCounts.expired },
        { name: "Rejected", value: licenseCounts.rejected },
      ],
    },
    {
      title: "Complaint Stats",
      value: TotalComplaint.total,
      icon: (
        <ExclamationCircleOutlined
          style={{ fontSize: "30px", color: "#faad14" }}
        />
      ),
      color: "#faad14",
      donutData: [
        { name: "New", value: TotalComplaint.New },
        { name: "Rejected", value: TotalComplaint.Rejected },
        { name: "In Progress", value: TotalComplaint.InProgress },
        { name: "Executed", value: TotalComplaint.Executed },
      ],
    },
    {
      title: "Total Royalty",
      value: `LKR ${TotalRoyalty?.toLocaleString() || "0"}`, // Concatenate "LKR" with formatted TotalRoyalty
      icon: (
        <MoneyCollectOutlined style={{ fontSize: "30px", color: "#ff4d4f" }} />
      ),
      color: "#ff4d4f",
    },
  ];

  const pieData = [
    { name: "Rathnapura", value: 15 }, // Known for gem mining
    { name: "Monaragala", value: 10 }, // Known for gem mining and other minerals
    { name: "Kegalle", value: 8 }, // Known for gem mining
    { name: "Kurunegala", value: 12 }, // Known for mineral resources
    { name: "Galle", value: 7 }, // Limestone, clay, and gem mining
    { name: "Matale", value: 5 }, // Gemstone mining
    { name: "Badulla", value: 10 }, // Gemstone mining and other minerals
    { name: "Hambantota", value: 6 }, // Limestone and mineral resources
    { name: "Colombo", value: 3 }, // Gem and mineral extraction
    { name: "Anuradhapura", value: 4 }, // Clay and limestone mining
  ];

  const barData = [
    { category: "Kasun Nuwan", sales: 50000 },
    { category: "Nimal Perera", sales: 35000 },
    { category: " Sahan Thathsara", sales: 18345 },
    { category: "Pasindu Lakshan", sales: 10234 },
  ];

  const lineData = [
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

  const data = [
    { label: "Lanka Sands Ltd", value: 45 },
    { label: "Iluka Ltd", value: 28 },
    { label: "Mahaweli River", value: 19 },
    { label: "Pulmudai Beach", value: 10 },
    { label: "Bogala Graphite", value: 4 },
    { label: "Kahatagaha", value: 22 },
    { label: "Eppawala Rock", value: 2 },
    { label: "Puttalam", value: 30 },
  ];

  const getDynamicColor = (value) => {
    if (value > 30) return "#28a745"; // Green for high values
    if (value > 20) return "#ffc107"; // Yellow for medium values
    return "#dc3545"; // Red for low values
  };

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
    "#FFD700",
    "#FF8C00",
    "#B8860B",
    "#DAA520",
    "#FF4500", // Dark yellow shades
    "#FF0000",
    "#B22222",
    "#8B0000",
    "#FF6347",
    "#CD5C5C", // Red shades
  ];

  // New dark blue gradient color for the cards
  const darkBlueGradient =
    "linear-gradient(135deg,rgb(50, 0, 0),rgb(84, 1, 1),rgb(130, 0, 0))";

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: " #1e0000" }}>
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
        {/* KPI Section */}
        <Row gutter={16}>
          {kpiData.map((kpi, index) => (
            <Col xs={24} md={6} key={index}>
              <Card bordered={false} style={{ background: darkBlueGradient }}>
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
                    <Title level={5} style={{ color: "white" }}>
                      {kpi.title}
                    </Title>
                    <Text style={{ color: "white", fontSize: "24px" }}>
                      {kpi.value}
                    </Text>
                    <p style={{ color: "white" }}>{kpi.description}</p>
                  </div>

                  {/** KPI Section with modified donut chart thickness and size */}
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
                                    color: "black",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                  }}
                                >
                                  <p>
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
                          onClick={(e) => handlePieChartClick(e, index)} // Handle click event
                        >
                          {kpi.donutData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Chart Section */}
        <Row gutter={16} style={{ marginTop: "20px" }}>
          <Col xs={24} md={16}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "rgba(254, 118, 118, 0.1)",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <Title level={5} style={{ color: "#fff", textAlign: "center" }}>
                Monthly Cube Count (Sand, Graphite, and Mines)
              </Title>
              <ResponsiveContainer width="100%" height={350}>
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "10px",
                    color: "#fff",
                  }}
                >
                  {/* Title */}

                  {/* Description */}
                  <p style={{ fontSize: "12px", color: "#ffef2f" }}>
                    + 50% of cube count increased
                  </p>
                </div>
                <LineChart data={lineData}>
                  {/* Axis styles */}
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

                  {/* Grid styling */}
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />

                  {/* Tooltip styling */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#333",
                      border: "none",
                      color: "#fff",
                      borderRadius: "6px",
                    }}
                  />

                  {/* Line for Sand */}
                  <Line
                    type="monotone"
                    dataKey="sand"
                    stroke="url(#sandGradient)" // Gradient fill for sand
                    strokeWidth={4}
                    dot={{
                      stroke: "url(#sandDotGradient)",
                      strokeWidth: 3,
                      r: 6,
                    }}
                    activeDot={{
                      stroke: "url(#sandDotGradient)",
                      strokeWidth: 4,
                      r: 8,
                    }}
                    animationDuration={1000} // Smooth animation effect
                  />

                  {/* Line for Graphite */}
                  <Line
                    type="monotone"
                    dataKey="graphite"
                    stroke="url(#graphiteGradient)" // Gradient fill for graphite
                    strokeWidth={4}
                    dot={{
                      stroke: "url(#graphiteDotGradient)",
                      strokeWidth: 3,
                      r: 6,
                    }}
                    activeDot={{
                      stroke: "url(#graphiteDotGradient)",
                      strokeWidth: 4,
                      r: 8,
                    }}
                    animationDuration={1000} // Smooth animation effect
                  />

                  {/* Line for Mines */}
                  <Line
                    type="monotone"
                    dataKey="mines"
                    stroke="url(#minesGradient)" // Gradient fill for mines
                    strokeWidth={4}
                    dot={{
                      stroke: "url(#minesDotGradient)",
                      strokeWidth: 3,
                      r: 6,
                    }}
                    activeDot={{
                      stroke: "url(#minesDotGradient)",
                      strokeWidth: 4,
                      r: 8,
                    }}
                    animationDuration={1000} // Smooth animation effect
                  />

                  {/* Adding Gradient Definitions */}
                  <defs>
                    {/* Sand Gradient */}
                    <linearGradient
                      id="sandGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: "#FF8C00", stopOpacity: 1 }}
                      />
                      <stop
                        offset="95%"
                        style={{ stopColor: "#B8860B", stopOpacity: 0.8 }}
                      />
                    </linearGradient>

                    {/* Graphite Gradient */}
                    <linearGradient
                      id="graphiteGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: "#FFD700", stopOpacity: 1 }}
                      />
                      <stop
                        offset="95%"
                        style={{ stopColor: "#FF8C00", stopOpacity: 0.8 }}
                      />
                    </linearGradient>

                    {/* Mines Gradient */}
                    <linearGradient
                      id="minesGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: "#B8860B", stopOpacity: 1 }}
                      />
                      <stop
                        offset="95%"
                        style={{ stopColor: "#FFD700", stopOpacity: 0.8 }}
                      />
                    </linearGradient>

                    {/* Sand Dots Gradient */}
                    <linearGradient
                      id="sandDotGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: "#FF8C00", stopOpacity: 1 }}
                      />
                      <stop
                        offset="95%"
                        style={{ stopColor: "#B8860B", stopOpacity: 0.6 }}
                      />
                    </linearGradient>

                    {/* Graphite Dots Gradient */}
                    <linearGradient
                      id="graphiteDotGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: "#FFD700", stopOpacity: 1 }}
                      />
                      <stop
                        offset="95%"
                        style={{ stopColor: "#FF8C00", stopOpacity: 0.6 }}
                      />
                    </linearGradient>

                    {/* Mines Dots Gradient */}
                    <linearGradient
                      id="minesDotGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="5%"
                        style={{ stopColor: "#B8860B", stopOpacity: 1 }}
                      />
                      <stop
                        offset="95%"
                        style={{ stopColor: "#FFD700", stopOpacity: 0.6 }}
                      />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "rgba(254, 118, 118, 0.1)", // Dark background
                borderRadius: "8px",
                color: "#fff",
              }}
            >
              <Title
                level={5}
                style={{
                  color: "#fff",
                  marginBottom: "20px",
                }}
              >
                Mining Areas
              </Title>
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  {/* Left-side label changed to "Tonnes" */}
                  <span
                    style={{ color: "#fff", flex: 1 }}
                  >{`${item.label}`}</span>
                  {/* Progress bar with dynamic color */}
                  <Progress
                    percent={item.value}
                    showInfo={false}
                    strokeColor={getDynamicColor(item.value)}
                    trailColor="#d9d9d9" // Light gray trail
                    style={{
                      width: "70%",
                      margin: "0 12px",
                    }}
                  />
                  {/* Percentage value on the right */}
                  <span
                    style={{ color: "#fff", width: "30px", textAlign: "right" }}
                  >
                    {item.value}%
                  </span>
                </div>
              ))}
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "20px", display: "flex" }}>
          <Col xs={24} md={8}>
            <Card
              title={
                <span style={{ color: "#fff" }}> Top Royalty Contributors</span>
              } // Title in white
              style={{
                backgroundColor: "rgba(254, 118, 118, 0.1)",
                borderRadius: "8px",
                height: "100%", // Ensures all cards have the same height
                display: "flex",
                flexDirection: "column", // Makes card contents stack vertically
                border: "none", // Removes border
                outline: "none", // Removes outline
              }}
            >
              <List
                dataSource={recentOrders}
                renderItem={(item) => (
                  <List.Item style={{ color: "#fff" }}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <span style={{ color: "#ffef2f" }}>{item.title}</span>
                      }
                      description={
                        <span style={{ color: "#ffef2f" }}>
                          {item.description}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              title={
                <span style={{ color: "#fff" }}>
                  Annual Top Mining License Categories
                </span>
              } // Title in white
              style={{
                backgroundColor: "rgba(254, 118, 118, 0.1)",
                borderRadius: "8px",
                height: "100%", // Ensures all cards have the same height
                display: "flex",
                flexDirection: "column", // Makes card contents stack vertically
                border: "none", // Removes border
                outline: "none", // Removes outline
              }}
            >
              <div style={{ color: "#fff" }}>
                {" "}
                {/* Ensure text inside card is white */}
                <p>Sand</p>
                <Progress
                  percent={100}
                  success={{ percent: 75 }}
                  format={() => <span style={{ color: "#fff" }}>750</span>} // Format text in white
                  strokeColor="#ffef2f"
                  style={{ height: "30px" }} // Increase height of the progress bar (200%)
                />
                <p>Graphite</p>
                <Progress
                  percent={75}
                  success={{ percent: 50 }}
                  format={() => <span style={{ color: "#fff" }}>500</span>} // Format text in white
                  strokeColor="#ffef2f"
                  style={{ height: "30px" }} // Increase height of the progress bar (200%)
                />
                <p>Gravel</p>
                <Progress
                  percent={53}
                  success={{ percent: 20 }}
                  format={() => <span style={{ color: "#fff" }}>150</span>} // Format text in white
                  strokeColor="#ffef2f"
                  style={{ height: "30px" }} // Increase height of the progress bar (200%)
                />
                <p>Rutile</p>
                <Progress
                  percent={27}
                  success={{ percent: 5 }}
                  format={() => <span style={{ color: "#fff" }}>30</span>} // Format text in white
                  strokeColor="#ffef2f"
                  style={{ height: "30px" }} // Increase height of the progress bar (200%)
                />
              </div>
            </Card>
          </Col>

          <Col xs={24} md={8}>
            <Card
              bordered={false}
              style={{
                backgroundColor: "rgba(254, 118, 118, 0.1)",
                borderRadius: "8px",
                height: "100%", // Ensures all cards have the same height
                display: "flex",
                flexDirection: "column", // Makes card contents stack vertically
              }}
            >
              <Title level={5} style={{ color: "#fff", textAlign: "center" }}>
                Transport License Destinations
              </Title>
              <p
                style={{
                  color: "#ffef2f",
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
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
                      <Cell key={`cell-${index}`} fill={colors[index]} />
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
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;

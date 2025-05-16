import PropTypes from "prop-types"; // Add this import for prop validation
import { useState, useEffect } from "react";
import { Layout, Card, Row, Col, Progress, Statistic, Tabs } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ScheduleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import "../../styles/MiningEngineer/MEDashboard.css";
import AppointmentsPage from "../MiningEngineer/Appointments.jsx";
import ApprovedLicensesTable from "./ApprovedLisencesTable.jsx";
import RejectedLicensesTable from "./RejectedLisencesTable.jsx";
import ViewLicenseModal from "./ViewDetails.jsx";
import { useLanguage } from "../../contexts/LanguageContext";
import { licenseCount } from "../../services/miningEngineerService";

const { Content } = Layout;
const { TabPane } = Tabs;

const MEDashboard = () => {
  const { language } = useLanguage();
  const [pendingAppointments, setPendingAppointments] = useState(12);
  const [scheduledAppointments, setScheduledAppointments] = useState(24);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvedLicenses, setApprovedLicenses] = useState(42);
  const [rejectedLicenses] = useState(5); // Removed setRejectedLicenses since it's unused
  const [licenseTrend] = useState("improving"); // Removed setLicenseTrend since it's unused

  const [licenses] = useState([
    {
      id: 1,
      licenseNumber: "ML-2023-001",
      owner: "Pasindu Lakshan",
      businessName: "ABC Mining",
      location: "Kaduwela",
      type: "Quarry",
      appliedDate: "2023-06-10",
      date: "2023-06-15",
      status: "approved",
      rejectionReason: "",
      documents: {
        license: "/sample-docs/license1.pdf",
        applicationForm: "/sample-docs/app1.pdf",
        idProof: "/sample-docs/id1.pdf",
        addressProof: "/sample-docs/address1.pdf",
      },
    },
    {
      id: 2,
      licenseNumber: "ML-2023-002",
      owner: "Another Owner",
      businessName: "XYZ Minerals",
      location: "Colombo",
      type: "Metal",
      appliedDate: "2023-06-15",
      date: "2023-06-20",
      status: "rejected",
      rejectionReason: "Incomplete documentation",
      documents: {
        license: "/sample-docs/license2.pdf",
        applicationForm: "/sample-docs/app2.pdf",
        idProof: "/sample-docs/id2.pdf",
        addressProof: "/sample-docs/address2.pdf",
      },
    },
  ]);

  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    const fetchCounts = async () => {
      const data = await licenseCount();
      // If API returns an array, get the first item, else use as is
      const counts = Array.isArray(data) ? data[0] : data;
      console.log("Counts from API:", counts);
      setPendingAppointments(counts["Awaiting ME Scheduling"] ?? 0);
      setScheduledAppointments(counts["ME Appointment Scheduled"] ?? 0);
      setApprovedLicenses(counts["ME Approved"] ?? 0);
      setRejectedLicenses(counts["Rejected"] ?? 0);
    };
    fetchCounts();
  }, []);

  const handleViewDetails = (id) => {
    setSelectedLicense(id);
    setModalVisible(true);
  };

  return (
    <Layout className="me-dashboard" style={{ minHeight: "100vh" }}>
      <Content className="me-content" style={{ margin: "16px" }}>
        <Row
          className="me-metrics-row"
          gutter={16}
          style={{ marginBottom: 24 }}
        >
          <Col className="me-metrics-col" span={6}>
            <Card className="me-stat-card me-stat-card--mines">
              <Statistic
                className="me-stat-card__content"
                title={
                  language === "en"
                    ? "Pending Appointments"
                    : "நிலுவையிலுள்ள சந்திப்புகள்"
                }
                value={pendingAppointments}
                suffix={
                  language === "en"
                    ? "awaiting scheduling"
                    : "திட்டமிடல் காத்திருக்கிறது"
                }
              />
              <Progress
                className="me-stat-card__progress"
                percent={Math.round(
                  (pendingAppointments /
                    (pendingAppointments + scheduledAppointments)) *
                    100
                )}
                status="active"
                strokeColor="#faad14"
                strokeWidth={10}
              />
            </Card>
          </Col>
          <Col className="me-metrics-col" span={6}>
            <Card className="me-stat-card me-stat-card--equipment">
              <Statistic
                className="me-stat-card__content"
                title={
                  language === "en"
                    ? "Scheduled Appointments"
                    : "திட்டமிடப்பட்ட சந்திப்புகள்"
                }
                value={scheduledAppointments}
                suffix={
                  language === "en"
                    ? "inspections planned"
                    : "திட்டமிடப்பட்ட ஆய்வுகள்"
                }
              />
              <Progress
                className="me-stat-card__progress"
                percent={Math.round(
                  (scheduledAppointments /
                    (pendingAppointments + scheduledAppointments)) *
                    100
                )}
                status="active"
                strokeColor="#3333C4"
                strokeWidth={10}
              />
            </Card>
          </Col>
          <Col className="me-metrics-col" span={6}>
            <Card className="me-stat-card me-stat-card--safety">
              <Statistic
                className="me-stat-card__content"
                title={
                  language === "en"
                    ? "Approved Licenses"
                    : "அங்கீகரிக்கப்பட்ட உரிமங்கள்"
                }
                value={approvedLicenses}
                suffix={
                  language === "en"
                    ? `${licenseTrend} from last month`
                    : `${licenseTrend} கடந்த மாதத்திலிருந்து`
                }
              />
              <Progress
                className="me-stat-card__progress"
                percent={Math.round(
                  (approvedLicenses / (approvedLicenses + rejectedLicenses)) *
                    100
                )}
                status={licenseTrend === "improving" ? "success" : "exception"}
                strokeWidth={10}
                format={(percent) => `${percent}% approval rate`}
              />
            </Card>
          </Col>
          <Col className="me-metrics-col" span={6}>
            <Card className="me-stat-card me-stat-card--production">
              <Statistic
                className="me-stat-card__content"
                title={
                  language === "en"
                    ? "Rejected Licenses"
                    : "நிராகரிக்கப்பட்ட உரிமங்கள்"
                }
                value={rejectedLicenses}
                suffix={language === "en" ? "needs review" : "மறுபரிசீலனை தேவை"}
              />
              <Progress
                className="me-stat-card__progress"
                percent={Math.round(
                  (rejectedLicenses / (approvedLicenses + rejectedLicenses)) *
                    100
                )}
                status="exception"
                strokeColor="#ff4d4f"
                strokeWidth={10}
              />
            </Card>
          </Col>
        </Row>

        <Tabs
          className="modern-tabs"
          activeKey={activeTab}
          onChange={setActiveTab}
          tabBarStyle={{
            marginBottom: 24,
            paddingLeft: 8,
            borderBottom: "none",
          }}
          tabBarGutter={16}
        >
          <TabPane
            tab={
              <TabLabel
                icon={<ScheduleOutlined />}
                active={activeTab === "pending"}
                title={
                  language === "en"
                    ? "Pending Scheduling"
                    : "நிலுவையிலுள்ள திட்டமிடல்"
                }
                type="pending"
              />
            }
            key="pending"
          >
            <Card className="me-tab-content">
              <AppointmentsPage activeTab="pending" />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <TabLabel
                icon={<CheckCircleOutlined />}
                active={activeTab === "scheduled"}
                title={language === "en" ? "Scheduled" : "திட்டமிடப்பட்டது"}
                type="scheduled"
              />
            }
            key="scheduled"
          >
            <Card className="me-tab-content">
              <AppointmentsPage activeTab="scheduled" />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <TabLabel
                icon={<SafetyCertificateOutlined />}
                active={activeTab === "approved-licenses"}
                title={
                  language === "en"
                    ? "Approved Licenses"
                    : "அங்கீகரிக்கப்பட்ட உரிமங்கள்"
                }
                type="approved"
              />
            }
            key="approved-licenses"
          >
            <Card className="me-tab-content">
              <ApprovedLicensesTable
                data={licenses.filter(
                  (license) => license.status === "approved"
                )}
                onViewDetails={handleViewDetails}
                id={selectedLicense}
                language={language}
              />
            </Card>
          </TabPane>

          <TabPane
            tab={
              <TabLabel
                icon={<CloseCircleOutlined />}
                active={activeTab === "rejected-licenses"}
                title={
                  language === "en"
                    ? "Rejected Licenses"
                    : "நிராகரிக்கப்பட்ட உரிமங்கள்"
                }
                type="rejected"
              />
            }
            key="rejected-licenses"
          >
            <Card className="me-tab-content">
              <RejectedLicensesTable
                data={licenses.filter(
                  (license) => license.status === "rejected"
                )}
                onViewDetails={handleViewDetails}
                language={language}
              />
            </Card>
          </TabPane>
        </Tabs>

        <ViewLicenseModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          selectedLicense={selectedLicense}
          language={language}
        />
      </Content>
    </Layout>
  );
};

// Custom tab label component with PropTypes validation
const TabLabel = ({ icon, title, active, type }) => {
  return (
    <div
      className={`me-tab-label ${active ? "active" : ""} tab-type-${type}`}
      data-tab-key={title.toLowerCase().replace(/\s+/g, "-")}
    >
      <span className="tab-icon">{icon}</span>
      <span className="tab-title">{title}</span>
    </div>
  );
};

TabLabel.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["pending", "scheduled", "approved", "rejected"])
    .isRequired,
};

export default MEDashboard;

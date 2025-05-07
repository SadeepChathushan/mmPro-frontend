import { useState, useEffect } from 'react';
import {
  Layout,
  Card,
  Row,
  Col,
  Tag,
  Button,
  Progress,
  Statistic,
  Menu,
  Table,
  Tabs,
  Space
} from 'antd';
import {
  DashboardOutlined,
  ToolOutlined,
  FileTextOutlined,
  SettingOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  ScheduleOutlined,
  SafetyCertificateOutlined,
  FilePdfOutlined
} from '@ant-design/icons';
import '../../styles/MiningEngineer/MEDashboard.css';
import AppointmentsPage from '../MiningEngineer/Appointments.jsx';
import ApprovedLicensesTable from './ApprovedLisencesTable.jsx';
import RejectedLicensesTable from './RejectedLisencesTable.jsx';
import ViewLicenseModal from './ViewDetails.jsx';
import { useLanguage } from "../../contexts/LanguageContext";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const MEDashboard = () => {
  const { language } = useLanguage();
  const [pendingAppointments, setPendingAppointments] = useState(12);
  const [scheduledAppointments, setScheduledAppointments] = useState(24);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvedLicenses, setApprovedLicenses] = useState(42);
  const [rejectedLicenses, setRejectedLicenses] = useState(5);
  const [licenseTrend, setLicenseTrend] = useState('improving');
  
  const [productionData] = useState([
    { day: 'Mon', ore: 4500, waste: 3200 },
    { day: 'Tue', ore: 5200, waste: 2800 },
    { day: 'Wed', ore: 4800, waste: 3100 },
    { day: 'Thu', ore: 5100, waste: 2900 },
    { day: 'Fri', ore: 4900, waste: 3300 },
    { day: 'Sat', ore: 3800, waste: 2500 },
    { day: 'Sun', ore: 0, waste: 0 }
  ]);

  const [licenses] = useState([
    {
      id: 1,
      licenseNumber: 'ML-2023-001',
      owner: 'Pasindu Lakshan',
      businessName: 'ABC Mining',
      location: 'Kaduwela',
      type: 'Quarry',
      appliedDate: '2023-06-10',
      date: '2023-06-15',
      status: 'approved',
      rejectionReason: '',
      documents: {
        license: '/sample-docs/license1.pdf',
        applicationForm: '/sample-docs/app1.pdf',
        idProof: '/sample-docs/id1.pdf',
        addressProof: '/sample-docs/address1.pdf'
      }
    },
    {
      id: 2,
      licenseNumber: 'ML-2023-002',
      owner: 'Another Owner',
      businessName: 'XYZ Minerals',
      location: 'Colombo',
      type: 'Metal',
      appliedDate: '2023-06-15',
      date: '2023-06-20',
      status: 'rejected',
      rejectionReason: 'Incomplete documentation',
      documents: {
        license: '/sample-docs/license2.pdf',
        applicationForm: '/sample-docs/app2.pdf',
        idProof: '/sample-docs/id2.pdf',
        addressProof: '/sample-docs/address2.pdf'
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeAppointmentTab, setActiveAppointmentTab] = useState('pending');
  const [activeLicenseTab, setActiveLicenseTab] = useState('approved');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setPendingAppointments(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
        setScheduledAppointments(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
        setApprovedLicenses(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      key: 'dashboard', 
      icon: <DashboardOutlined />, 
      label: language === "en" ? "Dashboard" : "டாஷ்போர்டு"
    },
    {
      key: 'appointments',
      icon: <ScheduleOutlined />,
      label: language === "en" ? "Appointments" : "சந்திப்புகள்",
      children: [
        {
          key: 'pending-scheduling', 
          label: language === "en" ? "Pending Scheduling" : "நிலுவையிலுள்ள திட்டமிடல்"
        },
        {
          key: 'scheduled', 
          label: language === "en" ? "Scheduled" : "திட்டமிடப்பட்டது"
        }
      ]
    },
    {
      key: 'mining-licenses',
      icon: <SafetyCertificateOutlined />,
      label: language === "en" ? "Mining Licenses" : "சுரங்க உரிமங்கள்",
      children: [
        { 
          key: 'approved-licenses', 
          label: language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது" 
        },
        { 
          key: 'rejected-licenses', 
          label: language === "en" ? "Rejected" : "நிராகரிக்கப்பட்டது" 
        }
      ]
    },
    { 
      key: 'reports', 
      icon: <FileTextOutlined />, 
      label: language === "en" ? "Reports" : "அறிக்கைகள்" 
    },
    { 
      key: 'settings', 
      icon: <SettingOutlined />, 
      label: language === "en" ? "Settings" : "அமைப்புகள்" 
    },
  ];

  const renderMenuItems = (items) => {
    return items.map(item => {
      if (item.children) {
        return (
          <SubMenu 
            key={item.key} 
            icon={item.icon} 
            title={item.label}
            className="me-sidebar__submenu"
          >
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item 
          key={item.key} 
          icon={item.icon}
          className="me-sidebar__menu-item"
        >
          {item.label}
        </Menu.Item>
      );
    });
  };

  const handleViewDetails = (license) => {
    setSelectedLicense(license);
    setModalVisible(true);
  };

  return (
    <Layout className="me-dashboard" style={{ minHeight: '100vh' }}>
      <Sider
        className="me-sidebar"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        theme="light"
      >
        <div className="me-sidebar__logo">
          {collapsed ? (
            <ToolOutlined className="me-sidebar__logo-icon" />
          ) : (
            <h2 className="me-sidebar__logo-text">
              {language === "en" ? "Mining Operations" : "சுரங்க செயல்பாடுகள்"}
            </h2>
          )}
        </div>
        <Menu
          className="me-sidebar__menu"
          theme="light"
          defaultSelectedKeys={['dashboard']}
          defaultOpenKeys={['appointments', 'mining-licenses']}
          mode="inline"
          onSelect={({ key }) => {
            if (key === 'pending-scheduling' || key === 'scheduled') {
              setActiveTab('appointments');
              setActiveAppointmentTab(key === 'pending-scheduling' ? 'pending' : 'approved');
            } else if (key === 'approved-licenses' || key === 'rejected-licenses') {
              setActiveTab('mining-licenses');
              setActiveLicenseTab(key === 'approved-licenses' ? 'approved' : 'rejected');
            } else {
              setActiveTab(key);
            }
          }}
        >
          {renderMenuItems(menuItems)}
        </Menu>
      </Sider>

      <Layout className="me-content-area">
        <Content className="me-content" style={{ margin: '16px' }}>
          {activeTab === 'dashboard' && (
            <>
              <Row className="me-metrics-row" gutter={16} style={{ marginBottom: 16 }}>
                <Col className="me-metrics-col" span={6}>
                  <Card className="me-stat-card me-stat-card--mines">
                    <Statistic
                      className="me-stat-card__content"
                      title={language === "en" ? "Pending Appointments" : "நிலுவையிலுள்ள சந்திப்புகள்"}
                      value={pendingAppointments}
                      suffix={language === "en" 
                        ? "awaiting scheduling" 
                        : "திட்டமிடல் காத்திருக்கிறது"}
                    />
                    <Progress
                      className="me-stat-card__progress"
                      percent={Math.round((pendingAppointments / (pendingAppointments + scheduledAppointments)) * 100)}
                      status="active"
                      strokeColor="#faad14"
                    />
                  </Card>
                </Col>
                <Col className="me-metrics-col" span={6}>
                  <Card className="me-stat-card me-stat-card--equipment">
                    <Statistic
                      className="me-stat-card__content"
                      title={language === "en" ? "Scheduled Appointments" : "திட்டமிடப்பட்ட சந்திப்புகள்"}
                      value={scheduledAppointments}
                      suffix={language === "en" 
                        ? "inspections planned" 
                        : "திட்டமிடப்பட்ட ஆய்வுகள்"}
                    />
                    <Progress
                      className="me-stat-card__progress"
                      percent={Math.round((scheduledAppointments / (pendingAppointments + scheduledAppointments)) * 100)}
                      status="active"
                      strokeColor="#52c41a"
                    />
                  </Card>
                </Col>
                <Col className="me-metrics-col" span={6}>
                  <Card className="me-stat-card me-stat-card--safety">
                    <Statistic
                      className="me-stat-card__content"
                      title={language === "en" ? "Approved Licenses" : "அங்கீகரிக்கப்பட்ட உரிமங்கள்"}
                      value={approvedLicenses}
                      suffix={language === "en" 
                        ? `${licenseTrend} from last month` 
                        : `${licenseTrend} கடந்த மாதத்திலிருந்து`}
                    />
                    <Progress
                      className="me-stat-card__progress"
                      percent={Math.round((approvedLicenses / (approvedLicenses + rejectedLicenses)) * 100)}
                      status={licenseTrend === 'improving' ? 'success' : 'exception'}
                      format={percent => `${percent}% approval rate`}
                    />
                  </Card>
                </Col>
                <Col className="me-metrics-col" span={6}>
                  <Card className="me-stat-card me-stat-card--production">
                    <Statistic
                      className="me-stat-card__content"
                      title={language === "en" ? "Rejected Licenses" : "நிராகரிக்கப்பட்ட உரிமங்கள்"}
                      value={rejectedLicenses}
                      suffix={language === "en" 
                        ? "needs review" 
                        : "மறுபரிசீலனை தேவை"}
                    />
                    <Progress
                      className="me-stat-card__progress"
                      percent={Math.round((rejectedLicenses / (approvedLicenses + rejectedLicenses)) * 100)}
                      status="exception"
                      strokeColor="#ff4d4f"
                    />
                  </Card>
                </Col>
              </Row>

              <Card
                className="me-production-card"
                title={language === "en" ? "Weekly License Approvals" : "வாராந்திர உரிமை அங்கீகாரங்கள்"}
                style={{ marginBottom: 16 }}
                extra={
                  <Button type="link" className="me-production-card__view-details">
                    {language === "en" ? "View Details" : "விவரங்களை பார்வையிட"}
                  </Button>
                }
              >
                <Row className="me-production-card__chart" gutter={16}>
                  {productionData.map((day) => (
                    <Col key={day.day} span={3}>
                      <div className="me-production-card__chart-column">
                        <div className="me-production-card__chart-bars">
                          <div 
                            className="me-production-card__chart-bar me-production-card__chart-bar--ore"
                            style={{ height: `${day.ore / 100}px` }}
                          ></div>
                          <div 
                            className="me-production-card__chart-bar me-production-card__chart-bar--waste"
                            style={{ height: `${day.waste / 100}px` }}
                          ></div>
                        </div>
                        <div className="me-production-card__chart-label">{day.day}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="me-production-card__legend">
                  <Tag className="me-tag me-tag--ore" color="green">Approved</Tag>
                  <Tag className="me-tag me-tag--waste" color="red">Rejected</Tag>
                </div>
              </Card>
            </>
          )}

          {activeTab === 'appointments' && (
            <AppointmentsPage activeTab={activeAppointmentTab} />
          )}

          {activeTab === 'mining-licenses' && (
            <Card className="me-licenses-card">
              <Tabs 
                className="me-licenses-tabs"
                activeKey={activeLicenseTab} 
                onChange={(key) => setActiveLicenseTab(key)}
              >
                <TabPane
                  tab={
                    <span className="me-licenses-tab">
                      <CheckCircleOutlined className="me-licenses-tab__icon me-licenses-tab__icon--approved" />
                      {language === "en" ? " Approved Licenses" : " அங்கீகரிக்கப்பட்ட உரிமைகள்"}
                    </span>
                  }
                  key="approved"
                >
                  <ApprovedLicensesTable 
                    className="me-licenses-table"
                    data={licenses.filter(license => license.status === 'approved')}
                    onViewDetails={handleViewDetails}
                    language={language}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <span className="me-licenses-tab">
                      <CloseCircleOutlined className="me-licenses-tab__icon me-licenses-tab__icon--rejected" />
                      {language === "en" ? " Rejected Licenses" : " நிராகரிக்கப்பட்ட உரிமைகள்"}
                    </span>
                  }
                  key="rejected"
                >
                  <RejectedLicensesTable 
                    className="me-licenses-table"
                    data={licenses.filter(license => license.status === 'rejected')}
                    onViewDetails={handleViewDetails}
                    language={language}
                  />
                </TabPane>
              </Tabs>
            </Card>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'appointments' && activeTab !== 'mining-licenses' && (
            <Card className="me-generic-card">
              <h3 className="me-generic-card__title">
                {menuItems.find(item => item.key === activeTab)?.label} View
              </h3>
              <p className="me-generic-card__content">
                This section would contain detailed {activeTab} information and management tools.
              </p>
            </Card>
          )}
        </Content>
      </Layout>

      <ViewLicenseModal 
        className="me-license-modal"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        selectedLicense={selectedLicense}
        language={language}
      />
    </Layout>
  );
};

export default MEDashboard;
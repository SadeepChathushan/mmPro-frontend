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
import { useLanguage } from "../../contexts/LanguageContext";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

const RejectedApprovedLicenseTable = ({ licenses, onViewDetails, language }) => {
  const commonColumns = [
    {
      title: language === "en" ? "License No" : "அனுமதி எண்",
      dataIndex: 'licenseNumber',
      key: 'licenseNo',
      render: (text, record) => (
        <Tag color={record.status === 'approved' ? 'green' : 'red'}>
          {text}
        </Tag>
      )
    },
    {
      title: language === "en" ? "ML Owner" : "உரிமையாளர்",
      dataIndex: 'owner',
      key: 'owner'
    },
    {
      title: language === "en" ? "Location" : "இடம்",
      dataIndex: 'location',
      key: 'location'
    },
    {
      title: language === "en" ? "Date" : "தேதி",
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: language === "en" ? "Actions" : "செயல்கள்",
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => onViewDetails(record)}>
            {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
          </a>
          <a href={record.documents.license} target="_blank" rel="noopener noreferrer">
            <FilePdfOutlined /> {language === "en" ? "License" : "உரிமம்"}
          </a>
        </Space>
      )
    }
  ];

  const approvedColumns = [
    ...commonColumns,
    {
      title: language === "en" ? "Status" : "நிலை",
      key: 'status',
      render: () => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {language === "en" ? "Approved" : "அங்கீகரிக்கப்பட்டது"}
        </Tag>
      )
    }
  ];

  const rejectedColumns = [
    ...commonColumns,
    {
      title: language === "en" ? "Status" : "நிலை",
      key: 'status',
      render: () => (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {language === "en" ? "Rejected" : "நிராகரிக்கப்பட்டது"}
        </Tag>
      )
    }
  ];

  return (
    <Tabs defaultActiveKey="approved">
      <TabPane
        tab={
          <span>
            <CheckCircleOutlined />
            {language === "en" ? " Approved" : " அங்கீகரிக்கப்பட்டது"}
          </span>
        }
        key="approved"
      >
        <Table
          columns={approvedColumns}
          dataSource={licenses.filter(license => license.status === 'approved')}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </TabPane>
      <TabPane
        tab={
          <span>
            <CloseCircleOutlined />
            {language === "en" ? " Rejected" : " நிராகரிக்கப்பட்டது"}
          </span>
        }
        key="rejected"
      >
        <Table
          columns={rejectedColumns}
          dataSource={licenses.filter(license => license.status === 'rejected')}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </TabPane>
    </Tabs>
  );
};

const MEDashboard = () => {
  const { language } = useLanguage();
  const [activeMines, setActiveMines] = useState(3);
  const [equipmentStatus, setEquipmentStatus] = useState({
    operational: 42,
    maintenance: 5,
    outOfService: 3
  });
  const [safetyIncidents, setSafetyIncidents] = useState({
    thisMonth: 2,
    lastMonth: 4,
    trend: 'improving'
  });
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
      location: 'Kaduwela',
      date: '2023-06-15',
      status: 'approved',
      documents: {
        license: '/sample-docs/license1.pdf'
      }
    },
    {
      id: 2,
      licenseNumber: 'ML-2023-002',
      owner: 'Another Owner',
      location: 'Colombo',
      date: '2023-06-20',
      status: 'rejected',
      documents: {
        license: '/sample-docs/license2.pdf'
      }
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeAppointmentTab, setActiveAppointmentTab] = useState('pending');
  const [activeLicenseTab, setActiveLicenseTab] = useState('approved');
  const [collapsed, setCollapsed] = useState(false);

  const viewLicenseDetails = (license) => {
    console.log('Viewing license details:', license);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setEquipmentStatus(prev => ({
          ...prev,
          operational: Math.max(0, prev.operational + (Math.random() > 0.5 ? 1 : -1)),
          maintenance: Math.max(0, prev.maintenance + (Math.random() > 0.5 ? 1 : -1))
        }));
      }

      if (Math.random() > 0.9) {
        const newAlert = {
          id: Date.now(),
          type: ['equipment', 'safety', 'production'][Math.floor(Math.random() * 3)],
          message: `New ${['equipment', 'safety', 'production'][Math.floor(Math.random() * 3)]} alert detected`,
          priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
          time: 'Just now',
          resolved: false
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    {
      key: 'dashboard', icon: <DashboardOutlined />, label: language === "en"
        ? "Dashboard"
        : language === "si"
          ? ""
          : "டாஷ்போர்டு"
    },
    {
      key: 'appointments',
      icon: <ScheduleOutlined />,
      label: language === "en"
        ? "Appointments"
        : language === "si"
          ? ""
          : "சந்திப்புகள்",
      children: [
        {
          key: 'pending-scheduling', label: language === "en"
            ? "Pending Scheduling"
            : language === "si"
              ? ""
              : "நிலுவையிலுள்ள திட்டமிடல்"
        },
        {
          key: 'scheduled', label: language === "en"
            ? "Scheduled"
            : language === "si"
              ? ""
              : "திட்டமிடப்பட்டது"
        }
      ]
    },
    {
      key: 'mining-licenses',
      icon: <SafetyCertificateOutlined />,
      label: language === "en"
        ? "Mining Licenses"
        : language === "si"
          ? ""
          : "சுரங்க உரிமங்கள்",
      children: [
        { key: 'approved-licenses', label: language === "en"
          ? "Approved"
          : language === "si"
          ? ""
          : "அங்கீகரிக்கப்பட்டது" },
        { key: 'rejected-licenses', label: language === "en"
          ? "Rejected"
          : language === "si"
          ? ""
          : "நிராகரிக்கப்பட்டது" }
      ]
    },
    { key: 'reports', icon: <FileTextOutlined />, label: language === "en"
      ? "Reports"
      : language === "si"
      ? ""
      : "அறிக்கைகள்"
     },
    { key: 'settings', icon: <SettingOutlined />, label: language === "en"
      ? "Settings"
      : language === "si"
      ? ""
      : "அமைப்புகள்" },
  ];

  const renderMenuItems = (items) => {
    return items.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.label}>
            {renderMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} icon={item.icon}>
          {item.label}
        </Menu.Item>
      );
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        theme="light"
      >
        <div className="logo" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {collapsed ? <ToolOutlined style={{ fontSize: '24px' }} /> : <h2>{language === "en"
            ? "Mining Operations"
            : language === "si"
              ? ""
              : "சுரங்க செயல்பாடுகள்"}</h2>}
        </div>
        <Menu
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

      <Layout>
        <Content style={{ margin: '16px' }}>
          {activeTab === 'dashboard' && (
            <>
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title={language === "en" ? "Active Mines" : "செயலில் உள்ள சுரங்கங்கள்"}
                      value={activeMines}
                      suffix={language === "en" 
                        ? `${activeMines} open pit, 0 underground` 
                        : `${activeMines} திறந்த குழி, 0 நிலத்தடி`}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title={language === "en" ? "Equipment Status" : "உபகரணங்களின் நிலை"}
                      value={`${equipmentStatus.operational}/${equipmentStatus.operational + equipmentStatus.maintenance + equipmentStatus.outOfService}`}
                      suffix={language === "en" 
                        ? `${equipmentStatus.maintenance} in maintenance` 
                        : `${equipmentStatus.maintenance} பராமரிப்பில் உள்ளது`}
                    />
                    <Progress
                      percent={Math.round((equipmentStatus.operational / (equipmentStatus.operational + equipmentStatus.maintenance + equipmentStatus.outOfService)) * 100)}
                      status="active"
                      strokeColor="#52c41a"
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title={language === "en" ? "Safety Incidents" : "பாதுகாப்பு சம்பவங்கள்"}
                      value={safetyIncidents.thisMonth}
                      suffix={language === "en" 
                        ? `${safetyIncidents.trend} from last month` 
                        : `${safetyIncidents.trend} கடந்த மாதத்திலிருந்து`}
                    />
                    <Progress
                      percent={Math.round((1 - safetyIncidents.thisMonth / safetyIncidents.lastMonth) * 100)}
                      status={safetyIncidents.trend === 'improving' ? 'success' : 'exception'}
                      format={percent => `${percent}% ${safetyIncidents.trend}`}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title={language === "en" ? "Daily Production" : "தினசரி உற்பத்தி"}
                      value={productionData.find(d => d.day === 'Fri').ore}
                      suffix={language === "en" 
                        ? "tons ore mined today" 
                        : "இன்று அகழப்பட்ட தாது தொன்கள்"}
                    />
                    <Progress
                      percent={Math.round((productionData.find(d => d.day === 'Fri').ore / 6000 * 100))}
                      status="normal"
                    />
                  </Card>
                </Col>
              </Row>

              <Card
                title={language === "en" ? "Weekly Production (tons)" : "வாராந்திர உற்பத்தி (தொன்கள்)"}
                style={{ marginBottom: 16 }}
                extra={<Button type="link">{language === "en" 
                  ? "View Details" 
                  : "விவரங்களை பார்வையிட"}</Button>}
              >
                <Row gutter={16}>
                  {productionData.map((day) => (
                    <Col key={day.day} span={3}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                          <div style={{
                            height: `${day.ore / 100}px`,
                            backgroundColor: '#1890ff',
                            marginBottom: '4px',
                            borderRadius: '4px 4px 0 0'
                          }}></div>
                          <div style={{
                            height: `${day.waste / 100}px`,
                            backgroundColor: '#faad14',
                            borderRadius: '0 0 4px 4px'
                          }}></div>
                        </div>
                        <div>{day.day}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                  <Tag color="blue">Ore</Tag>
                  <Tag color="orange">Waste</Tag>
                </div>
              </Card>

            </>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'appointments' && activeTab !== 'mining-licenses' && (
            <Card>
              <h3>{menuItems.find(item => item.key === activeTab)?.label} View</h3>
              <p>This section would contain detailed {activeTab} information and management tools.</p>
            </Card>
          )}

          {activeTab === 'appointments' && (
            <AppointmentsPage activeTab={activeAppointmentTab} />
          )}

{activeTab === 'mining-licenses' && (
  <Card>
    <Tabs 
      activeKey={activeLicenseTab} 
      onChange={(key) => setActiveLicenseTab(key)}
    >
      <TabPane
        tab={
          <span>
            <CheckCircleOutlined />
            {language === "en" ? " Approved Licenses" : " அங்கீகரிக்கப்பட்ட உரிமைகள்"}
          </span>
        }
        key="approved"
      >
        <Table
          columns={[
            {
              title: language === "en" ? "License No" : "அனுமதி எண்",
              dataIndex: 'licenseNumber',
              key: 'licenseNo',
              render: (text) => <Tag color="green">{text}</Tag>
            },
            {
              title: language === "en" ? "ML Owner" : "உரிமையாளர்",
              dataIndex: 'owner',
              key: 'owner'
            },
            {
              title: language === "en" ? "Location" : "இடம்",
              dataIndex: 'location',
              key: 'location'
            },
            {
              title: language === "en" ? "Approved Date" : "அங்கீகரிக்கப்பட்ட தேதி",
              dataIndex: 'date',
              key: 'date'
            },
            {
              title: language === "en" ? "Actions" : "செயல்கள்",
              key: 'actions',
              render: (_, record) => (
                <Space size="middle">
                  <a onClick={() => viewLicenseDetails(record)}>
                    {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
                  </a>
                  <a href={record.documents.license} target="_blank" rel="noopener noreferrer">
                    <FilePdfOutlined /> {language === "en" ? "License" : "உரிமம்"}
                  </a>
                </Space>
              )
            }
          ]}
          dataSource={licenses.filter(license => license.status === 'approved')}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </TabPane>
      <TabPane
        tab={
          <span>
            <CloseCircleOutlined />
            {language === "en" ? " Rejected Licenses" : " நிராகரிக்கப்பட்ட உரிமைகள்"}
          </span>
        }
        key="rejected"
      >
        <Table
          columns={[
            {
              title: language === "en" ? "License No" : "அனுமதி எண்",
              dataIndex: 'licenseNumber',
              key: 'licenseNo',
              render: (text) => <Tag color="red">{text}</Tag>
            },
            {
              title: language === "en" ? "ML Owner" : "உரிமையாளர்",
              dataIndex: 'owner',
              key: 'owner'
            },
            {
              title: language === "en" ? "Location" : "இடம்",
              dataIndex: 'location',
              key: 'location'
            },
            {
              title: language === "en" ? "Rejected Date" : "நிராகரிக்கப்பட்ட தேதி",
              dataIndex: 'date',
              key: 'date'
            },
            {
              title: language === "en" ? "Actions" : "செயல்கள்",
              key: 'actions',
              render: (_, record) => (
                <Space size="middle">
                  <a onClick={() => viewLicenseDetails(record)}>
                    {language === "en" ? "View Details" : "விவரங்களைக் காட்டு"}
                  </a>
                  <a href={record.documents.license} target="_blank" rel="noopener noreferrer">
                    <FilePdfOutlined /> {language === "en" ? "License" : "உரிமம்"}
                  </a>
                </Space>
              )
            }
          ]}
          dataSource={licenses.filter(license => license.status === 'rejected')}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </TabPane>
    </Tabs>
  </Card>
)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MEDashboard;
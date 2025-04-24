import { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Tag, 
  Button, 
  Progress, 
  Alert, 
  Statistic,
  Menu
} from 'antd';
import {
  DashboardOutlined,
  SafetyOutlined,
  ToolOutlined,
  BarChartOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ScheduleOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import '../../styles/MiningEngineer/MEDashboard.css';
import AppointmentsPage from '../MiningEngineer/Appointments.jsx';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const MEDashboard = () => {
  // State for dashboard data
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

  // Alerts state with interactive functionality
  const [alerts, setAlerts] = useState([
    { 
      id: 1, 
      type: 'equipment', 
      message: 'Excavator #7 requires maintenance', 
      priority: 'high', 
      time: '2 hours ago',
      resolved: false
    },
    { 
      id: 2, 
      type: 'safety', 
      message: 'Safety inspection overdue in Sector B', 
      priority: 'medium', 
      time: '5 hours ago',
      resolved: false
    },
    { 
      id: 3, 
      type: 'production', 
      message: 'Ore grade below target in Pit 3', 
      priority: 'low', 
      time: '1 day ago',
      resolved: false
    }
  ]);

  // Active tab state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeAppointmentTab, setActiveAppointmentTab] = useState('pending');
  const [activeLicenseTab, setActiveLicenseTab] = useState('approved');
  const [collapsed, setCollapsed] = useState(false);

  // Handle alert resolution
  const resolveAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate occasional equipment status changes
      if (Math.random() > 0.7) {
        setEquipmentStatus(prev => ({
          ...prev,
          operational: Math.max(0, prev.operational + (Math.random() > 0.5 ? 1 : -1)),
          maintenance: Math.max(0, prev.maintenance + (Math.random() > 0.5 ? 1 : -1))
        }));
      }

      // Simulate occasional new alerts
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

  // Menu items
  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { 
      key: 'appointments', 
      icon: <ScheduleOutlined />, 
      label: 'Appointments',
      children: [
        { key: 'pending-scheduling', label: 'Pending Scheduling' },
        { key: 'scheduled', label: 'Scheduled' }
      ]
    },
    { 
      key: 'mining-licenses', 
      icon: <SafetyCertificateOutlined />, 
      label: 'Mining Licenses',
      children: [
        { key: 'approved-licenses', label: 'Approved' },
        { key: 'rejected-licenses', label: 'Rejected' }
      ]
    },
    { key: 'safety', icon: <SafetyOutlined />, label: 'Safety' },
    { key: 'personnel', icon: <TeamOutlined />, label: 'Personnel' },
    { key: 'reports', icon: <FileTextOutlined />, label: 'Reports' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
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
      {/* Sidebar Navigation */}
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        theme="light"
      >
        <div className="logo" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {collapsed ? <ToolOutlined style={{ fontSize: '24px' }} /> : <h2>Mining Operations</h2>}
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
        {/* Main Content */}
        <Content style={{ margin: '16px' }}>
          {activeTab === 'dashboard' && (
            <>
              {/* Overview Cards */}
              <Row gutter={16} style={{ marginBottom: 16 }}>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="Active Mines"
                      value={activeMines}
                      suffix={`${activeMines} open pit, 0 underground`}
                    />
                  </Card>
                </Col>
                <Col span={6}>
                  <Card>
                    <Statistic
                      title="Equipment Status"
                      value={`${equipmentStatus.operational}/${equipmentStatus.operational + equipmentStatus.maintenance + equipmentStatus.outOfService}`}
                      suffix={`${equipmentStatus.maintenance} in maintenance`}
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
                      title="Safety Incidents"
                      value={safetyIncidents.thisMonth}
                      suffix={`${safetyIncidents.trend} from last month`}
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
                      title="Daily Production"
                      value={productionData.find(d => d.day === 'Fri').ore}
                      suffix="tons ore mined today"
                    />
                    <Progress 
                      percent={Math.round((productionData.find(d => d.day === 'Fri').ore / 6000 * 100))}
                      status="normal"
                    />
                  </Card>
                </Col>
              </Row>

              {/* Production Chart */}
              <Card 
                title="Weekly Production (tons)" 
                style={{ marginBottom: 16 }}
                extra={<Button type="link">View Details</Button>}
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

              {/* Alerts and Quick Actions */}
              <Row gutter={16}>
                <Col span={16}>
                  <Card 
                    title="Active Alerts" 
                    extra={<Button type="link" onClick={() => setAlerts([])}>Clear All</Button>}
                  >
                    {alerts.filter(a => !a.resolved).length === 0 ? (
                      <Alert message="No active alerts" type="success" showIcon />
                    ) : (
                      <div>
                        {alerts.filter(a => !a.resolved).map(alert => (
                          <Alert
                            key={alert.id}
                            message={alert.message}
                            description={`Priority: ${alert.priority} • ${alert.time}`}
                            type={
                              alert.priority === 'high' ? 'error' : 
                              alert.priority === 'medium' ? 'warning' : 'info'
                            }
                            showIcon
                            icon={
                              alert.priority === 'high' ? <WarningOutlined /> : 
                              alert.priority === 'medium' ? <ClockCircleOutlined /> : <CheckCircleOutlined />
                            }
                            action={
                              <Button 
                                size="small" 
                                type="primary" 
                                onClick={() => resolveAlert(alert.id)}
                              >
                                Resolve
                              </Button>
                            }
                            style={{ marginBottom: '8px' }}
                          />
                        ))}
                      </div>
                    )}
                  </Card>
                </Col>
                <Col span={8}>
                  <Card title="Quick Actions">
                    <Button 
                      type="primary" 
                      block 
                      style={{ marginBottom: '8px' }}
                      icon={<FileTextOutlined />}
                    >
                      Start Shift Report
                    </Button>
                    <Button 
                      block 
                      style={{ marginBottom: '8px' }}
                      icon={<ToolOutlined />}
                    >
                      Log Equipment Issue
                    </Button>
                    <Button 
                      block 
                      style={{ marginBottom: '8px' }}
                      icon={<SafetyOutlined />}
                    >
                      Record Safety Incident
                    </Button>
                    <Button 
                      block 
                      icon={<BarChartOutlined />}
                    >
                      Generate Production Summary
                    </Button>
                  </Card>
                </Col>
              </Row>
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
              <h3>Mining Licenses - {activeLicenseTab === 'approved' ? 'Approved' : 'Rejected'}</h3>
              <p>This section would contain a list of {activeLicenseTab} mining licenses with details.</p>
              {/* You would add your table or list component for mining licenses here */}
            </Card>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MEDashboard;
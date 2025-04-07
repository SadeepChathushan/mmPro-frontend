import React from "react";
import { 
  Table, Tag, Button, Space, Input, Select, DatePicker, 
  Typography, Row, Col, Card, Form, Statistic 
} from "antd";
import { 
  SearchOutlined, FilterOutlined, 
  WarningOutlined, FileTextOutlined, 
  DashboardOutlined, CarOutlined 
} from "@ant-design/icons";

const { Column } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

const ComplaintsManagementSystem = () => {
  // Sample data
  const [complaints, setComplaints] = React.useState([
    {
      key: "1",
      vehicleNo: "NC-AB 1234",
      violation: "no_permit",
      location: "Colombo",
      status: "Pending",
      date: "2024-05-20",
      reporter: "Public (Anonymous)"
    },
    {
      key: "2",
      vehicleNo: "NC-XY 5678",
      violation: "overloaded",
      location: "Kandy",
      status: "In Progress",
      date: "2024-05-19",
      reporter: "Miner's Association"
    }
  ]);

  // Vehicle history function
  const showVehicleHistory = (vehicleNo) => {
    console.log("Showing history for vehicle:", vehicleNo);
    // Would typically open a modal with vehicle history
  };

  // Verify vehicle function
  const verifyVehicle = (vehicleNo) => {
    console.log("Verifying vehicle:", vehicleNo);
    // API call to verify vehicle
  };

  // Escalate complaint function
  const escalateComplaint = (key) => {
    console.log("Escalating complaint with key:", key);
    // API call to escalate
  };

  // Resolve complaint function
  const handleResolve = (record) => {
    const updated = complaints.map(item => 
      item.key === record.key ? { ...item, status: "Resolved" } : item
    );
    setComplaints(updated);
  };

  // Submit new complaint
  const onFinish = (values) => {
    const newComplaint = {
      key: `GSMB-${Date.now()}`,
      vehicleNo: values.vehicleNo,
      violation: values.violation,
      location: values.location || "Unknown",
      status: "Pending",
      date: new Date().toISOString().split('T')[0],
      reporter: "Public"
    };
    setComplaints([...complaints, newComplaint]);
  };

  // Search and filter logic
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  });

  return (
    <div style={{ padding: 24 }}>
      {/* Header Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Title level={3} style={{ marginBottom: 0 }}>
             Mining Transport Complaints System
          </Title>
        </Col>
      </Row>

      {/* Status Cards */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card size="small">
            <Statistic 
              title="Total Complaints" 
              value={complaints.length} 
              prefix={<FileTextOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic 
              title="Pending" 
              value={complaints.filter(c => c.status === "Pending").length} 
              prefix={<DashboardOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic 
              title="In Progress" 
              value={complaints.filter(c => c.status === "In Progress").length} 
              prefix={<DashboardOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card size="small">
            <Statistic 
              title="Resolved" 
              value={complaints.filter(c => c.status === "Resolved").length} 
              prefix={<DashboardOutlined />} 
            />
          </Card>
        </Col>
      </Row>

      {/* Complaint Submission Form */}
      <Card 
        title={<span><CarOutlined /> Report Invalid Mining Vehicle</span>} 
        style={{ marginBottom: 24 }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item 
                label="Vehicle Number" 
                name="vehicleNo"
                rules={[{ required: true, message: 'Please input vehicle number!' }]}
              >
                <Input placeholder="e.g. NC-AB 1234" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Violation Type" name="violation">
                <Select placeholder="Select violation">
                  <Option value="no_permit">No Valid Permit</Option>
                  <Option value="overloaded">Overloaded Vehicle</Option>
                  <Option value="expired">Expired License</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Location" name="location">
                <Input placeholder="e.g. Colombo" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Complaint
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Complaints Table */}
      <Card title={<span><FileTextOutlined /> Active Vehicle Complaints</span>}>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Input
              placeholder="Search complaints..."
              prefix={<SearchOutlined />}
              style={{ width: 200 }}
            />
            <Select 
              placeholder="Filter by status" 
              style={{ width: 150 }}
              onChange={value => console.log(value)} // Add actual filter logic
            >
              <Option value="all">All Statuses</Option>
              <Option value="pending">Pending</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="resolved">Resolved</Option>
            </Select>
            <RangePicker style={{ width: 250 }} />
            <Button icon={<FilterOutlined />}>More Filters</Button>
          </Space>
        </div>

        <Table
          dataSource={complaints}
          bordered
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 10 }}
        >
          <Column
            title="Vehicle No."
            dataIndex="vehicleNo"
            key="vehicleNo"
            render={(text) => <a onClick={() => showVehicleHistory(text)}>{text}</a>}
            {...getColumnSearchProps("vehicleNo")}
          />
          <Column
            title="Violation"
            dataIndex="violation"
            key="violation"
            filters={[
              { text: "No Permit", value: "no_permit" },
              { text: "Overloaded", value: "overloaded" },
              { text: "Expired License", value: "expired" },
            ]}
            onFilter={(value, record) => record.violation === value}
            render={(violation) => (
              <Tag color={
                violation === "no_permit" ? "red" : 
                violation === "overloaded" ? "orange" : "gold"
              }>
                {violation.replace('_', ' ')}
              </Tag>
            )}
          />
          <Column
            title="Location"
            dataIndex="location"
            key="location"
            {...getColumnSearchProps("location")}
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            filters={[
              { text: "Pending", value: "Pending" },
              { text: "In Progress", value: "In Progress" },
              { text: "Resolved", value: "Resolved" },
            ]}
            onFilter={(value, record) => record.status === value}
            render={(status) => (
              <Tag color={
                status === "Pending" ? "orange" : 
                status === "In Progress" ? "blue" : "green"
              }>
                {status}
              </Tag>
            )}
          />
          <Column
            title="Date Reported"
            dataIndex="date"
            key="date"
            sorter={(a, b) => new Date(a.date) - new Date(b.date)}
          />
          <Column
            title="Action"
            key="action"
            fixed="right"
            render={(_, record) => (
              <Space size="middle">
                <Button onClick={() => verifyVehicle(record.vehicleNo)}>
                  Verify
                </Button>
                <Button 
                  type="primary" 
                  ghost 
                  onClick={() => escalateComplaint(record.key)}
                >
                  Escalate
                </Button>
                <Button 
                  type="primary" 
                  onClick={() => handleResolve(record)}
                  disabled={record.status === "Resolved"}
                >
                  Resolve
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default ComplaintsManagementSystem;
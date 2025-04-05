import { useState } from "react";
import { Button, Table, Tag, Tabs, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { confirm } = Modal;

const officersData = [
  { id: 1, name: "John Doe", role: "Police Officer", active: false },
  { id: 2, name: "Jane Smith", role: "Police Officer", active: true },
  { id: 3, name: "Robert Johnson", role: "GSMB Officer", active: false },
  { id: 4, name: "Emily Davis", role: "GSMB Officer", active: true },
];

const Activation = () => {
  const [officers, setOfficers] = useState(officersData);
  const [activeTab, setActiveTab] = useState("police");

  const toggleActive = (id) => {
    confirm({
      title: 'Confirm Activation Status Change',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to change this officer\'s activation status?',
      onOk() {
        setOfficers(officers.map(officer => 
          officer.id === id ? { ...officer, active: !officer.active } : officer
        ));
      },
      onCancel() {
        console.log('Cancelled');
      },
    });
  };

  const handleSave = () => {
    // Add your save logic here
    console.log("Officers data saved:", officers);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      key: 'active',
      render: (_, record) => (
        <Tag color={record.active ? 'green' : 'red'}>
          {record.active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          onClick={() => toggleActive(record.id)}
          style={{ background: record.active ? '#ff4d4f' : '#52c41a' }}
        >
          {record.active ? 'Deactivate' : 'Activate'}
        </Button>
      ),
    },
  ];

  const policeOfficers = officers.filter(officer => officer.role === "Police Officer");
  const gsmbOfficers = officers.filter(officer => officer.role === "GSMB Officer");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Officer Activation</h1>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="mb-4"
      >
        <TabPane tab="Police Officers" key="police">
          <Table 
            columns={columns} 
            dataSource={policeOfficers} 
            rowKey="id"
            pagination={false}
          />
        </TabPane>
        <TabPane tab="GSMB Officers" key="gsmb">
          <Table 
            columns={columns} 
            dataSource={gsmbOfficers} 
            rowKey="id"
            pagination={false}
          />
        </TabPane>
      </Tabs>

      <Button 
        type="primary" 
        onClick={handleSave}
        className="mt-4"
        size="large"
      >
        Save All Changes
      </Button>
    </div>
  );
};

export default Activation;
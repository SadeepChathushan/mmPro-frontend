import { useState, useEffect } from "react";
import { Button, Table, Tag, Tabs, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchUnActiveUsers } from "../../services/management";

const { TabPane } = Tabs;
const { confirm } = Modal;

const Activation = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("police");

  useEffect(() => {
    const fetchOfficers = async () => {
      setLoading(true);
      try {
        const response = await fetchUnActiveUsers();
        if (response.success) {
          // The API already returns only inactive users (status = 3)
          setOfficers(response.officers);
        } else {
          message.error(response.error);
        }
      } catch (error) {
        message.error("Failed to load officers data");
      } finally {
        setLoading(false);
      }
    };

    fetchOfficers();
  }, []);

  const toggleActive = (id) => {
    confirm({
      title: "Confirm Activation Status Change",
      icon: <ExclamationCircleOutlined />,
      content:
        "Are you sure you want to change this officer's activation status?",
      async onOk() {
        try {
          // Here you should call your API to update the status
          // For now, we'll just update the local state
          setOfficers(
            officers.map(
              (officer) =>
                officer.id === id ? { ...officer, status: 1 } : officer // Assuming 1 is active status
            )
          );
          message.success("Status updated successfully");
        } catch (error) {
          message.error("Failed to update status");
        }
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Designation",
      key: "designation",
      render: (_, record) => record.custom_fields?.Designation || "N/A",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag color={record.status === 3 ? "red" : "green"}>
          {record.status === 3 ? "Inactive" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => toggleActive(record.id)}
          style={{ background: record.status === 3 ? "#52c41a" : "#ff4d4f" }}
          loading={loading}
        >
          {record.status === 3 ? "Activate" : "Deactivate"}
        </Button>
      ),
    },
  ];

  // Filter officers based on User Type
  const policeOfficers = officers.filter(
    (officer) => officer.custom_fields?.["User Type"] === "police"
  );
  const gsmbOfficers = officers.filter(
    (officer) => officer.custom_fields?.["User Type"] === "gsmbOfficer"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Inactive Officers</h1>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
        <TabPane tab="Police Officers" key="police">
          <Table
            columns={columns}
            dataSource={policeOfficers}
            rowKey="id"
            pagination={false}
            loading={loading}
          />
        </TabPane>
        <TabPane tab="GSMB Officers" key="gsmb">
          <Table
            columns={columns}
            dataSource={gsmbOfficers}
            rowKey="id"
            pagination={false}
            loading={loading}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Activation;

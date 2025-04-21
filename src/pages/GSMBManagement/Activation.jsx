import { useState, useEffect } from "react";
import { Button, Table, Tag, Tabs, Modal, message } from "antd";
import { ExclamationCircleOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons";
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
        console.log("API Response:", response);
        
        if (response.success) {
          const officersData = response.officers?.officers || response.officers || [];
          setOfficers(officersData);
        } else {
          message.error(response.error);
        }
      } catch (error) {
        message.error("Failed to load officers data");
        console.error("Error fetching officers:", error);
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
      content: "Are you sure you want to change this officer's activation status?",
      async onOk() {
        try {
          setOfficers(
            officers.map((officer) =>
              officer.id === id ? { ...officer, status: officer.status === 3 ? 1 : 3 } : officer
            )
          );
          message.success("Status updated successfully");
        } catch (error) {
          message.error("Failed to update status");
          console.error("Error updating status:", error);
        }
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const handleDownload = (url, filename) => {
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = url;
    
    // Extract filename from URL or use a default
    const downloadName = filename || url.split('/').pop() || 'document';
    link.download = downloadName;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      title: "National ID",
      key: "national_id",
      render: (_, record) => record.custom_fields?.["National Identity Card"] || "N/A",
    },
    {
      title: "NIC Front Image",
      key: "nic_front",
      render: (_, record) => {
        const imageUrl = record.custom_fields?.["NIC front image"];
        return imageUrl ? (
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(imageUrl, "NIC_Front")}
          >
            Download
          </Button>
        ) : "N/A";
      },
    },
    {
      title: "NIC Back Image",
      key: "nic_back",
      render: (_, record) => {
        const imageUrl = record.custom_fields?.["NIC back image"];
        return imageUrl ? (
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(imageUrl, "NIC_Back")}
          >
            Download
          </Button>
        ) : "N/A";
      },
    },
    {
      title: "Work ID",
      key: "work_id",
      render: (_, record) => {
        const workIdUrl = record.custom_fields?.["work ID"];
        return workIdUrl ? (
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(workIdUrl, "Work_ID")}
          >
            Download
          </Button>
        ) : "N/A";
      },
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
          style={{ 
            background: record.status === 3 ? "#52c41a" : "#ff4d4f",
            borderColor: record.status === 3 ? "#52c41a" : "#ff4d4f"
          }}
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
      <h1 className="text-2xl font-bold mb-4">Officer Activation</h1>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        className="mb-4"
        items={[
          {
            key: "police",
            label: "Police Officers",
            children: (
              <Table
                columns={columns}
                dataSource={policeOfficers}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            ),
          },
          {
            key: "gsmb",
            label: "GSMB Officers",
            children: (
              <Table
                columns={columns}
                dataSource={gsmbOfficers}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default Activation;
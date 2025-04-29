import { useState, useEffect } from "react";
import { Button, Table, Tag, Tabs, Modal, message } from "antd";
import { ExclamationCircleOutlined, EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { fetchUnActiveUsers, activateOfficer } from "../../services/management";
import { useLanguage } from "../../contexts/LanguageContext";

const { TabPane } = Tabs;
const { confirm } = Modal;

const Activation = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(false); // Loading for initial fetch
  const [activating, setActivating] = useState(null); // Loading state for specific row activation
  const [activeTab, setActiveTab] = useState("police");
  const { language } = useLanguage();


  useEffect(() => {
    const fetchOfficers = async () => {
      setLoading(true);
      try {
        const response = await fetchUnActiveUsers();
        console.log("API Response:", response);

        if (response.success) {
          const officersData =
            response.officers?.officers || response.officers || [];
          setOfficers(officersData);
        } else {
          message.error(response.error || "Failed to parse officers data");
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
    // Find the current officer to determine the target status
    const officerToUpdate = officers.find((officer) => officer.id === id);
    if (!officerToUpdate) {
      message.error("Officer not found.");
      return;
    }

    const currentStatus = officerToUpdate.status;
    const newStatus = currentStatus === 3 ? 1 : 3; // 1 = Active, 3 = Inactive
    const actionText = newStatus === 1 ? "activate" : "deactivate";

    confirm({
      title: `Confirm Officer ${
        actionText.charAt(0).toUpperCase() + actionText.slice(1)
      }`,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to ${actionText} this officer?`,
      async onOk() {
        // Set loading state for this specific row's action
        setActivating(id);
        try {
          // Prepare the data payload for the API
          const updateData = { status: newStatus };

          console.log(
            `Attempting to ${actionText} officer ID:`,
            id,
            "with data:",
            updateData
          );

          // Call the backend service
          const response = await activateOfficer(id, updateData);

          if (response.success) {
            // Update the local state ONLY after successful API call
            setOfficers(
              officers.map((officer) =>
                officer.id === id
                  ? { ...officer, status: newStatus } // Use the calculated newStatus
                  : officer
              )
            );
            message.success(`Officer ${actionText}d successfully`, 1.5, () => {
              window.location.reload();
            });
            console.log(`Successfully ${actionText}d officer ID:`, id);
          } else {
            // Handle API error response
            message.error(response.error || `Failed to ${actionText} officer`);
            console.error(
              `Failed to ${actionText} officer ID: ${id}, Error: ${response.error}`
            );
          }
        } catch (error) {
          // Handle network or unexpected errors
          message.error(`Failed to ${actionText} officer due to an error.`);
          console.error(
            `Error trying to ${actionText} officer ID ${id}:`,
            error
          );
        } finally {
          // Remove loading state for this specific row
          setActivating(null);
        }
      },
      onCancel() {
        console.log("Activation/Deactivation cancelled for officer ID:", id);
      },
    });
  };

  const handleDownload = (url, filename) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;

    // Extract filename from URL or use a default
    const downloadName = filename || url.split("/").pop() || "document";
    link.download = downloadName;

    // Trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    // ... (other columns remain the same) ...
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
      render: (_, record) =>
        record.custom_fields?.["National Identity Card"] || "N/A",
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
            onClick={() =>
              handleDownload(imageUrl, `NIC_Front_${record.name || record.id}`)
            }
          >
            Download
          </Button>
        ) : (
          "N/A"
        );
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
            onClick={() =>
              handleDownload(imageUrl, `NIC_Back_${record.name || record.id}`)
            }
          >
            Download
          </Button>
        ) : (
          "N/A"
        );
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
            onClick={() =>
              handleDownload(workIdUrl, `Work_ID_${record.name || record.id}`)
            }
          >
            Download
          </Button>
        ) : (
          "N/A"
        );
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
            borderColor: record.status === 3 ? "#52c41a" : "#ff4d4f",
          }}
          // Show loading indicator on the specific button being processed
          loading={activating === record.id}
        >
          {record.status === 3 ? "Activate" : "Deactivate"}
        </Button>
      ),
    },
  ];

  const columnme = [
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
  const columnmo = [
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "NIC Number",
      key: "national_id",
      render: (_, record) => record.custom_fields?.["National Identity Card"] || "N/A",
    },
    {
      title: "Mobile Number",
      key: "mobile_number",
      render: (_, record) => record.custom_fields?.["Mobile Number"] || "N/A",
    }
  ];



  // Filter officers based on User Type
  const policeOfficers = officers.filter(
    (officer) => officer.custom_fields?.["User Type"] === "police"
  );
  const gsmbOfficers = officers.filter(
    (officer) => officer.custom_fields?.["User Type"] === "gsmbOfficer"
  );
  const miningEngineer = officers.filter(
    (officer) => officer.custom_fields?.["User Type"] === "miningengineer"
  );
  const mlowner = officers.filter(
    (officer) => officer.custom_fields?.["User Type"] === "mlowner"
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{language === "en"
        ? "Officer Activation"
        : language === "si"
          ? ""
          : "அதிகாரி செயல்படுத்தல்"}</h1>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="mb-4"
        items={[
          {
            key: "police",
            label: language === "en"
              ? "Police Officers"
              : language === "si"
                ? ""
                : "போலீஸ் அதிகாரிகள்",
            children: (
              <Table
                columns={columns}
                dataSource={policeOfficers}
                rowKey="id"
                loading={loading} // General loading for initial data fetch
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            ),
          },
          {
            key: "gsmb",
            label: language === "en"
              ? "GSMB Officers"
              : language === "si"
                ? ""
                : "GSMB அதிகாரிகள்",
            children: (
              <Table
                columns={columns}
                dataSource={gsmbOfficers}
                rowKey="id"
                loading={loading} // General loading for initial data fetch
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            ),
          },
          {
            key: "mengineer",
            label: language === "en"
              ? "Mining Engineer"
              : language === "si"
                ? ""
                : "சுரங்கப் பொறியாளர்",
            children: (
              <Table
                columns={columnme}
                dataSource={miningEngineer}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
                scroll={{ x: true }}
              />
            ),
          },
          {
            key: "mlowner",
            label: language === "en"
              ? "ML Owner"
              : language === "si"
                ? ""
                : " சுரங்க உரிம உரிமையாளர்",
            children: (
              <Table
                columns={columnmo}
                dataSource={mlowner}
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

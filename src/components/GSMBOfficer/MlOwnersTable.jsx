import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import officerService from "../../services/officerService"; // Import officerService

const MlOwnersTable = () => {
  const [ownersData, setOwnersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState("en"); // default to "en"

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch ML Owners and their licenses
        const owners = await officerService.getMlOwners();
        console.log("Fetched ML Owners with licenses:", owners);

        setOwnersData(owners); // Store the data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  // Handle License Status Change (Activate/Deactivate)
  const handleLicenseStatusChange = async (licenseId, currentStatus) => {
    try {
      if (currentStatus === 'active') {
        // Deactivate the license
        await officerService.deactivateLicense(licenseId);
      } else {
        // Activate the license
        await officerService.activateLicense(licenseId);
      }
      // Optionally refresh data or show a success message
      message.success(`License status changed successfully.`)
    } catch (error) {
      console.error("Error updating license status:", error);
      message.error("Failed to update license status.");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Owner Name",
      dataIndex: "owner_name", // Changed from ownerName to owner_name
      key: "ownerName",
    },
    {
      title: "Email",
      key: "email",
      render: (_, record) => {
        // Changed to access mail directly from user_details
        const email = record.user_details?.mail || "No Email";
        return email;
      },
    },
    {
      title: "NIC",
      key: "nic",
      render: (_, record) => {
        // Correctly accessing custom_fields from user_details
        const nicField = record.user_details?.custom_fields?.find(field => field.name === "NIC");
        return nicField ? nicField.value : "N/A";
      },
    },
    {
      title: "Phone Number",
      key: "phone",
      render: (_, record) => {
        // Correctly accessing custom_fields from user_details
        const phoneField = record.user_details?.custom_fields?.find(field => field.name === "Phone Number");
        return phoneField ? phoneField.value : "N/A";
      },
    },
    {
      title: "Total Licenses",
      dataIndex: "licenses",
      key: "licenses",
      render: (licenses) => licenses?.length || 0,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/gsmb/add-new-license/${record.id}`}>
          <Button type="default" style={{ backgroundColor: "white", borderColor: "#d9d9d9" }}>
            {language === "en" ? "+ Add New License" : "+ නව අවසරපත්‍රයක් එකතු කරන්න"}
          </Button>
        </Link>
      ),
    },
  ];
  

  // Expanded row render to show the nested table of licenses for each owner
  const expandedRowRender = (record) => {
    const licenseColumns = [
      { title: "License Number", dataIndex: "licenseNumber", key: "licenseNumber" },
      { title: "Location", dataIndex: "location", key: "location" },
      { title: "Capacity", dataIndex: "capacity", key: "capacity" },
      { title: "Issue Date", dataIndex: "issueDate", key: "issueDate" },
      { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
      {
        title: "License Status",
        key: "status",
        render: (_, license) => {
          const buttonText = license.status === 'active' ? 'Deactivate' : 'Activate';
          return (
            <Popconfirm
              title={`Are you sure you want to ${buttonText.toLowerCase()} this license?`}
              onConfirm={() => handleLicenseStatusChange(license.licenseNumber, license.status)}
              okText="Yes"
              cancelText="No"
            >
              <Button type={buttonText === 'Activate' ? 'primary' : 'danger'}>
                {buttonText}
              </Button>
            </Popconfirm>
          );
        },
      },
      {
        title: "Transport License History",
        key: "history",
        render: (_, record) => (
          <Link to={`/gsmb/dashboard/TPLHistory?licenseNumber=${record.licenseNumber}`}>
            <Button type="link" style={{ color: "#000000", backgroundColor: "#ca8282", borderColor: "#ca8282" }}>
              View History
            </Button>
          </Link>
        ),
      },
    ];

    return (
      <Table
        columns={licenseColumns}
        dataSource={record.licenses}
        pagination={false}
        rowKey="licenseNumber"
        style={{
          margin: 0,
          backgroundColor: "#f9f9f9", // Change background color here
        }}
        rowClassName="expanded-row" // Add a CSS class for row customization
      />
    );
  };

  return (
    <div
      style={{
        marginTop: "24px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        padding: "12px",
      }}
    >
      <Table
        dataSource={ownersData}
        columns={columns}
        loading={loading}
        expandable={{ expandedRowRender }}
        rowKey="id"
      />
    </div>
  );
};

export default MlOwnersTable;

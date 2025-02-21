import React, { useState, useEffect } from "react";
import { Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import officerService from "../../services/officerService"; // Import officerService

const MlOwnersTable = () => {
  const [ownersData, setOwnersData] = useState([]);
  const [loading, setLoading] = useState(true);

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
      alert(`License status changed successfully.`);
    } catch (error) {
      console.error("Error updating license status:", error);
    }
  };


  // Define columns for the ML owners table
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Owner Name",
    dataIndex: "ownerName",
    key: "ownerName",
  },
  {
    title: "Email",
    key: "email",
    render: (text, record) => {
      // Check if email exists and use a fallback if missing
      const email = record.userDetails?.mail || "No Email";
      return email;
    },
  },
  {
    title: "NIC",
    key: "nic",
    render: (text, record) => {
      // Access the NIC value from custom_fields
      const nicField = record.userDetails.custom_fields.find(field => field.name === "NIC");
      return nicField ? nicField.value : "N/A";
    },
  },
  {
    title: "Phone Number",
    key: "phone",
    render: (text, record) => {
      // Access the Phone Number value from custom_fields
      const phoneField = record.userDetails.custom_fields.find(field => field.name === "Phone Number");
      return phoneField ? phoneField.value : "N/A";
    },
  },
  {
    title: "Total Licenses",
    dataIndex: "licenses",
    key: "licenses",
    render: (licenses) => licenses.length,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Link to={`/gsmb/ml-owner/${record.id}`} state={{ owner: record }}>
        <Button type="link">View</Button>
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
          // <Link to={`/TPLHistory/${record.licensePrefix}/${record.licenseNumber}/${record.uniqueId}`}>
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

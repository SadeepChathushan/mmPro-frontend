import React from "react";
import { Table, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

const LicenseTable = ({ data, tracker }) => {
  const columns = {
    ML: [
      { title: "ID", dataIndex: "id" },
      { title: "Owner Name", dataIndex: "ownerName" },
      { title: "License Number", dataIndex: "licenseNumber" },
      { title: "Mobile Number", dataIndex: "mobileNumber" },
      { title: "Action", render: (_, record) => renderAction(record, "license") },
    ],
    TPL: [
      { title: "ID", dataIndex: "id" },
      { title: "Mining Owner", dataIndex: "ownerName" },
      { title: "License Number", dataIndex: "licenseNumber" },
      { title: "Lorry Number", dataIndex: "lorryNumber" },
      { title: "Action", render: (_, record) => renderAction(record, "license") },
    ],
    CMPLN: [
      { title: "ID", dataIndex: "id" },
      { title: "Mobile Number", dataIndex: "mobileNumber" },
      { title: "Lorry Number", dataIndex: "lorryNumber" },
      { title: "Complaint Date", dataIndex: "start_date" },
      { title: "Action", render: (_, record) => renderComplaintAction(record) },
    ],
  };
  

  // const renderAction = (record, path) => (
  //   <Link to={`/gsmb/${path}/${record.id}`} state={{ record }}>
  //     <Button type="link">View</Button>
  //   </Link>
  // );
  // const renderAction = (record, path, isComplaint = false) => (
  //   <Link to={`/gsmb/${path}/${record.id}`} state={{ record }}>
  //     <Button type="link">
  //       {isComplaint ? "✓" : "View"}
  //     </Button>
  //   </Link>
  // );

  const renderAction = (record, path) => (
    <Link to={`/gsmb/${path}/${record.id}`} state={{ record }}>
      <Button type="link">View</Button>
    </Link>
  );

  const renderComplaintAction = (record) => (
    <Checkbox
      style={{ fontSize: "18px", color: "black" }}
      onChange={(e) => {
        // Handle checkbox change
        console.log(`Checkbox for record ${record.id} is ${e.target.checked ? "checked" : "unchecked"}`);
        // You can update the state or perform any other action here
      }}
    />
  );


  return <Table dataSource={data} columns={columns[tracker]} rowKey="id" />;
};

export default LicenseTable;

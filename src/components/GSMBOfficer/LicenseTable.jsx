import React from "react";
import { Table, Button } from "antd";
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
      { title: "Assignee", dataIndex: "assignee" },
      { title: "License Number", dataIndex: "licenseNumber" },
      { title: "Lorry Number", dataIndex: "lorryNumber" },
      { title: "Action", render: (_, record) => renderAction(record, "license") },
    ],
    CMPLN: [
      { title: "ID", dataIndex: "id" },
      { title: "Mobile Number", dataIndex: "mobileNumber" },
      { title: "Lorry Number", dataIndex: "lorryNumber" },
      { title: "Complaint ID", dataIndex: "complaintId" },
      { title: "Action", render: (_, record) => renderAction(record, "complaint") },
    ],
  };
  

  const renderAction = (record, path) => (
    <Link to={`/gsmb/${path}/${record.id}`} state={{ record }}>
      <Button type="link">View</Button>
    </Link>
  );

  return <Table dataSource={data} columns={columns[tracker]} rowKey="id" />;
};

export default LicenseTable;

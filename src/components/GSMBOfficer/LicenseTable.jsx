import React from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const LicenseTable = ({ data }) => {
  console.log("LicenseTable received data:", data);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Owner Name", dataIndex: "ownerName", key: "ownerName" },
    { title: "License Number", dataIndex: "licenseNumber", key: "licenseNumber" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link to={`/gsmb/license/${record.id}`} state={{ license: record }}>
          <Button type="link" style={{ backgroundColor: "#05CD99", color: "#000000" }}>
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      dataSource={data || []}
      columns={columns}
      rowKey="licenseId"
      bordered
    />
  );
};

export default LicenseTable;

import React from "react";
import { Table, Button } from "antd";
import { Link } from "react-router-dom";

const LicenseTable = ({ data }) => {
  const columns = [
    { title: "ID", dataIndex: "licenseId", key: "licenseId" },
    { title: "LICENSE NUMBER", dataIndex: "licenseNumber", key: "licenseNumber" },
    { title: "OWNER NAME", dataIndex: "ownerName", key: "ownerName" },
    { title: "LOCATION", dataIndex: "location", key: "location" },
    { title: "CAPACITY (CUBES)", dataIndex: "capacity", key: "capacity" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Link
          to={`/gsmb/license/${record.licenseId}`}
          state={{ license: record }}
        >
          <Button
            type="link"
            style={{ backgroundColor: "#05CD99", color: "#000000" }}
          >
            View
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      rowKey="licenseId"
      style={{ minWidth: "600px", padding:"12px" }}
    />
  );
};

export default LicenseTable;
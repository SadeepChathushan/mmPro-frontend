import React, { useState, useEffect } from "react";
import axios from "axios";

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const username = "Dilmi_123";
        const password = "dIlmI@99";

        const response = await axios.get("/api/projects/gsmb/issues.json", {
          headers: { "Content-Type": "application/json" },
          auth: { username, password },
        });

        const complaintData = response.data.issues.filter(
          (issue) => issue.tracker.name === "Complaints"
        );

        setComplaints(complaintData);
      } catch (err) {
        setError(err.response?.statusText || "Error fetching complaints data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>{error}</div>;
  }

  if (!complaints.length) {
    return <div style={{ textAlign: "center", marginTop: "20px", color: "#777" }}>No complaints found</div>;
  }

  return (
    <div
      style={{
        overflowX: "auto",
        marginTop: "16px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#f4f4f4",
              textAlign: "left",
              color: "#555",
              borderBottom: "2px solid #ddd",
            }}
          >
            <th style={{ padding: "10px", fontWeight: "bold" }}>Complaint ID</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Lorry Number</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Role</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Assigned To</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Subject</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Start Date</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Due Date</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr
              key={complaint.id}
              style={{
                borderBottom: "1px solid #ddd",
              }}
            >
              <td style={{ padding: "10px" }}>
                {complaint.custom_fields.find((field) => field.name === "Complaint ID")?.value || "N/A"}
              </td>
              <td style={{ padding: "10px" }}>
                {complaint.custom_fields.find((field) => field.name === "Lorry Number")?.value || "N/A"}
              </td>
              <td style={{ padding: "10px" }}>
                {complaint.custom_fields.find((field) => field.name === "Role")?.value || "N/A"}
              </td>
              <td style={{ padding: "10px" }}>{complaint.assigned_to?.name || "N/A"}</td>
              <td style={{ padding: "10px" }}>{complaint.subject || "N/A"}</td>
              <td style={{ padding: "10px" }}>{complaint.start_date || "N/A"}</td>
              <td style={{ padding: "10px" }}>{complaint.due_date || "N/A"}</td>
              <td style={{ padding: "10px" }}>{complaint.status?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;

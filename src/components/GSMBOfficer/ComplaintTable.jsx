import React, { useState, useEffect } from "react";
import { Checkbox, message } from "antd";
import axios from "axios";
// import { CMPLN } from "./LicenseTable.jsx";


const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resolvingId, setResolvingId] = useState(null);

  const updateResolvedStatus = async (complaintId, newResolvedStatus) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
  message.error("User not authenticated. Please log in again.");
  return;
}
    console.log("Token being sent:", token);

    const payload = {
      resolved: newResolvedStatus ? "1" : "0",
    };

    const response = await axios.put(
      `http://127.0.0.1:5000/gsmb-officer/complaint/${complaintId}/resolve`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Add this explicitly
        },
      }
    );

    if (response.data.success) {
      message.success(`Complaint ${complaintId} marked as ${newResolvedStatus ? "resolved" : "not resolved"}`);

      setComplaints((prevComplaints) =>
        prevComplaints.map((c) =>
          c.id === complaintId ? { ...c, resolved: newResolvedStatus ? "1" : "0" } : c
        )
      );
    } else {
      message.error(response.data.message || "Failed to update complaint status.");
    }
  } catch (err) {
    message.error(`Failed to update complaint ${complaintId}`);
    console.error(err);
  }
};

  
  

  const columns = CMPLN(language).map(col => {
    if (col.title === (language === "en" ? "Resolved" : language === "si" ? "විසඳා ඇත" : "தீர்க்கப்பட்டது")) {
      return {
        ...col,
        render: (_, record) => renderComplaintAction(record),
      };
    }
    return col;
  });


  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // const username = "Dilmi_123";
        // const password = "dIlmI@99";
        const token = localStorage.getItem("token");

        // const response = await axios.get("/api/projects/gsmb/issues.json", {
        //   headers: { "Content-Type": "application/json" },
        //   auth: { username, password },
        // });

        // const complaintData = response.data.issues.filter(
        //   (issue) => issue.tracker.name === "Complaints"
        // );
        const response = await axios.get("/api/gsmb_officer/get-complaints", {
          headers: { Authorization: token },
        });

        if (response.data.success) {

        setComplaints(response.data.data);
        } else {
          setError(response.data.message || "Failed to load complaints");
        }
      } catch (err) {
        setError(err.response?.statusText || "Error fetching complaints data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  
  


  const handleResolve = async (issueId) => {
    try {
      setResolvingId(issueId);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `/api/gsmb_officer/complaint/${issueId}/resolve`,
        {},
        { headers: { Authorization: token } }
      );

      if (response.data.success) {
        // Update resolved status in the UI
        setComplaints((prev) =>
          prev.map((complaint) =>
            complaint.id === issueId
              ? { ...complaint, resolved: "1", status: { name: "Resolved" } }
              : complaint
          )
        );
      } else {
        alert(response.data.error || "Failed to resolve complaint");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error resolving complaint");
    } finally {
      setResolvingId(null);
    }
  };
  const renderComplaintAction = (record) => {
    <Checkbox
    checked={record.resolved === "1"}
    onChange={(e) => updateResolvedStatus(record.id, e.target.checked)}
  />
    if (record.resolved === "1") {
      return (
        <span style={{ color: "green", fontWeight: "bold" }}>
          ✔️ {language === "en" ? "Resolved" : language === "si" ? "විසඳා ඇත" : "தீர்க்கப்பட்டது"}
        </span>
      );
    }

    return (
      <button
        onClick={() => handleResolve(record.id)}
        disabled={resolvingId === record.id}
        style={{
          padding: "4px 8px",
          cursor: resolvingId === record.id ? "not-allowed" : "pointer",
        }}
      >
        {resolvingId === record.id
          ? language === "en" ? "Resolving..." : language === "si" ? "විසඳමින්..." : "தீர்க்கப்படுகிறது..."
          : language === "en" ? "Mark Resolved" : language === "si" ? "විසඳා ඇත" : "தீர்க்கப்பட்டது"}
      </button>
    );
  };


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
            {/* <th style={{ padding: "10px", fontWeight: "bold" }}>Complaint ID</th> */}
            <th style={{ padding: "10px", fontWeight: "bold" }}>Lorry Number</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Role</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Assigned To</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Subject</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Start Date</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Due Date</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Status</th>
            <th style={{ padding: "10px", fontWeight: "bold" }}>Actions</th>

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
              {/* <td style={{ padding: "10px" }}>
                {complaint.custom_fields.find((field) => field.name === "Complaint ID")?.value || "N/A"}
              </td> */}
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
              <td style={{ padding: "10px" }}>{complaint.resolved === "1" ? "Resolved" : "Pending"}</td>
              {/* <td style={{ padding: "10px" }}>
                {complaint.resolved === "1" ? (
                  "✔️ Resolved"
                ) : (
                  <button
                    onClick={() => handleResolve(complaint.id)}
                    disabled={resolvingId === complaint.id}
                  >
                    {resolvingId === complaint.id ? "Resolving..." : "Mark Resolved"}
                  </button>
                )}
              </td> */}
              <td>
                  <Checkbox
                    checked={complaint.resolved === "1"}
                    onChange={(e) =>
                      updateResolvedStatus(complaint.id, e.target.checked)
                    }
                  >
                    Resolved
                  </Checkbox>
                </td>
            </tr>
          ))}
          {/* {complaints.map(complaint => (
            <tr key={complaint.id} style={{ borderBottom: "1px solid #ddd" }}>
              {CMPLN.map(col =>
                col.render
                  ? <td key={col.dataIndex || col.title} style={{ padding: "10px" }}>{col.render(null, complaint)}</td>
                  : <td key={col.dataIndex || col.title} style={{ padding: "10px" }}>{complaint[col.dataIndex] || "N/A"}</td>
              )}
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintTable;

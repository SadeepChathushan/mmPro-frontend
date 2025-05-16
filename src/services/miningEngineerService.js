import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMeAwatingList = async () => {
    try {
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return [];
      }
  
      const response = await axios.get(
        `${BASE_URL}/mining-engineer/me-pending-licenses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success && Array.isArray(response.data.data)) {
        console.log("Get Mining Engineer Awaiting Mining License  API response:", response.data);
        return response.data.data;
        
      } else {
        console.error(
          "Failed to fetch Mining Engineer Awaiting mining  licenses : Unexpected data format"
        );
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch Mining Engineer Awaiting mining licenses:", error);
      return [];
    }
  };
  

export const getMeScheduledList = async () => {
    try {
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return [];
      }
  
      const response = await axios.get(
        `${BASE_URL}/mining-engineer/me-appointments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success && Array.isArray(response.data.data)) {
        return response.data.data;
      } else {
        console.error("Failed to fetch scheduled appointments: Unexpected data format");
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch scheduled appointments:", error);
      return [];
    }
};


export const updateAppointmentStatus = async (appointmentId, status) => {
    try {
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return { success: false, message: "Authentication required" };
      }
  
      const response = await axios.put(
        `${BASE_URL}/mining-engineer/update-appointment-status`,
        { appointmentId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message || "Failed to update status" };
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
};

export const getAppointmentDetails = async (appointmentId) => {
    try {
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return { success: false, message: "Authentication required" };
      }
  
      const response = await axios.get(
        `${BASE_URL}/mining-engineer/appointment-details/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        return { success: false, message: response.data.message || "Failed to get details" };
      }
    } catch (error) {
      console.error("Failed to get appointment details:", error);
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
};

//This is the function to schedule the appointment date for the mining engineer
//It takes the date as a parameter and sends it to the backend API to schedule the appointment
export const scheduleMiningEngineerAppointmentDate = async (mining_number, date,Google_location) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return { success: false, message: "Authentication required" };
    }

    const response = await axios.post(
      `${BASE_URL}/mining-engineer/create-ml-appointment`,
      { 
        start_date: date,
        mining_license_number: mining_number, 
        Google_location:Google_location
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, message: response.data.message || "Failed to schedule appointment" };
    }
  } catch (error) {
    console.error("Failed to schedule appointment:", error);
    return { success: false, message: error.response?.data?.message || "An error occurred" };
  }
};


export const getMeApproveMiningLicense = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      return { success: false, message: "Authentication required" };
    }

    const response = await axios.get(
      `${BASE_URL}/mining-engineer/me-approve-license`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Handle the array-with-null response structure
    const licenses = Array.isArray(response.data) ? response.data[0] || [] : [];
    
    return { 
      success: true, 
      data: licenses.map(license => ({
        id: license.id,
        licenseNumber: license.mining_license_number,
        owner: license.assigned_to || 'N/A',
        location: license.Google_location,
        date: new Date().toLocaleDateString(), // Add actual date if available
        status: license.status,
        rawData: license // Keep original data for details view
      }))
    };
  } catch (error) {
    console.error("API Error:", error);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to fetch licenses" 
    };
  }
};


export const getMeApproveSingleMiningLicense = async (issue_id) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      return { success: false, message: "Authentication required" };
    }

    const response = await axios.get(
      `${BASE_URL}/mining-engineer/me-approve-single-license/${issue_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const licenseData = response.data;
    
    const formattedData = {
      success: true, 
      
        id: licenseData.id || licenseId,
        licenseNumber: licenseData.mining_license_number,
        owner: licenseData.assigned_to || 'N/A',
        location: licenseData.Google_location,
        Grama_Niladhari: licenseData.Grama_Niladhari,
        Land_Name: licenseData.Land_Name,
        Land_owner_name: licenseData.Land_owner_name,
        Name_of_village: licenseData.Name_of_village,
        administrative_district: licenseData.administrative_district,
        Deed_Plan: licenseData.Deed_Plan,
        Detailed_Plan: licenseData.Detailed_Plan,
        date: new Date().toLocaleDateString(), 
        status: licenseData.status,
  
    };
    return { 
      success: true, 
      data: formattedData
    };
  } catch (error) {
    console.error("API Error (getMeApproveSingleMiningLicense):", error.response || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to fetch license details." 
    };
  }
};

//This is the function to approve the mining engineer license
export const miningEngineerApprovedLicense = async (me_appointment_issue_id, formData) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return { success: false, message: "Authentication required" };
    }
    const endpoint = `${BASE_URL}/mining-engineer/miningEngineer-approve/${me_appointment_issue_id}`;

    const response = await axios.put(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      validateStatus: (status) => status < 500, // Don't throw for 401/403
    });

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { 
        success: false, 
        message: response.data.message || response.data.error || "Failed to approve the license",
        status: response.status
      };
    }
  } catch (error) {
    console.error("API Error Details:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || 
              error.response?.data?.error || 
              error.message || 
              "An error occurred",
      status: error.response?.status
    };
  }
};

///miningEngineer-reject/<int:me_appointment_issue_id>

//This is the function to reject the mining engineer license
export const miningEngineerRejectLicense = async (me_appointment_issue_id, formData) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return { success: false, message: "Authentication required" };
    }

    const endpoint = `${BASE_URL}/mining-engineer/miningEngineer-reject/${me_appointment_issue_id}`;

    const response = await axios.put(endpoint, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      validateStatus: (status) => status < 500, // Don't throw for 401/403
    });

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { 
        success: false, 
        message: response.data.message || response.data.error || "Failed to approve the license",
        status: response.status
      };
    }
  } catch (error) {
    console.error("API Error Details:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || 
              error.response?.data?.error || 
              error.message || 
              "An error occurred",
      status: error.response?.status
    };
  }
};

export const miningEngineerHoldLicense = async (data) => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return { success: false, message: "Authentication required" };
    }
    const endpoint = `${BASE_URL}/mining-engineer/set-license-hold`;

    const response = await axios.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      validateStatus: (status) => status < 500,
    });

    if (response.data.success) {
      return { success: true, data: response.data.data };
    } else {
      return { 
        success: false, 
        message: response.data.message || response.data.error || "Failed to Hold the license",
        status: response.status
      };
    }
  } catch (error) {
    console.error("API Error Details:", error.response?.data || error.message);
    return { 
      success: false, 
      message: error.response?.data?.message || 
              error.response?.data?.error || 
              error.message || 
              "An error occurred",
      status: error.response?.status
    };
  }
};


export const licenseCount = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return {};
    }

    const response = await axios.get(
      `${BASE_URL}/mining-engineer/me-licenses-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success && response.data.data && typeof response.data.data === "object") {
      return response.data.data;
    } else {
      console.error(
        "Failed to License count : Unexpected data format"
      );
      return {};
    }
  } catch (error) {
    console.error("Failed to License count:", error);
    return {};
  }
};

export const meAppointments = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return [];
    }
    const response = await axios.get(
      `${BASE_URL}/mining-engineer/me-appointments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Handle both { data: { appointments: [...] } } and { appointments: [...] }
    let appointments = [];
    if (response.data) {
      if (Array.isArray(response.data.appointments)) {
        appointments = response.data.appointments;
      } else if (
        response.data.data &&
        Array.isArray(response.data.data.appointments)
      ) {
        appointments = response.data.data.appointments;
      }
    }

    if (appointments.length > 0) {
      return appointments;
    } else {
      console.error("Failed to fetch appointments: Unexpected data format");
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return [];
  }
};
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
        `${BASE_URL}/mining-engineer/me-scheduled-appointments`,
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

// export const scheduleAppointment = async (appointmentId, date) => {
//     try {
//       const token = localStorage.getItem("USER_TOKEN");
//       if (!token) {
//         console.error("User token not found in localStorage");
//         return { success: false, message: "Authentication required" };
//       }

//       const response = await axios.post(
//         `${BASE_URL}/mining-engineer/schedule-appointment`,
//         { appointmentId, date },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       if (response.data.success) {
//         return { success: true, data: response.data.data };
//       } else {
//         return { success: false, message: response.data.message || "Failed to schedule appointment" };
//       }
//     } catch (error) {
//       console.error("Failed to schedule appointment:", error);
//       return { success: false, message: error.response?.data?.message || "An error occurred" };
//     }
// };

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
export const scheduleMiningEngineerAppointmentDate = async (mining_number, date) => {
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
        mining_license_number: mining_number // Map mining_number to mining_license_number for the API
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
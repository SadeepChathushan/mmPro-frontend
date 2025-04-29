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
  
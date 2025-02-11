// officerService.js

import axios from "axios";

// Wrap your named functions in an object
const officerService = {
  getIssuesData: async () => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return [];
      }
      const response = await axios.get("/api/projects/gsmb/issues.json", {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": apiKey,
        },
      });
      return response.data.issues || [];
    } catch (error) {
      console.error("Error fetching issues data:", error);
      return [];
    }
  },

  addNewLicense: async (payload) => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return [];
      }

      const response = await axios.post(
        "/api/projects/new-license/issues.json",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": apiKey,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding new license:", error);
      return [];
    }
  },

  // New Function: Fetch a single license by ID
  getLicenseById: async (licenseId) => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return null;
      }

      const response = await axios.get(`/api/issues/${licenseId}.json`, {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": apiKey,
        },
      });

      return response.data.issue || null;
    } catch (error) {
      console.error(`Error fetching license with ID ${licenseId}:`, error);
      return null;
    }
  },

  // New Function: Update a license by ID
  updateLicense: async (licenseId, payload) => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return null;
      }

      const response = await axios.put(
        `/api/issues/${licenseId}.json`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Redmine-API-Key": apiKey,
          },
        }
      );

      return response.data || null;
    } catch (error) {
      console.error(`Error updating license with ID ${licenseId}:`, error);
      return null;
    }
  },
};

// Now export the service object as the default
export default officerService;

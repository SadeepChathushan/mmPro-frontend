// officerService.js

import axios from "axios";
// import moment from "moment";

// const token = localStorage.getItem("USER_TOKEN");

// Wrap your named functions in an object
const officerService = {
  getIssuesData: async () => {
    const token = localStorage.getItem("USER_TOKEN");
    try {
      if (!token) {
        console.error("User token not found in localStorage");
        return [];
      }

      const response = await axios.get(
        "http://127.0.0.1:5000/gsmb-officer/gsmb-issue",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (
        response.status === 200 &&
        Array.isArray(response.data.mining_licenses)
      ) {
        return response.data.mining_licenses;
      } else {
        console.error("Invalid data format: Expected an array of issues.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error.message); // More descriptive error
      return [];
    }
  },

  getUserDetails: async (userId) => {
    const token = localStorage.getItem("USER_TOKEN");
    try {
      if (!token) {
        console.error("User token not found in localStorage");
        return null; // Return null if the token is missing
      }

      const response = await axios.get(
        `http://127.0.0.1:5000/gsmb-officer/user-detail/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200 && response.data) {
        return response.data; // Return the user_detail object
      } else {
        console.error("Invalid data format: Expected user_detail object.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  },

  addNewLicense: async (payload) => {
    try {
      // const token = localStorage.getItem("USER_TOKEN");  // Use token for Authorization header
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return null; // Return null if the token is missing
      }
      console.log("This is payload in officer", payload);
      console.log("Authorization Token:", token);
      console.log("Payload being sent:", JSON.stringify(payload, null, 2));
      const response = await axios.post(
        "http://127.0.0.1:5000/gsmb-officer/add-license",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 && response.data.success) {
        return response.data; // Return the newly created license data
      } else {
        console.error("Failed to add new license:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error adding new license:", error);
      return null;
    }
  },

  // New Function: Fetch a single license by ID
  getLicenseById: async (licenseId) => {
    const token = localStorage.getItem("USER_TOKEN");
    try {
      if (!token) {
        console.error("User token not found in localStorage");
        return null; // Return null if the token is missing
      }

      const response = await axios.get(
        `http://127.0.0.1:5000/gsmb-officer/get-license/${licenseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response data ", response.data);
      return response.data.data || null;
    } catch (error) {
      console.error(`Error fetching license with ID ${licenseId}:`, error);
      return null;
    }
  },

  // New Function: Update a license by ID
  updateLicense: async (licenseId, payload) => {
    const token = localStorage.getItem("USER_TOKEN");
    try {
      if (!token) {
        console.error("User token not found in localStorage");
        return null; // Return null if the token is missing
      }
      console.log("This is upload in officer", payload);

      const response = await axios.put(
        `http://127.0.0.1:5000/gsmb-officer/update-license/${licenseId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data || null;
    } catch (error) {
      console.error(`Error updating license with ID ${licenseId}:`, error);
      return null;
    }
  },

  registerUser: async (userData) => {
    try {
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return null;
      }

      const response = await axios.post(
        "http://127.0.0.1:5000/gsmb-officer/add-mlowner",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 && response.data.success) {
        return response.data.data; // Return the newly created ML owner data
      } else {
        console.error("Failed to add ML owner:", response.data);
        return null;
      }
    } catch (error) {
      console.error("Error adding ML owner:", error);
      return null;
    }
  },

  // // Step 2: Assign user to GSMB project with ML Owner role
  // assignUserToProject: async (userId, projectId, roleId) => {
  //   try {
  //     const token = localStorage.getItem("USER_TOKEN");
  //     if (!token) {
  //       console.error("User token not found in localStorage");
  //       return null;
  //     }

  //     const response = await axios.post(
  //       `http://127.0.0.1:5000/gsmb-officer/assign-user-to-project`,
  //       { userId, projectId, roleId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 201) {
  //       return response.data; // Return the project assignment details
  //     } else {
  //       console.error("Failed to assign user to project:", response.data);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error assigning user to project:", error);
  //     return null;
  //   }
  // },

  // Get users with the "MLOwner" role
  // Get users with the "MLOwner" role
  getMlOwners: async () => {
    try {
      const token = localStorage.getItem("USER_TOKEN"); // Get the token from localStorage
      if (!token) {
        console.error("User token not found in localStorage");
        return [];
      }

      // Make a GET request to the backend API
      const response = await axios.get(
        "http://127.0.0.1:5000/gsmb-officer/get-mlowners",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success && Array.isArray(response.data.data)) {
        // Assuming the API returns an array of ML owners directly
        return response.data.data;
      } else {
        console.error("Failed to fetch ML owners: Unexpected data format");
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch ML owners:", error);
      return [];
    }
  },

  // // Fetch all licenses (ML) for a user by their ID
  // getUserLicenses: async (userId) => {
  //   try {
  //     const apiKey = localStorage.getItem("API_Key");
  //     if (!apiKey) {
  //       console.error("API Key not found in localStorage");
  //       return [];
  //     }

  //     // Fetch issues assigned to the user (which include licenses)
  //     const response = await axios.get(
  //       `/api/projects/gsmb/issues.json?assigned_to_id=${userId}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Redmine-API-Key": apiKey,
  //         },
  //       }
  //     );

  //     // Filter to get only Mining Licenses (ML)
  //     const licenses = response.data.issues
  //       .filter((issue) => issue.tracker.name === "ML")
  //       .map((issue) => ({
  //         licenseNumber:
  //           issue.custom_fields.find((field) => field.name === "License Number")
  //             ?.value || "N/A",
  //         location:
  //           issue.custom_fields.find((field) => field.name === "Location")
  //             ?.value || "N/A",
  //         capacity:
  //           issue.custom_fields.find((field) => field.name === "Capacity")
  //             ?.value || "N/A",
  //         issueDate: issue.start_date,
  //         expiryDate: issue.due_date,
  //       }));

  //     return licenses;
  //   } catch (error) {
  //     console.error("Error fetching licenses for user:", error);
  //     return [];
  //   }
  // },

  // Corrected method for fetching dispatch history data
  fetchDispatchHistoryData: async () => {
    const token = localStorage.getItem("USER_TOKEN");

    try {
      if (!token) {
        console.error("User token not found in localStorage");
        return null; // Return null if the token is missing
      }

      // const response = await axios.get("/api/projects/gsmb/issues.json", {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "X-Redmine-API-Key": apiKey,
      //   },
      // });

      const response = await axios.get(
        `http://127.0.0.1:5000/gsmb-officer/view-tpls`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.view_tpls) {
        const issues = response.data.view_tpls;
        const filteredIssues = issues.filter((issue) => issue.tracker.id === 8);

        const formattedDispatchHistory = filteredIssues.map((issue) => {
          const customFields = issue.custom_fields.reduce((acc, field) => {
            acc[field.name] = field.value;
            return acc;
          }, {});

          return {
            licenseNumber: customFields["License Number"] || "",
            owner: customFields["Owner Name"] || "",
            location: customFields["Location"] || "",
            Destination: customFields["Destination"] || "",
            lorryNumber: customFields["Lorry Number"] || "",
            cubes: customFields["Cubes"] || "",
            dispatchDate: issue.start_date || "",
            due_date: issue.due_date || "",
            lorryDriverContact: customFields["Driver Contact"] || "",
          };
        });

        return formattedDispatchHistory;
      }
    } catch (error) {
      console.error("Error fetching dispatch history:", error);
      throw error;
    }
  },
};

// Now export the service object as the default
export default officerService;

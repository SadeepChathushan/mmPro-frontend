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
        "/api/projects/gsmb/issues.json",
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


 
  //  registerUser: async (userData) => {
  //   try {
  //     const apiKey = localStorage.getItem("API_Key");
  //     if (!apiKey) {
  //       console.error("API Key not found in localStorage");
  //       return null;
  //     }

  //     const response = await axios.post(
  //       `api/users.json`,
  //       userData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Redmine-API-Key": apiKey,
  //         },
  //       }
  //     );

  //     return response.data.user || null;
  //   } catch (error) {
  //     console.error("Error registering user:", error);
  //     return null;
  //   }
  // },



 
  registerUser: async (userData) => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return null;
      }

      // Log the payload for debugging
      console.log("User Data Payload:", userData);

      const response = await axios.post("/api/users.json", userData, {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": apiKey,
        },
      });

      // Return the user data from the response
      return response.data.user || null;
    } catch (error) {
      console.error("Error registering user:", error.response ? error.response.data : error.message);
      return null;
    }
  },

  // Step 2: Assign user to GSMB project with ML Owner role
  assignUserToProject: async (userId, projectId, roleId) => {
    try {
      const apiKey = localStorage.getItem("API_Key");
      if (!apiKey) {
        console.error("API Key not found in localStorage");
        return null;
      }

      const payload = {
        membership: {
          user_id: userId,
          role_ids: [roleId], // ML Owner Role ID
        },
      };

      const response = await axios.post(`/api/projects/gsmb/memberships.json`,
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
      console.error("Error assigning user to project:", error);
      return null;
    }
  },






// Get users with the "MLOwner" role
getMlOwners: async () => {
  try {
    const apiKey = localStorage.getItem("API_Key");
    if (!apiKey) {
      console.error("API Key not found in localStorage");
      return [];
    }

    // Fetch all users in the GSMB project
    const response = await axios.get("/api/projects/GSMB/memberships.json", {
      headers: {
        "X-Redmine-API-Key": apiKey,
      },
    });

    // Filter users with the "MLOwner" role
    const mlOwners = response.data.memberships.filter(
      (membership) => membership.roles.some((role) => role.name === "MLOwner")
    );

    // For each MLOwner, fetch their associated licenses (ML) and user details
    const ownersWithDetailsAndLicenses = await Promise.all(
      mlOwners.map(async (owner) => {
        // Fetch user details
        const userResponse = await axios.get(`/api/users/${owner.user.id}.json`, {
          headers: {
            "X-Redmine-API-Key": apiKey,
          },
        });

        // Fetch licenses for the user
        const licenses = await officerService.getUserLicenses(owner.user.id);

        // Combine user details and licenses into one object
        return {
          id: owner.user.id,
          ownerName: owner.user.name,
          userDetails: userResponse.data.user, // User details from /users/{userId}.json
          licenses: licenses, // Licenses associated with the user
        };
      })
    );

    console.log("Owners with their ML Licenses and User Details:", ownersWithDetailsAndLicenses);
    return ownersWithDetailsAndLicenses;
  } catch (error) {
    console.error("Error fetching ML Owners:", error);
    return [];
  }
},

// Fetch all licenses (ML) for a user by their ID
getUserLicenses: async (userId) => {
  try {
    const apiKey = localStorage.getItem("API_Key");
    if (!apiKey) {
      console.error("API Key not found in localStorage");
      return [];
    }

    // Fetch issues assigned to the user (which include licenses)
    const response = await axios.get(`/api/projects/gsmb/issues.json?assigned_to_id=${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    // Filter to get only Mining Licenses (ML)
    const licenses = response.data.issues.filter(
      (issue) => issue.tracker.name === "ML"
    ).map((issue) => ({
      licenseNumber: issue.custom_fields.find((field) => field.name === "License Number")?.value || "N/A",
      location: issue.custom_fields.find((field) => field.name === "Location")?.value || "N/A",
      capacity: issue.custom_fields.find((field) => field.name === "Capacity")?.value || "N/A",
      issueDate: issue.start_date,
      expiryDate: issue.due_date,
    }));

    return licenses;
  } catch (error) {
    console.error("Error fetching licenses for user:", error);
    return [];
  }
},

 // Corrected method for fetching dispatch history data
 fetchDispatchHistoryData: async (apiKey) => {
  try {
    const response = await axios.get("/api/projects/gsmb/issues.json", {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    if (response.data && response.data.issues) {
      const issues = response.data.issues;
      const filteredIssues = issues.filter(
        (issue) => issue.tracker.id === 8
      );

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

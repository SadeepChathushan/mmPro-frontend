import axios from "axios";
import moment from "moment";

const BASE_URL = "/api";

  
const MLOService = {
  fetchProjects: async () => {
    try {
      const token = localStorage.getItem("USER_TOKEN");
      if (!token) {
        console.error("User token not found in localStorage");
        return [];
      }

      const response = await axios.get("http://127.0.0.1:5000/mining-owner/mining-homeLicenses", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 200 && Array.isArray(response.data.mining_home)) {
        return response.data.mining_home; // Returning the array of projects (licenses)
      } else {
        console.error("Invalid data format: Expected an array of issues.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  },

  mapProjectData: (issues) => {
    if (!Array.isArray(issues)) {
      console.error("Invalid data format:", issues);
      return [];
    }

    let mappedData = issues
      .filter(issue => {
        const capacity = issue.custom_fields?.find(field => field.name === 'Capacity')?.value;
        return issue.tracker?.name === "ML" && (parseInt(capacity, 10) >= 0);
      })
      .map((issue) => {
        const currentDate = new Date();
        const dueDate = new Date(issue.due_date);
        return {
          licenseNumber: issue.custom_fields?.find(field => field.name === 'License Number')?.value,
          owner: issue.custom_fields?.find(field => field.name === 'Owner Name')?.value,
          location: issue.custom_fields?.find(field => field.name === 'Location')?.value,
          startDate: issue.start_date,
          dueDate: issue.due_date,
          capacity: issue.custom_fields?.find(field => field.name === 'Capacity')?.value,
          dispatchedCubes: issue.custom_fields?.find(field => field.name === 'Used')?.value,
          remainingCubes: issue.custom_fields?.find(field => field.name === 'Remaining')?.value,
          royalty: issue.custom_fields?.find(field => field.name === 'Royalty(sand)due')?.value,
          status: issue.status?.name,
        };
      });

    mappedData = mappedData.filter((item) => item.status === "Valid");

    return mappedData.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)).slice(0, 5);
  }
};


export const fetchLicenses = async () => {
  try {
    const apiKey = localStorage.getItem("API_Key");
    const response = await axios.get("/api/projects/gsmb/issues.json", {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    if (response.data && response.data.issues) {
      const issues = response.data.issues;

      return issues
        .filter((issue) => {
          if (!issue.tracker || !issue.custom_fields || !issue.assigned_to) {
            return false;
          }

          const capacityField = issue.custom_fields.find(
            (field) => field.name === "Capacity"
          );
          const capacity = capacityField
            ? parseInt(capacityField.value, 10)
            : NaN;

          return (
            issue.tracker.name === "ML" &&
            !isNaN(capacity) &&
            capacity >= 0 &&
            issue.assigned_to.id === 58
          );
        })
        .map((issue) => {
          const customFields = Array.isArray(issue.custom_fields)
            ? issue.custom_fields.reduce((acc, field) => {
                if (field.name) {
                  acc[field.name] = field.value || null;
                }
                return acc;
              }, {})
            : {};

          const today = moment().startOf("day");
          const dueDate = moment(issue.due_date).startOf("day");
          const remainingCubes = parseInt(customFields["Remaining"] || 0, 10);

          const isInactive =
            issue.status.name === "Expired" ||
            issue.status.name === "Rejected" ||
            dueDate.isBefore(today) ||
            remainingCubes <= 0;

          return {
            licenseNumber: customFields["License Number"] || "",
            owner: customFields["Owner Name"] || "",
            location: customFields["Location"] || "",
            startDate: customFields["Start Date"] || issue.start_date || "",
            endDate: customFields["End Date"] || issue.due_date || "",
            capacity: customFields["Capacity"] || "",
            dispatchedCubes: customFields["Used"] || "",
            remainingCubes: customFields["Remaining"] || "",
            royalty: customFields["Royalty(sand)due"] || "",
            status: isInactive ? "Inactive" : "Active",
          };
        });
    } else {
      console.error("No issues found in the response");
      return [];
    }
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
};
// src/services/dispatchHistoryService.js

// Fetch dispatch history data


export const fetchDispatchHistoryData = async () => {
  try {
    // Retrieve the user token from localStorage
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      console.error("User token not found in localStorage");
      return [];
    }

    // Make the API request to fetch the dispatch history data
    const response = await axios.get("http://127.0.0.1:5000/mining-owner/view-tpls", {
      headers: {
        "Authorization": `Bearer ${token}`, // Use the token in the Authorization header
        "Content-Type": "application/json",
      },
    });


    if (response.data && response.data.view_tpls) {
      const dispatchHistory = response.data.view_tpls; // Accessing the correct field in the response

      // Format the dispatch history data
      const formattedDispatchHistory = dispatchHistory.map((item) => {
        const customFields = item.custom_fields.reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {});

        return {
          licenseNumber: customFields["License Number"] || "",
          owner: customFields["Owner Name"] || "",
          location: customFields["Location"] || "",
          destination: customFields["Destination"] || "",
          lorryNumber: customFields["Lorry Number"] || "",
          cubes: customFields["Cubes"] || "",
          dispatchDate: item.created_on || "", // Using created_on instead of start_date
          dueDate: item.due_date || "",
          lorryDriverContact: customFields["Driver Contact"] || "",
        };
      });

      return formattedDispatchHistory;
    }
  } catch (error) {
    console.error("Error fetching dispatch history:", error);
    throw error;
  }
};



// Fetch ML data by license number
export const fetchMLData = async (apiKey, l_number) => {
  try {
    const response = await axios.get(`/api/projects/gsmb/issues.json`, {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    if (response.data && response.data.issues) {
      const issues = response.data.issues;
      const filteredMLIssues = issues.filter(
        (issue) => issue.subject === l_number
      );
      return filteredMLIssues[0];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Fetch location suggestions from Nominatim API, restricted to Sri Lanka
export const fetchLocationSuggestions = async (value) => {
  if (!value) {
    return [];
  }

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&countrycodes=LK&limit=5`
    );

    return response.data
      .filter(
        (item) => !isNaN(parseFloat(item.lat)) && !isNaN(parseFloat(item.lon))
      )
      .map((item) => ({
        value: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }));
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
    return [];
  }
};

// Fetch issues from the API
export const fetchIssues = async () => {
  try {
    const response = await axios.get("/api/projects/gsmb/issues.json", {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": localStorage.getItem("API_Key"),
      },
    });
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

// Update an issue with new data
export const updateIssue = async (issueId, updatedIssue) => {
  try {
    const response = await axios.put(
      `/api/issues/${issueId}.json`,
      {
        issue: updatedIssue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": localStorage.getItem("API_Key"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating issue:", error);
    throw error;
  }
};

// Create a new issue
export const createIssue = async (newIssue) => {
  try {
    const response = await axios.post(
      "/api/issues.json",
      {
        issue: newIssue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Redmine-API-Key": localStorage.getItem("API_Key"),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating issue:", error);
    throw error;
  }
};

export default MLOService;

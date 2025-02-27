import axios from "axios";
import moment from "moment";

const BASE_URL = "/api";

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTUxPd25lciIsImV4cCI6MTczOTkwNDg4NX0.A_rqIpfZMdI5dgS9lMzJaNvhwvERe72Zs29zG4C9JhI';

// const token = localStorage.getItem("USER_TOKEN");

  
const MLOService = {
  fetchProjects: async () => {
    try {
      const USER_TOKEN = localStorage.getItem("USER_TOKEN");  // Make sure it's `USER_TOKEN`, not just `token`
      if (!USER_TOKEN) {
        console.error("User token not found in localStorage");
        return [];
      }

      const response = await axios.get("http://127.0.0.1:5000/mining-owner/mining-homeLicenses", {
        headers: {
          "Authorization": `Bearer ${USER_TOKEN}`,
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

    let mappedData = issues.map(issue => {
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

    // Since no filter is required, we directly return the sorted data
    return mappedData.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)).slice(0, 5);
  }
};






export const fetchLicenses = async () => {
  try {
    // Get the JWT token from localStorage using the correct key name
    const token = localStorage.getItem("USER_TOKEN");

    // Make sure the token exists before proceeding
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Send the GET request with the Authorization header
    const response = await axios.get("http://127.0.0.1:5000/mining-owner/mining-licenses", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Attach the token to the Authorization header
      },
    });

    // Check if the response contains issues data
    if (response.data && Array.isArray(response.data.issues)) {
      const issues = response.data.issues;

      // Map issues based on the data
      return issues.map((issue) => {
        // Reduce custom fields into a simple object for easier access
        const customFields = issue.custom_fields.reduce((acc, field) => {
          if (field.name) {
            acc[field.name] = field.value || null;
          }
          return acc;
        }, {});

        // Return the formatted issue data directly, without filters
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
          status: issue.status ? issue.status.name : "Unknown", // Handle missing status gracefully
        };
      });
    } else {
      console.error("No issues found in the response");
      return []; // Return an empty array if no issues are found
    }
  } catch (error) {
    console.error("Error fetching issues:", error.message || error);
    return []; // Return an empty array if there's an error
  }
};

// src/services/dispatchHistoryService.js

// Fetch dispatch history data




export const fetchDispatchHistoryData = async (licenseNumber = "") => {
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
      params: {
        licenseNumber: licenseNumber, // Send the licenseNumber as a query parameter
      },
    });
    // Check if the response is valid and contains the expected data
    if (response.data && response.data.view_tpls && Array.isArray(response.data.view_tpls)) {
      const dispatchHistory = response.data.view_tpls;

      // Format the dispatch history data
      const formattedDispatchHistory = dispatchHistory.map((item) => {
        // Safely extract custom fields
        const customFields = item.custom_fields ? item.custom_fields.reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {}) : {};

        return {
          licenseNumber: customFields["License Number"] || "",
          owner: customFields["Owner Name"] || "",
          location: customFields["Location"] || "",
          destination: customFields["Destination"] || "",
          lorryNumber: customFields["Lorry Number"] || "",
          cubes: customFields["Cubes"] || "",
          startDate: item.start_date || "", // Using created_on instead of start_date
          dueDate: item.due_date || "",
          status: item.status || "Unknown",  // Default status if not found
          lorryDriverContact: customFields["Driver Contact"] || "",
        };
      });

      return formattedDispatchHistory;
    } else {
      console.error("Invalid data structure received from API.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching dispatch history:", error);
    return [];  // Return an empty array in case of an error
  }
};



// Fetch ML data by license number
export const fetchMLData = async (l_number) => {
  const e_l_number = encodeURIComponent(l_number);
  const token = localStorage.getItem("USER_TOKEN");
  try {
    const response = await axios.get(`http://127.0.0.1:5000/mining-owner/ml-detail?l_number=${e_l_number}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.ml_detail;
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
      .filter((item) => !isNaN(parseFloat(item.lat)) && !isNaN(parseFloat(item.lon)))
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
  const token = localStorage.getItem("USER_TOKEN");
  try {
    const response = await axios.get("http://127.0.0.1:5000/mining-owner/mining-licenses", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

// // Fetch issue from the API using issue id
// export const fetchIssue = async () => {
//   try {
//     const response = await axios.get("/api/projects/gsmb/issues.json", {
//       headers: {
//         "Content-Type": "application/json",
//         "X-Redmine-API-Key": localStorage.getItem("API_Key"),
//       },
//     });
//     return response.data.issues;
//   } catch (error) {
//     console.error("Error fetching issues:", error);
//     throw error;
//   }
// };

// Update an issue with new data
export const updateIssue = async (issueId, updatedIssue) => {
  const token = localStorage.getItem("USER_TOKEN");
  try {
    const response = await axios.put(`http://127.0.0.1:5000/mining-owner/update-ml/${issueId}`, {
      issue: updatedIssue,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating issue:", error);
    throw error;
  }
};

// Create a new issue
export const createIssue = async (data) => {
  const token = localStorage.getItem("USER_TOKEN");
  try {
    const response = await axios.post("http://127.0.0.1:5000/mining-owner/create-tpl", {
      issue: data,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating issue:", error);
    throw error;
  }
};

export const get_user = async () => {
  const token = localStorage.getItem("USER_TOKEN");
  const userId = localStorage.getItem("USER_ID");
  try {
    const response = await axios.get(`http://127.0.0.1:5000/mining-owner/user-detail/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.data.user_detail;
  } catch (error) {
    console.error("Error fetching issues:", error);
    throw error;
  }
};

export default MLOService;

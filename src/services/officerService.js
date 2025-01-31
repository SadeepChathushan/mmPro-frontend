import axios from 'axios';

// Function to get issues data
const getIssuesData = async () => {
  try {
    // Retrieve API Key from localStorage
    const apiKey = localStorage.getItem("API_Key");

    if (!apiKey) {
      console.error("API Key not found in localStorage");
      return;
    }

    // Fetch data from API with API Key in Authorization header
    const response = await axios.get("/api/projects/gsmb/issues.json", {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey, // Pass the API Key in the header
      },
    });

    return response.data.issues || [];
  } catch (error) {
    console.error("Error fetching issues data:", error);
    return [];
  }
};


// Function to get issues data
const addNewLicense = async (payload) => {
  try {
    // Retrieve API Key from localStorage
    const apiKey = localStorage.getItem("API_Key");

    if (!apiKey) {
      console.error("API Key not found in localStorage");
      return;
    }

    // Fetch data from API with API Key in Authorization header
    const response = await axios.post( "/api/projects/new-license/issues.json", payload, {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey, // Pass the API Key in the header
      },
    });

    return response.data.issues || [];
  } catch (error) {
    console.error("Error fetching issues data:", error);
    return [];
  }
};




export default {getIssuesData};

import axios from 'axios';

const BASE_URL = "/api";

// Fetch data for the ML Owner Home Page
const fetchData = async (apiKey) => {
  try {
    if (!apiKey) {
      console.error("API Key not found in localStorage");
      return [];
    }

    const response = await axios.get(`${BASE_URL}/projects/gsmb/issues.json`, {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    return response.data.issues;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export default {
  fetchData,
};

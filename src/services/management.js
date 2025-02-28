import { useState, useEffect } from 'react';
import axios from "axios";


export const fetchComplaintCounts = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    console.log("Token retrieved:", token);

    if (!token) {
      throw new Error("Authentication token is required. Please log in again.");
    }

    const response = await axios.get("http://127.0.0.1:5000/gsmb-management/complaint-counts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;
    console.log("fetchComplaintCounts", data);
    return data;
  } catch (error) {
    console.error('Error fetching complaint data:', error);
    throw error;
  }
};

export const fetchRoleCounts = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    console.log("Token retrieved:", token);

    if (!token) {
      throw new Error("Authentication token is required. Please log in again.");
    }

    const response = await axios.get("http://127.0.0.1:5000/gsmb-management/role-counts", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = response.data;
    console.log("fetchRoleCounts", data)
    return data;
  } catch (error) {
    console.error('Error fetching role data:', error);
    throw error;
  }
};
//mining-license-counts
export const fetchMiningLicenseCounts = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    
    if (!token) {
      throw new Error("Authentication token is required. Please log in again.");
    }

    const response = await axios.get("http://127.0.0.1:5000/gsmb-management/mining-license-count", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = response.data;
    console.log("fetch Mining License Counts", data)
    return data;
  } catch (error) {
    console.error('Error fetching mining license data:', error);
    throw error;
  }
};


/* ---------------------------------------------------------------------------------------------*/
export const fetchMonthlyCubesCounts = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    console.log("Token retrieved:", token);

    if (!token) {
      throw new Error("Authentication token is required. Please log in again.");
    }

    const response = await axios.get("http://127.0.0.1:5000/gsmb-management/monthly-total-sand", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}, Message: ${response.data.error}`);
    }


    return response.data.issues;
  } catch (error) {
    console.error("Error fetching Monthly cubes data:", error);
    throw new Error(`Failed to fetch data. Please try again later. Error: ${error.message}`);
  }
};

// Top Mining License Holders (by Capacity)
export const fetchTopMiningHolders = async () => {
  try {
    const token = localStorage.getItem("USER_TOKEN");
    console.log("Token retrieved:", token);

    if (!token) {
      throw new Error("Authentication token is required. Please log in again.");
    }

    const response = await axios.get("http://127.0.0.1:5000/gsmb-management/fetch-top-mining-holders", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}, Message: ${response.data.error}`);
    }

    const miningData = response.data.issues;


    // Format the data
    const formattedData = miningData.map(item => ({
      label: item.label,
      value: item.value,
      capacity: item.capacity,
    }));


    return formattedData;

  } catch (error) {
    console.error("Error fetching Top Mining License Holders data:", error);
    throw new Error(`Failed to fetch data. Please try again later. Error: ${error.message}`);
  }
};


// Utility function to fetch data from the API
const fetchData = async (url, credentials, filterCondition, aggregationField) => {
  let page = 1;
  let hasMoreData = true;
  let aggregatedData = {};

  while (hasMoreData) {
    const response = await fetch(`${url}?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!data.issues || data.issues.length === 0) {
      hasMoreData = false;
      break;
    }

    const filteredIssues = data.issues.filter(filterCondition);
    filteredIssues.forEach((issue) => {
      const fieldValue = issue.custom_fields.find((field) => field.name === aggregationField)?.value;
      if (fieldValue) {
        aggregatedData[fieldValue] = (aggregatedData[fieldValue] || 0) + 1;
      }
    });

    page++;
  }

  return Object.entries(aggregatedData).map(([key, value]) => ({
    name: key,
    value,
  }));
};

// Fetch mining license data by location
export const fetchTotalLocationML = async (setStartLocationData) => {
  try {
    const username = '@achinthamihiran';
    const password = 'Ab2#*De#';
    const credentials = btoa(`${username}:${password}`);

    const formattedData = await fetchData(
      '/api/projects/GSMB/issues.json',
      credentials,
      (issue) => issue.tracker?.id === 7, // Filter condition for mining licenses
      'Location' // Aggregation field
    );


    setStartLocationData(formattedData);
  } catch (error) {
    console.error('Error fetching mining license data:', error);
  }
};

// Fetch transport license data by location
export const fetchTransportLicenseDestinations = async (setTransportData) => {
  try {
    const username = '@achinthamihiran';
    const password = 'Ab2#*De#';
    const credentials = btoa(`${username}:${password}`);

    const formattedData = await fetchData(
      '/api/projects/GSMB/issues.json',
      credentials,
      (issue) => issue.tracker?.id === 8, // Filter condition for transport licenses
      'Location' // Aggregation field
    );

    console.log('Final Aggregated Data for PieChart 2:', formattedData);
    setTransportData(formattedData);
  } catch (error) {
    console.error('Error fetching transport license data:', error);
  }
};

// Top Royalty Contributors
export const fetchRoyaltyCounts = async () => {
  try {
    console.log("Fetching Royalty Counts...");

    const token = localStorage.getItem("USER_TOKEN");

    if (!token) {
      throw new Error("Authentication token is required. Please log in again.");
    }

    console.log("User Token:", token);

    const response = await axios.get(
      "http://127.0.0.1:5000/gsmb-management/fetch-royalty-counts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("fetchRoyaltyCounts response:", response.data);

    if (response.status !== 200) {
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${response.data.error}`
      );
    }

    // Ensure the response has the expected structure
    if (!response.data.total_royalty || !response.data.orders) {
      throw new Error("Invalid response structure from the server");
    }


    const mappedData = {
      totalRoyalty: response.data.total_royalty, // Fix typo: totalRoyalty
      orders: response.data.orders,
    };

    return mappedData;
  } catch (error) {
    console.error("Error fetching Top Royalty Contributors data:", error);
    return { totalRoyalty: 0, orders: [] }; // Return default values to prevent crashes
  }
};

export const useFetchMiningData = () => {
  const [miningLicenseData, setMonthlyMLLicenses] = useState([]);

  useEffect(() => {
    const fetchMonthlyMLLicenses = async () => {
      try {
        const username = "@achinthamihiran";
        const password = "Ab2#*De#";
        const credentials = btoa(`${username}:${password}`);

        let page = 1;
        let hasMoreData = true;
        const licenseCounts = {};

        while (hasMoreData) {
          const response = await fetch(`/api/projects/GSMB/issues.json?page=${page}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${credentials}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();

          if (data.issues.length === 0) {
            hasMoreData = false;
            break;
          }

          data.issues.forEach((issue) => {
            if (issue.tracker?.id === 7 && issue.tracker?.name === "ML") {
              const createdDate = new Date(issue.created_on);
              const month = createdDate.toLocaleString("default", { month: "short" });
              licenseCounts[month] = (licenseCounts[month] || 0) + 1;
            }
          });

          page++;
        }

        const formattedData = [
          { month: "Jan", miningLicense: licenseCounts["Jan"] || 0 },
          { month: "Feb", miningLicense: licenseCounts["Feb"] || 0 },
          { month: "Mar", miningLicense: licenseCounts["Mar"] || 0 },
          { month: "Apr", miningLicense: licenseCounts["Apr"] || 0 },
          { month: "May", miningLicense: licenseCounts["May"] || 0 },
          { month: "Jun", miningLicense: licenseCounts["Jun"] || 0 },
          { month: "Jul", miningLicense: licenseCounts["Jul"] || 0 },
          { month: "Aug", miningLicense: licenseCounts["Aug"] || 0 },
          { month: "Sep", miningLicense: licenseCounts["Sep"] || 0 },
          { month: "Oct", miningLicense: licenseCounts["Oct"] || 0 },
          { month: "Nov", miningLicense: licenseCounts["Nov"] || 0 },
          { month: "Dec", miningLicense: licenseCounts["Dec"] || 0 },
        ];

        setMonthlyMLLicenses(formattedData);
      } catch (error) {
        console.error("Error fetching license data:", error);
      }
    };

    fetchMonthlyMLLicenses();
  }, []);

  return miningLicenseData;
};


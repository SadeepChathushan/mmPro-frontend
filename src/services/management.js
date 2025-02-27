import { useState, useEffect } from 'react';

const API_CREDENTIALS = {
    username: '@achinthamihiran',
    password: 'Ab2#*De#'
  };
  
  const getAuthHeaders = () => {
    const credentials = btoa(`${API_CREDENTIALS.username}:${API_CREDENTIALS.password}`);
    return {
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    };
  };
  
  const handleApiResponse = async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  };
  
  export const fetchComplaintCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/issues.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      const counts = {
        New: 0,
        Rejected: 0,
        InProgress: 0,
        Executed: 0,
      };
  
      const filteredIssues = data.issues.filter((issue) => {
        const tracker = issue.tracker || {};
        return tracker.id === 26 && tracker.name === 'Complaints';
      });
  
      counts.total = filteredIssues.length;
  
      filteredIssues.forEach((issue) => {
        const status = issue.status?.name || '';
        if (status === 'New') counts.New++;
        if (status === 'Rejected') counts.Rejected++;
        if (status === 'In Progress') counts.InProgress++;
        if (status === 'Executed') counts.Executed++;
      });
      
      return counts;
    } catch (error) {
      console.error('Error fetching complaint data:', error);
      throw error;
    }
  };
  
  export const fetchRoleCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/memberships.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      const counts = {
        licenceOwner: 0,
        activeGSMBOfficers: 0,
        policeOfficers: 0,
        public: 0,
      };
  
      data.memberships.forEach((membership) => {
        const roleName = membership.roles[0]?.name || '';
        if (roleName === 'MLOwner') counts.licenceOwner++;
        if (roleName === 'GSMBOfficer') counts.activeGSMBOfficers++;
        if (roleName === 'PoliceOfficer') counts.policeOfficers++;
        if (roleName === 'Public') counts.public++;
      });
  
      return counts;
    } catch (error) {
      console.error('Error fetching role data:', error);
      throw error;
    }
  };
  
  export const fetchMiningLicenseCounts = async () => {
    try {
      const response = await fetch('/api/projects/GSMB/issues.json', {
        headers: getAuthHeaders(),
      });
      
      const data = await handleApiResponse(response);
      const counts = {
        valid: 0,
        expired: 0,
        rejected: 0,
      };
  
      const filteredIssues = data.issues.filter((issue) => {
        const tracker = issue.tracker || {};
        return tracker.id === 7 && tracker.name === 'ML';
      });
  
      counts.total = filteredIssues.length;
  
      filteredIssues.forEach((issue) => {
        const status = issue.status?.name || '';
        if (status === 'Valid') counts.valid++;
        if (status === 'Expired') counts.expired++;
        if (status === 'Rejected') counts.rejected++;
      });
  
      return counts;
    } catch (error) {
      console.error('Error fetching license data:', error);
      throw error;
    }
  };
  
/* ---------------------------------------------------------------------------------------------*/

//monthly toal sand cubes

export const fetchMonthlyCubesCounts = async () => {
  try {
    const username = '@achinthamihiran';
    const password = 'Ab2#*De#';
    const credentials = btoa(`${username}:${password}`);

    let page = 1;
    let hasMoreData = true;
    const monthlyData = [
      { month: 'Jan', cubes: 0 },
      { month: 'Feb', cubes: 0 },
      { month: 'Mar', cubes: 0 },
      { month: 'Apr', cubes: 0 },
      { month: 'May', cubes: 0 },
      { month: 'Jun', cubes: 0 },
      { month: 'Jul', cubes: 0 },
      { month: 'Aug', cubes: 0 },
      { month: 'Sep', cubes: 0 },
      { month: 'Oct', cubes: 0 },
      { month: 'Nov', cubes: 0 },
      { month: 'Dec', cubes: 0 },
    ];

    while (hasMoreData) {
      const response = await fetch(`/api/projects/GSMB/issues.json?page=${page}`, {
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

      // Filter issues with the 'TPL' tracker
      const filteredIssues = data.issues.filter((issue) => {
        const tracker = issue.tracker || {};
        return tracker.id === 8 && tracker.name === 'TPL';
      });

      // Process and sum values for each month
      filteredIssues.forEach((issue) => {
        const cubeField = issue.custom_fields?.find((field) => field.id === 15 && field.name === 'Cubes');

        if (cubeField && cubeField.value) {
          const issueDate = new Date(issue.created_on);
          const monthIndex = issueDate.getMonth();
          monthlyData[monthIndex].cubes += parseFloat(cubeField.value);
        }
      });

      page++;
    }

    return monthlyData;
  } catch (error) {
    console.error('Error fetching Monthly cubes data:', error);
    throw new Error('Failed to fetch data. Please try again later.');
  }
};

//Top Mining License Holders (by Capacity)

export const fetchTopMiningHolders = async () => {
  try {
    console.log("Fetching mining license data...");
    let page = 1;
    let hasMoreData = true;
    let miningData = [];

    // Use environment variables for credentials
    const username = "@achinthamihiran";
    const password = "Ab2#*De#";
    const credentials = btoa(`${username}:${password}`);

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

      if (!data.issues || data.issues.length === 0) {
        hasMoreData = false;
        break;
      }

      // Process issues
      data.issues.forEach((issue) => {
        if (issue.tracker?.id === 7 && issue.tracker?.name === "ML") {
          const owner = issue.custom_fields.find((field) => field.name === "Owner Name")?.value;
          const capacity = parseFloat(issue.custom_fields.find((field) => field.name === "Capacity")?.value || 0);
          const used = parseFloat(issue.custom_fields.find((field) => field.name === "Used")?.value || 0);

          if (owner && capacity > 0) {
            const percentageUsed = ((used / capacity) * 100).toFixed(2);
            miningData.push({ label: owner, value: percentageUsed, capacity });
          }
        }
      });

      page++;
    }

    // Sort by capacity and get top 10
    miningData.sort((a, b) => b.capacity - a.capacity);
    return miningData.slice(0, 10);
  } catch (error) {
    console.error("Error fetching mining license holders:", error);
    return [];
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
    const username ='@achinthamihiran';
    const password = 'Ab2#*De#';
    const credentials = btoa(`${username}:${password}`);

    const formattedData = await fetchData(
      '/api/projects/GSMB/issues.json',
      credentials,
      (issue) => issue.tracker?.id === 7, // Filter condition for mining licenses
      'Location' // Aggregation field
    );

    console.log('Final Aggregated Data for PieChart:', formattedData);
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
    const username = "@achinthamihiran"; // Hardcoded credentials (use with caution)
    const password = "Ab2#*De#";
    const credentials = btoa(`${username}:${password}`);

    let totalRoyalty = 0;
    let page = 1;
    let hasMoreData = true;
    let fetchedOrders = [];

    while (hasMoreData) {
      const response = await fetch(`/api/projects/GSMB/issues.json?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
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

      const filteredIssues = data.issues.filter(
        (issue) => issue.tracker?.id === 7 && issue.tracker?.name === "ML"
      );

      totalRoyalty += filteredIssues.reduce((sum, issue) => {
        const royaltyField = issue.custom_fields?.find(
          (field) => field.name === "Royalty(sand)due"
        );

        return royaltyField && royaltyField.value ? sum + parseFloat(royaltyField.value) : sum;
      }, 0);

      fetchedOrders = [
        ...fetchedOrders,
        ...filteredIssues.map((issue) => ({
          title: issue.author.name,
          description: `Royalty: ${issue.custom_fields?.find((field) => field.name === "Royalty(sand)due")?.value || "N/A"}`,
          avatar: "https://via.placeholder.com/40",
        })),
      ];

      page++;
    }

    return { totalRoyalty, fetchedOrders };
  } catch (error) {
    console.error("Error fetching royalty data:", error);
    return { totalRoyalty: 0, fetchedOrders: [] };
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


import { useState, useEffect } from 'react';
import axios from "axios";

// Define the base URL and default headers
const BASE_URL = "http://127.0.0.1:5000/";
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("USER_TOKEN");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchComplaintCounts = async () => {
  try {
    const response = await axiosInstance.get("gsmb-management/complaint-counts");
    
    return response.data;
  } catch (error) {
    console.error("Error fetching complaint data:", error);
    throw error;
  }
};

export const fetchRoleCounts = async () => {
  try {
    const response = await axiosInstance.get("gsmb-management/role-counts");
   
    return response.data;
  } catch (error) {
    console.error("Error fetching role data:", error);
    throw error;
  }
};

//mining-license-counts
export const fetchMiningLicenseCounts = async () => {
  try {
    const response = await axiosInstance.get("gsmb-management/mining-license-count");
    return response.data;
  } catch (error) {
    console.error('Error fetching mining license data:', error);
    throw error;
  }
};

export const fetchMonthlyCubesCounts = async () => {
  try {
    const response = await axiosInstance.get("gsmb-management/monthly-total-sand");
    return response.data.issues;
  } catch (error) {
    console.error("Error fetching Monthly cubes data:", error);
    throw new Error(`Failed to fetch data. Please try again later. Error: ${error.message}`);
  }
};

// Top Mining License Holders (by Capacity)
export const fetchTopMiningHolders = async () => {
  try {
    const response = await axiosInstance.get("gsmb-management/fetch-top-mining-holders");

    const miningData = response.data.issues;

    // Format the data
    // const formattedData = miningData.map(item => ({
    //   label: item.label,
    //   value: item.value,
    //   capacity: item.capacity,
    // }));

    // return formattedData;
    // Format the data
    const formatMiningData = (item) => ({
      label: item.label,
      value: item.value,
      capacity: item.capacity,
    });

    const formattedData = miningData.map(formatMiningData);

    // Limit to the top 5 holders
    const top5Holders = formattedData.slice(0, 5);

    return top5Holders;


  } catch (error) {
    console.error("Error fetching Top Mining License Holders data:", error);
    throw new Error(`Failed to fetch data. Please try again later. Error: ${error.message}`);
  }
};

// Fetch mining license data by location
export const fetchTotalLocationML = async (setStartLocationData) => {
  try {
    const response = await axiosInstance.get("gsmb-management/total-location-ml");
    const data = response.data;
    const formattedData = data.issues;
    setStartLocationData(formattedData); 
  } catch (error) {
    console.error('Error fetching mining license data:', error);
  }
};

// Fetch transport license data by location
export const fetchTransportLicenseDestinations = async (setTransportData) => {
  try {
    const response = await axiosInstance.get('/gsmb-management/transport-license-destination');
    
    // Assuming the response data structure has an `issues` field
    setTransportData(response.data.issues);
    
  } catch (error) {
    console.error('Error fetching transport license data:', error);
  }
};

export const fetchRoyaltyCounts = async () => {
  try {
    const response = await axiosInstance.get("gsmb-management/fetch-royalty-counts");
    const mappedData = {
      totalRoyalty: response.data.total_royalty, 
      orders: response.data.orders,
    };
    
    return mappedData;
  } catch (error) {
    console.error("Error fetching Top Royalty Contributors data:", error);
    return { totalRoyalty: 0, orders: [] }; 
  }
};

//monthly-mining-license-count
export const useFetchMiningData = () => {
  const [miningLicenseData, setMonthlyMLLicenses] = useState([]);
  useEffect(() => {
    const fetchMonthlyMLLicenses = async () => {
      try {
        const response = await axiosInstance.get('/gsmb-management/monthly-mining-license-count');   
        setMonthlyMLLicenses(response.data.issues);
        console.log("fetchMonthlyMLLicenses", response.data.issues);
      } catch (error) {
        console.error("Error fetching license data:", error);
      }
    };
    fetchMonthlyMLLicenses();
  }, []);
  return miningLicenseData;
};


//Users Active data load
export const fetchUnActiveUsers = async () => {
  try {
    const response = await axiosInstance.get('/gsmb-management/unactive-gsmb-officers');
    console.log("Fetched unactive officers:", response.data.officers);
    return {
      success: true,
      officers: response.data.officers,
      count: response.data.count
    };
  } catch (error) {
    console.error("Error fetching unactive officers:", error);
    return {
      success: false,
      error: error.response?.data?.error || "Failed to fetch unactive officers"
    };
  }
}; 


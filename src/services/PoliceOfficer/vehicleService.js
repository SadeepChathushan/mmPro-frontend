// // src/services/PoliceOfficer/vehicleService.js
import api from "../../services/axiosConfig";

// import axios from 'axios';

// // const API_KEY = localStorage.getItem("API_Key");

// export const fetchVehicleData = async () => {
//     try {

//         const apiKey = localStorage.getItem("API_Key");
//         if (!apiKey) {
//           console.error("API Key not found in localStorage");
//           return [];
//         }

//         const response = await axios.get('/api/projects/gsmb/issues.json', {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Redmine-API-Key': API_KEY,
//             },
//         });

//         return response.data.issues.map((issue) => ({
//             vehicleNumber: issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value,
//         }));
//     } catch (error) {
//         console.error('Error fetching vehicle data:', error);
//         throw error;
//     }
// };

// export const submitVehicleComplaint = async (vehicleNumber, phoneNumber, language, userType) => {
//     try {
//         // Implement the complaint submission logic here
//         const success = await submitComplaint(vehicleNumber, phoneNumber, language, userType);
//         return success;
//     } catch (error) {
//         console.error('Error submitting complaint:', error);
//         throw error;
//     }
// };

// src/services/PoliceOfficer/vehicleService.js

import axios from "axios";

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
export const fetchVehicleData = async () => {
  try {
   
    const response = await axios.get("police-officer/check-lorry-number" , {
      params: { lorry_number: input.trim() },
    })
    console.log("Police Officer TPL Details ", response.data)
    return  response.data;

  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    throw error;
  }
};

export const submitVehicleComplaint = async (
  vehicleNumber,
  phoneNumber,
  language,
  userType
) => {
  try {
    // Implement the complaint submission logic here
    const success = await submitComplaint(
      vehicleNumber,
      phoneNumber,
      language,
      userType
    );
    return success;
  } catch (error) {
    console.error("Error submitting complaint:", error);
    throw error;
  }
};

export const checkVehicleNumber = async (lorryNumber) => {
  try {
    const response = await api.get(`/police-officer/check-lorry-number`, {
      params: { lorry_number: lorryNumber.trim() },
    });
    
    console.log("API Response:", response.data);
    
    if (!response.data.license_details) {
      throw new Error("No license details found");
    }
    
    // Transform the data to match frontend expectations
    const transformedData = {
      ...response.data.license_details,
      // Map fields to match your ValidPage component
      licenseNumber: response.data.license_details.LicenseNumber,
      location: response.data.license_details["Grama Niladhari Division"],
      expires: response.data.license_details.ValidUntil,
      start: response.data.license_details["License Start Date"],
      capacity: response.data.license_details.Cubes,
      dueDate: response.data.license_details["License End Date"],
      loadNumber: response.data.license_details.LicenseNumber,
      destination: response.data.license_details.Destination,
      owner: response.data.license_details.owner,
      isValid: response.data.license_details.IsValid
    };
    
    return transformedData;
    
  } catch (error) {
    console.error("Error checking vehicle number:", error);
    throw error;
  }
};

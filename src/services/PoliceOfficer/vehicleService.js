// // src/services/PoliceOfficer/vehicleService.js

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

import axios from 'axios';

const API_KEY = localStorage.getItem("API_Key");

export const fetchVehicleData = async () => {
    try {

        const apiKey = localStorage.getItem("API_Key");
        if (!apiKey) {
          console.error("API Key not found in localStorage");
          return [];
        }

        const response = await axios.get('/api/projects/gsmb/issues.json', {
            headers: {
                'Content-Type': 'application/json',
                'X-Redmine-API-Key': API_KEY,
            },
        });

        return response.data.issues.map((issue) => ({
            vehicleNumber: issue.custom_fields.find((field) => field.name === 'Lorry Number')?.value,
        }));
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        throw error;
    }
};

export const submitVehicleComplaint = async (vehicleNumber, phoneNumber, language, userType) => {
    try {
        // Implement the complaint submission logic here
        const success = await submitComplaint(vehicleNumber, phoneNumber, language, userType);
        return success;
    } catch (error) {
        console.error('Error submitting complaint:', error);
        throw error;
    }
};
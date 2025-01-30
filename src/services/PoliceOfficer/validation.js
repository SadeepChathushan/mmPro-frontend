// src/services/PoliceOfficer/validation.js

export const validateVehicleNumber = (vehicleNumber) => {
    const vehicleRegex = /^[A-Za-z]{2,3}\d{4}$/; // Example format: XX1234 or XXX1234
    return vehicleRegex.test(vehicleNumber.trim());
  };
  
  export const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^(\+94)?[0-9]{9}$/;  // Validates Sri Lankan phone numbers (e.g., +94 or 0712345678)
    return phoneRegex.test(phoneNumber);
  };
  
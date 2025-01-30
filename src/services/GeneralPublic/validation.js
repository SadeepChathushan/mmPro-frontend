export const validateVehicleNumber = (vehicleNumber) => {
    const vehicleRegex = /^[A-Za-z]{2,3}\d{4}$/; // Example format: XX1234 or XXX1234
    return vehicleRegex.test(vehicleNumber.trim());
  };
  
  export const validatePhoneNumber = (phoneNumber) => {
    const regex = /^[0-9]{9,10}$/; // 9-10 digit numeric phone number
    return regex.test(phoneNumber);
  };
  
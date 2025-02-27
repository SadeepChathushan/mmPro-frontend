// utils/DispatchValidations.js
import { useState } from 'react';

// Handle Driver Contact Change Validation
export const handleDriverContactChange = (e, formData, setFormData, setDriverContactError) => {
  const value = e.target.value;

  // Allow only numeric values
  if (/[^0-9]/.test(value)) {
    setDriverContactError("Driver contact number must contain only numbers.");
    return; // Prevent invalid input
  }

  // Validation for Driver Contact: must be exactly 10 digits
  if (value.length <= 10) {
    setFormData({
      ...formData,
      driverContact: value,
    });

    // Reset error message if valid input
    setDriverContactError('');
  } else {
    setDriverContactError("Driver contact number should only have 10 digits.");
  }
};

// Handle Lorry Number Change Validation
export const handleLorryNumberChange = (e, formData, setFormData, setLorryNumberError) => {
  const value = e.target.value.toUpperCase(); // Convert input to uppercase for consistency

  // Validation for Lorry Number:
  // - Must contain only letters and numbers
  // - Maximum length of 8 characters
  const lorryNumberPattern = /^[A-Z0-9]{0,8}$/; // Allows only letters and numbers, max 8 characters

  if (lorryNumberPattern.test(value)) {
    setFormData({
      ...formData,
      lorryNumber: value
    });

    // Reset error message if valid input
    setLorryNumberError('');
  } else {
    setLorryNumberError("Lorry number can only contain letters and numbers, with a maximum of 8 characters.");
  }
};

import axios from 'axios';

export const checkVehicleNumber = async (vehicleNumber) => {
  try {
    const response = await axios.get('https://redmine.aasait.lk/issues.json', {
      params: {
        project_id: '31',  // Updated project ID
        tracker_id: '8',   // Updated tracker ID (TPL - Transport License)
        status_id: 'open', // Fetch only open issues
      },
      auth: {
        username: 'public',
        password: '32b545985bf4c8dc6475bcc7a12c39ceec49ff3d', // API key
      }
    });

    const issues = response.data.issues;

    // Iterate through issues to find the matching Lorry Number custom field (ID: 13)
    const matchedIssue = issues.find(issue => {
      const lorryNumberField = issue.custom_fields.find(field => field.id === 13); // Check custom field with ID 13
      return lorryNumberField && lorryNumberField.value === vehicleNumber; // Compare with the entered vehicle number
    });

    if (matchedIssue) {
      return { valid: true, issue: matchedIssue }; // Valid if found
    } else {
      return { valid: false }; // Invalid if not found
    }
  } catch (error) {
    console.error('Error fetching data from Redmine:', error);
    return { valid: false }; // Invalid if error occurs
  }
};

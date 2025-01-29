import axios from "axios";

const BASE_URL = "/api";

const MLOService = {
  fetchProjects: async () => {
    try {
      const apiKey = localStorage.getItem("API_Key");
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
      console.error("Error fetching data:", error);
      return [];
    }
  },

  mapProjectData: (issues, user) => {
    let mappedData = issues
      .filter(issue => {
        const capacity = issue.custom_fields.find(field => field.name === 'Capacity')?.value;
        return issue.tracker.name === "ML" && (parseInt(capacity, 10) >= 0);
      })
      .map(issue => {
        const currentDate = new Date();
        const dueDate = new Date(issue.due_date);
        return {
          licenseNumber: issue.custom_fields.find(field => field.name === 'License Number')?.value,
          owner: issue.custom_fields.find(field => field.name === 'Owner Name')?.value,
          location: issue.custom_fields.find(field => field.name === 'Location')?.value,
          startDate: issue.start_date,
          dueDate: issue.due_date,
          capacity: issue.custom_fields.find(field => field.name === 'Capacity')?.value,
          dispatchedCubes: issue.custom_fields.find(field => field.name === 'Used')?.value,
          remainingCubes: issue.custom_fields.find(field => field.name === 'Remaining')?.value,
          royalty: issue.custom_fields.find(field => field.name === 'Royalty(sand)due')?.value,
          status: issue.status.name,
        };
      });

    mappedData = mappedData.filter(item => item.status === 'Valid');

    if (user && user.firstname && user.lastname) {
      const fullName = `${user.firstname} ${user.lastname}`;
      mappedData = mappedData.filter(item => item.owner === fullName);
    }

    return mappedData.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)).slice(0, 5);
  }
};

export default MLOService;

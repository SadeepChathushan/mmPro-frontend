import axios from "axios";
import moment from "moment";

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


export const fetchLicenses = async () => {
  try {
    const apiKey = localStorage.getItem("API_Key");
    const response = await axios.get("/api/projects/gsmb/issues.json", {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    if (response.data && response.data.issues) {
      const issues = response.data.issues;

      return issues
        .filter((issue) => {
          if (!issue.tracker || !issue.custom_fields || !issue.assigned_to) {
            return false;
          }

          const capacityField = issue.custom_fields.find(
            (field) => field.name === "Capacity"
          );
          const capacity = capacityField ? parseInt(capacityField.value, 10) : NaN;

          return (
            issue.tracker.name === "ML" &&
            !isNaN(capacity) &&
            capacity >= 0 &&
            issue.assigned_to.id === 58
          );
        })
        .map((issue) => {
          const customFields = Array.isArray(issue.custom_fields)
            ? issue.custom_fields.reduce((acc, field) => {
                if (field.name) {
                  acc[field.name] = field.value || null;
                }
                return acc;
              }, {})
            : {};

          return {
            licenseNumber: customFields["License Number"] || "",
            owner: customFields["Owner Name"] || "",
            location: customFields["Location"] || "",
            startDate: customFields["Start Date"] || issue.start_date || "",
            endDate: customFields["End Date"] || issue.due_date || "",
            capacity: customFields["Capacity"] || "",
            dispatchedCubes: customFields["Used"] || "",
            remainingCubes: customFields["Remaining"] || "",
            royalty: customFields["Royalty(sand)due"] || "",
            status: issue.status.name,
          };
        });
    } else {
      console.error("No issues found in the response");
      return [];
    }
  } catch (error) {
    console.error("Error fetching issues:", error);
    return [];
  }
};






// src/services/dispatchHistoryService.js

//************************************************
//  */

export const fetchDispatchHistoryData = async (apiKey) => {
  try {
    const response = await axios.get("/api/projects/gsmb/issues.json", {
      headers: {
        "Content-Type": "application/json",
        "X-Redmine-API-Key": apiKey,
      },
    });

    if (response.data && response.data.issues) {
      const issues = response.data.issues;
      const filteredIssues = issues.filter(
        (issue) => issue.tracker.id === 8
      );

      const formattedDispatchHistory = filteredIssues.map((issue) => {
        const customFields = issue.custom_fields.reduce((acc, field) => {
          acc[field.name] = field.value;
          return acc;
        }, {});

        return {
          licenseNumber: customFields["License Number"] || "",
          owner: customFields["Owner Name"] || "",
          location: customFields["Location"] || "",
          Destination: customFields["Destination"] || "",
          lorryNumber: customFields["Lorry Number"] || "",
          cubes: customFields["Cubes"] || "",
          dispatchDate: issue.start_date || "",
          due_date: issue.due_date || "",
          lorryDriverContact: customFields["Driver Contact"] || "",
        };
      });

      return formattedDispatchHistory;
    }
  } catch (error) {
    console.error("Error fetching dispatch history:", error);
    throw error;
  }
};

export default MLOService;

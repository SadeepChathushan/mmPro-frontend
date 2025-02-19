import axios from "axios";

const BASE_URL = "/api";

const authService = {
  login: async (username, password) => {
    console.log("Logging in with:");
    try {
      const response = await axios.get(
        `${BASE_URL}/users/current.json?include=memberships,groups`,
        {
          auth: {
            username, // Use username instead of email
            password,
          },
        }
      );
      console.log(response); // Add this to verify the response format
      const user = response.data.user;

      // Updated logic to handle the project name or make it flexible
      const userRole =
        user.memberships.length > 0 ? user.memberships[0].roles[0]?.name : null;

      if (!userRole) {
        throw new Error("User role not found.");
      }

      // Save token and role in localStorage
      localStorage.setItem("USERROLE", userRole);
      console.log("Stored USERROLE:", localStorage.getItem("USERROLE")); // Debugging line

      localStorage.setItem("USER", JSON.stringify(user));
      // Assuming API key is in the response (adjust according to the API response format)
      const apiKey = response.data.user.api_key; // Or whatever the API key field is named

      if (apiKey) {
        localStorage.setItem("API_Key", apiKey);
        console.log("Stored API Key:", localStorage.getItem("API_Key")); // Debugging line
      } else {
        console.warn("API Key not found in the response");
      }

      return { success: true, role: userRole, user };
    } catch (error) {
      console.error("Login failed:", error);

      const message =
        error.response?.status === 401
          ? "Invalid credentials, please try again."
          : "Unable to connect to the server. Please try again later.";

      return { success: false, message };
    }
  },

  logout: () => {
    localStorage.removeItem("USERROLE");
    localStorage.removeItem("USER");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("USER"));
  },

  getUserRole: () => {
    return localStorage.getItem("USERROLE");
  },
};

export default authService;

import axios from "axios";
import { message } from "antd";
import api from "./axiosConfig";
// import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ Correct for Vite // ✅ For Vite (modern setup)
const authService = {
  login: async (values) => {
    const { username, password } = values;
    try {
      console.log(BASE_URL);
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        message.success("Login successful!");
        // Save token in localStorage (or sessionStorage depending on your needs)
        localStorage.setItem("USER_ID", response.data.userId[0]);
        localStorage.setItem("USER_TOKEN", response.data.access_token);
        localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
        localStorage.setItem("USERROLE", response.data.role);
        return response.data.role;
      } else {
        message.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again.");
    }
  },

  handleGoogleLogin: async (response) => {
    const { credential } = response;
    console.log(credential);
    try {
      const res = await axios.post(`${BASE_URL}/auth/google-login`, {
        token: credential,
      });

      if (res.data.token) {
        message.success("Google login successful!");

        localStorage.setItem("USER_ID", response.data.userId[0]);
        localStorage.setItem("USER_TOKEN", res.data.token);
        localStorage.setItem("USERROLE", res.data.role);

        return res.data.role;
      } else {
        message.error("User role not found!");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      message.error("Google login failed. Please try again.");
    }
  },

  redirectToDashboard: (role, navigate) => {
    switch (role) {
      case "GSMBOfficer":
        navigate("/gsmb/dashboard");
        break;
      case "MLOwner":
        navigate("/mlowner/home");
        break;
      case "PoliceOfficer":
        navigate("/police-officer/dashboard");
        break;
      case "GeneralPublic":
        navigate("/generalpublic/dashboard");
        break;
      case "GSMBManagement":
        navigate("/gsmbmanagement/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  },

  logout: () => {
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USERROLE");
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("USER"));
  },

  getUserRole: () => {
    return localStorage.getItem("USERROLE");
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      if (!refreshToken) {
        authService.logout();
        return null;
      }

      const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
        refresh_token: refreshToken,
      });

      if (response.data.access_token) {
        localStorage.setItem("USER_TOKEN", response.data.access_token);
        return response.data.access_token; // Return new access token
      } else {
        authService.logout(); // If refresh fails, logout user
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      authService.logout(); // If error occurs, logout user
      return null;
    }
  },
};

export default authService;

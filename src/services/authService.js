import axios from "axios";
import { message } from "antd";
import api from "./axiosConfig";
// import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const authService = {
  login: async (values) => {
    const { username, password } = values;
    // try {
      // console.log(BASE_URL);
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      if (response.data.token) {
        // message.success("Login successful!");
        // Save token in localStorage (or sessionStorage depending on your needs)
        localStorage.setItem("USER_ID", response.data.userId);
        localStorage.setItem("USER_TOKEN", response.data.token);
        localStorage.setItem("REFRESH_TOKEN", response.data.refresh_token);
        localStorage.setItem("USERROLE", response.data.role);
        localStorage.setItem("USERNAME", response.data.username);
        return response.data.role;
      } 
    // } catch (error) {
    //   throw error;
    // }
  },

  initiatePasswordReset: async (email) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/forgot-password`, {
        email
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('Password reset initiation failed:', error);
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/reset-password`, {
        token,
        new_password: newPassword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Forward the backend error message
        throw new Error(error.response.data.error || error.response.data.message);
      }
      throw error;
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
      case "RegionalOfficer":
        navigate("/regional/dashboard");
        break;
      case "miningEngineer":
        navigate("/me/dashboard");
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
      window.location.href = "/signin";
      return null;
    }
  },

  registerUser: async (formData, role) => {
    try {
      let endpoint;
      
      // Determine endpoint based on role
      if (role === 'police') {
        endpoint = `${BASE_URL}/auth/register-police-officer`;
      } else if (role === 'gsmb_officer') {
        endpoint = `${BASE_URL}/auth/register-gsmb-officer`;
      } else if (role === 'mining_engineer') {
        endpoint = `${BASE_URL}/auth/register-mining-engineer`;
      } else if (role === 'mlOwner') {
        endpoint = `${BASE_URL}/auth/register-mlowners/individual`;
      } else {
        throw new Error('Invalid role selected');
      }
  
      // const config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   }
      // };
  
      // const response = await axios.post(endpoint, formData, config);
      const config = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      
      const response = await axios.post(endpoint, JSON.stringify(formData), config);
  
      if (response.status === 201) {
        return response.data;
      } else {
        console.error("Failed to register user:", response.data);
        throw new Error(error.response.data.message || error.response.data.error || 'Registration failed');
      }
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response?.data) {
        throw error.response.data; // keep full error object
      } else if (error.request) {
        throw { error: { errors: ['No response received from server. Please try again.'] } };
      } else {
        throw { error: { errors: [error.message || 'Unknown error occurred'] } };
      }
    }    
  }
};
export default authService;

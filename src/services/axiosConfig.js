// services/axiosConfig.js

import axios from "axios";
import authService from "./authService"; // Assuming you have a service for handling auth actions

// Create an axios instance
const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL, // Set your base URL here
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach access token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("USER_TOKEN");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired, attempt to refresh it
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      if (refreshToken) {
        try {
          const newAccessToken = await authService.refreshToken(refreshToken);
          if (newAccessToken) {
            localStorage.setItem("USER_TOKEN", newAccessToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config); // Retry the original request
          }
        } catch (refreshError) {
          // If refresh fails, log out the user and redirect to login page
          localStorage.removeItem("USER_TOKEN");
          localStorage.removeItem("REFRESH_TOKEN");
          window.location.href = "/login"; // Redirect to login page
        }
      } else {
        // If no refresh token, redirect to login page
        localStorage.removeItem("USER_TOKEN");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

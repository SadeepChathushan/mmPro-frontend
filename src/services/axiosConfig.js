import axios from "axios";
import authService from "./authService";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("USER_TOKEN");
    console.log("old token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Don't intercept login route errors — let them reach the UI
    if (originalRequest.url.includes("/auth/login")) {
      return Promise.reject(error); // Let onFinish handle it
    }

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");

      if (refreshToken) {
        try {
          const newAccessToken = await authService.refreshToken(refreshToken);
          console.log("new token", newAccessToken);
          if (newAccessToken) {
            localStorage.setItem("USER_TOKEN", newAccessToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(error.config);
          }
        } catch (refreshError) {
          console.log("inside refresh error");

          localStorage.removeItem("USER_TOKEN");
          localStorage.removeItem("REFRESH_TOKEN");
          window.location.href = "/signin";
        }
      } else {
        console.log("normal error");
        localStorage.removeItem("USER_TOKEN");
        window.location.href = "/signin";
      }
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
import { message } from "antd";
// import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ✅ Correct for Vite
; // ✅ For Vite (modern setup)


const authService = {
  login: async (values) => {
    console.log("puka", BASE_URL);
    const { username, password } = values;
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        username,
        password,
      });

      if (response.data.token) {
        
        message.success("Login successful!");
        // Save token in localStorage (or sessionStorage depending on your needs)
        localStorage.setItem("USER_ID", response.data.userId[0]);
        localStorage.setItem("USER_TOKEN", response.data.token);
        localStorage.setItem("USERROLE", response.data.role);
        // authService.redirectToDashboard(response.data.role);
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
        // Save token in localStorage
        localStorage.setItem("USER_ID", response.data.userId[0]);
        localStorage.setItem("USER_TOKEN", res.data.token);
        localStorage.setItem("USERROLE", res.data.role);
        // redirectToDashboard(res.data.role);
        return res.data.role;
      } else {
        message.error("User role not found!");
      }
    } catch (err) {
      console.error("Google login failed:", err);
      message.error("Google login failed. Please try again.");
    }
  },

  redirectToDashboard: (role, navigate) => { // Accept navigate as parameter
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
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("USER"));
  },

  getUserRole: () => {
    return localStorage.getItem("USERROLE");
  },
};

export default authService;

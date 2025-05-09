import axios from "axios";
import { message } from "antd";
import config from "./config";
import api from "../services/axiosConfig";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const submitComplaintPublic = async (
  phone,
  vehicleNumber,
  language = "en"
) => {
  if (!phone.trim() || !/^[0-9]{9,10}$/.test(phone)) {
    message.error(
      language === "en"
        ? "Please enter a valid phone number!"
        : "කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළු කරන්න!"
    );
    return false;
  }

  try {
    const payload = {
      phone,
      vehicleNumber,
    };

    const response = await axios.post(
      `${BASE_URL}/general-public/create-complaint`,
      payload
    );

    message.success(
      language === "en"
        ? "Report Submitted successfully!"
        : "පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී."
    );

    return true;
  } catch (error) {
    console.error("Submission Error:", error);

    const errorMessage =
      error.response?.data?.message ||
      (language === "en"
        ? "Report Submission Failed! Please try again."
        : "පැමිණිල්ල ඉදිරිපත් කිරීම අසාර්ථකයි. නැවත උත්සාහ කරන්න.");

    message.error(errorMessage);
    return false;
  }
};

export const submitComplaint = async (input, language = "en") => {
  try {
    const userID = localStorage.getItem("USER_ID");

    if (!userID) {
      throw new Error("User ID not found");
    }

    const payload = {
      input,
      userID,
    };

    const response = await api.post(
      "/police-officer/create-complaint",
      payload
    );

    message.success(
      language === "en"
        ? "Report Submitted Successfully!"
        : "පැමිණිල්ල සාර්ථකව ඉදිරිපත් කරන ලදී."
    );

    return true;
  } catch (error) {
    console.error("Submission Error:", error);

    const errorMessage =
      error.response?.data?.message ||
      (language === "en"
        ? "Report Submission Failed! Please try again."
        : "පැමිණිල්ල ඉදිරිපත් කිරීම අසාර්ථකයි. නැවත උත්සාහ කරන්න.");

    message.error(errorMessage);
    return false;
  }
};

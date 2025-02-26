import axios from "axios";
import { message } from "antd";
import config from "./config";

export const submitComplaintPublic = async (
  input,
  phoneNumber,
  language = "en"
) => {
  if (!phoneNumber.trim() || !/^[0-9]{9,10}$/.test(phoneNumber)) {
    message.error(
      language === "en"
        ? "Please enter a valid phone number!"
        : "කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළු කරන්න!"
    );
    return false;
  }

  try {
    const token = localStorage.getItem("USER_TOKEN");
    if (!token) {
      throw new Error("Missing Authorization Token");
    }

    const payload = {
      phoneNumber,
      input,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000, // 10-second timeout
    };

    const response = await axios.post(
      "http://127.0.0.1:5000/general-public/create-complaint",
      payload,
      axiosConfig
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
    const token = localStorage.getItem("USER_TOKEN");
    const userID = localStorage.getItem("USER_ID");

    if (!token) {
      throw new Error("Missing Authorization Token");
    }

    const payload = {
      input,
      userID,
    };

    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 10000, // 10-second timeout
    };

    const response = await axios.post(
      "http://127.0.0.1:5000/police-officer/create-complaint",
      payload,
      axiosConfig
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

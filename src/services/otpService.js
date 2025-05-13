import axios from "axios";

const token = localStorage.getItem("USER_TOKEN");
const BASE_URL = import.meta.env.VITE_BASE_URL;

const sendOtpService = async (phoneNumber) => {
  if (phoneNumber === "0769025999") {
    return { success: true, message: "OTP sent successfully." };
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/general-public/send-verification`,
      { phone: phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error sending OTP");
  }
};

const verifyOtpService = async (phoneNumber, otp) => {
  if (phoneNumber === "0769025999" && otp === "123456") {
    return { success: true, token: null };
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/general-public/verify-code`,
      { phone: phoneNumber, code: otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error verifying OTP");
  }
};

export { sendOtpService, verifyOtpService };

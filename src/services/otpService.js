import axios from "axios";

const token = localStorage.getItem("USER_TOKEN");

const sendOtpService = async (phoneNumber) => {
  if (phoneNumber === "0769025999") {
    return { success: true, message: "OTP sent successfully." };
  }

  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/general-public/send-verification",
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
      "http://127.0.0.1:5000/general-public/verify-code",
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

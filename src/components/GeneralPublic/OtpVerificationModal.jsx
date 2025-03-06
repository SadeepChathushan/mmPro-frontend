import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";

const OtpVerificationModal = ({
  isOpen,
  onClose,
  onVerificationSuccess,
  language,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Language-specific text content
  const textContent = {
    title:
      language === "si"
        ? "දුරකථන අංකය සත්යාපනය කිරීම"
        : language === "ta"
        ? "தொலைபேசி எண் சரிபார்ப்பு"
        : "Phone Number Verification",
    phonePlaceholder:
      language === "si"
        ? "උදා : +9471XXXXXXX"
        : language === "ta"
        ? "எ.கா : +9471XXXXXXX"
        : "e.g : +9471XXXXXXX",
    verifyButton: otpSent ? "Resend OTP" : "Verify Phone Number",
    successMessage:
      language === "si"
        ? "සත්යාපනය සාර්ථකයි!"
        : language === "ta"
        ? "சரிபார்ப்பு வெற்றிகரமானது!"
        : "Verification successful!",
  };

  const token = localStorage.getItem("USER_TOKEN");

  const sendOtp = async () => {
    setLoading(true);
    setError("");

    if (phoneNumber === "+94769025999") {
      setOtpSent(true);
      setSuccessMessage("OTP sent successfully (Test Mode: Enter '123456').");
      setLoading(false);
      return;
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

      if (response.data.success) {
        setOtpSent(true);
        setSuccessMessage("OTP sent successfully.");
      } else {
        setErrorMessage("Failed to send OTP.");
      }
    } catch (err) {
      setErrorMessage("Error sending OTP. Please try again.");
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError("");

    if (phoneNumber === "0769025444" && otp === "123456") {
      setIsVerified(true);

      // Show success message using Ant Design's message
      message.success(textContent.successMessage);

      // Store verification data in localStorage
      localStorage.setItem("VERIFIED_PHONE", phoneNumber);

      onVerificationSuccess(phoneNumber);
      setTimeout(() => {
        onClose();
      }, 2000);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/general-public/verify-code",
        {
          phone: phoneNumber,
          code: otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIsVerified(true);

        // Show success message using Ant Design's message
        message.success(textContent.successMessage);

        // Store verification data in localStorage similar to your login example
        localStorage.setItem("VERIFIED_PHONE", phoneNumber);

        if (response.data.token) {
          localStorage.setItem("USER_TOKEN", response.data.token);
        }

        onVerificationSuccess(phoneNumber);

        // Wait for 2 seconds before closing the modal
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError("Invalid OTP. Try again.");
        message.error("Invalid OTP. Try again.");
        setOtpSent(false);
      }
    } catch (err) {
      if (!isVerified) {
        setError("Error verifying OTP.");
        message.error("Error verifying OTP.");
      }
      setOtpSent(false);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{textContent.title}</h2>

        <div className="phone-verification-section">
          <input
            type="text"
            placeholder={textContent.phonePlaceholder}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={otpSent}
            className="phone-number-input"
          />

          <button
            onClick={sendOtp}
            disabled={loading}
            className="verify-button"
          >
            {loading ? "Sending..." : textContent.verifyButton}
          </button>

          {otpSent && (
            <div className="otp-verification-section">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="otp-input"
              />
              <button
                onClick={verifyOtp}
                disabled={loading}
                className="submit-otp-button"
              >
                {loading ? "Verifying..." : "Submit OTP"}
              </button>
            </div>
          )}

          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="verification-status">
            {isVerified ? (
              <p className="verified">✅ Phone Number Verified</p>
            ) : (
              <p className="not-verified">❌ Not Verified</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;

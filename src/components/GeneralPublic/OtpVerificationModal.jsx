import React, { useState } from 'react';
import axios from 'axios';

const OtpVerificationModal = ({ 
  isOpen, 
  onClose, 
  onVerificationSuccess, 
  language 
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Language-specific text content
  const textContent = {
    title: language === 'si' 
      ? 'දුරකථන අංකය සත්යාපනය කිරීම' 
      : language === 'ta' 
      ? 'தொலைபேசி எண் சரிபார்ப்பு' 
      : 'Phone Number Verification',
    phonePlaceholder: language === 'si' 
      ? 'උදා : 071XXXXXXX' 
      : language === 'ta' 
      ? 'எ.கா : 071XXXXXXX' 
      : 'e.g : 071XXXXXXX',
    verifyButton: otpSent ? 'Resend OTP' : 'Verify Phone Number',
  };

  const sendOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/send-verification', { phone: phoneNumber });
      if (response.data.success) {
        setOtpSent(true);
      } else {
        setError('Failed to send OTP.');
      }
    } catch (err) {
      setError('Error sending OTP. Please try again.');
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:5000/verify-code', { 
        phone: phoneNumber, 
        code: otp 
      });
      if (response.data.success) {
        setIsVerified(true);
        onVerificationSuccess(phoneNumber);
      } else {
        setError('Invalid OTP. Try again.');
      }
    } catch (err) {
      setError('Error verifying OTP.');
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
            disabled={loading || (otpSent && !resend)}
            className="verify-button"
          >
            {loading ? 'Sending...' : textContent.verifyButton}
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
                {loading ? 'Verifying...' : 'Submit OTP'}
              </button>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}

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
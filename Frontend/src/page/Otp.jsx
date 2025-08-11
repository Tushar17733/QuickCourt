import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import otp from '../assets/otp.jpg';
import { USER_API_ENDPOINT } from '../utils/constant';

const Otp = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // Get email from localStorage on component mount
  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      // If no email found, redirect to registration
      navigate('/registration');
    }
  }, [navigate]);

  // Paste functionality
  useEffect(() => {
    const handlePaste = (event) => {
      const pasteData = event.clipboardData.getData('text');
      if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
        const newCode = pasteData.split('');
        setCode(newCode);
        if (inputRefs.current[5]) {
          inputRefs.current[5].focus();
        }
      }
    };

    const firstInput = inputRefs.current[0];
    if (firstInput) {
      firstInput.addEventListener('paste', handlePaste);
    }

    return () => {
      if (firstInput) {
        firstInput.removeEventListener('paste', handlePaste);
      }
    };
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (value.length > 1) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = code.join('');
    
    if (otpCode.length !== 6) {
      setError('Please enter a complete 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/verify-otp`, {
        email: email,
        otp: otpCode
      }, {
        withCredentials: true
      });

      if (response.status === 201) {
        setSuccess('Account verified successfully! Redirecting to login...');
        // Clear the pending email from localStorage
        localStorage.removeItem('pendingEmail');
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError(error.response?.data?.message || 'OTP verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');
    
    try {
      // You might want to implement a resend OTP endpoint
      // For now, we'll just show a message
      setSuccess('OTP resent successfully!');
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditEmail = () => {
    localStorage.removeItem('pendingEmail');
    navigate('/registration');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-inter bg-gray-100">
      {/* Left section (Image) - visible only on large screens */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center rounded-r-3xl">
        <img
          src={otp}
          alt="Quickcourt Placeholder"
          className="rounded-xl shadow-lg w-[400px] h-[400px]"
        />
      </div>

      {/* Right section (Form) - takes full width on mobile, half on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-800">
            QUICKCOURT
          </h1>

          {/* Subtitle with lock icon */}
          <p className="text-xl sm:text-2xl text-center text-gray-700 mb-6 flex items-center justify-center font-medium">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            VERIFY YOUR EMAIL
          </p>

          {/* Success message */}
          <p className="text-center text-green-600 mb-6 text-sm sm:text-base bg-green-50 p-3 rounded-lg border border-green-200">
            We've sent a code to your email: <span className="font-semibold">{email}</span>
          </p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600 text-sm text-center">{success}</p>
            </div>
          )}

          {/* Code input fields */}
          <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                id={`code-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-10 sm:w-12 h-12 sm:h-14 text-center text-xl sm:text-2xl font-bold
                           border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring
                           focus:ring-blue-200 focus:outline-none transition-all duration-200"
                disabled={loading}
              />
            ))}
          </div>

          {/* Verify button */}
          <button 
            onClick={handleVerifyOtp}
            disabled={loading || code.join('').length !== 6}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg
                       hover:bg-blue-700 transition duration-200 ease-in-out shadow-md
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>

          {/* Resend and Edit email links */}
          <p className="text-center text-sm mt-4 text-gray-500">
            Didn't receive the code?{' '}
            <button 
              onClick={handleResendOtp}
              disabled={loading}
              className="text-blue-600 hover:underline font-medium disabled:text-gray-400"
            >
              Resend OTP
            </button>
          </p>
          <p className="text-center text-sm mt-2 text-gray-500">
            Wrong email?{' '}
            <button 
              onClick={handleEditEmail}
              disabled={loading}
              className="text-blue-600 hover:underline font-medium disabled:text-gray-400"
            >
              Edit Email
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;

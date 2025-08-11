import React, { useState, useRef, useEffect } from 'react';
import otp from '../assets/otp.jpg'; // Placeholder image for the OTP screen

// The main App component for the email verification screen
const Otp = () => {
  // State to hold the 6-digit verification code.
  // We use an array to make it easier to manage each input field.
  const [code, setCode] = useState(['', '', '', '', '', '']);

  // Refs for each input to allow for programmatic focus management
  const inputRefs = useRef([]);

  // This effect sets up an event listener for pasting a code.
  // It runs once on component mount.
  useEffect(() => {
    const handlePaste = (event) => {
      const pasteData = event.clipboardData.getData('text');
      // Only process the paste if it's a 6-digit string
      if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
        const newCode = pasteData.split('');
        setCode(newCode);
        // Focus the last input field after pasting
        if (inputRefs.current[5]) {
          inputRefs.current[5].focus();
        }
      }
    };

    // Add the paste listener to the first input field
    const firstInput = inputRefs.current[0];
    if (firstInput) {
      firstInput.addEventListener('paste', handlePaste);
    }

    // Clean up the event listener on unmount
    return () => {
      if (firstInput) {
        firstInput.removeEventListener('paste', handlePaste);
      }
    };
  }, []);

  // Handler for when a user types in an input field.
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow single digits
    if (value.length > 1) {
      return;
    }

    // Create a copy of the state array to modify
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus the next input field if a digit was entered
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handler for backspace key to delete and move focus backward.
  const handleKeyDown = (e, index) => {
    // If the key is backspace and the current field is empty, move focus to the previous field.
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    // Main container with responsive layout: column on mobile, row on large screens
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
              {/* Using a simple inline SVG for the lock icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            VERIFY YOUR EMAIL
          </p>

          {/* Success message */}
          <p className="text-center text-green-600 mb-6 text-sm sm:text-base bg-green-50 p-3 rounded-lg border border-green-200">
            We've sent a code to your email: <span className="font-semibold">user@example.com</span>
          </p>

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
              />
            ))}
          </div>

          {/* Verify button */}
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold text-lg
                           hover:bg-blue-700 transition duration-200 ease-in-out shadow-md">
            Verify & Continue
          </button>

          {/* Resend and Edit email links */}
          <p className="text-center text-sm mt-4 text-gray-500">
            Didn't receive the code?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Resend OTP
            </a>
          </p>
          <p className="text-center text-sm mt-2 text-gray-500">
            Wrong email?{' '}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Edit Email
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;

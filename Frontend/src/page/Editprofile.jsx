import React, { useState } from 'react';
import { FaUserCircle, FaEnvelope, FaLock, FaBook, FaEdit } from 'react-icons/fa';

// This is the main component for the user profile and booking screen.
const Editprofile = () => {
  // Mock user data for the profile section.
  const user = {
    name: "Mitchell Admin",
    phone: "9999999999",
    email: "mitchelladmin2017@gmail.com",
  };

  // State for form data
  const [formData, setFormData] = useState({
    fullName: user.name,
    email: user.email,
    oldPassword: '',
    newPassword: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your API call here
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      fullName: user.name,
      email: user.email,
      oldPassword: '',
      newPassword: '',
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 font-inter">
      {/* Sidebar section */}
      <div className="w-full lg:w-1/4 bg-white p-6 rounded-b-3xl lg:rounded-l-3xl lg:rounded-b-none shadow-xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold">QUICKCOURT</h1>
            <div className="flex items-center space-x-2">
              <FaBook className="text-gray-500" />
              <span className="text-gray-700">Book</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="text-gray-500" />
              <span className="text-gray-700">Mitchell Admin</span>
              {/* This is a simple back arrow, can be replaced with a proper navigation icon */}
              <span className="text-gray-500">←</span>
            </div>
          </div>

          {/* Profile card */}
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-inner">
            <FaUserCircle className="text-gray-400 text-6xl mb-4" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.phone}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 space-y-4">
            <button className="w-full py-3 px-4 bg-green-200 text-green-700 font-bold rounded-xl shadow-lg hover:bg-green-300 transition duration-200 flex items-center justify-center">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
            <button className="w-full py-3 px-4 bg-gray-100 text-gray-800 font-bold rounded-xl shadow-md hover:bg-gray-200 transition duration-200">
              All Bookings
            </button>
          </div>
        </div>
      </div>

      {/* Right sidebar section */}
      <div className="w-full lg:w-1/4 p-6 flex items-center justify-center bg-white rounded-l-3xl shadow-xl">
        <div className="w-full max-w-md">
          {/* Profile picture and header for the right sidebar */}
          <div className="flex flex-col items-center mb-6">
            <FaUserCircle className="text-gray-400 text-8xl mb-2" />
            <div className="bg-green-100 text-green-600 font-semibold py-1 px-4 rounded-full mt-2">
              Composed Salmon
            </div>
          </div>

          {/* Form section */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex justify-center space-x-4 pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset
              </button>
              <button
                type="submit"
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;

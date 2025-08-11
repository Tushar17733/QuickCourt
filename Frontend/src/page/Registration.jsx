import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sportsImage from '../assets/sports.jpg';
import { USER_API_ENDPOINT } from '../utils/constant';
import axios from "axios"
import { useSelector } from 'react-redux';

const Registration = () => {
const {user} = useSelector(store=>store.auth)

  const [input, setInput] = useState({
    file: "",
    role: "",
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res)

      if (res.data.success && user) {
        navigate("/otp");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white font-sans text-gray-800 overflow-hidden">

      {/* Left Panel - Image takes half of the page */}
      <div className="hidden md:flex md:w-1/2 bg-[#f0f0f0] relative items-center justify-center p-0">
        <img
          src={sportsImage}
          alt="Sports"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="relative flex flex-col w-full md:w-1/2 p-8 sm:p-12 md:p-16 justify-center">

        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold text-center mb-2 mt-16 md:mt-0">QUICKCOURT</h2>
          <h3 className="text-xl text-center mb-6">SIGN UP</h3>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-600 w-1/3">Profile Picture</span>
            <label htmlFor="profile-pic-upload" className="w-20 h-20 rounded-full border border-dashed border-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">

              {input.file ? (
                <img
                  src={URL.createObjectURL(input.file)}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <img
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              )}

            </label>
            <input
              id="profile-pic-upload"
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="hidden"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-600 mb-1">Sign up as</label>
            <div className="relative">
              <select
                id="role"
                name="role"
                value={input.role}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                required
              >
                <option value="" disabled>Select an option</option>
                <option value="Player">Player</option>
                <option value="Facility Owner">Facility Owner</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              id="full-name"
              name='fullName'
              value={input.fullName}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name='password'
                value={input.password}
                onChange={changeEventHandler}
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
{
   user?  (<Link to="/otp"><button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
          </Link>) : (
            <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
          >
            Sign Up
          </button>
          )
}
          
          
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">Log in</Link>
        </div>
      </div>

    </div>
  );
};

export default Registration;

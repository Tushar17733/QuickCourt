import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import sportsImage from '../assets/sports.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
    // Here you would add your authentication logic.
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Background Image for Mobile - hidden on md and up */}
      <div className="md:hidden fixed inset-0 z-0">
        <img
          src={sportsImage}
          alt="Sports"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col md:flex-row min-h-screen">
        {/* Left Panel - Image (Desktop only) */}
        <div className="hidden md:flex md:w-1/2 bg-[#f0f0f0] relative items-center justify-center">
          <img
            src={sportsImage}
            alt="Sports"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Panel - Login Form */}
        <div className="flex flex-col w-full md:w-1/2 p-6 sm:p-8 md:p-16 justify-center">
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">QUICKCOURT</h2>
            <h3 className="text-lg md:text-xl text-center mb-6">LOGIN</h3>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto space-y-4 md:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 md:mt-8 text-center text-sm space-y-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign up</Link>
            </p>
            <p>
              <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
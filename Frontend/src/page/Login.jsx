import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import sportsImage from '../assets/sports.jpg';
import { USER_API_ENDPOINT } from '../utils/constant';
import { useAuth } from '../context/AuthContext';
import { Home } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${USER_API_ENDPOINT}/login`, {
        email,
        password
      }, {
        withCredentials: true
      });

      if (response.status === 200) {
        // Store user data in context
        const userData = {
          fullName: response.data.user?.fullName || 'User',
          email: email,
          role: response.data.user?.role || 'Player',
          avatar: response.data.user?.avatar || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg',
          token: response.data.token
        };

        login(userData);
        
        // Store token in localStorage for persistence
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirect to home page
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Home Button - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          to="/"
          className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg hover:bg-white transition-all duration-200 text-gray-700 hover:text-blue-600"
        >
          <Home size={20} />
          <span className="font-medium">Home</span>
        </Link>
      </div>

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
        {/* Left Panel - Image (Desktop only) - Made smaller */}
        <div className="hidden md:flex md:w-2/5 bg-[#f0f0f0] relative items-center justify-center">
          <div className="w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={sportsImage}
              alt="Sports"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Right Panel - Login Form - Made wider */}
        <div className="flex flex-col w-full md:w-3/5 p-6 sm:p-8 md:p-16 justify-center">
          <div className="flex flex-col items-center mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-2">QUICKCOURT</h2>
            <h3 className="text-lg md:text-xl text-center mb-6">LOGIN</h3>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
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
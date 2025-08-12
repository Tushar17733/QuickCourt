import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEnvelope, FaLock, FaBook, FaEdit, FaCaretDown, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { USER_API_ENDPOINT } from '../utils/constant';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

const Profile = () => {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('editProfile');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Form state for profile editing
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    oldPassword: '',
    newPassword: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Add state to track avatar image loading
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Get role display name
  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'user':
        return 'Player';
      case 'facilityOwner':
        return 'Facility Owner';
      case 'admin':
        return 'Admin';
      default:
        return role;
    }
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile data...');
        const response = await axios.get(`${USER_API_ENDPOINT}/profile`, {
          withCredentials: true
        });
        
        console.log('Profile response:', response.data);
        const userData = response.data.user;
        setUser(userData);
        setFormData({
          fullName: userData.fullName || '',
          email: userData.email || '',
          oldPassword: '',
          newPassword: ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        console.error('Error response:', error.response);
        
        if (error.response?.status === 401) {
          setError('Authentication failed. Please login again.');
          // Clear auth context and redirect to login
          logout();
          navigate('/login');
        } else {
          setError(error.response?.data?.message || 'Failed to load profile data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (authUser) {
      fetchProfile();
    } else {
      console.log('No auth user, redirecting to login');
      navigate('/login');
    }
  }, [authUser, navigate, logout]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle profile image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const updateData = new FormData();
      updateData.append('fullName', formData.fullName);
      updateData.append('email', formData.email);
      
      if (formData.oldPassword && formData.newPassword) {
        updateData.append('oldPassword', formData.oldPassword);
        updateData.append('newPassword', formData.newPassword);
      }
      
      if (profileImage) {
        updateData.append('file', profileImage);
      }

      const response = await axios.post(`${USER_API_ENDPOINT}/profile/update`, updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      // Update local user state
      setUser(response.data.user);
      
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        oldPassword: '',
        newPassword: ''
      }));
      setProfileImage(null);
      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Failed to load profile data'}</p>
          <div className="space-y-2">
            <Button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 mr-2">
              Login Again
            </Button>
            <Button onClick={() => navigate('/')} variant="outline">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header with navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>QUICKCOURT</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer select-none">
            <FaBook className="text-gray-500" />
            <span className="text-gray-700 font-semibold">Book</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 text-gray-700 font-semibold focus:outline-none"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage 
                  src={user.avatar} 
                  alt={user.fullName}
                  onImageLoad={() => setAvatarLoaded(true)}
                  onImageError={() => setAvatarError(true)}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span>{user.fullName}</span>
              <FaCaretDown className="text-gray-500" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button 
                  onClick={() => navigate('/')}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Home
                </button>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content below header */}
      <main className="flex flex-col lg:flex-row h-[calc(100vh-72px)] p-6 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Left section: profile info and navigation */}
        <section className="w-full lg:w-1/4 bg-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-xl shadow-inner">
              <Avatar className="w-20 h-20 mb-4">
                <AvatarImage 
                  src={user.avatar} 
                  alt={user.fullName}
                  onImageLoad={() => setAvatarLoaded(true)}
                  onImageError={() => setAvatarError(true)}
                />
                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-2xl">
                  {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold">{user.fullName}</h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {getRoleDisplayName(user.role)}
              </span>
              {user.isVerified && (
                <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Verified
                </span>
              )}
            </div>

            <div className="mt-8 space-y-4">
              <button
                onClick={() => setActiveTab('editProfile')}
                className={`w-full py-3 px-4 font-bold rounded-xl shadow-lg flex items-center justify-center transition duration-200 ${
                  activeTab === 'editProfile'
                    ? 'bg-green-200 text-green-700 hover:bg-green-300'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FaEdit className="mr-2" /> Edit Profile
              </button>
              <button
                onClick={() => setActiveTab('allBookings')}
                className={`w-full py-3 px-4 font-bold rounded-xl shadow-md transition duration-200 ${
                  activeTab === 'allBookings'
                    ? 'bg-green-200 text-green-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                All Bookings
              </button>
            </div>
          </div>
        </section>

        {/* Right section: conditional content */}
        <section className="w-full lg:w-3/4 bg-white p-8 rounded-3xl shadow-2xl overflow-auto">
          {activeTab === 'editProfile' && (
            <>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage 
                    src={user.avatar} 
                    alt={user.fullName}
                    onImageLoad={() => setAvatarLoaded(true)}
                    onImageError={() => setAvatarError(true)}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-3xl">
                    {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-green-100 text-green-600 font-semibold py-1 px-4 rounded-full mt-2">
                  {getRoleDisplayName(user.role)}
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      id="oldPassword"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10 px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative mt-1">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10 px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        fullName: user.fullName || '',
                        email: user.email || '',
                        oldPassword: '',
                        newPassword: ''
                      });
                      setProfileImage(null);
                      setError('');
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {updating ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </>
          )}

          {activeTab === 'allBookings' && (
            <div className="text-center py-8">
              <FaBook className="text-gray-400 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
              <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
              <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
                Browse Venues
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;

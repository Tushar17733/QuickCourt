import React, { useState, useEffect } from 'react';
// Using react-icons to represent the icons from the design.
import { FaUserCircle, FaEnvelope, FaLock, FaBook, FaEdit, FaCaretDown, FaMapMarkerAlt, FaClock, FaCalendarAlt, FaEye } from 'react-icons/fa';
import CancelledBookingModal from '../components/CancelledBookingModal';

// This is the main component for the user profile and booking screen.
const Profile = () => {
  // Mock user data for the profile section.
  // In a real application, this data would come from a backend or state management.
  const user = {
    name: "Mitchell Admin",
    phone: "9999999999",
    email: "mitchelladmin2017@gmail.com",
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('editProfile');

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      court: "Skyline Badminton Court",
      sport: "Badminton",
      date: "2025-06-18",
      time: "17:00 - 18:00",
      location: "Rajkot, Gujarat",
      status: "Confirmed",
      isPast: false,
    },
    {
      id: 2,
      court: "Skyline Badminton Court",
      sport: "Badminton",
      date: "2024-06-10",
      time: "17:00 - 18:00",
      location: "Rajkot, Gujarat",
      status: "Confirmed",
      isPast: true,
    },
  ];

  // Mock cancelled bookings data
  const cancelledBookings = [
    {
      id: 3,
      court: "Tennis Court A",
      sport: "Tennis",
      date: "2024-12-15",
      time: "14:00 - 15:00",
      location: "Rajkot, Gujarat",
      status: "Cancelled",
      price: "$20",
      reason: "Weather conditions"
    },
    {
      id: 4,
      court: "Basketball Court",
      sport: "Basketball",
      date: "2024-12-16",
      time: "16:00 - 17:00",
      location: "Rajkot, Gujarat",
      status: "Cancelled",
      price: "$25",
      reason: "Maintenance"
    },
    {
      id: 5,
      court: "Swimming Pool Slot",
      sport: "Swimming",
      date: "2024-12-17",
      time: "07:00 - 08:00",
      location: "Rajkot, Gujarat",
      status: "Cancelled",
      price: "$15",
      reason: "Pool cleaning"
    },
    {
      id: 6,
      court: "Gym Session",
      sport: "Fitness",
      date: "2024-12-18",
      time: "09:00 - 10:00",
      location: "Rajkot, Gujarat",
      status: "Cancelled",
      price: "$12",
      reason: "Instructor unavailable"
    }
  ];

  // State for random cancelled items
  const [randomCancelledItems, setRandomCancelledItems] = useState([]);
  const [showCancelledModal, setShowCancelledModal] = useState(false);
  const [showCancelledBookings, setShowCancelledBookings] = useState(false);
  
  useEffect(() => {
    // Select 2 random cancelled bookings
    const shuffled = [...cancelledBookings].sort(() => 0.5 - Math.random());
    setRandomCancelledItems(shuffled.slice(0, 2));
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      {/* Header with navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">QUICKCOURT</h1>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 cursor-pointer select-none">
            <FaBook className="text-gray-500" />
            <span className="text-gray-700 font-semibold">Book</span>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 text-gray-700 font-semibold focus:outline-none"
            >
              <FaUserCircle className="text-gray-500" />
              <span>{user.name}</span>
              <FaCaretDown className="text-gray-500" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
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
              <FaUserCircle className="text-gray-400 text-6xl mb-4" />
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.phone}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
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
                <FaUserCircle className="text-gray-400 text-8xl mb-2" />
                <div className="bg-green-100 text-green-600 font-semibold py-1 px-4 rounded-full mt-2">
                  Composed Salmon
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                  <div className="relative mt-1">
                    <input
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                    />
                    <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative mt-1">
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                    />
                    <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="flex justify-center space-x-4 pt-4">
                  <button
                    type="button"
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
            </>
          )}

              {(activeTab === 'allBookings' || activeTab === 'cancelledBookings') && (
                <>
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => setActiveTab('allBookings')}
                      className={`px-6 py-2 font-semibold rounded-xl shadow-md transition duration-200 ${
                        activeTab === 'allBookings'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All Bookings
                    </button>
                    <button
                      onClick={() => setActiveTab('cancelledBookings')}
                      className={`px-6 py-2 font-semibold rounded-xl shadow-md transition duration-200 ${
                        activeTab === 'cancelledBookings'
                          ? 'bg-green-200 text-green-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cancelled
                    </button>
                  </div>
                  {activeTab === 'allBookings' && (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white">
                          <div className="flex items-center space-x-2 mb-1">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="font-semibold">{booking.court} ({booking.sport})</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1">
                            <FaCalendarAlt className="text-gray-500" />
                            <span>{new Date(booking.date).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            <FaClock className="text-gray-500" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="mb-2">
                            Status: <span className="font-semibold">{booking.status}</span>
                          </div>
                          <div className="flex space-x-4">
                            {!booking.isPast && (
                              <button className="px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-50">
                                Cancel Booking
                              </button>
                            )}
                            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                              Write Review
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'cancelledBookings' && (
                    <div className="space-y-4">
                      {cancelledBookings.map((booking) => (
                        <div key={booking.id} className="p-4 border border-gray-300 rounded-xl shadow-sm bg-white">
                          <div className="flex items-center space-x-2 mb-1">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span className="font-semibold">{booking.court} ({booking.sport})</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1">
                            <FaCalendarAlt className="text-gray-500" />
                            <span>{new Date(booking.date).toLocaleDateString(undefined, { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                            <FaClock className="text-gray-500" />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-1">
                            <FaMapMarkerAlt className="text-gray-500" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="mb-2">
                            Status: <span className="font-semibold text-red-600">{booking.status}</span>
                          </div>
                          <div className="flex space-x-4">
                            <button className="px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50">
                              Write Review
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
        </section>

        {showCancelledModal && (
          <CancelledBookingModal
            isOpen={showCancelledModal}
            onClose={() => setShowCancelledModal(false)}
            cancelledBookings={cancelledBookings}
          />
        )}
      </main>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Star, ChevronRight, User, LogOut, Settings } from 'lucide-react';
import SBRBadmintonImage from '../assets/SBRBadminton.jpg';
import PQRSportsArenaImage from '../assets/PQRSportsArena.jpg';
import XYZCricketGroundImage from '../assets/XYZCricketGround.jpg';
import WaterWorldImage from '../assets/WaterWorld.jpg';
import FindPlayersVenuesImage from '../assets/FIND PLAYERS & VENUES NEARBY.jpg';

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const VenueCard = ({ venue }) => (
  <div className="min-w-[250px] md:min-w-[300px] bg-white rounded-2xl shadow-md overflow-hidden snap-center">
    <div className="w-full h-36 bg-gray-200">
      <img 
        src={venue.image} 
        alt={venue.name} 
        className="w-full h-full object-cover"
      />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold">{venue.name}</h4>
        <div className="flex items-center text-sm text-gray-600">
          <Star size={14} fill="gold" strokeWidth={0} className="mr-1" />
          <span>{venue.rating} ({venue.reviews})</span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <MapPin size={14} className="mr-1" />
        <span>{venue.location}</span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs font-medium">
        {venue.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">
          <Star size={14} fill="gold" strokeWidth={0} />Top Rated
        </span>
        <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1">$ Budget</span>
      </div>
    </div>
  </div>
);

const PopularSportsCard = ({ sport }) => (
  <div className="min-w-[150px] w-[150px] text-center snap-center">
    <div className="w-full h-36 rounded-2xl overflow-hidden shadow-md">
      <img src={sport.image} alt={sport.name} className="w-full h-full object-cover" />
    </div>
    <p className="mt-2 text-sm font-semibold">{sport.name}</p>
  </div>
);

const Home = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate('/');
  };

  // Function to get display name for role
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

  const venues = [
    {
      name: 'SBR Badminton',
      rating: 4.5,
      reviews: 6,
      location: 'Vaishnodevi Clr',
      tags: ['Badminton', 'Outdoor'],
      image: SBRBadmintonImage,
    },
    {
      name: 'PQR Sports Arena',
      rating: 4.8,
      reviews: 12,
      location: 'Science City Rd',
      tags: ['Tennis', 'Indoor'],
      image: PQRSportsArenaImage,
    },
    {
      name: 'XYZ Cricket Ground',
      rating: 4.2,
      reviews: 8,
      location: 'SG Highway',
      tags: ['Cricket'],
      image: XYZCricketGroundImage,
    },
    {
      name: 'Water World',
      rating: 4.9,
      reviews: 25,
      location: 'Thaltej',
      tags: ['Swimming'],
      image: WaterWorldImage,
    },
  ];

  const popularSports = [
    { name: 'Badminton', image: '/src/assets/badminton.jpg' },
    { name: 'Football', image: '/src/assets/football.jpg' },
    { name: 'Cricket', image: '/src/assets/cricket.jpg' },
    { name: 'Swimming', image: '/src/assets/swimming.jpg' },
    { name: 'Tennis', image: '/src/assets/tennis.jpg' },
    { name: 'Table Tennis', image: '/src/assets/tabletennis.jpg' },
  ];

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans overflow-x-hidden">
      {/* Header */}
      <header className="flex items-center justify-between py-4 border-b border-gray-200 px-4 md:px-8">
        <h1 className="text-xl md:text-2xl font-bold">QUICKCOURT</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
            <Calendar size={18} className="mr-2" />
            <span>Book</span>
          </button>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-8 h-8 hover:ring-2 hover:ring-blue-500 transition-all">
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                    {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-6">
                  {/* User Info Section */}
                  <div className="flex items-center space-x-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={user.avatar} alt={user.fullName} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold text-lg">
                        {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg text-gray-900">{user.fullName}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {getRoleDisplayName(user.role)}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Link to="/profile" className="w-full">
                      <Button variant="outline" className="w-full justify-start cursor-pointer">
                        <User size={16} className="mr-2" />
                        View Profile
                      </Button>
                    </Link>                  
              
                    
                    <Button 
                      onClick={logoutHandler} 
                      variant="destructive" 
                      className="w-full justify-start cursor-pointer"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center space-x-3">
              <Button 
                onClick={() => navigate('/login')}
                variant="outline"
                className="text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Sign Up 
              </Button>
            </div>
          )}
        </div>

      </header>


      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center my-8 md:my-16 px-4 md:px-8">
        <div className="flex-1 p-4 md:p-8 space-y-4">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Ahmedabad"
              className="pl-10 pr-4 py-2 w-full rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MapPin size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            FIND PLAYERS & VENUES NEARBY
          </h2>
          {user && (
            <p className="text-lg text-gray-600">
              Welcome back, {user.fullName}! Ready to play some {user.role === 'user' ? 'sports' : 'manage your facility'}?
            </p>
          )}
        </div>
        <div className="flex-1 w-full md:w-auto p-4 md:p-8">
          <img 
            src={FindPlayersVenuesImage} 
            alt="Find Players & Venues Nearby" 
            className="w-full h-64 md:h-96 rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Venues Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Book Venues</h3>
            </div>
            <Link to="/venues" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
              See all venues
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map((venue, index) => (
              <VenueCard key={index} venue={venue} />
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
              Load More Venues
            </button>
          </div>
        </div>
      </section>

      {/* Popular Sports Section */}
      <section className="w-full bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Sports</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {popularSports.map((sport, index) => (
              <PopularSportsCard key={index} sport={sport} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

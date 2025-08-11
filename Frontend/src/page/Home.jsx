import React, { useState } from 'react';
import { MapPin, Calendar, Star, ChevronRight } from 'lucide-react';
import SBRBadmintonImage from '../assets/SBRBadminton.jpg';
import PQRSportsArenaImage from '../assets/PQRSportsArena.jpg';
import XYZCricketGroundImage from '../assets/XYZCricketGround.jpg';
import WaterWorldImage from '../assets/WaterWorld.jpg';
import FindPlayersVenuesImage from '../assets/FIND PLAYERS & VENUES NEARBY.jpg';

// shadcn/ui components (simulated for this example)
import { Avatar, AvatarImage } from './ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

// Reusable Venue Card component
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

// Reusable Popular Sports Card component
const PopularSportsCard = ({ sport }) => (
  <div className="min-w-[150px] w-[150px] text-center snap-center">
    <div className="w-full h-36 rounded-2xl overflow-hidden shadow-md">
      <img src={sport.image} alt={sport.name} className="w-full h-full object-cover" />
    </div>
    <p className="mt-2 text-sm font-semibold">{sport.name}</p>
  </div>
);

const Home = () => {
  // Venue data with images
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

  // Popular sports data with local images
  const popularSports = [
    { name: 'Badminton', image: '/src/assets/badminton.jpg' },
    { name: 'Football', image: '/src/assets/football.jpg' },
    { name: 'Cricket', image: '/src/assets/cricket.jpg' },
    { name: 'Swimming', image: '/src/assets/swimming.jpg' },
    { name: 'Tennis', image: '/src/assets/tennis.jpg' },
    { name: 'Table Tennis', image: '/src/assets/tabletennis.jpg' },
  ];

  // State to manage the authenticated user
  const [user, setUser] = useState(null);
  
  // Simulate user data
  const simulatedUser = {
    fullName: "John Doe",
    profile: {
      profilePhoto: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg",
      bio: "Sports Enthusiast"
    },
    role: "candidate"
  };

  const loginHandler = () => {
    setUser(simulatedUser);
  };
  
  const logoutHandler = () => {
    setUser(null);
  };

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

          {/* Conditional rendering for login/avatar */}
          {!user ? (
            <>
              <Button 
                onClick={loginHandler}
                className="text-gray-600 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
                variant="outline"
              >
                Login
              </Button>
              <Button 
                className="text-white bg-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer w-8 h-8">
                <AvatarImage src={user?.profile?.profilePhoto} alt="" />
              </Avatar>
            </PopoverTrigger>
              <PopoverContent className="w-80 max-h-[80vh] overflow-y-auto">
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                  </Avatar>
                  <div>
                    <h4 className='font-medium'>{user?.fullName}</h4>
                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className='flex flex-col gap-2 text-gray-600'>
                  {user && user.role === "candidate" && (
                    <div className="flex flex-wrap items-center gap-2 md:flex-row ml-[-13px] mt-[10px]">
                      <Button variant="link" className="cursor-pointer">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2 md:flex-row">
                    <Button onClick={logoutHandler} className="cursor-pointer">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center my-8 md:my-16 px-4 md:px-8">
        {/* Left content */}
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
        </div>
        {/* Right image */}
        <div className="flex-1 w-full md:w-auto p-4 md:p-8">
          <img 
            src={FindPlayersVenuesImage} 
            alt="Find Players & Venues Nearby" 
            className="w-full h-64 md:h-96 rounded-2xl object-cover shadow-lg"
          />
        </div>
      </section>

      {/* Venues Section - Full Width */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Book Venues</h3>
            </div>
            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
              See all venues
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
          
          {/* Venue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map((venue, index) => (
              <VenueCard key={index} venue={venue} />
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300">
              Load More Venues
            </button>
          </div>
        </div>
      </section>

      {/* Popular Sports Section - Full Width */}
      <section className="w-full bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Popular Sports</h3>
          </div>
          
          {/* Sports Grid */}
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

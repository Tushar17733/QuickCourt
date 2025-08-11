import React from 'react';
import { MapPin, Calendar, User, Star, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const Home = () => {

  // Placeholder data for the venue cards
  const venues = [
    {
      name: 'SBR Badminton',
      rating: 4.5,
      reviews: 6,
      location: 'Vaishnodevi Clr',
      tags: ['Badminton', 'Outdoor'],
    },
    {
      name: 'PQR Sports Arena',
      rating: 4.8,
      reviews: 12,
      location: 'Science City Rd',
      tags: ['Tennis', 'Indoor'],
    },
    {
      name: 'XYZ Cricket Ground',
      rating: 4.2,
      reviews: 8,
      location: 'SG Highway',
      tags: ['Cricket'],
    },
    {
      name: 'Water World',
      rating: 4.9,
      reviews: 25,
      location: 'Thaltej',
      tags: ['Swimming'],
    },
  ];

  // Placeholder data for the popular sports cards
  const popularSports = [
    { name: 'Badminton', image: 'https://placehold.co/150x150/E2E8F0/1a202c?text=Badminton' },
    { name: 'Football', image: 'https://placehold.co/150x150/E2E8F0/1a202c?text=Football' },
    { name: 'Cricket', image: 'https://placehold.co/150x150/E2E8F0/1a202c?text=Cricket' },
    { name: 'Swimming', image: 'https://placehold.co/150x150/E2E8F0/1a202c?text=Swimming' },
    { name: 'Tennis', image: 'https://placehold.co/150x150/E2E8F0/1a202c?text=Tennis' },
    { name: 'Table Tennis', image: 'https://placehold.co/150x150/E2E8F0/1a202c?text=Table+Tennis' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between py-4 border-b border-gray-200">
        <h1 className="text-xl md:text-2xl font-bold">QUICKCOURT</h1>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-gray-600">
            <Calendar size={18} className="mr-2" />
            <span>Book</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <User size={18} />
            <span className="hidden md:block">Login / Sign Up</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center my-8 md:my-16">
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
          {/* <p className="text-gray-600 text-lg md:text-xl max-w-md">
            Seamlessly explore sports venues and play with sports enthusiasts just like you!
          </p> */}
        </div>
        {/* Right image placeholder */}
        <div className="flex-1 w-full md:w-auto p-4 md:p-8">
          <div className="w-full h-64 md:h-96 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
            IMAGE
          </div>
        </div>
      </section>

      {/* Venues Section - Full Width */}
      <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Book Venues</h3>
              {/* <p className="text-gray-600 text-lg">Discover and book premium sports venues near you</p> */}
            </div>
            <a href="#" className="flex items-center text-blue-600 hover:text-blue-800 font-semibold">
              See all venues
              <ChevronRight size={16} className="ml-1" />
            </a>
          </div>
          
          {/* Venue Grid - Full Width */}
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
            {/* <p className="text-gray-600 text-lg">Explore sports and find your perfect match</p> */}
          </div>
          
          {/* Sports Grid - Full Width */}
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

// Reusable Venue Card component
const VenueCard = ({ venue }) => (
  <div className="min-w-[250px] md:min-w-[300px] bg-white rounded-2xl shadow-md overflow-hidden snap-center">
    <div className="w-full h-36 bg-gray-200 flex items-center justify-center text-gray-400">
      Image
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
          <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600 flex items-center gap-1"><Star size={14} fill="gold" strokeWidth={0} />Top Rated</span>
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

export default Home;

import React, { useState, useMemo } from 'react';
import { ChevronDown, Clock, Plus, Minus, X } from 'lucide-react';

// This component contains only the court booking form.
const CourtBookingForm = () => {
  // State management for the form fields
  const [selectedSport, setSelectedSport] = useState('Badminton');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('01:00 PM');
  const [duration, setDuration] = useState(2);
  const [selectedCourts, setSelectedCourts] = useState(['Table 1', 'Table 2']);

  // This is a mock price per hour for the booking calculation.
  const pricePerHour = 600;
  
  // Memoized calculation for the total price to avoid unnecessary re-renders.
  const totalPrice = useMemo(() => duration * pricePerHour, [duration]);

  // Handler for duration change buttons (+ and -).
  const handleDurationChange = (amount) => {
    setDuration(prevDuration => Math.max(1, prevDuration + amount));
  };

  // Handler for removing a selected court.
  const handleRemoveCourt = (courtToRemove) => {
    setSelectedCourts(prevCourts => prevCourts.filter(court => court !== courtToRemove));
  };

  // Handler for adding a new court (simulated for demonstration)
  const handleAddCourt = () => {
    // This is a simple mock to add a new court.
    const newCourt = `Table ${selectedCourts.length + 1}`;
    setSelectedCourts(prevCourts => [...prevCourts, newCourt]);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-inter flex items-center justify-center p-4">
      {/* Court Booking Form */}
      <div className="bg-white rounded-lg shadow-md p-6 lg:p-10 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Court Booking</h2>
        
        {/* Venue Information */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="text-xl font-bold mb-1">SBR Badminton</h3>
          <div className="flex items-center text-sm text-gray-600 space-x-4">
            <span className="flex items-center">
              <svg className="w-4 h-4 text-red-500 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/></svg>
              Satellite, Jodhpur Village
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 text-yellow-400 mr-1" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              4.5 (6)
            </span>
          </div>
        </div>
        
        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Sport Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Sport</label>
            <div className="relative">
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option>Badminton</option>
                <option>Football</option>
                <option>Cricket</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Date Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Date</label>
            <div className="relative">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
            </div>
          </div>

          {/* Start Time Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Start Time</label>
            <div className="relative">
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                <option>01:00 PM</option>
                <option>02:00 PM</option>
                <option>03:00 PM</option>
              </select>
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
          
          {/* Duration Input with +/- buttons */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Duration</label>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleDurationChange(-1)}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-xl font-bold">{duration} Hr</span>
              <button 
                onClick={() => handleDurationChange(1)}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Court Selection */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Court</label>
            <div className="flex flex-wrap items-center space-x-2 space-y-2 p-3 border border-gray-300 rounded-lg min-h-[48px]">
              {selectedCourts.map(court => (
                <span key={court} className="bg-gray-200 text-gray-800 rounded-full px-4 py-1 flex items-center space-x-1">
                  <span>{court}</span>
                  <button onClick={() => handleRemoveCourt(court)} className="text-gray-500 hover:text-gray-800 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
               {/* This is a mock button to add a court */}
               <button onClick={handleAddCourt} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  --Select Court--
                </button>
            </div>
          </div>
        </div>
        
        {/* Continue to Payment button */}
        <div className="mt-8">
          <button className="bg-green-500 text-white font-bold text-lg w-full py-4 rounded-lg shadow-md hover:bg-green-600 transition-colors">
            Continue to Payment - ₹{totalPrice}.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourtBookingForm;

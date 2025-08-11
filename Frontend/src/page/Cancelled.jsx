import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cancelled = () => {
  const navigate = useNavigate();
  const [randomItems, setRandomItems] = useState([]);
  
  // Sample items that could be cancelled
  const allItems = [
    { id: 1, name: "Tennis Court Booking", time: "2:00 PM - 3:00 PM", date: "2024-01-15", price: "$20" },
    { id: 2, name: "Badminton Court", time: "4:00 PM - 5:00 PM", date: "2024-01-15", price: "$15" },
    { id: 3, name: "Basketball Court", time: "6:00 PM - 7:00 PM", date: "2024-01-16", price: "$25" },
    { id: 4, name: "Swimming Pool Slot", time: "7:00 AM - 8:00 AM", date: "2024-01-16", price: "$10" },
    { id: 5, name: "Gym Session", time: "9:00 AM - 10:00 AM", date: "2024-01-17", price: "$12" },
    { id: 6, name: "Yoga Class", time: "10:00 AM - 11:00 AM", date: "2024-01-17", price: "$18" }
  ];

  useEffect(() => {
    // Select 2 random items
    const shuffled = [...allItems].sort(() => 0.5 - Math.random());
    setRandomItems(shuffled.slice(0, 2));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-red-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white text-center">
              Cancelled Bookings
            </h2>
          </div>
          
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                The following bookings have been cancelled
              </h3>
            </div>

            <div className="space-y-4">
              {randomItems.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.date} at {item.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {item.price}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancelled;

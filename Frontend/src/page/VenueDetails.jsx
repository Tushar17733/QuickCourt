import React from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';

const VenueDetails = () => {
  const { id } = useParams();
  console.log(id);

  const venue = {
    name: "SBR Badminton",
    location: "Satellite, Jodhpur Village",
    rating: 4.5,
    reviewCount: 6,
    operatingHours: "7:00AM - 11:00PM",
    address: "2nd Floor, Aangam Banquet Hall, Opp. Auda Garden, Satellite, Jodhpur Village, Ahmedabad, Gujarat - 380081",
    sportsAvailable: ["Badminton", "Table Tennis", "Box Cricket"],
    amenities: [
      { name: "Parking" },
      { name: "Restroom" },
      { name: "Refreshments" },
      { name: "CCTV Surveillance" },
      { name: "Centrally Air Conditioned Hall" },
      { name: "Seating Arrangement" },
      { name: "WiFi" },
      { name: "Library" },
    ],
    about: [
      "Tournament Training Venue",
      "For more than 2 players Rs. 50 extra per person",
      "Equipment available on rent",
    ],
    reviews: [
      {
        id: 1,
        user: "Mitchell Admin",
        date: "10 June 2025, 5:30 PM",
        rating: 4,
        comment: "Nice turf, well maintained"
      },
      {
        id: 2,
        user: "Mitchell Admin",
        date: "10 June 2025, 5:30 PM",
        rating: 5,
        comment: "Great facilities and friendly staff!"
      },
      {
        id: 3,
        user: "Mitchell Admin",
        date: "10 June 2025, 5:30 PM",
        rating: 4,
        comment: "Had a great time playing here with my friends."
      }
    ]
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 flex items-center justify-center font-sans">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl">
        <Header />
        <div className="p-6 md:p-8 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-900">{venue.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 mt-2 space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{venue.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <StarRating rating={venue.rating} />
              <span>({venue.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2 mb-6 lg:mb-0">
            <div className="relative w-full h-80 md:h-96 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-bold mb-4 lg:mb-0">
              <span className="text-xl">Images / Videos</span>
              <button className="absolute left-4 bg-white rounded-full p-2 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="absolute right-4 bg-white rounded-full p-2 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <button className="w-full bg-green-500 text-white font-bold py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200">
              Book This Venue
            </button>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-800">Operating Hours</h4>
                  <p className="text-sm text-gray-600">{venue.operatingHours}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500 mt-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h4 className="font-semibold text-gray-800">Address</h4>
                  <p className="text-sm text-gray-600">{venue.address}</p>
                </div>
              </div>

              <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                <span>Location Map</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 border-t border-gray-200 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Sports Available
              <span className="text-sm font-normal text-gray-500 ml-2">(Click on sports to view price chart)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {venue.sportsAvailable.map((sport, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="text-4xl">🏸</span>
                  <span className="mt-2 text-sm font-medium text-gray-700">{sport}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {venue.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">About Venue</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {venue.about.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Player Reviews & Ratings</h3>
            <div className="space-y-4">
              {venue.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-bold">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{review.user}</p>
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
import React from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';

const CancelledBookingModal = ({ isOpen, onClose, cancelledBookings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <FaExclamationTriangle className="mr-3" />
            Cancelled Bookings Structure
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {cancelledBookings.length === 0 ? (
            <div className="text-center py-12">
              <FaExclamationTriangle className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No cancelled bookings found</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">
                  Cancelled Bookings Overview
                </h3>
                <p className="text-red-700">
                  Total cancelled bookings: {cancelledBookings.length}
                </p>
              </div>

              <div className="grid gap-4">
                {cancelledBookings.map((booking, index) => (
                  <div key={booking.id} className="bg-gray-50 rounded-xl p-6 border-l-4 border-red-500 shadow-md">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {index + 1}. {booking.court}
                        </h4>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          CANCELLED
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-red-600">{booking.price}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <FaCalendarAlt className="mr-3 text-gray-500" />
                          <span className="font-medium">Date:</span>
                          <span className="ml-2">{new Date(booking.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <FaClock className="mr-3 text-gray-500" />
                          <span className="font-medium">Time:</span>
                          <span className="ml-2">{booking.time}</span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <FaMapMarkerAlt className="mr-3 text-gray-500" />
                          <span className="font-medium">Location:</span>
                          <span className="ml-2">{booking.location}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <span className="font-medium">Sport:</span>
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
                            {booking.sport}
                          </span>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <span className="font-medium">Status:</span>
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm">
                            {booking.status}
                          </span>
                        </div>

                        <div className="flex items-start text-gray-700">
                          <span className="font-medium mr-2">Reason:</span>
                          <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
                            {booking.reason}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <p><strong>Booking ID:</strong> #{booking.id.toString().padStart(4, '0')}</p>
                        <p><strong>Cancelled on:</strong> {new Date().toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelledBookingModal;

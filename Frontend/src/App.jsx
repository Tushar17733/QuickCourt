import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Registration from './page/Registration'
import Otp from './page/Otp'
import Profile from './page/Profile'

import Venues from './page/Venues'
// import VenueDetails from './page/VenueDetails'
// import CourtBookingForm from './page/CourtBookingForm'
import VenueDetails from './page/VenueDetails'
import CourtBookingForm from './page/CourtBookingForm'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/profile" element={<Profile/>} />
        
        <Route path="/venues" element={<Venues />} />
        {/* <Route path="/venuedetails" element={<VenueDetails />} />
        <Route path="/courtbooking" element={<CourtBookingForm />} /> */}
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/courtbooking" element={<CourtBookingForm />} />
      </Routes>
    </div>
  )
}

export default App

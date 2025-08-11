import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Registration from './page/Registration'
import Otp from './page/Otp'
import Profile from './page/Profile'
import Cancelled from './page/Cancelled'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/cancelled" element={<Cancelled/>} />
      </Routes>
    </div>
  )
}

export default App

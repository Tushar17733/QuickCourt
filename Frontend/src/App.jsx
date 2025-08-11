import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/Login'
import Registration from './page/Registration'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App

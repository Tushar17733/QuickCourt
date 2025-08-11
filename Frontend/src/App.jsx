import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './page/Login'
import Registration from './page/Registration'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

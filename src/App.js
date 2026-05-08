import React from 'react'
import Signup from './comp/signup/signup';
import Login from './comp/login/login';
import Dashbaord from './comp/dashboard/dashbaord';
import { Routes, Route } from 'react-router-dom';
import Header from './comp/header/Header';

function App() {
  return (
    <div className="app-container">
      <div className="bg-glow"></div>
      <Header />
      <div className="content-wrapper">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashbaord />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
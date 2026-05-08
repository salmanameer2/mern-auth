import React from 'react';
import './dashboard.css';

function Dashbaord() {
  const userName = localStorage.getItem("name") || "User";

  return (
    <div className="dashboard-simple-page">
      <h1>Welcome {userName}</h1>
    </div>
  );
}

export default Dashbaord;
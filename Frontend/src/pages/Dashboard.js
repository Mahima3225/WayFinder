// frontend/src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebsiteSelection from '../components/WebsiteSelection';
import InteractivePanel from '../components/InteractivePanel';
import SearchBox from '../components/SearchBox';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Retrieve the username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    // Remove token and username from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Optionally, redirect the user to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to WayFinder</h1>
        {username && <p>Welcome, {username}!</p>}
        {username && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
        <p>Your personal guide to mastering complex web services.</p>
      </header>
      <div className="dashboard-content">
        <WebsiteSelection onSelect={setSelectedWebsite} />
        {selectedWebsite && <InteractivePanel website={selectedWebsite} />}
        <hr className="divider" />
        <SearchBox />
      </div>
    </div>
  );
};

export default Dashboard;

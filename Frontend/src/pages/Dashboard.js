// frontend/src/pages/Dashboard.js
import React, { useState } from 'react';
import WebsiteSelection from '../components/WebsiteSelection';
import InteractivePanel from '../components/InteractivePanel';
import SearchBox from '../components/SearchBox';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome to WayFinder</h1>
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

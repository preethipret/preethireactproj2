import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const renderNavigationLinks = () => (
    <nav className="dashboard-navigation">
      <Link to="./ipo-calendar">IPO Calendar</Link>
      <Link to="./exchange-rates">Currency Exchange Rates</Link>
    </nav>
  );

  return (
    <div className="dashboard-container">
      <h2 align="center" className="dashboard-header">
        Welcome to the dashboard, {user.username}!
      </h2>
      <br />
      <br />
      {renderNavigationLinks()}

      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="page-container home-container">
      <h1>Welcome to the IPO and Currency Rate Dashboard</h1>
      <p>
        <span className="home-action">Login</span> or{' '}
        <span className="home-action">Register</span> to get started.
      </p>
    </div>
  );
};

export default Home;


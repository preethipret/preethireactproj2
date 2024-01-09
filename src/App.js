import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import IpoCalendar from './components/IpoCalendar';
import CurrencyExchangeRates from './components/CurrencyExchangeRates';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [ipoData, setIpoData] = useState([]);
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchIpoData = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=pk_a9ec3e01d1be42b3a9ebac83c466a9ec'
        );

        setIpoData(response.data);
      } catch (error) {
        console.error('Error in fetching the IPO data:', error);
      }
    };

    fetchIpoData();
  }, []);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          'https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=pk_a9ec3e01d1be42b3a9ebac83c466a9ec'
        );

        setExchangeRates(response.data);
      } catch (error) {
        console.error('Error in fetching the exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <ul>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/login">Login</NavItem>
            <NavItem to="/registration">Register</NavItem>
            {user && (
              <>
                <NavItem to="/dashboard">Dashboard</NavItem>
                <NavItem to="/logout">Logout</NavItem>
              </>
            )}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/dashboard/ipo-calendar" element={<IpoCalendar ipoData={ipoData} />} />
        <Route
          path="/dashboard/exchange-rates"
          element={<CurrencyExchangeRates exchangeRates={exchangeRates} />}
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
}

const NavItem = ({ to, children }) => (
  <li>
    <Link to={to}>{children}</Link>
  </li>
);

export default App;

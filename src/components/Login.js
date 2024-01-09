import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidCredentials()) {
      const userData = { username };
      onLogin(userData);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const isValidCredentials = () => {
    return username === 'preethi' && password === 'Preethi@45';
  };

  return (
    <div className="page-container login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/registration">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;

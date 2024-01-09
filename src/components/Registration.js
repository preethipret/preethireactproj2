import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration is done successfully for ${username}`);
    navigate('/login');
  };

  return (
    <div className="page-container registration-container">
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        {renderInput('Username', username, (e) => setUsername(e.target.value))}
        {renderInput('Password', password, (e) => setPassword(e.target.value, 'password'))}
        {renderButton('Register')}
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

const renderInput = (label, value, onChange, type = 'text') => (
  <label>
    {label}:
    <input type={type} value={value} onChange={onChange} />
  </label>
);

const renderButton = (text) => (
  <button type="submit">{text}</button>
);

export default Registration;

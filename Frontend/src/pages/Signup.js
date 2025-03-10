// frontend/src/pages/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        formData
      );
      navigate('/login');
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="auth-input"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="auth-input"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-button">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

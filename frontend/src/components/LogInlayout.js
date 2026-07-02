import React, { useState } from 'react';
import axios from 'axios';
import { FaCheck } from "react-icons/fa";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import "./SignInlayout.css";

const LogInlayout = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setEmail('');
      setPassword('');
      setMessage(response.data.message);
      if (response.data.success || response.status === 200) {
        login();
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <div className="benefit-item">
            <div className="benefit-icon"><FaCheck /></div>
            <div className="benefit-text">
              <h4>Premium Inventory</h4>
              <p>Access our exclusive collection of luxury and premium vehicles.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaCheck /></div>
            <div className="benefit-text">
              <h4>Seamless Financing</h4>
              <p>Get pre-approved in minutes with our transparent financing solutions.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaCheck /></div>
            <div className="benefit-text">
              <h4>Global Delivery</h4>
              <p>We deliver your dream car straight to your doorstep, anywhere in the world.</p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="auth-btn" type="submit">Log In</button>
          </form>
          {message && <p className="auth-message">{message}</p>}
        </div>
      </div>
    </div>
  )
}

export default LogInlayout;

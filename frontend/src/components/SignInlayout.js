import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa";
import axios from 'axios';
import Modal from './Modal.js';
import "./SignInlayout.css";

const Signinlayout = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [modalData, setModalData] = useState({
    show: false,
    title: '',
    content: null
  });

  const openModal = (title, content) => {
    setModalData({ show: true, title, content });
  };

  const closeModal = () => {
    setModalData({ ...modalData, show: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, {
        email,
        fullname,
        password
      });
      setEmail('');
      setFullname('');
      setPassword('');
      openModal('Success!', <div><p>Your registration was successful. You can now log in.</p></div>);
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
              <h4>Quick & Free Sign-Up</h4>
              <p>Create an account in seconds to unlock premium features.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaCheck /></div>
            <div className="benefit-text">
              <h4>Save Your Favorites</h4>
              <p>Keep track of cars you love and compare them side by side.</p>
            </div>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon"><FaCheck /></div>
            <div className="benefit-text">
              <h4>Personalized Alerts</h4>
              <p>Get notified when a vehicle matching your criteria becomes available.</p>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={fullname}
                placeholder="John Doe"
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
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
                placeholder="Create a strong password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="checkbox-group">
              <input type="checkbox" id="updates" />
              <label htmlFor="updates">Get updates and notifications about our products</label>
            </div>
            <button className="auth-btn" type="submit">Sign Up</button>
          </form>
          {message && <p className="auth-message">{message}</p>}

          <Modal
            show={modalData.show}
            onClose={closeModal}
            title={modalData.title}
            content={modalData.content}
          />
        </div>
      </div>
    </div>
  )
}

export default Signinlayout;

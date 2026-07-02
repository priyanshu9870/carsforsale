import React, { useState } from 'react';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Reach out with any questions or inquiries.</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-card">
            <FaPhoneAlt className="info-icon" />
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
            <p>Mon - Fri, 9am - 6pm EST</p>
          </div>
          <div className="info-card">
            <FaEnvelope className="info-icon" />
            <h3>Email</h3>
            <p>support@carpurchase.com</p>
            <p>sales@carpurchase.com</p>
          </div>
          <div className="info-card">
            <FaMapMarkerAlt className="info-icon" />
            <h3>Office</h3>
            <p>123 Auto Avenue</p>
            <p>New York, NY 10001</p>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required placeholder="How can we help you?"></textarea>
            </div>
            <button type="submit" className="contact-submit">Send Message</button>
            {submitted && <p className="success-msg">Message sent successfully! We will get back to you soon.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

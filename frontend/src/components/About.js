import React from 'react';
import './About.css';
import { FaShieldAlt, FaCar, FaRegMoneyBillAlt, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About CarPurchase</h1>
        <p>Redefining how the world buys, sells, and experiences premium automobiles.</p>
      </div>

      <div className="about-container">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>We believe that finding your dream car should be as exciting and seamless as driving it. CarPurchase as a Service was founded with a single goal: to remove the friction from automotive retail and deliver a transparent, premium experience globally.</p>
        </section>

        <section className="about-features">
          <div className="feature-card">
             <FaCar className="feature-icon" />
             <h3>Curated Inventory</h3>
             <p>Every vehicle in our collection undergoes a rigorous 150-point inspection.</p>
          </div>
          <div className="feature-card">
             <FaShieldAlt className="feature-icon" />
             <h3>Secure Transactions</h3>
             <p>Bank-grade security and escrow services protect both buyers and sellers.</p>
          </div>
          <div className="feature-card">
             <FaRegMoneyBillAlt className="feature-icon" />
             <h3>Transparent Pricing</h3>
             <p>No hidden fees. What you see is exactly what you pay, with instant financing.</p>
          </div>
          <div className="feature-card">
             <FaGlobe className="feature-icon" />
             <h3>Global Delivery</h3>
             <p>Fully insured shipping right to your driveway, anywhere in the world.</p>
          </div>
        </section>

        <section className="about-story">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>Started in 2026, CarPurchase quickly grew from a local boutique dealership into a global technology-driven automotive marketplace. By blending cutting-edge software with profound automotive passion, we've helped thousands of drivers find their perfect match without the traditional dealership hassle.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

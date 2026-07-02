import React from 'react';
import { Link } from 'react-router-dom';
import LogoColor from '../assets/images/logo-whiteone.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer-section'>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to='/'>
              <img src={LogoColor} alt="Rankiteo" />
            </Link>
            <p>We assess worldwide <strong>CarPurchase</strong></p>
          </div>
          <div className="footer-actions">
            <Link to='/' className="custom-button contact-sales-button">
              Contact Sales
            </Link>
            <Link to='/' className="custom-button register-button">
              Free Trial &rarr;
            </Link>
          </div>
        </div>
        
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Service</h4>
            <ul>
              <li><Link to="/">Car Inspection</Link></li>
              <li><Link to="/">Financing Options</Link></li>
              <li><Link to="/">Warranty and Insurance</Link></li>
              <li><Link to="/">Trade-In Service</Link></li>
              <li><Link to="/">Vehicle History Reports</Link></li>
              <li><Link to="/">Delivery and Shipping</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/">Buying Guide</Link></li>
              <li><Link to="/">Financing Advice</Link></li>
              <li><Link to="/">Insurance Information</Link></li>
              <li><Link to="/">Maintenance Tips</Link></li>
              <li><Link to="/">Safety Tips</Link></li>
              <li><Link to="/">FAQs</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/">All Cars</Link></li>
              <li><Link to="/">Sedans</Link></li>
              <li><Link to="/">SUVs</Link></li>
              <li><Link to="/">Electric & Hybrid</Link></li>
              <li><Link to="/">By Brand</Link></li>
              <li><Link to="/">Luxury Cars</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/">Our Team</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Press & Media</Link></li>
              <li><Link to="/">Testimonials</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CarPurchase as a Service. All rights reserved.</p>
          <div>
            <Link to="/" style={{marginRight: '1rem', color: '#94a3b8', textDecoration: 'none'}}>Privacy Policy</Link>
            <Link to="/" style={{color: '#94a3b8', textDecoration: 'none'}}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

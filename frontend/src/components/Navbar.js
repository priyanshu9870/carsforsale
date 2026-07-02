import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser, FaInfoCircle, FaLifeRing } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import LogoColor from '../assets/images/trans.png';
import Logo3 from '../assets/images/company_profile.svg';
import { useAuth } from '../AuthContext.js';
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo-container" onClick={closeMenu}>
          <img src={LogoColor} alt="Rankiteo" />
        </Link>

        <div className="mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li className={`nav-item ${activeDropdown === 'services' ? 'mobile-open' : ''}`}>
            <div className="nav-link" onClick={() => toggleDropdown('services')}>
              Services
            </div>
            <div className={`dropdown-menu ${activeDropdown === 'services' ? 'active' : ''}`}>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <img src={Logo3} alt="" className="dropdown-icon" />
                <div className="dropdown-text">
                  <h4>Car Inspection</h4>
                  <p>Pre-purchase inspection details</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <img src={Logo3} alt="" className="dropdown-icon" />
                <div className="dropdown-text">
                  <h4>Financing Options</h4>
                  <p>Loan options and calculators</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <img src={Logo3} alt="" className="dropdown-icon" />
                <div className="dropdown-text">
                  <h4>Trade-In Services</h4>
                  <p>Trade in your old cars easily</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <img src={Logo3} alt="" className="dropdown-icon" />
                <div className="dropdown-text">
                  <h4>Delivery & Shipping</h4>
                  <p>Home delivery and out-of-town shipping</p>
                </div>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${activeDropdown === 'vehicles' ? 'mobile-open' : ''}`}>
            <div className="nav-link" onClick={() => toggleDropdown('vehicles')}>
              Vehicles
            </div>
            <div className={`dropdown-menu ${activeDropdown === 'vehicles' ? 'active' : ''}`}>
               <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>All Cars</h4>
                  <p>Browse our entire inventory</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>Luxury Cars</h4>
                  <p>Premium and high-end vehicles</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>Electric & Hybrid</h4>
                  <p>Eco-friendly options</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>SUVs & XUVs</h4>
                  <p>Spacious and powerful</p>
                </div>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${activeDropdown === 'company' ? 'mobile-open' : ''}`}>
            <div className="nav-link" onClick={() => toggleDropdown('company')}>
              Company
            </div>
            <div className={`dropdown-menu ${activeDropdown === 'company' ? 'active' : ''}`}>
               <Link to="/about" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>About Us</h4>
                  <p>Learn about our mission and vision</p>
                </div>
              </Link>
              <Link to="/contact" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>Contact Us</h4>
                  <p>Get in touch with our team</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>Careers</h4>
                  <p>Join our growing global team</p>
                </div>
              </Link>
              <Link to="/" className="dropdown-card" onClick={closeMenu}>
                <div className="dropdown-text">
                  <h4>Press & Media</h4>
                  <p>Latest news and press releases</p>
                </div>
              </Link>
            </div>
          </li>

          {isLoggedIn ? (
            <li className={`nav-item ${activeDropdown === 'profile' ? 'mobile-open' : ''}`}>
              <div className="nav-link" onClick={() => toggleDropdown('profile')}>
                Profile
              </div>
              <div className={`dropdown-menu profile-dropdown ${activeDropdown === 'profile' ? 'active' : ''}`} style={{gridTemplateColumns: '1fr'}}>
                <Link to="/" className="dropdown-card" onClick={closeMenu}>
                  <FaUser className="dropdown-icon" />
                  <div className="dropdown-text">
                    <h4>My Account</h4>
                  </div>
                </Link>
                <Link to="/" className="dropdown-card" onClick={closeMenu}>
                  <FaLifeRing className="dropdown-icon" />
                  <div className="dropdown-text">
                    <h4>Support</h4>
                  </div>
                </Link>
                <div className="dropdown-card" onClick={() => { logout(); closeMenu(); }} style={{cursor: 'pointer'}}>
                  <AiOutlineLogout className="dropdown-icon" style={{color: '#ef4444'}} />
                  <div className="dropdown-text">
                    <h4 style={{color: '#ef4444'}}>Logout</h4>
                  </div>
                </div>
              </div>
            </li>
          ) : (
            <li className="nav-item">
              <div className="auth-buttons">
                <Link to="/Login" className="btn-login" onClick={closeMenu}>Log In</Link>
                <Link to="/Signin" className="btn-signup" onClick={closeMenu}>Sign Up</Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;

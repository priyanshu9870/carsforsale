import React, { useEffect, useState } from 'react';
import "./Mainbody.css";
import { FaSearch, FaShieldAlt, FaCarSide, FaMoneyCheckAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import animated from '../assets/images/animated-car.svg';
import Modal from './Modal.js';
import { useAuth } from '../AuthContext';
import carData from "../data/carData.json"
import { allCars } from '../data/allCarJson.jsx';
import { Card, CardContent } from '@mui/material';

const Mainbody = () => {
  const { isLoggedIn } = useAuth();
  const [suvsCar, setSuvcar] = useState([]);
  const [luxuryCar, setLuxurycar] = useState([]);
  const [dp, setDp] = useState("none");
  const [searchValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalData, setModalData] = useState({
    show: false,
    title: '',
    content: null
  });

  const openModal = (title, content) => {
    setModalData({
      show: true,
      title,
      content
    });
  };

  const InputSearch = async (title, content) => {
    if (!isLoggedIn) {
      openModal(title, content)
      return;
    }
  }

  const handleSearch = () => {
    if (!searchValue.trim()) {
      setSearchResults([]);
      return;
    }

    setDp('block');

    const query = searchValue.trim().toLowerCase();
    const matched = allCars.filter(car =>
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.car_type.toLowerCase().includes(query)
    );

    setSearchResults(matched);
  };

  const handleSearch2 = (clickmodel) => {
    setDp('none');
    setInputValue('');
  }

  const closeModal = () => {
    setInputValue('')
    setModalData({ ...modalData, show: false });
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // const response1 = await fetch('http://localhost:3000/luxuryCar');
        // const response2 = await fetch('http://localhost:3000/normalSuv');
        // const data1 = await response1.json();
        // const data2 = await response2.json();
        setLuxurycar(carData.luxury_cars || []);
        setSuvcar(carData.normal_suvs || []);
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="main-page-container">
      <section className='hero-section'>
        <div className='main-wrapper'>
          <div className='left-block'>
            <h1 className='main-title'>
              <span className='colored-main-title'>
                <Typewriter
                  words={['Sale', 'Purchase', 'Finance']}
                  loop={Infinity}
                  cursor
                  cursorStyle='_'
                  typeSpeed={50}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </span>
              <br />as a Service
            </h1>
            <p className="main-subtitle">Experience the future of automotive retail. Find, finance, and drive your dream car today with our premium worldwide service.</p>

            <div className='action-box'>
              <Link to='/login' className="custom-button contact-sales-button">
                Contact Sales
              </Link>
              <button className="custom-button register-button" onClick={() => openModal('Free Trial', <p>Sign up to start your 14-day free trial!</p>)}>
                Start Free Trial
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <div className="search-container">
                <input
                  className="search-input"
                  type="text"
                  onClick={() => InputSearch('Authentication Required', <p>Please login first to search for cars.</p>)}
                  value={searchValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search by brand (e.g. BMW, Audi)"
                  required
                />
                <button onClick={handleSearch} className="search-btn">
                  <FaSearch />
                </button>
              </div>

              {dp === 'block' && (
                <Card className="search-results-card">
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <ul className="search-results-list">
                      {searchResults.length > 0 ? (
                        searchResults.map((car, index) => (
                          <li key={index} onClick={() => handleSearch2(car.model)}>
                            <Link to={`/car-details/${car.model}`} style={{ display: 'block', width: '100%' }}>
                              {car.brand} {car.model}
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li style={{ padding: '1rem 1.5rem', color: '#94a3b8', cursor: 'default' }}>
                          No cars found. Try searching for "BMW", "Audi", or "SUV".
                        </li>
                      )}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
          <div className='right-block'>
            <div className="hero-image-wrapper">
              <img src={animated} alt="Premium Car Dealership" />
            </div>
          </div>
        </div>

        <Modal
          show={modalData.show}
          onClose={closeModal}
          title={modalData.title}
          content={modalData.content}
        />
      </section>

      <section className='features-section'>
        <div className='titleWrap'>
          <div className='title'>
            <span>Why Choose Us?</span>
          </div>
          <p className='section-subtitle'>
            We deliver more than just cars. We provide an end-to-end premium automotive experience designed for absolute peace of mind.
          </p>
        </div>
        <div className='features-grid'>
          <div className='feature-box'>
            <div className='feature-icon-wrapper'><FaShieldAlt /></div>
            <h3>Certified Quality</h3>
            <p>Every vehicle passes a strict 150-point inspection.</p>
          </div>
          <div className='feature-box'>
            <div className='feature-icon-wrapper'><FaMoneyCheckAlt /></div>
            <h3>Instant Financing</h3>
            <p>Transparent rates and approval in minutes.</p>
          </div>
          <div className='feature-box'>
            <div className='feature-icon-wrapper'><FaCarSide /></div>
            <h3>Home Delivery</h3>
            <p>Get your dream car delivered directly to your driveway.</p>
          </div>
        </div>
      </section>

      <section className='sectionone'>
        <div className='titleWrap'>
          <div className='title'>
            <span>Luxury Collection</span>
          </div>
          <p className='section-subtitle'>
            Discover our handpicked selection of premium luxury vehicles. Engineered for excellence, these cars offer unparalleled comfort, state-of-the-art technology, and breathtaking performance.
          </p>
        </div>
        <div className='grid post-feed'>
          {luxuryCar.map((car, index) => (
            <div className='post-card' key={index}>
              <div className='flip-card-inner'>
                <div className='flip-card-front'>
                  <img src={car.image_url} alt={car.manufacturer} />
                </div>
                <div className='flip-card-back'>
                  <h2 className='carname'>{car.manufacturer}</h2>

                  <div className='info-row'>
                    <span>Year:</span>
                    <strong>{car.manufacture_date}</strong>
                  </div>
                  <div className='info-row'>
                    <span>Model:</span>
                    <strong>{car.model}</strong>
                  </div>

                  <div className='specifications'>
                    <h4>Performance Specs</h4>
                    <div className='spec-grid'>
                      <div className='spec-item'><span className='spec-key'>Engine</span><span className='spec-value'>{car.specifications?.engine}</span></div>
                      <div className='spec-item'><span className='spec-key'>Power</span><span className='spec-value'>{car.specifications?.horsepower}</span></div>
                      <div className='spec-item'><span className='spec-key'>Torque</span><span className='spec-value'>{car.specifications?.torque}</span></div>
                      <div className='spec-item'><span className='spec-key'>Speed</span><span className='spec-value'>{car.specifications?.top_speed}</span></div>
                    </div>
                  </div>

                  <div className='priceblock'>
                    <Link to={`/car-details/${car.model}`} style={{ textDecoration: 'none' }}>
                      <button className="price-btn">{car.price}</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='sectionone'>
        <div className='titleWrap'>
          <div className='title'>
            <span>XUV & SUVs</span>
          </div>
          <p className='section-subtitle'>
            Conquer any terrain with our robust lineup of SUVs and XUVs. Built for adventure and family comfort, offering spacious interiors, advanced safety features, and powerful capabilities.
          </p>
        </div>
        <div className='grid post-feed'>
          {suvsCar.map((car, index) => (
            <div className='post-card' key={index}>
              <div className='flip-card-inner'>
                <div className='flip-card-front'>
                  <img src={car.image_url} alt={car.manufacturer} />
                </div>
                <div className='flip-card-back'>
                  <h2 className='carname'>{car.manufacturer}</h2>

                  <div className='info-row'>
                    <span>Year:</span>
                    <strong>{car.manufacture_date}</strong>
                  </div>
                  <div className='info-row'>
                    <span>Model:</span>
                    <strong>{car.model}</strong>
                  </div>

                  <div className='specifications'>
                    <h4>Performance Specs</h4>
                    <div className='spec-grid'>
                      <div className='spec-item'><span className='spec-key'>Engine</span><span className='spec-value'>{car.specifications?.engine}</span></div>
                      <div className='spec-item'><span className='spec-key'>Power</span><span className='spec-value'>{car.specifications?.horsepower}</span></div>
                      <div className='spec-item'><span className='spec-key'>Torque</span><span className='spec-value'>{car.specifications?.torque}</span></div>
                      <div className='spec-item'><span className='spec-key'>Speed</span><span className='spec-value'>{car.specifications?.top_speed}</span></div>
                    </div>
                  </div>

                  <div className='priceblock'>
                    <Link to={`/car-details/${car.model}`} style={{ textDecoration: 'none' }}>
                      <button className="price-btn">{car.price}</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Mainbody;

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allCars } from '../data/allCarJson.jsx';
import './CarDetailsNew.css';

const CarDetailsNew = () => {
  const { model } = useParams();
  const [carData, setCarData] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the car from allCars by model name (case-insensitive)
    const foundCar = allCars.find(
      (car) => car.model.toLowerCase() === model.toLowerCase()
    );
    setCarData(foundCar || null);
    setLoading(false);
    setCurrentImage(0);
  }, [model]);

  // Auto-slide carousel every 4 seconds
  useEffect(() => {
    if (!carData || !carData.images || carData.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === carData.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [carData]);

  const prevSlide = () => {
    if (!carData) return;
    setCurrentImage((prev) =>
      prev === 0 ? carData.images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    if (!carData) return;
    setCurrentImage((prev) =>
      prev === carData.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="car-details-page">
        <div className="cd-loading">
          <div className="cd-spinner"></div>
          <p className="cd-loading-text">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="car-details-page">
        <div className="cd-not-found">
          <h2>Vehicle Not Found</h2>
          <p>We couldn't find a vehicle matching "{model}". Please try searching again.</p>
          <Link to="/" className="cd-not-found-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      {/* Hero Banner */}
      <section className="cd-hero-banner">
        <div className="cd-hero-content">
          <Link to="/" className="cd-back-btn">
            ← Back to Search
          </Link>
          <h1 className="cd-hero-title">
            <span className="cd-hero-brand">{carData.brand}</span> {carData.model}
          </h1>
          <div className="cd-hero-subtitle">
            <span className="cd-badge cd-badge-year">{carData.year}</span>
            <span className="cd-badge cd-badge-type">{carData.car_type}</span>
          </div>
        </div>
      </section>

      {/* Photo Carousel */}
      <section className="cd-carousel-section">
        <div className="cd-carousel-card">
          <div className="cd-carousel-wrapper">
            <button onClick={prevSlide} className="cd-carousel-nav cd-carousel-prev">
              ❮
            </button>
            <img
              src={carData.images[currentImage]}
              alt={`${carData.brand} ${carData.model} - View ${currentImage + 1}`}
              className="cd-carousel-image"
            />
            <button onClick={nextSlide} className="cd-carousel-nav cd-carousel-next">
              ❯
            </button>
          </div>
          <div className="cd-carousel-dots">
            {carData.images.map((_, idx) => (
              <button
                key={idx}
                className={`cd-carousel-dot ${idx === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="cd-content-section">
        {/* Overview + Technical Specs Grid */}
        <div className="cd-specs-grid">
          {/* Quick Overview */}
          <div className="cd-overview-card">
            <h3 className="cd-card-title">
              <span className="cd-card-title-icon cd-icon-blue">📋</span>
              Quick Overview
            </h3>
            <div className="cd-spec-row">
              <span className="cd-spec-label">🏢 Brand</span>
              <span className="cd-spec-value">{carData.brand}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">🚗 Model</span>
              <span className="cd-spec-value">{carData.model}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">📅 Year</span>
              <span className="cd-spec-value">{carData.year}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">🏷️ Type</span>
              <span className="cd-spec-value">{carData.car_type}</span>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="cd-tech-card">
            <h3 className="cd-card-title">
              <span className="cd-card-title-icon cd-icon-purple">⚙️</span>
              Technical Specs
            </h3>
            <div className="cd-spec-row">
              <span className="cd-spec-label">🔧 Engine</span>
              <span className="cd-spec-value">{carData.specifications.engine}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">⚡ Horsepower</span>
              <span className="cd-spec-value">{carData.specifications.horsepower}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">💨 Torque</span>
              <span className="cd-spec-value">{carData.specifications.torque}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">🏎️ Top Speed</span>
              <span className="cd-spec-value">{carData.specifications.top_speed}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">🔄 Transmission</span>
              <span className="cd-spec-value">{carData.specifications.transmission}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">⛽ Fuel Type</span>
              <span className="cd-spec-value">{carData.specifications.fuel_type}</span>
            </div>
            <div className="cd-spec-row">
              <span className="cd-spec-label">📊 Mileage</span>
              <span className="cd-spec-value">{carData.specifications.mileage}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="cd-description-card">
          <h3 className="cd-card-title">
            <span className="cd-card-title-icon cd-icon-blue">📝</span>
            Description & Highlights
          </h3>
          <p className="cd-description-text">{carData.description}</p>
        </div>

        {/* Pricing & Finance */}
        <div className="cd-pricing-card">
          <h3 className="cd-pricing-title">💰 Price & Finance Options</h3>
          <div className="cd-pricing-grid">
            <div className="cd-price-item">
              <div className="cd-price-label">MSRP</div>
              <div className="cd-price-value">{carData.price}</div>
            </div>
            <div className="cd-price-item">
              <div className="cd-price-label">Pre-Book Discount</div>
              <div className="cd-price-value">{carData.discount}</div>
            </div>
            <div className="cd-price-item">
              <div className="cd-price-label">EMI Starts At</div>
              <div className="cd-price-value">{carData.emi}</div>
            </div>
          </div>
          <div className="cd-action-buttons">
            <button className="cd-action-btn cd-btn-primary">
              🚗 Book Now
            </button>
            <button className="cd-action-btn cd-btn-secondary">
              📨 Request Quote
            </button>
            <button className="cd-action-btn cd-btn-success">
              🧪 Book Test Drive
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarDetailsNew;

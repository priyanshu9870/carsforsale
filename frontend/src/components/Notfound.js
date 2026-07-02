import React from "react";
import "./Notfound.css";

const Notfound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>

        <p className="error-text">
          The page you're looking for doesn't exist or you don't have permission
          to access it.
        </p>

        <a href="/" className="home-btn">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default Notfound;
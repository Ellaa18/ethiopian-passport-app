import React from "react";
import logo from "../assets/logo.jpg";
import "./Success.css";

export default function Success() {
  return (
    <div className="success-container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo-full" />
      </header>

      <div className="blue-line">
        <h1>Federal Democratic Republic of Ethiopia</h1>
        <h2>Immigration and Citizenship Service</h2>
      </div>

      {/* SUCCESS BOX */}
      <div className="success-box">
        <div className="checkmark-circle">
          <div className="background"></div>
          <div className="checkmark draw"></div>
        </div>

        <h2>Registration Finished Successfully</h2>
        <p>
          Your fingerprint and registration details have been recorded.  
          You can now proceed or return to the home page.
        </p>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/")}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}

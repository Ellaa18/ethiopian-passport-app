import React, { useEffect } from "react";
import logo from "../assets/logo.webp";
import "./Success.css";

export default function Success() {
  useEffect(() => {
    // ✅ When user reaches this page, permanently lock registration in this browser
    localStorage.setItem("registeredUser", "true");
  }, []);

  return (
    <div className="success-container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo-small" />
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
          Your fingerprint and registration details have been recorded. <br />
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

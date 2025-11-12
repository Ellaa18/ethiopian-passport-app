import React, { useEffect, useState } from "react";
import hand from "../assets/fingerprint.webp"; // replace with your hand image
import logo from "../assets/logo.webp"; // replace with your actual logo
import "./FingerprintScan.css";

export default function FingerprintScan({ onFinish }) {
  const fingers = ["Thumb", "Index", "Middle", "Ring", "Little"];
  const [scanned, setScanned] = useState([]);
  const [status, setStatus] = useState("Touch and Hold Each Finger (4 seconds)");
  const [statusColor, setStatusColor] = useState("#0e800c"); // default green
  const [done, setDone] = useState(false);

  const handleScan = (finger) => {
    if (scanned.includes(finger)) return;

    setStatus(`Scanning ${finger}...`);
    setStatusColor("#d4a017"); // amber/yellow while scanning

    setTimeout(() => {
      setScanned([...scanned, finger]);
      setStatus(`${finger} Scanned`);
      setStatusColor("#007a00"); // green after scanned
    }, 1200);
  };

  useEffect(() => {
    if (scanned.length === fingers.length) {
      setStatus("✅ All fingers scanned — Ready to Register");
      setStatusColor("#002e7e"); // blue when finished
      setDone(true);
    }
  }, [scanned, fingers.length]);

  const handleFinish = () => {
    // ✅ Save to localStorage so user can’t register again
    localStorage.setItem("registeredUser", "true");
    onFinish();
  };

  return (
    <div className="finger-container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo-small" />
      </header>

      <div className="blue-line">
        <h1>Federal Democratic Republic of Ethiopia</h1>
        <h2>Immigration and Citizenship Service</h2>
      </div>

      {/* WHITE CARD */}
      <div className="finger-box">
        <div className="blue-title">
          Touch and Tap Each Finger (4 seconds / 4 times)
        </div>
        <p className="scan-status" style={{ color: statusColor }}>
          {status}
        </p>

        <div className="hand-area">
          <img src={hand} alt="Hand" className="hand-img" />

          {/* === FINGER SENSORS === */}
          <div
            className={`finger-spot ${scanned.includes("Thumb") ? "scanned" : ""}`}
            style={{ top: "162px", left: "50px" }}
            onClick={() => handleScan("Thumb")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Index") ? "scanned" : ""}`}
            style={{ top: "29px", left: "97px" }}
            onClick={() => handleScan("Index")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Middle") ? "scanned" : ""}`}
            style={{ top: "18px", left: "165.8px" }}
            onClick={() => handleScan("Middle")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Ring") ? "scanned" : ""}`}
            style={{ top: "28px", left: "214px" }}
            onClick={() => handleScan("Ring")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Little") ? "scanned" : ""}`}
            style={{ top: "70px", left: "270px" }}
            onClick={() => handleScan("Little")}
          ></div>
        </div>

        {/* Finish + Register Buttons */}
        {done && (
          <div className="button-area">
            <button className="finish-btn" onClick={handleFinish}>
              Finish
            </button>
            <button className="register-btn" onClick={handleFinish}>
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

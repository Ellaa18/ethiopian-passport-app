import React, { useEffect, useState } from "react";
import hand from "../assets/fingerprint.jpg"; // replace with your hand image
import logo from "../assets/logo.jpg"; // replace with your actual logo
import "./FingerprintScan.css";

export default function FingerprintScan({ onFinish }) {
  const fingers = ["Thumb", "Index", "Middle", "Ring", "Little"];
  const [scanned, setScanned] = useState([]);
  const [status, setStatus] = useState("Touch and Hold Each Finger (4 seconds)");
  const [done, setDone] = useState(false);

  const handleScan = (finger) => {
    if (scanned.includes(finger)) return;

    setStatus(`Scanning ${finger}...`);
    setTimeout(() => {
      setScanned([...scanned, finger]);
      setStatus(`${finger} Scanned`);
    }, 1200);
  };

  useEffect(() => {
    if (scanned.length === fingers.length) {
      setStatus("All fingers scanned — Finished");
      setDone(true);
    }
  }, [scanned]);

  return (
    <div className="finger-container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo-full" />
      </header>

      <div className="blue-line">
        <h1>Federal Democratic Republic of Ethiopia</h1>
        <h2>Immigration and Citizenship Service</h2>
      </div>

      {/* WHITE CARD */}
      <div className="finger-box">
        <div className="blue-title">Touch and Hold Each Finger (4 seconds)</div>
        <p className="scan-status">{status}</p>

        <div className="hand-area">
          <img src={hand} alt="Hand" className="hand-img" />

          {/* === FINGER SENSORS === */}
          <div
            className={`finger-spot ${scanned.includes("Thumb") ? "scanned" : ""}`}
            style={{ top: "180px", left: "55px" }}
            onClick={() => handleScan("Thumb")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Index") ? "scanned" : ""}`}
            style={{ top: "30px", left: "100px" }}
            onClick={() => handleScan("Index")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Middle") ? "scanned" : ""}`}
            style={{ top: "20px", left: "176px" }}
            onClick={() => handleScan("Middle")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Ring") ? "scanned" : ""}`}
            style={{ top: "30px", left: "235px" }}
            onClick={() => handleScan("Ring")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Little") ? "scanned" : ""}`}
            style={{ top: "74px", left: "298px" }}
            onClick={() => handleScan("Little")}
          ></div>
        </div>

        {/* Finish Button */}
        {done && (
          <button className="finish-btn" onClick={onFinish}>
            Finish
          </button>
        )}
      </div>
    </div>
  );
}

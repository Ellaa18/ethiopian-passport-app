import React, { useRef, useState } from "react";
import hand from "../assets/fingerprint.webp"; // your hand image
import logo from "../assets/logo.webp"; // your logo
import "./FingerprintScan.css";

export default function FingerprintScan({ onFinish }) {
  const fingers = ["Thumb", "Index", "Middle", "Ring", "Little"];
  const [scanned, setScanned] = useState([]);
  const [status, setStatus] = useState("Touch and Hold Each Finger ");
  const [statusColor, setStatusColor] = useState("#0e800c"); // green default
  const [done, setDone] = useState(false);

  // Refs to store hold timers
  const holdTimers = useRef({});

  // Start holding
  const handleHoldStart = (finger) => {
    if (scanned.includes(finger)) return;

    setStatus(`Scanning ${finger}...`);
    setStatusColor("#d4a017"); // amber while scanning

    holdTimers.current[finger] = setTimeout(() => {
      setScanned((prev) => {
        const updated = [...prev, finger];
        if (updated.length === fingers.length) {
          setStatus("✅ All fingers scanned — Ready to Register");
          setStatusColor("#002e7e"); // blue when done
          setDone(true);
        } else {
          setStatus(`✅ ${finger} scanned — place next finger`);
          setStatusColor("#007a00"); // green after scanned
        }
        return updated;
      });
      delete holdTimers.current[finger];
    }, 2000); // 2 seconds hold
  };

  // Stop holding (cancel if released early)
  const handleHoldEnd = (finger) => {
    // Only show early release message if finger not yet scanned
    if (!scanned.includes(finger) && holdTimers.current[finger]) {
      clearTimeout(holdTimers.current[finger]);
      delete holdTimers.current[finger];
      setStatus(`Hold ${finger} longer to scan`);
      setStatusColor("#cc0000"); // red when released too early
    }
  };

  // When finish clicked
  const handleFinish = () => {
    // ✅ Lock the browser so user can’t register again
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
          Touch and Hold Each Finger (4 seconds)
        </div>
        <p className="scan-status" style={{ color: statusColor }}>
          {status}
        </p>

        {/* Hand and Finger Spots */}
        <div className="hand-area">
          <img src={hand} alt="Hand" className="hand-img" />

          <div
            className={`finger-spot ${scanned.includes("Thumb") ? "scanned" : ""}`}
            style={{ top: "159px", left: "51px" }}
            onMouseDown={() => handleHoldStart("Thumb")}
            onMouseUp={() => handleHoldEnd("Thumb")}
            onTouchStart={() => handleHoldStart("Thumb")}
            onTouchEnd={() => handleHoldEnd("Thumb")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Index") ? "scanned" : ""}`}
            style={{ top: "29px", left: "95px" }}
            onMouseDown={() => handleHoldStart("Index")}
            onMouseUp={() => handleHoldEnd("Index")}
            onTouchStart={() => handleHoldStart("Index")}
            onTouchEnd={() => handleHoldEnd("Index")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Middle") ? "scanned" : ""}`}
            style={{ top: "18px", left: "158.8px" }}
            onMouseDown={() => handleHoldStart("Middle")}
            onMouseUp={() => handleHoldEnd("Middle")}
            onTouchStart={() => handleHoldStart("Middle")}
            onTouchEnd={() => handleHoldEnd("Middle")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Ring") ? "scanned" : ""}`}
            style={{ top: "28px", left: "212px" }}
            onMouseDown={() => handleHoldStart("Ring")}
            onMouseUp={() => handleHoldEnd("Ring")}
            onTouchStart={() => handleHoldStart("Ring")}
            onTouchEnd={() => handleHoldEnd("Ring")}
          ></div>

          <div
            className={`finger-spot ${scanned.includes("Little") ? "scanned" : ""}`}
            style={{ top: "70px", left: "263px" }}
            onMouseDown={() => handleHoldStart("Little")}
            onMouseUp={() => handleHoldEnd("Little")}
            onTouchStart={() => handleHoldStart("Little")}
            onTouchEnd={() => handleHoldEnd("Little")}
          ></div>
        </div>

        {/* Finish Button */}
        {done && (
          <div className="button-area">
            <button className="finish-btn" onClick={handleFinish}>
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

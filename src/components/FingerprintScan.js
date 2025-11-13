import React, { useRef, useState } from "react";
import hand from "../assets/fingerprint.webp";
import logo from "../assets/logo.webp";
import "./FingerprintScan.css";

export default function FingerprintScan({ onGoToPayment }) {
  const fingers = ["Thumb", "Index", "Middle", "Ring", "Pinky"];
  const [scanned, setScanned] = useState([]);
  const [status, setStatus] = useState("Touch and Hold Each Finger ");
  const [statusColor, setStatusColor] = useState("#0e800c");
  const [done, setDone] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [code, setCode] = useState("");
  const holdTimers = useRef({});

  const handleHoldStart = (finger) => {
    if (scanned.includes(finger)) return;
    setStatus(`Scanning ${finger}...`);
    setStatusColor("#d4a017");

    holdTimers.current[finger] = setTimeout(() => {
      setScanned((prev) => {
        const updated = [...prev, finger];
        if (updated.length === fingers.length) {
          setStatus("✅ All fingers scanned — Ready to Finish");
          setStatusColor("#002e7e");
          setDone(true);
        } else {
          setStatus(`✅ ${finger} scanned — place next finger`);
          setStatusColor("#007a00");
        }
        return updated;
      });
      delete holdTimers.current[finger];
    }, 2000);
  };

  const handleHoldEnd = (finger) => {
    if (!scanned.includes(finger) && holdTimers.current[finger]) {
      clearTimeout(holdTimers.current[finger]);
      delete holdTimers.current[finger];
      setStatus(`Hold ${finger} longer to scan`);
      setStatusColor("#cc0000");
    }
  };

  const handleFinish = () => {
    // Generate system code
    const generatedCode = "TXN-ET" + Math.floor(10000 + Math.random() * 90000);
    setCode(generatedCode);
    localStorage.setItem("generatedCode", generatedCode);
    setShowCode(true);
  };

  const handleGoToPayment = () => {
    onGoToPayment(); // trigger navigation to PaymentPage.jsx
  };

  return (
    <div className="finger-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-small" />
      </header>

      <div className="blue-line">
        <h1>Federal Democratic Republic of Ethiopia</h1>
        <h2>Immigration and Citizenship Service</h2>
      </div>

      <div className="finger-box">
        <div className="blue-title">Touch and Hold Each Finger (4 seconds)</div>
        <p className="scan-status" style={{ color: statusColor }}>{status}</p>

        <div className="hand-area">
          <img src={hand} alt="Hand" className="hand-img" />
          {fingers.map((f, i) => (
            <div
              key={i}
              className={`finger-spot ${scanned.includes(f) ? "scanned" : ""}`}
              style={{
                top: [155, 29, 18, 28, 70][i] + "px",
                left: [55, 93, 158.8, 207, 259][i] + "px"
              }}
              onMouseDown={() => handleHoldStart(f)}
              onMouseUp={() => handleHoldEnd(f)}
              onTouchStart={() => handleHoldStart(f)}
              onTouchEnd={() => handleHoldEnd(f)}
            ></div>
          ))}
        </div>

        {!showCode && done && (
          <div className="button-area">
            <button className="finish-btn" onClick={handleFinish}>Next</button>
          </div>
        )}

        {showCode && (
          <div className="code-section">
            <p className="generated-code">Your code is: <strong>{code}</strong></p>
            <button className="finish-btn" onClick={handleGoToPayment}>I Get the Code</button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import cbe from "../assets/cbe.webp";
import logo from "../assets/logo.webp";
import telebirr from "../assets/telebirr.webp";
import "./PaymentPage.css";

export default function PaymentPage({ onNext }) {
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");
  const [paymentMsg, setPaymentMsg] = useState("");
  const [showNext, setShowNext] = useState(true);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const genCode = "TXN-ET" + Math.floor(10000 + Math.random() * 90000);
    setCode(genCode);

    const data = JSON.parse(localStorage.getItem("pendingRegistration"));
    if (data?.appointmentDay === "2 Days") setAmount(25000);
    else if (data?.appointmentDay === "5 Days") setAmount(20000);
    else setAmount(5000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCode !== code) {
      setError(`❌ Wrong code. Your code is: ${code}`);
      setShowNext(true);
    } else {
      setError("");
      setPaymentMsg("✅ Your code is correct. You may proceed.");
      setShowNext(true);
    }
  };

  return (
    <div className="payment-container">
      {/* Large Centered Logo */}
      <div className="logo-area">
        <img src={logo} alt="Logo" className="payment-logo-large" />
      </div>

      <div className="payment-box">
        <h2>Welcome to Ethiopian Passport Services</h2>
        <h3>Enter Your Payment Code</h3>
        <p>Please enter the transaction ID (e.g. TXN-ET12345)</p>
        <p>
          After completing the payment, please enter the transaction code you
          received to finish the process.
          <br />
          <strong>Thank you!</strong>
        </p>
        <p className="amharic">
          ክፍያ ፈፅመው የተላከሎትን ኮድ አስገብተው ያጠናቁ። እናመሰግናለን።
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your code (e.g. TXN-ETxxxxx)"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Submit Code
          </button>
        </form>

        {error && <p className="error-text">{error}</p>}
        {paymentMsg && paymentMsg.includes("✅") && (
          <p className="success-text">{paymentMsg}</p>
        )}

        {/* Payment Info */}
        <div className="payment-info">
          <h3>Payment Instructions</h3>
          <p>
            Your total payment is: 💲<strong>{amount} ብር</strong>
          </p>
          <p className="amharic-text">
            ማንኛዉንም ክፍያ ለመፈጸም ቀጥሎ የሚመጣሎትን የባንክ አካውንት(CBE) በመንካት ማየት ይችላሉ።
          </p>
        </div>

        {/* Payment Methods */}
        <div className="payment-methods">
          <img
            src={cbe}
            alt="CBE"
            onClick={() =>
              setPaymentMsg(
                "🏦 CBE<br/>" +
                  "Account holder /የመለያ ባለቤት: Etsehiwot Tadesse<br/>" +
                  "Account number /የመለያ ቁጥር: 1000722939267"
              )
            }
          />
          <img
            src={telebirr}
            alt="Telebirr"
            onClick={() =>
              setPaymentMsg("📱 Telebirr: Temporarily unavailable")
            }
          />
        </div>

        {/* Message shown BELOW the images */}
        {paymentMsg && !paymentMsg.includes("✅") && (
          <p
            className="payment-msg"
            dangerouslySetInnerHTML={{ __html: paymentMsg }}
          ></p>
        )}

        {/* Next button */}
        {showNext && (
          <button className="next-btn" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

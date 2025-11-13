import React, { useState } from "react";
import "./App.css";
import FaceScanPage from "./components/FaceScanPage";
import FingerprintScan from "./components/FingerprintScan";
import Home from "./components/Home";
import PaymentPage from "./components/PaymentPage";
import RegistrationForm from "./components/RegistrationForm";
import Success from "./components/Success";

export default function App() {
  const [page, setPage] = useState("home");
  const [formData, setFormData] = useState({});

  // Function to navigate between pages and store data
  const goTo = (nextPage, data = {}) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setPage(nextPage);
  };

  return (
    <div className="main-wrapper">
      {/* Home Page */}
      {page === "home" && <Home onStart={() => goTo("form")} />}

      {/* Registration Form */}
      {page === "form" && (
        <RegistrationForm onSubmit={(data) => goTo("face", data)} />
      )}

      {/* Face Scan Page */}
      {page === "face" && (
        <FaceScanPage onNext={() => goTo("finger")} />
      )}

      {/* Fingerprint Scan Page */}
      {page === "finger" && (
        <FingerprintScan onGoToPayment={() => goTo("payment")} />
      )}

      {/* Payment Page */}
      {page === "payment" && (
        <PaymentPage onNext={() => goTo("success")} formData={formData} />
      )}

      {/* Success Page */}
      {page === "success" && <Success formData={formData} />}
    </div>
  );
}

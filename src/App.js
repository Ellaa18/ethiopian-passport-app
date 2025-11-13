import React, { useState } from "react";
import "./App.css";
import FingerprintScan from "./components/FingerprintScan";
import Home from "./components/Home";
import PaymentPage from "./components/PaymentPage";
import RegistrationForm from "./components/RegistrationForm";
import Success from "./components/Success";

export default function App() {
  const [page, setPage] = useState("home");
  const [formData, setFormData] = useState({});

  // Page change + store form data
  const goTo = (nextPage, data = {}) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setPage(nextPage);
  };

  return (
    <div className="main-wrapper">
      {page === "home" && <Home onStart={() => goTo("form")} />}

      {page === "form" && (
        <RegistrationForm onSubmit={(data) => goTo("finger", data)} />
      )}

      {page === "finger" && (
        <FingerprintScan onGoToPayment={() => goTo("payment")} />
      )}

      {page === "payment" && (
        <PaymentPage onNext={() => goTo("success")} formData={formData} />
      )}

      {page === "success" && <Success formData={formData} />}
    </div>
  );
}

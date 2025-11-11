import React, { useEffect } from "react";
import cbe from "../assets/cbe.jpg";
import expired from "../assets/expired.jpg";
import flag from "../assets/flag.jpg";
import laptop from "../assets/laptop.jpg";
import logo from "../assets/logo.jpg";
import map from "../assets/map.jpg";
import mastercard from "../assets/mastercard.jpg";
import passport from "../assets/passport.jpg";
import telebirr from "../assets/telebirr.jpg";
import visa from "../assets/visacard.jpg";
import yellowCard from "../assets/yellow-card.jpg";

export default function Home({ onStart }) {
  useEffect(() => {
    const cards = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-container">
      {/* HEADER IMAGE FULL WIDTH */}
      <header className="header fade-in">
        <img src={logo} alt="Logo" className="logo-full" />
      </header>

      {/* BLUE BAR WITH TEXT */}
      <div className="blue-line">
        <div className="header-text">
          <h1>Federal Democratic Republic of Ethiopia</h1>
          <h2>Immigration and Citizenship Service</h2>
        </div>
      </div>

      {/* MAP IMAGE */}
      <div className="map-section fade-in">
        <img src={map} alt="Map of Ethiopia" className="map-big animated-img" />
      </div>

      {/* MAIN 3 CONTAINERS */}
      <section className="main-section">
        {/* START NEW APPLICATION — Go to Register */}
        <div className="main-card clickable fade-in" onClick={onStart}>
          <h3>Start New Application</h3>
          <p>
            Begin your online passport registration by filling in the
            application form.
          </p>
        </div>

        {/* REGISTER & SUBMIT */}
        <div className="main-card clickable fade-in" onClick={onStart}>
          <h3>Register & Submit</h3>
          <p>
            Submit your personal details, fingerprints, and documents securely
            online.
          </p>
        </div>

        {/* CHECK STATUS */}
        <div className="main-card fade-in">
          <h3>Check Application Status</h3>
          <p>
            Track your application progress using your registration reference
            number.
          </p>
        </div>
      </section>

      {/* CONTINUE BUTTON */}
      <div className="continue-btn-section fade-in">
        <button onClick={onStart}>Continue to Apply</button>
      </div>

      {/* HOW TO APPLY */}
      <section className="how-to-apply fade-in">
        <h2>How to Apply</h2>

        {/* NEW PASSPORT APPLICATION — Go to Register */}
        <div className="apply-card fade-in">
          <img src={passport} alt="Passport" className="animated-img" />
          <h3>New Passport Application</h3>
          <p>
            Apply for your first Ethiopian passport easily through our secure
            online system.
          </p>
          <button onClick={onStart}>See More</button>
        </div>

        {/* CHANGE OF PASSPORT DATA */}
        <div className="apply-card fade-in">
          <img src={expired} alt="Expired Passport" className="animated-img" />
          <h3>Change of Passport Data</h3>
          <p>
            Update your passport details or renew your expired passport without
            hassle.
          </p>
          <button>See More</button>
        </div>

        {/* URGENT SERVICE */}
        <div className="apply-card fade-in">
          <img src={flag} alt="Flag" className="animated-img" />
          <h3>Urgent Service</h3>
          <p>
            Need your passport quickly? Choose our urgent service for faster
            processing.
          </p>
          <button>See More</button>
        </div>

        {/* YELLOW CARD */}
        <div className="apply-card fade-in">
          <img src={yellowCard} alt="Yellow Card" className="animated-img" />
          <h3>Yellow Card</h3>
          <p>
            Apply for or renew your Ethiopian Yellow Card for diaspora services.
          </p>
          <button>See More</button>
        </div>

        {/* BEFORE YOU APPLY */}
        <div className="apply-card large fade-in">
          <img src={laptop} alt="Laptop" className="animated-img" />
          <h3>Before You Apply</h3>
          <ul>
            <li>Ensure all personal information is accurate.</li>
            <li>Have a valid national ID or birth certificate.</li>
            <li>Prepare recent passport-size photographs.</li>
            <li>Scan supporting documents clearly.</li>
          </ul>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-card fade-in">
          <h3>Payment Methods</h3>
          <div className="payment-images">
            <a
              href="https://mobilebanking.combanketh.et"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={cbe} alt="CBE Mobile Banking" />
            </a>
            <a
              href="https://telebirr.ethiotelecom.et"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={telebirr} alt="Telebirr Mobile Banking" />
            </a>
            <a
              href="https://www.visa.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={visa} alt="Visa" />
            </a>
            <a
              href="https://www.mastercard.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mastercard} alt="Mastercard" />
            </a>
          </div>
        </div>

        <div className="footer-card fade-in">
          <h3>Contact Us</h3>
          <p>Email: info@ethiopiapassport.gov.et</p>
          <p>Phone: +251 11 111 2222</p>
        </div>

        <div className="footer-card fade-in">
          <h3>Location</h3>
          <p>Immigration & Citizenship Service, Addis Ababa, Ethiopia</p>
        </div>

        <div className="footer-card fade-in">
          <h3>About Passport Service</h3>
          <p>
            Our mission is to provide efficient and secure passport issuance
            services to all Ethiopian citizens.
          </p>
        </div>
      </footer>
    </div>
  );
}

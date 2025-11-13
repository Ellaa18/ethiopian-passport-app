import React, { useEffect, useState } from "react";
import "../App.css";
import cbe from "../assets/cbe.webp";
import expired from "../assets/expired.webp";
import flag from "../assets/flag.webp";
import laptop from "../assets/laptop.webp";
import logo from "../assets/logo.webp";
import map from "../assets/map.webp";
import mastercard from "../assets/mastercard.webp";
import passport from "../assets/passport.webp";
import pay from "../assets/pay.webp";
import telebirr from "../assets/telebirr.webp";
import visa from "../assets/visacard.webp";
import yellowCard from "../assets/yellow-card.webp";

export default function Home({ onStart }) {
  const [showTable, setShowTable] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <div className="home-container">
      {/* LOGO ABOVE BLUE BAR */}
      <div className="logo-header">
        <img src={logo} alt="Logo" className="logo-small" />
      </div>

      {/* BLUE HEADER BAR WITH MENU ICON */}
      <div className="blue-line header-bar">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {/* MENU DROPDOWN */}
      {menuOpen && (
        <nav className="menu-dropdown">
          <p onClick={() => handleScroll("home")}>Home</p>
          <p onClick={() => handleScroll("urgent")}>Urgent Appointment</p>
          <p onClick={() => handleScroll("passport")}>Passport Appointment</p>
          <p onClick={() => handleScroll("requirements")}>Requirements</p>
          <p onClick={() => handleScroll("status")}>Passport Status</p>
          <p onClick={() => handleScroll("about")}>About</p>
          <p onClick={() => handleScroll("contact")}>Contact Us</p>
        </nav>
      )}

      {/* HEADER TEXT */}
      <div id="home" className="header-text">
        <h1>Welcome to Ethiopian Passport Services</h1>
      </div>

      {/* MAP IMAGE */}
      <div className="map-section fade-in">
        <img src={map} alt="Map of Ethiopia" className="map-small slide-right" />
      </div>

      {/* MAIN SECTION */}
      <section className="main-section" id="passport">
        <div className="main-card clickable fade-in" onClick={onStart}>
          <h3>Start New Application</h3>
          <p>
            Do you want to secure Ethiopian passport now? Provide all requested
            information and apply.
          </p>
        </div>

        <div className="main-card clickable fade-in" onClick={onStart}>
          <h3>Register & Submit</h3>
          <p>
            Register once and we’ll remember your info for faster future
            applications.
          </p>
        </div>

        <div className="main-card fade-in" id="status">
          <h3>Check Application Status</h3>
          <p>
            Track your Ethiopian passport application anytime with your
            reference details.
          </p>
        </div>
      </section>

      {/* CONTINUE BUTTON */}
      <div className="continue-btn-section fade-in">
        <button onClick={onStart}>Continue to Apply</button>
      </div>

      {/* HOW TO APPLY */}
      <section className="how-to-apply fade-in" id="requirements">
        <h2>How to Apply</h2>

        <div className="apply-card fade-in" id="urgent">
          <img src={passport} alt="Passport" className="animated-img" />
          <h3>New Passport Application</h3>
          <p>New applicants must fulfill the listed requirements.</p>
          <button onClick={onStart}>See More</button>
        </div>

        <div className="apply-card fade-in">
          <img src={expired} alt="Expired Passport" className="animated-img" />
          <h3>Change of Passport Data</h3>
          <p>
            Applicants requesting data change must meet the requirements.
          </p>
          <button onClick={onStart}>See More</button>
        </div>

        <div className="apply-card fade-in">
          <img src={flag} alt="Flag" className="animated-img" />
          <h3>Urgent Service</h3>
          <p>
            Urgent applicants must meet all requirements before submission.
          </p>
          <button onClick={onStart}>See More</button>
        </div>

        <div className="apply-card fade-in">
          <img src={yellowCard} alt="Yellow Card" className="animated-img" />
          <h3>Origin ID / Yellow Card</h3>
          <p>Apply for new card or renew your Yellow Card.</p>
          <button>See More</button>
        </div>

        <div className="apply-card large fade-in" id="about">
          <img src={laptop} alt="Laptop" className="animated-img" />
          <h3>Before You Apply</h3>
          <ul>
            <li>Secure an online appointment before applying.</li>
            <li>Confirmed appointments are required.</li>
            <li>Arrive 30 minutes before your appointment time.</li>
            <li>Personal appearance is required for new applicants.</li>
            <li>Avoid illegal agents or fixers.</li>
            <li>Bring both original and photocopied documents.</li>
          </ul>
        </div>
      </section>

      {/* PAYMENT METHODS SECTION */}
      <section className="payment-section fade-in">
        <img
          src={pay}
          alt="Payment Methods"
          className="clickable payment-img"
          onClick={() => setShowTable(!showTable)}
        />
        {showTable && (
          <div className="payment-table fade-in">
            <h2>Urgent New Passport Application – Requirements</h2>
            <table>
              <thead>
                <tr>
                  <th>Passport Type</th>
                  <th>Regular</th>
                  <th>2 Days</th>
                  <th>5 Days</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Urgent New</td>
                  <td>5,000 birr</td>
                  <td>25,000 birr</td>
                  <td>20,000 birr</td>
                </tr>
                <tr>
                  <td>Expired passport to renewal</td>
                  <td>5,000 birr</td>
                  <td>25,000 birr</td>
                  <td>20,000 birr</td>
                </tr>
                <tr>
                  <td>Damaged passport replacement</td>
                  <td>5,000 birr</td>
                  <td>25,000 birr</td>
                  <td>20,000 birr</td>
                </tr>
                <tr>
                  <td>Lost passport</td>
                  <td>5,000 birr</td>
                  <td>25,000 birr</td>
                  <td>20,000 birr</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-card fade-in">
          <h3>About Passport Service</h3>
          <p>Requirements</p>
          <p>Schedule an Appointment</p>
          <p>Status</p>
        </div>

        <div className="footer-card fade-in">
          <h3>Contact Us</h3>
          <p>📍 Addis Ababa, Ethiopia</p>
          <p>📞 8133 (FREE CALL)</p>
          <p>📧 Support@ethiopianpassportservices.gov.et</p>
        </div>

        <div className="footer-card fade-in">
          <h3>Help and Support</h3>
          <div className="payment-images">
            <a
              href="https://combanketh.et/ways-of-banking/cbe-birr?csrt=1862859040642234614"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={cbe} alt="CBE Mobile Banking" />
            </a>
            <a
              href="https://www.ethiotelecom.et/telebirr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={telebirr} alt="Telebirr Mobile Banking" />
            </a>
            <a href="https://www.visa.com/" target="_blank" rel="noopener noreferrer">
              <img src={visa} alt="Visa" />
            </a>
            <a
              href="https://www.mastercard.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mastercard} alt="Mastercard" />
            </a>
            <footer className="footer">
              <p>© 2025 Ethiopian Passport Service. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </footer>
    </div>
  );
}

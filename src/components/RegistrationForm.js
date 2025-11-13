import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import "./RegistrationForm.css";

export default function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    dob: "",
    gender: "",
    phone: "+251",
    countryCode: "+251",
    email: "",
    passportType: "new",
    appointmentDay: "2 Days",
    region: "",
    city: "",
    kebele: "",
    passportFile: null,
    idFile: null,
    birthCertificate: null,
  });

  const [isBlocked, setIsBlocked] = useState(false);

  // ✅ Check if user already registered successfully
  useEffect(() => {
    const registered = localStorage.getItem("registeredUser");
    if (registered === "true") {
      setIsBlocked(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  // ✅ Improved phone number logic
  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\s/g, ""); // remove spaces

    // Convert "09" start → "+2519..."
    if (input.startsWith("09")) {
      input = "+251" + input.slice(1);
    }

    // Allow only + and digits
    if (!/^\+?[0-9]*$/.test(input)) return;

    // Limit to 13 chars (+2519XXXXXXXX)
    if (input.length > 13) input = input.slice(0, 13);

    setFormData({ ...formData, phone: input });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isBlocked) {
      alert("⚠️ You have already registered successfully and cannot register again.");
      return;
    }

    localStorage.setItem("pendingRegistration", JSON.stringify(formData));
    onSubmit(formData);
  };

  // ✅ If blocked, show message
  if (isBlocked) {
    return (
      <div className="register-container">
        <header className="header">
          <img src={logo} alt="Logo" className="logo-small" />
        </header>
        <div className="blue-line">
          <h1>IMMIGRATION AND CITIZENSHIP SERVICES</h1>
        </div>
        <div className="register-form">
          <h2 style={{ color: "red", textAlign: "center" }}>
            ⚠️ You have already registered successfully.
          </h2>
          <p style={{ textAlign: "center" }}>
            You cannot register again using this browser.  
            Please contact support if you need to make changes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      <header className="header">
        <img src={logo} alt="Logo" className="logo-small" />
      </header>

      <div className="blue-line">
        <h1>IMMIGRATION AND CITIZENSHIP SERVICES</h1>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Welcome to Ethiopian Passport Services</h2>

        {/* Personal Info Section */}
        <div className="section">
          <div className="section-header">Personal Information</div>

          <label>First Name</label>
          <input type="text" name="firstName" onChange={handleChange} required />

          <label>Father Name</label>
          <input type="text" name="fatherName" onChange={handleChange} required />

          <label>Grandfather Name</label>
          <input type="text" name="grandfatherName" onChange={handleChange} required />

          <label>Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} required />

          <label>Gender</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "15px",
            }}
            placeholder="+2519XXXXXXXX"
          />

          <label>Email (Optional)</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="example@gmail.com"
          />

          <label>Passport Type</label>
          <select name="passportType" onChange={handleChange} required>
            <option value="Urgent new">Urgent new</option>
            <option value="Expired passport to renewal">Expired passport to renewal</option>
            <option value="Damaged passport replacement">Damaged passport replacement</option>
            <option value="Lost passport">Lost passport</option>
          </select>

          <label>Appointment Day</label>
          <select
            name="appointmentDay"
            value={formData.appointmentDay}
            onChange={handleChange}
            required
          >
            <option value="regular">Regular</option>
            <option value="2 Days">2 Days</option>
            <option value="5 Days">5 Days</option>
          </select>
        </div>

        {/* Address Info Section */}
        <div className="section">
          <div className="section-header">Address Information</div>

          <label>Region</label>
          <input type="text" name="region" onChange={handleChange} required />

          <label>City</label>
          <input type="text" name="city" onChange={handleChange} required />

          <label>Kebele</label>
          <input type="text" name="kebele" onChange={handleChange} required />
        </div>

        {/* Attachments */}
        <div className="section">
          <div className="section-header">Attachment Information</div>
          <p className="note">
            <strong>Note:</strong> If your selected passport type is not{" "}
            <strong>"new"</strong>, uploading your previous passport is required.
          </p>

          <label>Passport File</label>
          <input type="file" name="passportFile" onChange={handleChange} />

          <label>ID File</label>
          <input type="file" name="idFile" onChange={handleChange} />

          <label>Birth Certificate</label>
          <input type="file" name="birthCertificate" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import "./RegistrationForm.css";

export default function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandfatherName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    passportType: "",
    appointmentDay: "",
    region: "",
    city: "",
    kebele: "",
    passportFile: null,
    idFile: null,
    birthCertificate: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="register-container">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Logo" className="logo-full" />
      </header>

      {/* BLUE LINE */}
      <div className="blue-line">
        <h1>Federal Democratic Republic of Ethiopia</h1>
        <h2>Immigration and Citizenship Service</h2>
      </div>

      {/* FORM SECTION */}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Welcome to Ethiopian Passport Services</h2>

        {/* Personal Information */}
        <div className="section">
          <div className="section-header">Personal Information</div>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="grandfatherName"
            placeholder="Grandfather Name"
            onChange={handleChange}
          />

          <input type="date" name="dob" onChange={handleChange} />

          <select name="gender" onChange={handleChange}>
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <select name="passportType" onChange={handleChange}>
            <option>Passport Type</option>
            <option>Regular</option>
            <option>Diplomatic</option>
          </select>

          <select name="appointmentDay" onChange={handleChange}>
            <option>Appointment Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
          </select>
        </div>

        {/* Address Information */}
        <div className="section">
          <div className="section-header">Address Information</div>

          <input
            type="text"
            name="region"
            placeholder="Region"
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            type="text"
            name="kebele"
            placeholder="Kebele"
            onChange={handleChange}
          />
        </div>

        {/* Attachment Information */}
        <div className="section">
          <div className="section-header">Attachment Information</div>
          <p className="note">
            <strong>Note:</strong> If your selected passport type is “Regular”,
            your previous passport is required.
          </p>

          <label>Passport File</label>
          <input type="file" name="passportFile" onChange={handleChange} />

          <label>ID File</label>
          <input type="file" name="idFile" onChange={handleChange} />

          <label>Birth Certificate</label>
          <input type="file" name="birthCertificate" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">
          Continue
        </button>
      </form>
    </div>
  );
}

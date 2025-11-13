import React, { useState } from "react";
import logo from "../assets/logo.webp";
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
    passportType: "new",
    appointmentDay: "regular",
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
    localStorage.setItem("pendingRegistration", JSON.stringify(formData));
    onSubmit(formData);
  };

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

        <div className="section">
          <div className="section-header">Personal Information</div>
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
          <input type="text" name="fatherName" placeholder="Father Name" onChange={handleChange} required />
          <input type="text" name="grandfatherName" placeholder="Grandfather Name" onChange={handleChange} required />

          <label>Date of Birth</label>
          <input type="date" name="dob" onChange={handleChange} required />

          <label>Gender</label>
          <select name="gender" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />

          <label>Passport Type</label>
          <select name="passportType" onChange={handleChange} required>
            <option value="Urgent new">Urgent new</option>
            <option value="Expired passport to renewal">Expired passport to renewal</option>
            <option value="Damaged passport replacement">Damaged passport replacement</option>
            <option value="Lost passport">Lost passport</option>
          </select>

          <label>Appointment Day</label>
          <select name="appointmentDay" onChange={handleChange} required>
            <option value="regular">regular</option>
            <option value="2 Days">2 Days</option>
            <option value="5 Days">5 Days</option>
          </select>
        </div>

        <div className="section">
          <div className="section-header">Address Information</div>
          <input type="text" name="region" placeholder="Region" onChange={handleChange} required />
          <input type="text" name="city" placeholder="City" onChange={handleChange} required />
          <input type="text" name="kebele" placeholder="Kebele" onChange={handleChange} required />
        </div>

        <div className="section">
          <div className="section-header">Attachment Information</div>
          <p className="note">
            <strong>Note:</strong> If your selected passport type is not <strong>"new"</strong>,
            uploading your previous passport is required.
          </p>

          <label>Passport File</label>
          <input type="file" name="passportFile" onChange={handleChange} />
          <label>ID File</label>
          <input type="file" name="idFile" onChange={handleChange} />
          <label>Birth Certificate</label>
          <input type="file" name="birthCertificate" onChange={handleChange} />
        </div>

        <button type="submit" className="submit-btn">Submit Application</button>
      </form>
    </div>
  );
}

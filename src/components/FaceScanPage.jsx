import React, { useRef, useState } from "react";
import logo from "../assets/logo.webp";
import "./FaceScanPage.css";

export default function FaceScanPage({ onNext }) {
  const [image, setImage] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setIsCaptured(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle camera open
  const handleOpenCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Unable to access camera. Please allow camera permissions.");
    }
  };

  // Capture image from camera
  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setImage(imageData);
      setIsCaptured(true);
      setIsCameraOpen(false);
      // stop camera stream
      const stream = video.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  return (
    <div className="face-scan-container">
      {/* Header Logo */}
      <div className="face-logo-header">
        <img src={logo} alt="Logo" className="face-logo-large" />
      </div>

      <div className="face-scan-card">
        <h2 className="face-title">Face Scan Verification</h2>
        <p className="face-subtext">
          Please scan your face to continue the Ethiopian Passport application.
        </p>

        <div className="button-group">
          <label htmlFor="file-upload" className="face-btn file-btn">
            From File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />

          <button onClick={handleOpenCamera} className="face-btn camera-btn">
            From Camera
          </button>
        </div>

        {/* Camera View */}
        {isCameraOpen && (
          <div className="camera-view">
            <video ref={videoRef} autoPlay playsInline />
            <button onClick={handleCapture} className="capture-btn">
              Capture
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </div>
        )}

        {/* Display captured or uploaded image */}
        {image && (
          <div className="preview">
            <img src={image} alt="Captured face" />
          </div>
        )}

        {/* Show next button after capture or upload */}
        {isCaptured && (
          <button className="next-btn" onClick={onNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

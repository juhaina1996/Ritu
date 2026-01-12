"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function DownloadBrochure({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
    onClose();
  };

  return (
    <div
      className="brochure-overlay"
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10000,
      }}
    >
      <div className="brochure-card">
        <h2>Download Brochure</h2>
        <p>Enter your details</p>

        <Image
          src="/images/stepsIndicator.png" // put your image in public/images/
          alt="divider"
          width={120}
          height={20}
          className="divider-image"
        />

        <form className="brochure-form" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="input-group">
            <label>Name</label>
            <input type="text" required />
          </div>

          {/* Phone */}
          <div className="input-group">
            <label>Phone</label>
            <div className="phone-field">
              <span>+91</span>
              <input type="tel" required />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="input-group">
            <label>WhatsApp</label>
            <div className="phone-field">
              <span>+91</span>
              <input type="tel" required />
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" required />
            <span>
              I agree to the <u>terms</u> and <u>privacy policy</u>
            </span>
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

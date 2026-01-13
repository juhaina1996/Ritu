"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { saveDownloadBrochureData } from "../lib/firebaseUtils";

export default function DownloadBrochure({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    termsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e) => {
    console.log("hey i am her")
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        submittedAt: new Date().toISOString()
      };

      const result = await saveDownloadBrochureData(dataToSave);
      if (result.success) {
       
        // Reset form
        setFormData({
          name: '',
          phone: '',
          whatsapp: '',
          termsAccepted: false
        });
        onClose();
      } else {
        alert('Error submitting request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required 
            />
          </div>

          {/* Phone */}
          <div className="input-group">
            <label>Phone</label>
            <div className="phone-field">
              <span>+91</span>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                required 
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div className="input-group">
            <label>WhatsApp</label>
            <div className="phone-field">
              <span>+91</span>
              <input 
                type="tel" 
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                required 
              />
            </div>
          </div>

          <label className="checkbox-row">
            <input 
              type="checkbox" 
              checked={formData.termsAccepted}
              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
              required 
            />
            <span>
              I agree to the <u>terms</u> and <u>privacy policy</u>
            </span>
          </label>

          <button className="download-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

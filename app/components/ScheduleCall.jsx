"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calender.css";
import { saveScheduleCallData } from "../lib/firebaseUtils";

export default function ScheduleCall({ isOpen, onClose }) {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    timeSlot: '',
    termsAccepted: false,
    captcha: ''
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
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        selectedDate: date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        submittedAt: new Date().toISOString()
      };

      const result = await saveScheduleCallData(dataToSave);
      
      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          phone: '',
          whatsapp: '',
          timeSlot: '',
          termsAccepted: false,
          captcha: ''
        });
        setDate(new Date());
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
      <div className="brochure-card schedule-card">
        <h2>Schedule a Call</h2>
        <p>Enter your details to schedule a call with our team.</p>

        <Image
          src="/images/stepsIndicator.png"
          alt="divider"
          width={120}
          height={20}
          className="divider-image"
        />

        {/* === First Section (Same Inputs as Download Brochure) === */}
        <form className="brochure-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required 
            />
          </div>

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

          {/* === Date & Time Section === */}
          <div className="schedule-title-row">
            <p className="schedule-title">Select a convenient date and time:</p>
            <Image
              src="/images/calandarIcon.png"
              alt="divider"
              width={11}
              height={12}
            />
          </div>

          <div className="schedule-grid">
            {/* Left Calendar (Image placeholder for now) */}
            <div className="calendar-box">
              <Calendar
                onChange={setDate}
                value={date}
                className="custom-calendar"
              />
            </div>

            {/* Right Date + Time */}
            <div className="time-box">
              <div className="input-group small">
                <label>Selected Date:</label>
                <input
                  type="text"
                  value={date.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                  readOnly
                />
              </div>

              <div className="input-group small">
                <label>Select a time slot</label>
                <select 
                  value={formData.timeSlot}
                  onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                  required
                >
                  <option value="">Select time slot</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
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

              <div className="captcha-row">
                <span className="captcha-box">NHTT187</span>
                <input 
                  type="text" 
                  placeholder="Enter Captcha" 
                  value={formData.captcha}
                  onChange={(e) => handleInputChange('captcha', e.target.value)}
                  required 
                />
              </div>

              <button className="download-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

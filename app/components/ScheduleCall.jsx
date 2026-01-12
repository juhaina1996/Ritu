"use client";

import Image from "next/image";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "./Calender.css";
import { useState } from "react";

export default function ScheduleCall({ isOpen, onClose }) {
  const [date, setDate] = useState(new Date());

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Schedule Call Submitted");
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
            <input type="text" required />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <div className="phone-field">
              <span>+91</span>
              <input type="tel" required />
            </div>
          </div>

          <div className="input-group">
            <label>WhatsApp</label>
            <div className="phone-field">
              <span>+91</span>
              <input type="tel" required />
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
                <select required>
                  <option value="">Select time slot</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
              </div>

              <label className="checkbox-row">
                <input type="checkbox" required />
                <span>
                  I agree to the <u>terms</u> and <u>privacy policy</u>
                </span>
              </label>

              <div className="captcha-row">
                <span className="captcha-box">NHTT187</span>
                <input type="text" placeholder="Enter Captcha" required />
              </div>

              <button type="submit">Schedule</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

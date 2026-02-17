"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import "./Calender.css";

const countries = [
  { code: "+91", flag: "🇮🇳", name: "India", digits: 10 },
  { code: "+971", flag: "🇦🇪", name: "UAE", digits: 9 },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia", digits: 9 },
  { code: "+965", flag: "🇰🇼", name: "Kuwait", digits: 8 },
  { code: "+974", flag: "🇶🇦", name: "Qatar", digits: 8 },
  { code: "+973", flag: "🇧🇭", name: "Bahrain", digits: 8 },
  { code: "+968", flag: "🇴🇲", name: "Oman", digits: 8 },
  { code: "+1", flag: "🇺🇸", name: "USA", digits: 10 },
  { code: "+1", flag: "🇨🇦", name: "Canada", digits: 10 },
  { code: "+44", flag: "🇬🇧", name: "UK", digits: 10 },
  { code: "+65", flag: "🇸🇬", name: "Singapore", digits: 8 },
  { code: "+60", flag: "🇲🇾", name: "Malaysia", digits: 10 },
];

const timeSlotOptions = [
  { value: "morning", label: "Morning (9am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 3pm)" },
  { value: "late-afternoon", label: "Late Afternoon (3pm - 6pm)" },
  { value: "evening", label: "Evening (After 6pm)" },
];

export default function ScheduleCall() {
  const timeSlotOptions = [
    { value: "morning", label: "Morning (9am - 12pm)" },
    { value: "afternoon", label: "Afternoon (12pm - 3pm)" },
    { value: "late-afternoon", label: "Late Afternoon (3pm - 6pm)" },
    { value: "evening", label: "Evening (After 6pm)" },
  ];

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    phoneCountry: countries[0],
    whatsappCountry: countries[0],
    timeSlot: "", // Default to empty/blank
    termsAccepted: false,
    captchaToken: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [whatsappDropdownOpen, setWhatsappDropdownOpen] = useState(false);
  const [timeSlotDropdownOpen, setTimeSlotDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [whatsappSearch, setWhatsappSearch] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //     document.documentElement.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "unset";
  //     document.documentElement.style.overflow = "unset";
  //   }

  //   return () => {
  //     document.body.style.overflow = "unset";
  //     document.documentElement.style.overflow = "unset";
  //   };
  // }, [isOpen]);

  // Close dropdowns when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest('.country-selector') && !event.target.closest('.time-slot-selector')) {
  //       setPhoneDropdownOpen(false);
  //       setWhatsappDropdownOpen(false);
  //       setTimeSlotDropdownOpen(false);
  //       setPhoneSearch('');
  //       setWhatsappSearch('');
  //     }
  //   };

  //   if (phoneDropdownOpen || whatsappDropdownOpen || timeSlotDropdownOpen) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [phoneDropdownOpen, whatsappDropdownOpen, timeSlotDropdownOpen]);

  // if (!isOpen) return null;

  // const handleOverlayClick = (e) => {
  //   if (e.target === e.currentTarget) onClose();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.captchaToken) {
      alert("Please complete the captcha verification");
      return;
    }

    // Validate time slot is selected
    if (!formData.timeSlot) {
      alert("Please select a time slot");
      return;
    }

    // Validate phone number
    const phoneDigits = formData.phoneCountry.digits;
    if (formData.phone.length !== phoneDigits) {
      setPhoneError(`Phone number must be exactly ${phoneDigits} digits for ${formData.phoneCountry.name}`);
      return;
    }
    
    // Validate WhatsApp number
    const whatsappDigits = formData.whatsappCountry.digits;
    if (formData.whatsapp.length !== whatsappDigits) {
      setWhatsappError(`WhatsApp number must be exactly ${whatsappDigits} digits for ${formData.whatsappCountry.name}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedDateFormatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });

      const dataToSave = {
        name: formData.name,
        email: formData.email || '',
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        phoneCountryCode: formData.phoneCountry.code,
        whatsappCountryCode: formData.whatsappCountry.code,
        selectedDate: selectedDateFormatted,
        timeSlot: formData.timeSlot,
        termsAccepted: formData.termsAccepted,
        captchaToken: formData.captchaToken,
      };

      // Send to API route which handles Google Sheets and Email
      const response = await fetch('/api/schedule-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await response.json();

      if (result.success) {
        // Show confirmation modal
        setShowConfirmation(true);

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          whatsapp: "",
          phoneCountry: countries[0],
          whatsappCountry: countries[0],
          timeSlot: "",
          termsAccepted: false,
          captchaToken: null,
        });
        setDate(new Date());
      } 
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    // Auto-capitalize first letter for name field
    if (field === "name" && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // Limit name field to 30 characters
    if (field === "name" && value.length > 30) {
      return; // Don't update if exceeds 30 characters
    }

    // Validate phone and whatsapp fields - only numbers
    if (field === "phone" || field === "whatsapp") {
      // Remove any non-numeric characters
      value = value.replace(/\D/g, "");
      
      // Get max digits for the selected country
      const maxDigits = field === "phone" 
        ? formData.phoneCountry.digits 
        : formData.whatsappCountry.digits;
      
      // Limit to max digits for the country
      if (value.length > maxDigits) {
        return; // Don't update if exceeds max digits
      }
      
      // Clear error when user starts typing
      if (field === "phone") {
        setPhoneError("");
      } else {
        setWhatsappError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredPhoneCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
      country.code.includes(phoneSearch)
  );

  const filteredWhatsappCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(whatsappSearch.toLowerCase()) ||
      country.code.includes(whatsappSearch)
  );

  const selectPhoneCountry = (country) => {
    setFormData((prev) => ({ ...prev, phoneCountry: country }));
    setPhoneDropdownOpen(false);
    setPhoneSearch("");
    setPhoneError(""); // Clear error when country changes
    
    // Validate current phone number against new country
    if (formData.phone && formData.phone.length !== country.digits) {
      setPhoneError(`Phone number must be exactly ${country.digits} digits for ${country.name}`);
    }
  };

  const selectWhatsappCountry = (country) => {
    setFormData((prev) => ({ ...prev, whatsappCountry: country }));
    setWhatsappDropdownOpen(false);
    setWhatsappSearch("");
    setWhatsappError(""); // Clear error when country changes
    
    // Validate current WhatsApp number against new country
    if (formData.whatsapp && formData.whatsapp.length !== country.digits) {
      setWhatsappError(`WhatsApp number must be exactly ${country.digits} digits for ${country.name}`);
    }
  };

  const handleRecaptchaChange = (token) => {
    setFormData((prev) => ({ ...prev, captchaToken: token }));
  };

  const selectTimeSlot = (timeSlot) => {
    setFormData((prev) => ({ ...prev, timeSlot: timeSlot.value }));
    setTimeSlotDropdownOpen(false);
  };

  const getSelectedTimeSlotLabel = () => {
    const selected = timeSlotOptions.find(
      (option) => option.value === formData.timeSlot
    );
    return selected ? selected.label : "-";
  };

  const handleConfirmationClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setShowConfirmation(false);
    }, 300);
  };

  const CloseButton = ({ onClick }) => (
    <button className="modal-close-btn" onClick={onClick} aria-label="Close">
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );

  return (
    <div>
      <div className="brochure-card schedule-card">
        <h2>Schedule a Call</h2>
        <p>Enter your details to schedule a call with our team.</p>

        <Image
          src="/images/threedotsIndicator.svg"
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
              onChange={(e) => handleInputChange("name", e.target.value)}
              maxLength={30}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder=""
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <div className="phone-field">
              <div className="country-selector">
                <div
                  className="country-display"
                  onClick={() => setPhoneDropdownOpen(!phoneDropdownOpen)}
                >
                  <span className="flag">{formData.phoneCountry.flag}</span>
                  <span className="code">{formData.phoneCountry.code}</span>
                  <svg 
                    className="dropdown-arrow" 
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none"
                  >
                    <path 
                      d="M1 1L6 6L11 1" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {phoneDropdownOpen && (
                  <div className="country-dropdown">
                    <input
                      type="text"
                      placeholder=".."
                      value={phoneSearch}
                      onChange={(e) => setPhoneSearch(e.target.value)}
                      className="country-search"
                      autoFocus
                    />
                    <div className="country-options">
                      {filteredPhoneCountries.map((country, index) => (
                        <div
                          key={`${country.code}-${country.name}-${index}`}
                          className="country-option"
                          onClick={() => selectPhoneCountry(country)}
                        >
                          <span className="flag">{country.flag}</span>
                          <span className="code">{country.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                maxLength={formData.phoneCountry.digits}
                placeholder={`Enter ${formData.phoneCountry.digits}-digit phone number`}
                required
              />
            </div>
            {phoneError && <span className="error-message">{phoneError}</span>}
          </div>

          <div className="input-group">
            <label>WhatsApp</label>
            <div className="phone-field">
              <div className="country-selector">
                <div
                  className="country-display"
                  onClick={() => setWhatsappDropdownOpen(!whatsappDropdownOpen)}
                >
                  <span className="flag">{formData.whatsappCountry.flag}</span>
                  <span className="code">{formData.whatsappCountry.code}</span>
                  <svg 
                    className="dropdown-arrow" 
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none"
                  >
                    <path 
                      d="M1 1L6 6L11 1" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {whatsappDropdownOpen && (
                  <div className="country-dropdown">
                    <input
                      type="text"
                      placeholder=""
                      value={whatsappSearch}
                      onChange={(e) => setWhatsappSearch(e.target.value)}
                      className="country-search"
                      autoFocus
                    />
                    <div className="country-options">
                      {filteredWhatsappCountries.map((country, index) => (
                        <div
                          key={`${country.code}-${country.name}-${index}`}
                          className="country-option"
                          onClick={() => selectWhatsappCountry(country)}
                        >
                          <span className="flag">{country.flag}</span>
                          <span className="code">{country.code}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                maxLength={formData.whatsappCountry.digits}
                placeholder={`Enter ${formData.whatsappCountry.digits}-digit WhatsApp number`}
                required
              />
            </div>
            {whatsappError && <span className="error-message">{whatsappError}</span>}
          </div>

          {/* === Date & Time Section === */}
          <div className="schedule-title-row">
            <p className="schedule-title">Select a convenient date and time</p>
            <Image
              src="/images/calenderIcon.svg"
              alt="divider"
              width={15}
              height={15}
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
                <label>Selected Date</label>
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
                <div className="time-slot-selector">
                  <div
                    className="time-slot-display"
                    onClick={() =>
                      setTimeSlotDropdownOpen(!timeSlotDropdownOpen)
                    }
                  >
                    <span className="time-slot-text">
                      {getSelectedTimeSlotLabel()}
                    </span>
                    <svg 
                      className="dropdown-arrow" 
                      width="12" 
                      height="8" 
                      viewBox="0 0 12 8" 
                      fill="none"
                    >
                      <path 
                        d="M1 1L6 6L11 1" 
                        stroke="currentColor" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {timeSlotDropdownOpen && (
                    <div className="time-slot-dropdown">
                      <div className="time-slot-options">
                        {timeSlotOptions.map((timeSlot) => (
                          <div
                            key={timeSlot.value}
                            className="time-slot-option"
                            onClick={() => selectTimeSlot(timeSlot)}
                          >
                            <span className="time-slot-label">
                              {timeSlot.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    handleInputChange("termsAccepted", e.target.checked)
                  }
                  required
                />
                <span>I agree to the terms and privacy policy</span>
              </label>

              <div className="recaptcha-container">
                <HCaptcha
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001"}
                  onVerify={handleRecaptchaChange}
                  onExpire={() =>
                    setFormData((prev) => ({ ...prev, captchaToken: null }))
                  }
                  onError={() =>
                    setFormData((prev) => ({ ...prev, captchaToken: null }))
                  }
                />
              </div>

              <button
                className="download-button"
                type="submit"
                disabled={isSubmitting || !formData.captchaToken}
              >
                {isSubmitting ? "Scheduling..." : "Schedule"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div
          className={`brochure-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}
          onClick={handleConfirmationClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
          }}
        >
          <div className={`brochure-card thank-you-card ${isClosing ? 'slide-out' : 'slide-in'}`} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleConfirmationClose} />
            
            <h2>You're All Set!</h2>

            <Image
              src="/images/threedotsIndicator.svg"
              alt="divider"
              width={120}
              height={20}
              className="divider-image"
            />

            <div className="thank-you-content">
              <p>
                We've received your request and locked in your preferred time slot. Our team will connect with you as scheduled.
              </p>
            </div>

            <button className="close-button" onClick={handleConfirmationClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

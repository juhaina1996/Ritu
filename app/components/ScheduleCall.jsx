"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import ReCAPTCHA from "react-google-recaptcha";
import "./Calender.css";
import { saveScheduleCallData } from "../lib/firebaseUtils";

const countries = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+1", flag: "🇨🇦", name: "Canada" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" }
];

const timeSlotOptions = [
  { value: "morning", label: "Morning (9am - 12pm)" },
  { value: "afternoon", label: "Afternoon (12pm - 3pm)" },
  { value: "late-afternoon", label: "Late Afternoon (3pm - 6pm)" },
  { value: "evening", label: "Evening (After 6pm)" }
];

export default function ScheduleCall() {
  const timeSlotOptions = [
    { value: "morning", label: "Morning (9am - 12pm)" },
    { value: "afternoon", label: "Afternoon (12pm - 3pm)" },
    { value: "late-afternoon", label: "Late Afternoon (3pm - 6pm)" },
    { value: "evening", label: "Evening (After 6pm)" }
  ];

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    phoneCountry: countries[0],
    whatsappCountry: countries[0],
    timeSlot: timeSlotOptions[0].value, // Default to first time slot
    termsAccepted: false,
    recaptchaToken: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [whatsappDropdownOpen, setWhatsappDropdownOpen] = useState(false);
  const [timeSlotDropdownOpen, setTimeSlotDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState('');
  const [whatsappSearch, setWhatsappSearch] = useState('');

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
    
    if (!formData.recaptchaToken) {
      alert('Please complete the reCAPTCHA verification.');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const dataToSave = {
        ...formData,
        phoneCountryCode: formData.phoneCountry.code,
        whatsappCountryCode: formData.whatsappCountry.code,
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
          phoneCountry: countries[0],
          whatsappCountry: countries[0],
          timeSlot: timeSlotOptions[0].value, // Reset to first time slot
          termsAccepted: false,
          recaptchaToken: null
        });
        setDate(new Date());
        // onClose();
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
    // Auto-capitalize first letter for name field
    if (field === 'name' && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    
    // Limit name field to 30 characters
    if (field === 'name' && value.length > 30) {
      return; // Don't update if exceeds 30 characters
    }
    
    // Validate phone and whatsapp fields - only numbers and max 10 characters
    if ((field === 'phone' || field === 'whatsapp')) {
      // Remove any non-numeric characters
      value = value.replace(/\D/g, '');
      // Limit to 10 characters
      if (value.length > 10) {
        return; // Don't update if exceeds 10 characters
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredPhoneCountries = countries.filter(country => 
    country.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
    country.code.includes(phoneSearch)
  );

  const filteredWhatsappCountries = countries.filter(country => 
    country.name.toLowerCase().includes(whatsappSearch.toLowerCase()) ||
    country.code.includes(whatsappSearch)
  );

  const selectPhoneCountry = (country) => {
    setFormData(prev => ({ ...prev, phoneCountry: country }));
    setPhoneDropdownOpen(false);
    setPhoneSearch('');
  };

  const selectWhatsappCountry = (country) => {
    setFormData(prev => ({ ...prev, whatsappCountry: country }));
    setWhatsappDropdownOpen(false);
    setWhatsappSearch('');
  };

  const handleRecaptchaChange = (token) => {
    setFormData(prev => ({ ...prev, recaptchaToken: token }));
  };

  const selectTimeSlot = (timeSlot) => {
    setFormData(prev => ({ ...prev, timeSlot: timeSlot.value }));
    setTimeSlotDropdownOpen(false);
  };

  const getSelectedTimeSlotLabel = () => {
    const selected = timeSlotOptions.find(option => option.value === formData.timeSlot);
    return selected ? selected.label : "Select time slot";
  };

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
              onChange={(e) => handleInputChange('name', e.target.value)}
              maxLength={30}
              required 
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
                  <span className="dropdown-arrow">▼</span>
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
                onChange={(e) => handleInputChange('phone', e.target.value)}
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="Enter phone number"
                required 
              />
            </div>
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
                  <span className="dropdown-arrow">▼</span>
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
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="Enter WhatsApp number"
                required 
              />
            </div>
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
                    onClick={() => setTimeSlotDropdownOpen(!timeSlotDropdownOpen)}
                  >
                    <span className="time-slot-text">{getSelectedTimeSlotLabel()}</span>
                    <span className="dropdown-arrow">▼</span>
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
                            <span className="time-slot-label">{timeSlot.label}</span>
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
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  required 
                />
                <span>
                  I agree to the <u>terms</u> and <u>privacy policy</u>
                </span>
              </label>

              <div className="recaptcha-container">
                <ReCAPTCHA
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test site key - replace with your actual site key
                  onChange={handleRecaptchaChange}
                  onExpired={() => setFormData(prev => ({ ...prev, recaptchaToken: null }))}
                  onError={() => setFormData(prev => ({ ...prev, recaptchaToken: null }))}
                />
              </div>

              <button className="download-button" type="submit" disabled={isSubmitting || !formData.recaptchaToken}>
                {isSubmitting ? 'Scheduling...' : 'Schedule'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

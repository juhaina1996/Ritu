"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

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

export default function DownloadBrochure({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    phoneCountry: countries[0],
    whatsappCountry: countries[0],
    termsAccepted: false,
    captchaToken: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [whatsappDropdownOpen, setWhatsappDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [whatsappSearch, setWhatsappSearch] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [whatsappError, setWhatsappError] = useState("");
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".country-selector")) {
        setPhoneDropdownOpen(false);
        setWhatsappDropdownOpen(false);
        setPhoneSearch("");
        setWhatsappSearch("");
      }
    };

    if (phoneDropdownOpen || whatsappDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [phoneDropdownOpen, whatsappDropdownOpen]);

  if (!isOpen && !isClosing) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match animation duration
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.captchaToken) {
      alert("Please complete the captcha verification");
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
      const dataToSave = {
        name: formData.name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        phoneCountryCode: formData.phoneCountry.code,
        whatsappCountryCode: formData.whatsappCountry.code,
        termsAccepted: formData.termsAccepted,
      };

      // Send to API route which handles Google Sheets and Email
      const response = await fetch('/api/brochure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      const result = await response.json();

      if (result.success) {
        // Reset form
        setFormData({
          name: "",
          phone: "",
          whatsapp: "",
          phoneCountry: countries[0],
          whatsappCountry: countries[0],
          termsAccepted: false,
          captchaToken: null,
        });

        // Show thank you modal and start download
        setShowThankYou(true);
        startPDFDownload();
      } 
    } catch (error) {
      console.error("Error:", error);
     
    } finally {
      setIsSubmitting(false);
    }
  };

  const startPDFDownload = () => {
    // Auto-download after 3 seconds
    setTimeout(() => {
      downloadPDF();
    }, 3000);
  };

  const downloadPDF = () => {
    // Create a dummy PDF download
    const link = document.createElement("a");
    link.href = "/dummy-brochure.pdf"; // You'll need to add this PDF to your public folder
    link.download = "Brochure.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleThankYouClose = () => {
    setShowThankYou(false);
    handleClose();
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

  const handleCaptchaChange = (token) => {
    setFormData((prev) => ({ ...prev, captchaToken: token }));
  };

  const filteredPhoneCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(phoneSearch.toLowerCase()) ||
      country.code.includes(phoneSearch)
  );
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

  return (
    <>
      {/* Main Form Modal */}
      {!showThankYou && (
        <div
          className={`brochure-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}
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
          <div className={`brochure-card ${isClosing ? 'slide-out' : 'slide-in'}`}>
            <CloseButton onClick={handleClose} />

            <h2>Download Brochure</h2>
            <p>Enter your details</p>

            <Image
              src="/images/threedotsIndicator.svg"
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
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  maxLength={30}
                  required
                />
              </div>

              {/* Phone */}
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
                          placeholder="Search country or code..."
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

              {/* WhatsApp */}
              <div className="input-group">
                <label>WhatsApp</label>
                <div className="phone-field">
                  <div className="country-selector">
                    <div
                      className="country-display"
                      onClick={() =>
                        setWhatsappDropdownOpen(!whatsappDropdownOpen)
                      }
                    >
                      <span className="flag">
                        {formData.whatsappCountry.flag}
                      </span>
                      <span className="code">
                        {formData.whatsappCountry.code}
                      </span>
                      <span className="dropdown-arrow">▼</span>
                    </div>

                    {whatsappDropdownOpen && (
                      <div className="country-dropdown">
                        <input
                          type="text"
                          placeholder="Search country or code..."
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
                    onChange={(e) =>
                      handleInputChange("whatsapp", e.target.value)
                    }
                    maxLength={formData.whatsappCountry.digits}
                    placeholder={`Enter ${formData.whatsappCountry.digits}-digit WhatsApp number`}
                    required
                  />
                </div>
                {whatsappError && <span className="error-message">{whatsappError}</span>}
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
                  onVerify={handleCaptchaChange}
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
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div
          className={`brochure-overlay ${isClosing ? 'fade-out' : 'fade-in'}`}
          onClick={handleThankYouClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
          }}
        >
          <div className={`brochure-card thank-you-card ${isClosing ? 'slide-out' : 'slide-in'}`}>
            <h2>Thank You!</h2>
          

            <Image
              src="/images/threedotsIndicator.svg"
              alt="divider"
              width={120}
              height={20}
              className="divider-image"
            />

            <div className="thank-you-content">
              <p>
                If your download does not start, please{" "}
                <button onClick={downloadPDF} className="download-link">
                  click here
                </button>
              </p>
            </div>

            <button className="close-button" onClick={handleThankYouClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

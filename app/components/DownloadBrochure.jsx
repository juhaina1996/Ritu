"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
];

export default function DownloadBrochure({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    phoneCountry: countries[0],
    whatsappCountry: countries[0],
    termsAccepted: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [phoneDropdownOpen, setPhoneDropdownOpen] = useState(false);
  const [whatsappDropdownOpen, setWhatsappDropdownOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [whatsappSearch, setWhatsappSearch] = useState("");
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

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    onClose();
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

    // Validate phone and whatsapp fields - only numbers and max 10 characters
    if (field === "phone" || field === "whatsapp") {
      // Remove any non-numeric characters
      value = value.replace(/\D/g, "");
      // Limit to 10 characters
      if (value.length > 10) {
        return; // Don't update if exceeds 10 characters
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
  };

  const selectWhatsappCountry = (country) => {
    setFormData((prev) => ({ ...prev, whatsappCountry: country }));
    setWhatsappDropdownOpen(false);
    setWhatsappSearch("");
  };

  return (
    <>
      {/* Main Form Modal */}
      {!showThankYou && (
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
            <CloseButton onClick={onClose} />

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
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
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
                    maxLength={10}
                    pattern="[0-9]{10}"
                    placeholder="Enter WhatsApp number"
                    required
                  />
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

              <button
                className="download-button"
                type="submit"
                disabled={isSubmitting}
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
          className="brochure-overlay"
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
          <div className="brochure-card thank-you-card">
            <h2>Thank You!</h2>
            <p>
              Thank you for sharing details. Your download will start in few
              seconds.
            </p>

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

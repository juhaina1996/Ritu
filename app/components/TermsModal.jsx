"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function TermsModal({ isOpen, onClose }) {
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

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center 
                 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* MODAL WRAPPER */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="brochure-card-popup slide-in"
        style={{ maxHeight: '85vh', overflow: 'auto' }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#7a6f5f] hover:text-[#3F3428] transition"
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <div className="text-center pt-10 pb-6 px-6">
          <h2 className="text-3xl md:text-4xl font-light text-[#3F3428]">
            Terms & Conditions
          </h2>

        <div className="relative w-full h-[4px]">
          <Image
            src="/images/threedotsIndicator.svg"
            alt="divider"
            width={120}
            height={20}
            className="divider-image"
          />
        </div>


        </div>

        {/* CONTENT AREA */}
        <div>
          <div className="bg-[#FCFCFB] shadow-sm rounded-sm
                          max-h-[60vh] overflow-y-auto p-6 md:p-10">
            <p className="text-xs text-gray-500 mb-6">
              Last Updated: January 2026
            </p>

            <div className="space-y-5 text-sm text-[#3F3428] leading-relaxed">
              <p>
                Welcome to the official website of{" "}
                <strong>Ritu – A Luxury Farm Resort</strong>. By accessing or
                using this website, you agree to comply with the following
                Terms & Conditions.
              </p>

              <p>
                Project Ritu is developed and promoted by{" "}
                <strong>S Zone Developers LLP</strong> (“SZ Developers”).
                All references to “Project Ritu” relate to this project.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                1. Ownership & Trademark
              </h3>
              <p>
                Project Ritu, including its name, logo, branding, and trademarks,
                is owned by S Zone Developers LLP. Unauthorized use is prohibited.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                2. Purpose of the Website
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide information about Project Ritu</li>
                <li>Explain the fractional co-ownership model</li>
                <li>Enable inquiries and discussions</li>
              </ul>

              <p>
                This website does not constitute a legal offer or guarantee of
                returns.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                3. No Investment Advice
              </h3>
              <p>
                Information on this website is for marketing purposes only and
                should not be considered financial or legal advice.
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li>Independent due diligence is recommended</li>
                <li>Formal agreements must be reviewed</li>
                <li>Professional advisors should be consulted</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">
                4. Accuracy of Information
              </h3>
              <p>
                Project details, pricing, and availability may change without
                notice. Accuracy is not guaranteed.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                5. Lead Submissions
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Information submitted must be accurate</li>
                <li>You authorize contact by Project Ritu</li>
                <li>No contractual relationship is formed</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">
                6. Intellectual Property
              </h3>
              <p>
                All website content is the intellectual property of
                S Zone Developers LLP and may not be reproduced without permission.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                7. Limitation of Liability
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Reliance on website content</li>
                <li>Technical or access issues</li>
                <li>Decisions based on website information</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">
                8. Governing Law
              </h3>
              <p>
                These terms are governed by the laws of India. Jurisdiction lies
                with the courts of Kozhikode, Kerala.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                9. Changes to Terms
              </h3>
              <p>
                Terms may be updated at any time. Continued use implies
                acceptance.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                10. Contact Details
              </h3>
              <p>
                <strong>Project Ritu – S Zone Developers LLP</strong><br />
                📧 info@szdevelopers.com<br />
                📞 +91 9539002266
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

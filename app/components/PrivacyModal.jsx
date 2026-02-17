"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function PrivacyModal({ isOpen, onClose }) {
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
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#3F3428]">
            Privacy Policy
          </h2>

          {/* DIVIDER */}
          <Image
            src="/images/threedotsIndicator.svg"
            alt="divider"
            width={120}
            height={20}
            className="divider-image"
          />

        </div>

        {/* CONTENT AREA */}
        <div >
          <div className="bg-[#FCFCFB] shadow-sm rounded-sm
                          max-h-[60vh] overflow-y-auto p-6 md:p-10">
            <p className="text-xs text-gray-500 mb-6">
              Last Updated: January 2026
            </p>

            <div className="space-y-5 text-sm text-[#3F3428] leading-relaxed">
              <p>
                <strong>S Zone Developers LLP</strong> (also known as SZ Developers)
                respects your privacy and is committed to protecting the personal
                information you share with us through our website.
              </p>

              <p>
                This Privacy Policy explains how we collect, use, store, and
                safeguard your information when you visit our website or submit
                your details to learn more about the Project Ritu investment
                opportunity.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                1. Ownership & Trademark
              </h3>
              <p>
                “Ritu” and all related trademarks, branding, and intellectual
                property are owned by and licensed to S Zone Developers LLP.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                2. Information We Collect
              </h3>
              <p>We may collect:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Full Name</li>
                <li>Phone Number</li>
                <li>Email Address</li>
                <li>Information voluntarily shared via inquiries</li>
              </ul>

              <p>
                We do not collect sensitive data such as passwords, identity
                numbers, or financial details.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                3. How We Use Your Information
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>To contact you regarding Project Ritu</li>
                <li>To schedule meetings or calls</li>
                <li>To share project updates and brochures</li>
                <li>To respond to your inquiries</li>
              </ul>

              <p>
                We do not sell or rent your personal information to third parties.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                4. Data Storage & Security
              </h3>
              <p>
                Reasonable technical and administrative safeguards are used to
                protect your data from unauthorized access.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                5. Sharing of Information
              </h3>
              <p>Your data may be shared only with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Internal project team members</li>
                <li>Authorized representatives</li>
                <li>Service providers supporting our website</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6">
                6. Cookies & Analytics
              </h3>
              <p>
                We may use cookies or analytics tools to improve user experience.
                These do not personally identify users.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                7. Your Consent
              </h3>
              <p>
                By submitting your information, you consent to this Privacy
                Policy.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                8. Changes to This Policy
              </h3>
              <p>
                We may update this policy from time to time. Changes will be
                reflected on this page.
              </p>

              <h3 className="text-lg font-semibold mt-6">
                9. Contact Information
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

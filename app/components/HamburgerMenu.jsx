"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function HamburgerMenu({ onOpenBrochure, onOpenScheduleCall }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [open]);

  const menuContent = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        backgroundColor: "#f6f3ee",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 0,
        padding: "64px 24px",
        boxSizing: "border-box",
        transform: open ? "translateX(0)" : "translateX(100%)",
        opacity: open ? 1 : 0,
        transition: "transform 0.6s ease-in-out, opacity 0.6s ease-in-out",
        pointerEvents: open ? "auto" : "none",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* CLOSE BUTTON */}
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "32px",
          right: "32px",
          zIndex: 1000000,
          background: "transparent",
          border: "none",
          padding: "8px",
          fontSize: "32px",
          color: "#A29279",
          cursor: "pointer",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.8)",
          transition: open 
            ? "opacity 0.6s ease-in-out 0.4s, transform 0.6s ease-in-out 0.4s"
            : "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        aria-label="Close menu"
        type="button"
      >
        ✕
      </button>

      {/* NAVIGATION */}
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "22px",
          color: "#000000",
          flex: 1,
          justifyContent: "center",
          width: "100%",
          maxWidth: "600px",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          transition: open 
            ? "opacity 0.8s ease-in-out 0.3s, transform 0.8s ease-in-out 0.3s"
            : "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
        }}
      >
        <span
          className="navigation-menu"
          style={{
            padding: "6px 42px",
            border: "1px solid #A29279",
            borderRadius: "50px",
            fontSize: "18px",
            fontWeight: "500",
            color: "#000000",
          }}
        >
          Home
        </span>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            if (onOpenBrochure) {
              onOpenBrochure();
            }
          }}
          className="navigation-menu group cursor-pointer"
          style={{
            fontSize: "18px",
            color: "#000000",
            textDecoration: "none",
            fontWeight: "400",
          }}
        >
          <span className="relative">
            Download Brochure
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#A29279] transition-all duration-300 ease-out group-hover:w-full"></span>
          </span>
        </a>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setOpen(false);
            if (onOpenScheduleCall) {
              onOpenScheduleCall();
            }
          }}
          className="navigation-menu group cursor-pointer"
          style={{
            fontSize: "18px",
            color: "#000000",
            textDecoration: "none",
            fontWeight: "400",
          }}
        >
          <span className="relative">
            Schedule a Call
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#A29279] transition-all duration-300 ease-out group-hover:w-full"></span>
          </span>
        </a>

        <a
          href="#contact"
          className="navigation-menu group cursor-pointer"
          style={{
            fontSize: "18px",
            color: "#000000",
            textDecoration: "none",
            fontWeight: "400",
          }}
        >
          <span className="relative">
            Contact
            <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#A29279] transition-all duration-300 ease-out group-hover:w-full"></span>
          </span>
        </a>

        {/* SOCIAL ICONS */}
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "32px",
          }}
        >
          <a
            href="https://www.instagram.com/ritufarms?igsh=MTZ6MG01NG55ajZwbA=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Image
              src="/images/instagram.svg"
              alt="Instagram"
              width={32}
              height={32}
            />
          </a>

          <a
            href="https://www.facebook.com/share/1AKkk3Xe7b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <Image
              src="/images/facebook.svg"
              alt="Facebook"
              width={32}
              height={32}
            />
          </a>
        </div>
      </nav>

      {/* FOOTER */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          fontSize: "14px",
          color: "#9c8f7a",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(20px)",
          transition: open 
            ? "opacity 0.7s ease-in-out 0.35s, transform 0.7s ease-in-out 0.35s"
            : "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "80px",
          }}
        >
          <Image
            src="/images/hamburgerSZ.svg"
            alt="SZ Developers"
            width={102}
            height={60}
          />
        </div>

        <p
          className="sz-developer-text"
          style={{
            textAlign: "center",
            lineHeight: "1.5",
            margin: 0,
          }}
        >
          SZ Developers © 2026 <br />
          All Rights Reserved
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <button
        onClick={handleOpen}
        className="header-image flex flex-col items-center gap-1 hover:opacity-80 transition-opacity cursor-pointer"
        style={{
          zIndex: 102,
          position: "relative",
          background: "transparent",
          border: "none",
          padding: "8px",
        }}
        aria-label="Open menu"
        type="button"
      >
        <Image
          src="/images/hamburger.svg"
          alt="Menu"
          width={50}
          height={25}
          priority
          style={{ pointerEvents: "none" }}
        />
      </button>

      {/* RENDER MENU IN PORTAL */}
      {mounted && createPortal(menuContent, document.body)}
    </>
  );
}

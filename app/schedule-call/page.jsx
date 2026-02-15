"use client"
import BenefitsSection from "../components/BenefitsSection";
import HeroSection from "../components/HeroSection";
import InvestmentSection from "../components/InvestmentSection";
import ScheduleSection from "../components/ScheduleSection";
import HamburgerMenu from "../components/HamburgerMenu";
import Footer from "../components/Footer";
import DownloadBrochure from "../components/DownloadBrochure";
import useSectionScroll from "../hooks/useSectionScroll";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export default function RitusLegacyPage() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const router = useRouter();
  
  // Enable section-wise auto-scroll
  useSectionScroll('.scroll-section');

  useEffect(() => {
    // Custom smooth scroll function for better control
    const smoothScrollTo = (element) => {
      const targetPosition = element.offsetTop - 80; // Offset for header
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 second duration
      let start = null;

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      // Easing function for smooth animation
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      requestAnimationFrame(animation);
    };

    // Handle scrolling to hash on page load
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          smoothScrollTo(element);
        }
      }, 500); // Wait for page to fully load
    }
  }, []);

  return (
    <>
      <nav
        className="header-schedule-call relative flex items-center justify-between px-20 py-6 pl-20"
        style={{ zIndex: 100 }}
      >
        {/* Logo */}
        <button 
          onClick={() => router.push('/')}
          className="flex items-center hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0"
        >
          <Image
            src="/images/logoScheduleCall.svg"
            alt="Ritu Logo"
            width={130}
            height={66}
            priority
            className="object-contain header-image"
          />
        </button>

        {/* Hamburger Menu */}
        <div className="relative" style={{ zIndex: 101 }}>
          <HamburgerMenu
            onOpenBrochure={() => setIsBrochureOpen(true)} 
          />
        </div>
      </nav>
      
      <section className="scroll-section">
        <HeroSection />
      </section>
      
      <section className="scroll-section">
        <InvestmentSection />
      </section>
      
      <section className="scroll-section">
        <BenefitsSection />
      </section>
      
      <section className="scroll-section">
        <ScheduleSection />
      </section>
      
      <section className="scroll-section">
        <Footer />
      </section>

      <DownloadBrochure
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </>
  );
}

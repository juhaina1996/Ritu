"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import Image from "next/image";
import Hero from "./components/Hero";
import ExperienceSection from "./components/ExperienceSection";
import ExperiencesSlider from "./components/ExperiencesSlider";
import VayalNaaduSection from "./components/VayalNaaduSection";
import CoOwnSection from "./components/CoOwnSection";
import Footer from "./components/Footer";
import DownloadBrochure from "./components/DownloadBrochure";

export default function HomePage() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  useEffect(() => {
    // Initialize AOS with enhanced animation settings
    AOS.init({
      duration: 1800, // Longer duration for more dramatic effect
      easing: 'ease-out-quart',
      once: true, // Animation happens only once on initial load
      offset: 120, // Trigger animations earlier for better timing
      delay: 0,
      anchorPlacement: 'top-bottom',
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });

    // Header scroll effect
    const onScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;
      if (window.scrollY <= 10) header.className = "";
      else header.className = "scroll";
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>      
      <Hero 
        onOpenBrochure={() => setIsBrochureOpen(true)} 
      />
      
      {/* Logo Background - Left Side after Hero - Partially Visible */}
     

      <ExperienceSection />
      
  

      <ExperiencesSlider />
      <VayalNaaduSection />
      
    
      <CoOwnSection onOpenBrochure={() => setIsBrochureOpen(true)} />
    

      <Footer />

      <DownloadBrochure 
        isOpen={isBrochureOpen} 
        onClose={() => setIsBrochureOpen(false)} 
      />
    </>
  );
}
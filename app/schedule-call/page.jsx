"use client"
import BenefitsSection from "../components/BenefitsSection";
import HeroSection from "../components/HeroSection";
import InvestmentSection from "../components/InvestmentSection";
import ScheduleSection from "../components/ScheduleSection";
import HamburgerMenu from "../components/HamburgerMenu";
import Footer from "../components/Footer";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function RitusLegacyPage() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const router = useRouter();

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
      <HeroSection />
      <InvestmentSection />
      <BenefitsSection />
      <ScheduleSection />
      <Footer />

    </>
  );
}

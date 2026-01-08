import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";

export default function KeralaFarmHero() {
  return (
    <div className="relative lg:h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <video
          src="https://odoos.in/ritu/images/banner.mp4" // or external URL
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0  h-[70vh] lg:h-full w-full object-cover"
          data-aos="zoom-in"
          data-aos-duration="3000"
          data-aos-easing="ease-out-expo"
        />
        {/* Overlay */}
      </div>

      {/* Navigation */}
      <nav className="header relative flex items-center justify-between px-8 py-6" style={{ zIndex: 100 }}>
        {/* Logo */}
        <div 
          className="flex items-center" 
          data-aos="slide-up-dramatic" 
          data-aos-duration="1500" 
          data-aos-delay="800"
          data-aos-easing="ease-out-back"
        >
          <Image
            src="/images/logo.png"
            alt="Ritu Logo"
            width={120}
            height={40}
            priority
            className="object-contain header-image"
          />
        </div>

        {/* Hamburger Menu */}
        <div 
          className="relative"
          style={{ zIndex: 101 }}
          data-aos="bounce-in" 
          data-aos-duration="1500" 
          data-aos-delay="1000"
          data-aos-easing="ease-out-elastic"
        >
          <HamburgerMenu />
        </div>
      </nav>

      {/* Hero Content */}
<div className="relative z-10 flex flex-col items-center justify-center h-[70vh] lg:h-full px-4 -mt-20">
        <h1 
          className="experience-main text-white text-5xl md:text-7xl font-light text-center mb-4 tracking-wide"
          data-aos="wave-in"
          data-aos-duration="2000"
          data-aos-delay="1200"
          data-aos-easing="ease-out-expo"
        >
          Experience the farms of kerala
        </h1>

        <p 
          className="experience-sub text-white md:text-base text-center mb-12 max-w-2xl opacity-90"
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="1600"
          data-aos-easing="ease-out-quart"
        >
          Bridging The Gap Between Urban Living and Farming Culture
        </p>

        {/* CTA Button */}
        <button
          className="hero-buttton
    group
    flex items-center gap-4
    rounded-full
    bg-[#9b9b9b]/60
backdrop-blur-none   px-3 py-1
    text-sm
    text-white
    transition
    hover:bg-[#9b9b9b]/70
  "
          data-aos="bounce-in"
          data-aos-duration="1500"
          data-aos-delay="2000"
          data-aos-easing="ease-out-elastic"
        >
          <span className="whitespace-nowrap">Invest in Ritu, Wayanad</span>

          <span
            className="
    flex h-7 w-7 items-center justify-center
    rounded-full
   
    transition-transform
    group-hover:translate-x-0.5
  "
          >
            <Image
              src="/images/arrow.png"
              alt="Arrow"
              width={24}
              height={24}
              className="object-contain"
            />
          </span>
        </button>
      </div>
    </div>
  );
}
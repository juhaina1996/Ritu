import Image from "next/image";
import HamburgerMenu from "./HamburgerMenu";
import { useIsMobile } from "../hooks";

export default function KeralaFarmHero({ onOpenBrochure, onOpenScheduleCall }) {
  const isMobile = useIsMobile();

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
          className="absolute inset-0  h-[100vh] lg:h-full w-full object-cover"
          style={{ filter: "brightness(0.6)" }}
          data-aos="zoom-in"
          data-aos-duration="3000"
          data-aos-easing="ease-out-expo"
        />
      </div>

      {/* Navigation */}
      <nav
        className="header relative flex items-center justify-between px-20 py-6 pl-20"
        style={{ zIndex: 100 }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logoMain.svg"
            alt="Ritu Logo"
            width={130}
            height={66}
            priority
            className="object-contain header-image"
          />
        </div>

        {/* Hamburger Menu */}
        <div className="relative" style={{ zIndex: 101 }}>
          <HamburgerMenu
            onOpenBrochure={onOpenBrochure}
            onOpenScheduleCall={onOpenScheduleCall}
          />
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[100vh] lg:h-full px-4 -mt-20">
        {!isMobile && (
          <h1
            className="experience-main text-white text-5xl md:text-7xl font-light text-center mb-4 tracking-wide"
            data-aos="wave-in"
            data-aos-duration="2000"
            data-aos-delay="1200"
            data-aos-easing="ease-out-expo"
          >
            Experience the farms of kerala
          </h1>
        )}
        {isMobile && (
          <h1
            className="experience-main text-white text-5xl md:text-7xl font-light text-center mb-4 tracking-wide"
            data-aos="wave-in"
            data-aos-duration="2000"
            data-aos-delay="1200"
            data-aos-easing="ease-out-expo"
          >
            Experience the farms <br /> of kerala
          </h1>
        )}
        {!isMobile && (
          <p
            className="experience-sub text-white md:text-base text-center mb-12 max-w-2xl opacity-90"
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="1600"
            data-aos-easing="ease-out-quart"
          >
            Bridging The Gap Between Urban Living and Farming Culture
          </p>
        )}
        {isMobile && (
          <p
            className="experience-sub text-white md:text-base text-center mb-12 max-w-2xl opacity-90"
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="1600"
            data-aos-easing="ease-out-quart"
          >
            Bridging The Gap Between Urban Living and <br /> Farming Culture
          </p>
        )}

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
    animate-pulse-horizontal
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

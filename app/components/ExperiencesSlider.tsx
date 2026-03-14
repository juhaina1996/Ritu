"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "../hooks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  { title: "Farming", image: "/images/slider3.png" },
  { title: "Cattle", image: "/images/slider4.png" },
  { title: "Native Culinary", image: "/images/slider5.png" },
  { title: "Stream", image: "/images/slider9.svg" },
  { title: "Fish Pond", image: "/images/fishPond.svg" },
  { title: "Plantation", image: "/images/slider1.png" },
  { title: "Arts and Crafts", image: "/images/artAndCraft.svg" },
  { title: "Sound Therapy", image: "/images/slider6.png" },
];

export default function ExperiencesSlider() {
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const scroll = (dir: "left" | "right") => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Get current x position
    const currentX = gsap.getProperty(slider, "x") as number;
    const moveAmount = 320; // card width (280) + gap (40)
    
    // Calculate new position
    const newX = dir === "right" ? currentX - moveAmount : currentX + moveAmount;
    
    // Get max scroll distance - add padding to ensure last slide is fully visible
    const sliderWidth = slider.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = -(sliderWidth - viewportWidth + 100);
    
    // Clamp the value
    const clampedX = Math.max(maxScroll, Math.min(0, newX));
    
    // Animate to new position
    gsap.to(slider, {
      x: clampedX,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // Wait for component to mount
  useEffect(() => {
    setIsReady(true);
  }, []);

  // GSAP Horizontal Scroll
  useEffect(() => {
    if (!isReady || isMobile) return;

    const container = containerRef.current;
    const slider = sliderRef.current;
    
    if (!container || !slider) {
      console.log('Missing refs:', { container, slider });
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Get the actual width of the slider content
      const sliderWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      
      console.log('Slider width:', sliderWidth, 'Viewport width:', viewportWidth);
      
      if (sliderWidth <= viewportWidth) {
        console.log('Slider not wide enough for horizontal scroll');
        return;
      }

      // Calculate scroll distance - how far we need to move to show all content
      // Add extra padding to ensure last slide is fully visible
      const scrollDistance = sliderWidth - viewportWidth + 100;
      
      // Set initial transform to ensure GSAP can animate it
      gsap.set(slider, { x: 0 });

      // Create the animation - pin the container when slider is visible
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slider,
          start: "top 30%", // Pin when slider top reaches 30% from top of viewport
          end: () => `+=${scrollDistance}`,
          pin: container,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      tl.to(slider, {
        x: -scrollDistance,
        ease: "none",
        force3D: true,
      });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [isMobile, isReady]);

  // Mobile: use wrapper ref for horizontal scroll (scroll container is the wrapper)
  const wrapperRef = useRef<HTMLDivElement>(null);

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="experience-container" ref={containerRef}>
        {/* Background Image */}
        <div className="absolute right-[100px] top-[21%] -translate-y-1/2 z-0 pointer-events-none">
          <Image
            src="/images/leftBack.svg"
            alt="Logo Background"
            width={360}
            height={300}
            priority
          />
        </div>

        {/* Header */}
        <div className="experience-header">
          <h2 
            className="experience-header-one"
            data-aos="fade-right"
            data-aos-duration="1200"
            data-aos-easing="ease-out-quart"
          >
            <span className="italic">Ex</span>periences.
          </h2>
          <p 
            className="discover italic"
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-delay="200"
            data-aos-easing="ease-out-quart"
          >
            DISCOVER SENSORY NATURE FILLED ESCAPES IN WAYANAD
          </p>
        </div>

        {/* SLIDER WRAPPER - on mobile this div is the horizontal scroll container */}
        <div className="experience-slider-wrapper" ref={wrapperRef}>
          <div
            className="experience-slider"
            ref={sliderRef}
          >
            {experiences.map((item, index) => (
              <div className="experience-card" key={index}>
                <div className="experience-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ARROWS */}
        {!isMobile && (
          <div 
            className="experience-arrows flex items-center gap-6"
            
          >
            <button onClick={() => scroll("left")} className="group">
              <Image
                src="/images/arrowLeft.svg"
                alt="Previous"
                width={38}
                height={15}
              />
            </button>
            <button onClick={() => scroll("right")} className="group">
              <Image
                src="/images/arrowRight.svg"
                alt="Next"
                width={38}
                height={15}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

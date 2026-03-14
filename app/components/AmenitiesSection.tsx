"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "../hooks";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const amenities = [
  { title: "Spa", image: "/images/spareal.png" },
  { title: "Yoga Deck", image: "/images/spa.png" },
  { title: "Village Tea Shop", image: "/images/yoga-deck.png" },
  { title: "Mini Golf court", image: "/images/tea-shop.png" },
  { title: "Multicuisine Restaurant", image: "/images/restaurant.png" },
  { title: "Open Amphitheatre", image: "/images/Open Amphitheatre.png" },
  { title: "Kids Swimming Pool", image: "/images/Kids Swimming Pool.png" },
  { title: "Health Club", image: "/images/Health Club.png" },
  { title: "Cycling", image: "/images/Cycling.png" },
];

export default function AmenitiesSection() {
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
    const moveAmount = 400; // increased for larger cards
    
    // Calculate new position
    const newX = dir === "right" ? currentX - moveAmount : currentX + moveAmount;
    
    // Get max scroll distance - reduce padding to minimize extra space
    const sliderWidth = slider.scrollWidth;
    const viewportWidth = window.innerWidth;
    const maxScroll = -(sliderWidth - viewportWidth + 30);
    
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
      
      console.log('Amenities Slider width:', sliderWidth, 'Viewport width:', viewportWidth);
      
      if (sliderWidth <= viewportWidth) {
        console.log('Amenities slider not wide enough for horizontal scroll');
        return;
      }

      // Calculate scroll distance - how far we need to move to show all content
      // Reduce padding to minimize extra space after last slide
      const scrollDistance = sliderWidth - viewportWidth + 30;
      
      console.log('Amenities scroll distance:', scrollDistance, 'slider width:', sliderWidth, 'viewport:', viewportWidth);
      
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


  if (isMobile) return null;

  return (
    <section className="bg-[#f6f3ee] py-10 pt-[200px]" ref={sectionRef}>
      <div ref={containerRef}>
        {/* Heading */}
        <h2 
          className="text-center text-4xl md:text-5xl font-light text-[#555] mb-10"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-easing="ease-out-quart"
        >
          Amenities.
        </h2>

        {/* TOP LINE */}
        <div className="h-px bg-[#9c8f7a]/60" />

        {/* SLIDER */}
        <div className="relative w-full">
          {/* SLIDER WRAPPER */}
          <div className="amenities-slider-wrapper overflow-hidden w-full">
            <div 
              className="amenities-slider flex gap-0"
              ref={sliderRef}
              style={{ scrollBehavior: 'auto' }}
            >
{amenities.map((item, index) => (
  <div
    key={index}
    className={`
      flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[25vw]
      ${index !== amenities.length - 1 ? "border-r border-[#9c8f7a]/60" : ""}
    `}
  >

                {/* IMAGE */}
                <div className="relative h-[360px] mx-4 my-4 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* LABEL */}
                <p className="text-sm text-[#555] font-light px-4 pb-6">
                  {item.title}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>

        {/* BOTTOM LINE */}
        <div className="h-px bg-[#9c8f7a]/60" />

        
      </div>
    </section>
  );
}

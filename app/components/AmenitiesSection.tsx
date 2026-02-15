"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import { useIsMobile } from "../hooks";

const amenities = [
  { title: "Spa", image: "/images/spareal.png" },
  { title: "Yoga Deck", image: "/images/spa.png" },
  { title: "Village Tea Shop", image: "/images/yoga-deck.png" },
  { title: "Mini Golf court", image: "/images/tea-shop.png" },
  { title: "Multicuisine Restaurant", image: "/images/restaurant.png" },
];

export default function AmenitiesSection() {
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Horizontal scroll hijacking
  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const slider = sliderRef.current;
    if (!section || !slider) return;

    let hasInitializedScrollPosition = false;
    let currentIndex = 0;
    let isAnimating = false;
    let lastScrollTime = 0;

    const getItemWidth = () => {
      const firstItem = slider.querySelector('div');
      return firstItem ? firstItem.offsetWidth : 0;
    };

    const scrollToIndex = (index: number) => {
      const itemWidth = getItemWidth();
      const targetScroll = index * itemWidth;
      
      slider.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      
      isAnimating = true;
      setTimeout(() => {
        isAnimating = false;
      }, 600);
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Debounce: ignore events that come too quickly (within 400ms)
      if (now - lastScrollTime < 400) {
        e.preventDefault();
        return;
      }

      if (isAnimating) {
        e.preventDefault();
        return;
      }

      const rect = section.getBoundingClientRect();
      
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const viewportHeight = window.innerHeight;
      
      const isActive = sectionTop < viewportHeight * 0.8 && sectionBottom > viewportHeight * 0.2;
      
      if (!isActive) {
        hasInitializedScrollPosition = false;
        return;
      }

      const maxIndex = amenities.length - 1;
      
      // Initialize scroll position based on scroll direction when entering section
      if (!hasInitializedScrollPosition) {
        if (e.deltaY < 0) {
          currentIndex = maxIndex;
          scrollToIndex(currentIndex);
        } else {
          currentIndex = 0;
          scrollToIndex(currentIndex);
        }
        hasInitializedScrollPosition = true;
        lastScrollTime = now;
        e.preventDefault();
        return;
      }

      const isAtEnd = currentIndex >= maxIndex;
      const isAtStart = currentIndex <= 0;

      // Scrolling down (next image)
      if (e.deltaY > 0) {
        if (!isAtEnd) {
          e.preventDefault();
          e.stopPropagation();
          lastScrollTime = now;
          currentIndex++;
          scrollToIndex(currentIndex);
        } else {
          hasInitializedScrollPosition = false;
        }
      }
      // Scrolling up (previous image)
      else if (e.deltaY < 0) {
        if (!isAtStart) {
          e.preventDefault();
          e.stopPropagation();
          lastScrollTime = now;
          currentIndex--;
          scrollToIndex(currentIndex);
        } else {
          hasInitializedScrollPosition = false;
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      document.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, [isMobile]);
  if (isMobile) return null;

  return (
    <section className="bg-[#f6f3ee] py-10" ref={sectionRef}>
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
        <div 
          className="flex overflow-x-auto scrollbar-hide amenities-slider gap-0"
          ref={sliderRef}
          style={{ scrollBehavior: 'auto' }}
        >
          {amenities.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[22vw] border-r border-[#9c8f7a]/60"
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

      {/* BOTTOM LINE */}
      <div className="h-px bg-[#9c8f7a]/60" />
    </section>
  );
}

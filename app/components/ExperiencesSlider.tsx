"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useIsMobile } from "../hooks";

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

  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

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
      const firstItem = slider.querySelector('.experience-card') as HTMLElement;
      return firstItem ? firstItem.offsetWidth : 280;
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

      const maxIndex = experiences.length - 1;
      
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

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="experience-container">
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

        {/* SLIDER */}
        <div
          className="experience-slider"
          ref={sliderRef}
          data-aos="fade-up"
          data-aos-duration="1400"
          data-aos-delay="400"
          data-aos-easing="ease-out-quart"
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

        {/* ARROWS */}
        {!isMobile && (
          <div 
            className="experience-arrows flex items-center gap-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="600"
            data-aos-easing="ease-out-quart"
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

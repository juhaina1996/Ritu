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

// duplicate for circular effect
const loopItems = [...experiences, ...experiences];

export default function ExperiencesSlider() {
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const scrollSpeed = 0.5; // 👈 control speed here

  const startAutoScroll = () => {
    if (isMobile) return;

    const step = () => {
      if (!sliderRef.current) return;

      sliderRef.current.scrollLeft += scrollSpeed;

      // reset scroll for seamless loop
      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth / 2) {
        sliderRef.current.scrollLeft = 0;
      }

      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const stopAutoScroll = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    return () => stopAutoScroll();
  }, []);

  return (
    <section className="experience-section">
      <div className="experience-container">
        {/* Header */}
        <div className="experience-header">
          <h2 className="experience-header-one">
            <span className="italic">Ex</span>periences.
          </h2>
          <p className="discover italic">
            DISCOVER SENSORY NATURE FILLED ESCAPES IN WAYANAD
          </p>
        </div>

        {/* SLIDER */}
        <div
          className="experience-slider"
          ref={sliderRef}
          onMouseEnter={startAutoScroll}
          onMouseLeave={stopAutoScroll}
        >
          {loopItems.map((item, index) => (
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
          <div className="experience-arrows flex items-center gap-6">
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

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


  if (isMobile) return null;

  return (
    <section className="bg-[#f6f3ee] py-10 pt-[200px]" ref={sectionRef}>
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
          className="flex overflow-x-auto scrollbar-hide amenities-slider gap-0 justify-center "
          ref={sliderRef}
          style={{ scrollBehavior: 'auto' }}
        >
{amenities.map((item, index) => (
  <div
    key={index}
    className={`
      flex-shrink-0 w-[80vw] sm:w-[50vw] md:w-[19vw]
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

      {/* BOTTOM LINE */}
      <div className="h-px bg-[#9c8f7a]/60" />
    </section>
  );
}

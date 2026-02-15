"use client";

import Image from "next/image";
import { useIsMobile } from "../hooks";

const amenities = [
  { title: "Spa", image: "/images/spareal.png" },
  { title: "Yoga Deck", image: "/images/spa.png" },
  { title: "Village Tea Shop", image: "/images/yoga-deck.png" },
  { title: "Mini Golf Court", image: "/images/tea-shop.png" },
  { title: "Multicuisine Restaurant", image: "/images/restaurant.png" },
];

export default function AmenitiesMobile() {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  return (
    <section className="bg-[#f6f3ee] px-4 py-10">
      <h2 className="text-3xl font-light text-[#555] mb-6">
        Amenities.
      </h2>

      {/* TOP DIVIDER */}
      <div className="grid grid-cols-[16px_1px_120px_1px_1fr]">
        <div />
        <div className="bg-[#9c8f7a]/60" />
        <div className="h-px bg-[#9c8f7a]/60 col-span-3" />
      </div>

      {amenities.map((item, index) => (
        <div key={index}>
          {/* ROW */}
          <div >
            <div className="ml-5 grid grid-cols-[16px_1px_120px_1px_1fr] gap-3">
              
              {/* LEFT GUTTER */}
              <div />

              {/* LEFT VERTICAL LINE */}
              <div className="bg-[#9c8f7a]/60" />

              {/* IMAGE */}
              <div className="relative h-[226px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover image-ameneties"
                />
              </div>

              {/* CENTER VERTICAL LINE */}
              <div className="bg-[#9c8f7a]/60" />

              {/* TEXT */}
              <p className="text-sm font-light text-[#555] mt-1">
                {item.title}
              </p>
            </div>
          </div>

          {/* BOTTOM DIVIDER */}
          <div className="grid grid-cols-[16px_1px_120px_1px_1fr]">
            <div />
            <div className="bg-[#9c8f7a]/60" />
            <div className="h-px bg-[#9c8f7a]/60 col-span-3" />
          </div>
        </div>
      ))}
    </section>
  );
}

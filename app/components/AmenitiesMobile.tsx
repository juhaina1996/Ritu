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
    <section className="bg-[#f6f3ee] py-10">
      {/* TITLE */}
      <h2 className="text-3xl font-light text-[#555] px-4 pl-10">
        Amenities.
      </h2>

      {/* TOP FULL WIDTH LINE */}
      <div className="h-px bg-[#9c8f7a]/60 w-full" />

      {amenities.map((item, index) => (
        <div key={index}>
          {/* ROW */}
          <div className="grid grid-cols-[16px_1px_120px_1px_1fr] gap-3">
            {/* LEFT GUTTER */}
            <div />

            {/* LEFT VERTICAL LINE */}
            <div className="bg-[#9c8f7a]/60" />

            {/* IMAGE */}
            <div className="relative h-[226px] mt-[10px] mb-[10px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* CENTER VERTICAL LINE */}
            <div className="bg-[#9c8f7a]/60" />

            {/* TEXT */}
            <p className="text-sm font-light text-[#555] mt-1">
              {item.title}
            </p>
          </div>

          {/* BOTTOM FULL WIDTH LINE */}
          <div className="h-px bg-[#9c8f7a]/60 w-full" />
        </div>
      ))}
    </section>
  );
}

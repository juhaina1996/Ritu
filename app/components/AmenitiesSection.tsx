"use client";

import Image from "next/image";

const amenities = [
  { title: "Spa", image: "/images/spareal.png" },
  { title: "Yoga Deck", image: "/images/spa.png" },
  { title: "Village Tea Shop", image: "/images/yoga-deck.png" },
  { title: "Mini Golf court", image: "/images/tea-shop.png" },
  { title: "Multicuisine Restaurant", image: "/images/restaurant.png" },
];

// duplicate for seamless loop
const loopItems = [...amenities, ...amenities];

export default function AmenitiesSection() {
  return (
    <section className="bg-[#f6f3ee] py-20 overflow-hidden">
      {/* Heading */}
      <h2 className="text-center text-4xl md:text-5xl font-light text-[#555] mb-10">
        Amenities.
      </h2>

      {/* TOP LINE */}
      <div className="h-px bg-[#9c8f7a]/60" />

      {/* SLIDER */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-amenities-scroll">
          {loopItems.map((item, index) => (
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

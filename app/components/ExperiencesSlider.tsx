"use client";

import { useRef } from "react";
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

  const scroll = (dir: "left" | "right") => {
    sliderRef.current?.scrollBy({
      left: dir === "right" ? 280 : -280,
      behavior: "smooth",
    });
  };

  return (
    <section className="experience-section">
      <div className="experience-section-logo absolute  pointer-events-none">
        <Image
          src="/images/backgroundRight.svg"
          alt="Logo Background"
          width={400}
          height={200}
          className="object-contain"
          priority
        />
      </div>
      <div className="experience-container">
        {/* Header */}
        <div className="experience-header">
          {!isMobile && (
            <h2
              className="experience-header-one"
              data-aos="slide-up-dramatic"
              data-aos-duration="1800"
              data-aos-delay="200"
              data-aos-easing="ease-out-back"
            >
              <span className="italic">Ex</span>periences.
            </h2>
          )}
          {isMobile && (
            <h2
              className="experience-header-one"
              data-aos="slide-up-dramatic"
              data-aos-duration="1800"
              data-aos-delay="200"
              data-aos-easing="ease-out-back"
            >
              <span className="italic">Ex</span>periences.
            </h2>
          )}

          {/* Arrows EXACT POSITION */}

          <p
            className="discover italic"
            data-aos="wave-in"
            data-aos-duration="1600"
            data-aos-delay="500"
            data-aos-easing="ease-out-quart"
          >
            DISCOVER SENSORY NATURE FILLED ESCAPES IN WAYANAD
          </p>
        </div>

        {/* Slider */}
        <div className="experience-slider" ref={sliderRef}>
          {experiences.map((item, index) => (
            <div
              className="experience-card"
              key={index}
              data-aos="bounce-in"
              data-aos-duration="1500"
              data-aos-delay={800 + index * 150}
              data-aos-easing="ease-out-elastic"
            >
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
      <div className="experience-arrows flex items-center gap-6">
        {/* LEFT ARROW → expand to LEFT */}
        <button onClick={() => scroll("left")} className="group">
          <Image
            src="/images/arrowLeft.svg"
            alt="Previous"
            width={38}
            height={15}
            className="
        transition-transform duration-300 ease-out
        group-hover:scale-x-125
        origin-right
      "
          />
        </button>

        {/* RIGHT ARROW → expand to RIGHT */}
        <button onClick={() => scroll("right")} className="group">
          <Image
            src="/images/arrowRight.svg"
            alt="Next"
            width={38}
            height={15}
            className="
        transition-transform duration-300 ease-out
        group-hover:scale-x-125
        origin-left
      "
          />
        </button>
      </div>
    </section>
  );
}

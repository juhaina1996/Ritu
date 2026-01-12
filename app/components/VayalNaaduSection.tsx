import Image from "next/image";
import { useIsMobile } from "../hooks/useIsMobile";

export default function VayalNaaduSection() {
  const isMobile = useIsMobile();

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* TOP CONTENT */}
        <div className="grid">
          {/* Heading */}
          <h2
            className="reminising text-3xl md:text-4xl font-light italic text-gray-700 leading-snug"
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="200"
            data-aos-easing="ease-out-quart"
          >
            Reminiscing the Glory of <br />
            <span className="italic font-normal tracking-wide">
              VAYAL NAADU
            </span>
          </h2>

          {/* Description */}
          <p
            className="reminising-sub text-sm text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-duration="1600"
            data-aos-delay="400"
            data-aos-easing="ease-out-quart"
          >
            In the heart of Wayanad, a land that resonates with the legacy of
            agriculture, our farm resort stands as a living tribute to the
            region's enduring farming culture. Just as the name "Wayanad" is
            derived from "Vayal naadu," signifying the land of fields, we
            embrace this legacy by offering you an immersive experiential
            farming journey. Nestled in the beauty of Vaduvanchal, our expansive
            4.5-acre haven invites you to immerse yourself in nature's soothing
            arms. Amid lush landscapes, Ritu showcases one acre of land
            exclusively dedicated to experiential farming.
          </p>
        </div>

        {/* MAIN IMAGE */}
        <div
          className={`relative w-full ${
            isMobile ? "h-[130px] mb-[1px]" : "h-[250px] mb-1"
          }`}
        >
          <Image
            src="/images/image1.png"
            alt="Vayal Naadu landscape"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* IMAGE GRID */}
        <div className={`grid grid-cols-3 ${isMobile ? "gap-[1px]" : "gap-1"}`}>
          <div className={`relative ${isMobile ? "h-[200px]" : "h-[360px]"}`}>
            <Image
              src="/images/image2.png"
              alt="Forest view"
              fill
              className="object-cover"
            />
          </div>

          <div className={`relative ${isMobile ? "h-[200px]" : "h-[360px]"}`}>
            <Image
              src="/images/image3.png"
              alt="Farm house"
              fill
              className="object-cover"
            />
          </div>

          <div className={`relative ${isMobile ? "h-[200px]" : "h-[360px]"}`}>
            <Image
              src="/images/image4.png"
              alt="Waterfall"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { useIsMobile } from "../hooks";

export default function HeroSection() {
  const isMobile = useIsMobile();

  return (
    <section className="bg-[#F2F0ED] py-20 text-center h-[100vh]">
      <p className="tracking-widest">Exclusive Partners Circle</p>

      <Image
        src="/images/lineBorder.svg"
        alt="divider"
        width={270}
        height={20}
        className="divider-image-schedule-call mx-auto"
      />

      <h1 className="mt-4 text-4xl md:text-5xl reserve-your">
        Reserve Your Place in <br />
        <span className="italic text-[#A29279]">Ritu’s Legacy</span>
      </h1>

      {!isMobile && (
        <p className="mt-6 max-w-2xl mx-auto join-exclusive">
          Join the exclusive community of 94 founding partners and secure
          lifetime
          <br /> privileges across Ritu’s luxury portfolio launching in 2028.
        </p>
      )}
      {isMobile && (
        <p className="mt-6 max-w-2xl mx-auto join-exclusive">
          Join the exclusive community of 94 founding partners and secure <br />{" "}
          lifetime privileges across Ritu’s luxury portfolio launching in 2028.
        </p>
      )}

      <div className="coowner-wrapper">
        <div className="coowner-glow-border" />
        <div className="coowner-content">
          <span className="coowner-dot" />
          <span className="coowner-text">Only 72 co-owner slots remaining</span>
        </div>
      </div>
    </section>
  );
}

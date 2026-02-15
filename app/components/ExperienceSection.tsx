import Image from "next/image";
import { useIsMobile } from "../hooks";

interface ExperienceSectionProps {
  onOpenBrochure?: () => void;
}

export default function ExperienceSection({ onOpenBrochure }: ExperienceSectionProps) {
    const isMobile = useIsMobile();
  
  return (
    <>
      {/* MOBILE TITLE */}
      <h2 className="where-experince-mob text-3xl md:text-5xl font-light mb-4">
        Where Experiences Redefine Your Stay
      </h2>

      <p className="immerse-mob text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10">
        Immerse yourself in a sanctuary where opulent accommodations seamlessly
        blend with the surrounding farmland, ensuring an extraordinary and
        enchanting experience for each and every guest.
      </p>

      <section className="main relative min-h-screen flex flex-col">
        {/* LOGO BACKGROUND */}
        <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
          <Image
            src="/images/logo-background.svg"
            alt="Logo Background"
            width={600}
            height={300}
            className="opacity-10"
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="experince-sub z-10 px-6 md:px-16 text-center text-white">
          <h2 className="where-experince text-3xl md:text-5xl font-light mb-4">
            Where Experiences Redefine Your Stay
          </h2>

          <p className="immerse text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-6">
            Immerse yourself in a sanctuary where opulent accommodations
            seamlessly blend with the surrounding farmland, ensuring an
            extraordinary and enchanting experience for each and every guest.
          </p>

          {/* IMAGE */}
          <Image
            src="/images/experinceImage.svg"
            alt="Resort Experience"
            width={1200}
            height={500}
            className="w-full mx-auto h-[50vh] object-cover experince-main-image"
          />

          {/* ✅ BOTTOM BAR */}
        {!isMobile&&  <div className="mt-3 flex items-center justify-between text-white">
            <span className="text-sm opacity-80">
              Ritu, Wayanad
            </span>

            <button 
              onClick={onOpenBrochure}
              className="experience-download flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-sm hover:bg-white/20 transition cursor-pointer"
            >
              Download Brochure
              <span   className=" bg-green-500 w-8 h-8 rounded-full flex items-center justify-center
    flex h-7 w-7 items-center justify-center
    rounded-full
   
    transition-transform
    group-hover:translate-x-0.5
    animate-pulse-horizontal
  ">
                <Image
                              src="/images/arrowIconButton.svg"
                              alt="Arrow"
                              width={24}
                              height={24}
                              className="object-contain"
                            />
              </span>
            </button>
          </div>}
        </div>
      </section>
    </>
  );
}

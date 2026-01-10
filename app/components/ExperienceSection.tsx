import Image from "next/image";

export default function ExperienceSection() {
  return (
    <>
     <h2 className="where-experince-mob text-3xl md:text-5xl font-light mb-4">
          Where Experiences Redefine Your Stay
        </h2>

        {/* Subtitle */}
        <p className="immerse-mob text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10">
          Immerse yourself in a sanctuary where opulent accommodations
          seamlessly blend with the surrounding farmland, ensuring an
          extraordinary and enchanting experience for each and every guest.
        </p>
         <section className="main relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* LOGO BACKGROUND */}
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 z-0 pointer-events-none">
        <Image
          src="/images/logo-background.svg"
          alt="Logo Background"
          width={600}
          height={300}
          className="opacity-10 object-contain"
          priority
        />
      </div>

      {/* CONTENT */}
      <div className="experince-sub relative z-10 px-6 md:px-16 text-center text-white">

        {/* Heading */}
        <h2 className="where-experince text-3xl md:text-5xl font-light mb-4">
          Where Experiences Redefine Your Stay
        </h2>

        {/* Subtitle */}
        <p className="immerse text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10">
          Immerse yourself in a sanctuary where opulent accommodations
          seamlessly blend with the surrounding farmland, ensuring an
          extraordinary and enchanting experience for each and every guest.
        </p>

        {/* IMAGE FRAME */}
        <div className="relative mx-auto">
          <Image
            src="/images/experienceMain.svg"
            alt="Resort Experience"
            width={1200}
            height={500}
            className="w-full h-auto max-h-[66vh] object-contain mx-auto"
          />
        </div>
      </div>
    </section>
    </>
   
  );
}

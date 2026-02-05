import Image from "next/image";

export default function ExperienceSection() {
  return (
    <>
      <h2
        className="where-experince-mob text-3xl md:text-5xl font-light mb-4"
        data-aos="fade-up"
      >
        Where Experiences Redefine Your Stay
      </h2>

      <p
        className="immerse-mob text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Immerse yourself in a sanctuary where opulent accommodations seamlessly
        blend with the surrounding farmland, ensuring an extraordinary and
        enchanting experience for each and every guest.
      </p>

      <section className="main relative min-h-[90vh] flex flex-col items-start justify-start">
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
        <div className="experince-sub z-10 px-6 md:px-16 text-center text-white">
          <h2
            className="where-experince text-3xl md:text-5xl font-light mb-4"
            data-aos="fade-up"
          >
            Where Experiences Redefine Your Stay
          </h2>

          <p
            className="immerse text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Immerse yourself in a sanctuary where opulent accommodations
            seamlessly blend with the surrounding farmland, ensuring an
            extraordinary and enchanting experience for each and every guest.
          </p>

          {/* IMAGE FRAME */}
          <Image
            src="/images/experinceImage.svg"
            alt="Resort Experience"
            width={1200}
            height={500}
            className="experience-image-sub w-full mx-auto h-[60vh] object-cover"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="900"
          />
        </div>
      </section>
    </>
  );
}

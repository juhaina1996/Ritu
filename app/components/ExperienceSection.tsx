import Image from "next/image";

export default function ExperienceSection() {
  return (
    <>
     <h2 
          className="where-experince-mob text-2xl md:text-4xl font-light mb-4 pt-11"
          data-aos="wave-in"
          data-aos-duration="1800"
          data-aos-delay="300"
          data-aos-easing="ease-out-quart"
        >
          Where Experiences Redefine Your Stay
        </h2>

        {/* Subtitle */}
        <p 
          className="immerse-mob text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10"
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-delay="600"
          data-aos-easing="ease-out-expo"
        >
          Immerse yourself in a sanctuary where opulent accommodations
          seamlessly blend with the surrounding farmland, ensuring an
          extraordinary and enchanting experience for each and every guest.
        </p>
         <section className=" main relative py-20 flex justify-center overflow-hidden">
      
      {/* LOGO BACKGROUND – FREE FLOATING */}
<div className="absolute left-[-60px] top-[18%] -translate-y-1/2 z-10 pointer-events-none">
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
      <div className="experince-sub relative z-10 max-w-6xl px-16 text-center text-white">
        {/* Heading */}
        <h2 
          className="where-experince text-2xl md:text-4xl font-light mb-4 pt-11"
          data-aos="wave-in"
          data-aos-duration="1800"
          data-aos-delay="300"
          data-aos-easing="ease-out-quart"
        >
          Where Experiences Redefine Your Stay
        </h2>

        {/* Subtitle */}
        <p 
          className="immerse text-sm md:text-base text-white/80 max-w-3xl mx-auto mb-10"
          data-aos="fade-up"
          data-aos-duration="1600"
          data-aos-delay="600"
          data-aos-easing="ease-out-expo"
        >
          Immerse yourself in a sanctuary where opulent accommodations
          seamlessly blend with the surrounding farmland, ensuring an
          extraordinary and enchanting experience for each and every guest.
        </p>

        {/* IMAGE FRAME */}
        <div className="relative mx-auto max-w-5xl">
          {/* Frame */}
          <div className="absolute inset-0 -z-10" />

          {/* Main Image */}
          <Image
            src="/images/experience.png"
            alt="Resort Experience"
            width={1200}
            height={700}
            className=" h-auto object-cover"
            data-aos="flip-in"
            data-aos-duration="2000"
            data-aos-delay="900"
            data-aos-easing="ease-out-back"
          />
        </div>
      </div>
    </section>
    </>
   
  );
}

import Image from "next/image";

export default function CoOwnSection({ onOpenBrochure }) {
  return (
    <section className="coown-section w-full bg-[#f6f3ee] p-[20px] lg:py-20 relative overflow-hidden pb-60 px-10 lg:px-26 ">
      {/* TOP WATERMARK */}
      <div className="co-own-back absolute top-[40px] left-[40px] z-0 pointer-events-none hidden md:block">
        <Image
          src="/images/logoBackground.png"
          alt=""
          width={420}
          height={220}
          className=""
          priority
        />
      </div>

      {/* BOTTOM WATERMARK */}
      <div className="co-own-back absolute bottom-[-220px] right-[40px] z-0 pointer-events-none hidden md:block">
        <Image
          src="/images/backgroundRight.svg"
          alt=""
          width={420}
          height={220}
          className=""
        />
      </div>
      {/* Heading */}
      <h2
        className="reminising text-3xl md:text-4xl font-light italic text-gray-700 leading-snug mb-4"
        data-aos="fade-up"
        data-aos-duration="1800"
        data-aos-delay="200"
        data-aos-easing="ease-out-quart"
      >
        <span className="co-own-text">
          Co-Own the <br />
        </span>

        <span className="not-italic font-normal tracking-wide">
          Crown Jewel of WAYANAD
        </span>
      </h2>
      {/* CONTENT */}
      <div className="coown-grid grid grid-cols-2 md:grid-cols-4 gap-6 z-100 relative">
        {/* ROW 1 */}
        <div
          className="border border-[#bdb4a7] p-2 h-[175px] lg:min-h-[280px] flex flex-col justify-between"
          data-aos="bounce-in"
          data-aos-duration="1500"
          data-aos-delay="900"
          data-aos-easing="ease-out-elastic"
        >
          <div className="land text-4xl text-[#1A6A6D] font-light">
            4.5 Acres
          </div>
          <p className="text-sm text-[#1A6A6D]">Total Area</p>
        </div>

        <div
          className="border border-[#bdb4a7] p-2 h-[175px] lg:min-h-[280px] flex flex-col justify-between"
          data-aos="flip-in"
          data-aos-duration="1600"
          data-aos-delay="900"
          data-aos-easing="ease-out-back"
        >
          <div className="land text-4xl text-[#1A6A6D] font-light">1 Acre</div>
          <p className="text-sm text-[#1A6A6D]">Farmland</p>
        </div>

        <div
          className="border border-[#bdb4a7] p-2 h-[175px] lg:min-h-[280px] flex flex-col justify-between"
          data-aos="slide-up-dramatic"
          data-aos-duration="1700"
          data-aos-delay="900"
          data-aos-easing="ease-out-quart"
        >
          <div className="land text-4xl text-[#1A6A6D] font-light">57</div>
          <p className="text-sm text-[#1A6A6D]">Keys</p>
        </div>

        {/* EMPTY SLOT – TOP RIGHT */}
        <div className="hidden md:block"></div>

        {/* ROW 2 */}
        <div
          className="border border-[#bdb4a7] p-2 h-[175px] lg:min-h-[280px] flex flex-col justify-between"
          data-aos="zoom-in-right"
          data-aos-duration="1800"
          data-aos-delay="900"
          data-aos-easing="ease-out-expo"
        >
          <div className="land text-4xl text-[#1A6A6D] font-light">70</div>
          <p className="text-sm text-[#1A6A6D]">Rooms</p>
        </div>

        {/* EMPTY SLOT – CENTER */}
        <div className="hidden md:block"></div>

        <div
          className="border border-[#bdb4a7] p-2 h-[175px] lg:min-h-[280px] flex flex-col justify-between"
          data-aos="zoom-in-right"
          data-aos-duration="2000"
          data-aos-delay="900"
          data-aos-easing="ease-out-expo"
        >
          <div className="land text-4xl text-[#1A6A6D] font-light">20+</div>
          <p className="text-sm text-[#1A6A6D]">Amenities</p>
        </div>

        <div
          className="border border-[#bdb4a7] p-2 h-[175px] md:h-[280px] flex flex-col justify-between"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="900"
          data-aos-easing="ease-out-quart"
        >
          <p className="be-a-proud text-[#1A6A6D] leading-relaxed">
            Be a proud owner <br />
            of Wayanad&apos;s next <br />
            Legacy
          </p>

          <button 
            onClick={onOpenBrochure}
            className="download mt-6 cursor-pointer inline-flex items-center gap-3 bg-[#1A6A6D] text-white px-6 py-3 rounded-sm w-fit hover:bg-[#275b5a] transition group"
          >
            Download Brochure
            <span className="flex items-center justify-center rounded-full">
              <Image
                src="/images/arrow-right.png"
                alt="Arrow"
                width={25}
                height={25}
                className="transform -rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0"
              />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

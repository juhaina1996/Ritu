import Image from "next/image";

export default function CoOwnSection() {
  return (
    <section className="w-full bg-[#f6f3ee] p-[20px] lg:py-20 relative overflow-hidden pb-60 px-10 lg:px-26 ">

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
      <div className="co-own-back absolute bottom-[-120px] right-[40px] z-0 pointer-events-none hidden md:block">
        <Image
          src="/images/logoBackground.png"
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
            Co-Own the <br />
            <span className="not-italic font-normal tracking-wide">
             Crown Jewel of WAYANAD
            </span>
          </h2>
      {/* CONTENT */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-6 z-100 relative">
  {/* ROW 1 */}
  <div className="border border-[#bdb4a7] p-6 h-[200px] lg:min-h-[280px] flex flex-col justify-between">
    <div className="land text-4xl text-[#2f6b6a] font-light">4.5 Acres</div>
    <p className="text-sm text-[#2f6b6a]">Total Area</p>
  </div>

  <div className="border border-[#bdb4a7] p-6 h-[200px] lg:min-h-[280px] flex flex-col justify-between">
    <div className="land text-4xl text-[#2f6b6a] font-light">1 Acre</div>
    <p className="text-sm text-[#2f6b6a]">Farmland</p>
  </div>

  <div className="border border-[#bdb4a7] p-6 h-[200px] lg:min-h-[280px] flex flex-col justify-between">
    <div className="land text-4xl text-[#2f6b6a] font-light">57</div>
    <p className="text-sm text-[#2f6b6a]">Keys</p>
  </div>

  {/* EMPTY SLOT – TOP RIGHT */}
  <div className="hidden md:block"></div>

  {/* ROW 2 */}
  <div className="border border-[#bdb4a7] p-6 h-[200px] lg:min-h-[280px] flex flex-col justify-between">
    <div className="land text-4xl text-[#2f6b6a] font-light">70</div>
    <p className="text-sm text-[#2f6b6a]">Rooms</p>
  </div>

  {/* EMPTY SLOT – CENTER */}
  <div className="hidden md:block"></div>

  <div className="border border-[#bdb4a7] p-6 h-[200px] lg:min-h-[280px] flex flex-col justify-between">
    <div className="land text-4xl text-[#2f6b6a] font-light">20+</div>
    <p className="text-sm text-[#2f6b6a]">Amenities</p>
  </div>

  <div className="border border-[#bdb4a7] p-6 h-[200px]   md:h-[280px] flex flex-col justify-between">
    <p className="be-a-proud text-[#2f6b6a] leading-relaxed">
      Be a proud owner <br />
      of Wayanad&apos;s next <br />
      Legacy
    </p>

    <button className="download mt-6 inline-flex items-center gap-3 bg-[#2f6b6a] text-white px-6 py-3 rounded-sm w-fit hover:bg-[#275b5a] transition">
      Download Brochure
      <span className="flex items-center justify-center rounded-full">
        <Image
          src="/images/arrow-right.png"
          alt="Arrow"
          width={22}
          height={22}
        />
      </span>
    </button>
  </div>

</div>

    </section>
  );
}

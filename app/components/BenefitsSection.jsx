import Image from "next/image";
import { Circle } from "lucide-react";

export default function BenefitsSection() {
  return (
    <section className="bg-[#f2f0ed] py-20 benefit-main">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2
          className="text-5xl life-time-benefit text-[#3F3428]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-out-quart"
        >
          Lifetime Benefits & Privileges
        </h2>

        <p
          className="mt-2 as-a-co-owner"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          data-aos-easing="ease-out-quart"
        >
          As a co-owner, you’ll enjoy unparalleled access and exclusive
          ownership benefits of the resort.
        </p>

        {/* Cards */}
        <div className="benefits-main mt-14 grid md:grid-cols-3 gap-15">
          {/* Card 1 */}
          <div
            className="bg-white border border-[#D8CFC3] rounded-2xl px-2 py-5 text-left relative"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
            data-aos-easing="ease-out-back"
          >
            {/* Icon */}
            <div className="absolute top-10 right-6">
              <Image
                src="/images/voucher-icon.svg"
                alt=""
                width={30}
                height={10}
                className="w-[30px] sm:w-[30px] max-sm:w-[18px]"
              />
            </div>

            <h3 className="life-time">
              Lifetime Vacation <br /> Vouchers
            </h3>

            <ul className="mt-4 space-y-4 text-[#3F3428] text-sm leading-relaxed points-benefits">
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>
                Vacation Voucher worth 1 to 3.5 Lakhs every year
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Vouchers are transferable and gift-able to immediate family,
                friends and business partners
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Fully flexible use of vouchers; can be used for booking
                accommodation, food & beverage, events and spa services
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div
            className="bg-white border border-[#D8CFC3] rounded-2xl px-2 py-5 text-left relative"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="600"
            data-aos-easing="ease-out-back"
          >
            <div className="absolute top-10 right-6">
              <Image
                src="/images/returns-icon.svg"
                alt=""
                width={28}
                height={26}
                className="w-[30px] sm:w-[30px] max-sm:w-[18px]"
              />
            </div>

            <h3 className="life-time">
              High Returns on Luxury <br /> Hospitality Real Estate
            </h3>

            <ul className="mt-6 space-y-4 text-[#3F3428] text-sm leading-relaxed points-benefits">
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Luxury hospitality real estate investment gives capital growth &
                better ROI
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Co-owners enjoy all appreciation of property including the
                running business
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>
                A 5-star resort having very high initial appreciation compared
                to other forms of real estate
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div
            className="bg-white border border-[#D8CFC3] rounded-2xl px-2 py-5 text-left relative"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="800"
            data-aos-easing="ease-out-back"
          >
            <div className="absolute top-10 right-6">
              <Image
                src="/images/concierge-icon.svg"
                alt=""
                width={16}
                height={34}
                className="concierge-icon"
              />
            </div>

            <h3 className="life-time">
              Dedicated <br /> Concierge Services
            </h3>

            <ul className="mt-6 space-y-4 text-[#3F3428] text-sm leading-relaxed points-benefits">
              <li className="flex gap-3">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Dedicated 24/7 member concierge
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Personal butler services
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Personal chef service
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">
                  <Circle
                    size={5}
                    fill="#8B6F47"
                    color="#8B6F47"
                    strokeWidth={0}
                    className="bullet-icon"
                  />
                </span>{" "}
                Luxury fleet pick-up and drop from Kozhikode & Kannur
                International Airport (once a year)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

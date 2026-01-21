import Image from "next/image";

export default function BenefitsSection() {
  return (
    <section className="bg-[#f2f0ed] py-20 benefit-main">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-5xl life-time-benefit text-[#3F3428]">
          Lifetime Benefits & Privileges
        </h2>

        <p className="mt-2 as-a-co-owner">
          As a co-owner, you’ll enjoy unparalleled access and exclusive ownership benefits of the resort.
        </p>

        {/* Cards */}
        <div className="benefits-main mt-14 grid md:grid-cols-3 gap-15">

          {/* Card 1 */}
          <div className="bg-white border border-[#D8CFC3] rounded-2xl px-2 py-5 text-left relative">

            {/* Icon */}
            <div className="absolute top-10 right-6">
              <Image src="/images/voucher-icon.svg" alt="" width={30} height={10} />
            </div>

            <h3 className="life-time">
              Lifetime Vacation <br /> Vouchers
            </h3>

            <ul className="mt-4 space-y-4 text-[#3F3428] text-sm leading-relaxed points-benefits">
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Vacation Voucher worth 1 to 3.5 Lakhs every year
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Vouchers are transferable and gift-able to immediate family, friends and business partners
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Fully flexible use of vouchers; can be used for booking accommodation, food & beverage, events and spa services
              </li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#D8CFC3] rounded-2xl px-2 py-5 text-left relative">

            <div className="absolute top-10 right-6">
              <Image src="/images/returns-icon.svg" alt="" width={28} height={26} />
            </div>

            <h3 className="life-time">
              High Returns on Luxury <br /> Hospitality Real Estate
            </h3>

            <ul className="mt-6 space-y-4 text-[#3F3428] text-sm leading-relaxed points-benefits">
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Luxury hospitality real estate investment gives capital growth & better ROI
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Co-owners enjoy all appreciation of property including the running business
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                A 5-star resort having very high initial appreciation compared to other forms of real estate
              </li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#D8CFC3] rounded-2xl px-2 py-5 text-left relative">

            <div className="absolute top-10 right-6">
              <Image src="/images/concierge-icon.svg" alt="" width={16} height={34} />
            </div>

            <h3 className="life-time">
              Dedicated <br /> Concierge Services
            </h3>

            <ul className="mt-6 space-y-4 text-[#3F3428] text-sm leading-relaxed points-benefits">
              <li className="flex gap-3">
                <span className="text-[#8B6F47]">•</span>
                Dedicated 24/7 member concierge
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Personal butler services
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Personal chef service
              </li>
              <li className="flex gap-3 mb-0">
                <span className="text-[#8B6F47]">•</span>
                Luxury fleet pick-up and drop from Kozhikode & Kannur International Airport (once a year)
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

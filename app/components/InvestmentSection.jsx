import { useRouter } from "next/navigation";
import { useIsMobile } from "../hooks";

export default function InvestmentSection() {
  const isMobile = useIsMobile();
  const router = useRouter();
  
  return (
    <section className="bg-[#f2f0ed] py-20 investment-section">
      <div className="investment-section-sub max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT CONTENT */}
        <div>
         <h2 className="exclusive-partner">
  <span className="italic">E</span>xclusive Partner Investment
</h2>
 {isMobile &&<p className="mt-6 one-time max-w-xl leading-relaxed">
            One-time investment that grants you fractional ownership of our
            property. Ownership remains with you lifetime until it is sold or
            transferred to nominees or legal heirs.
          </p>}
          <p className="mt-5 investment-starts">
            Investment starts from
          </p>

          <div className="price-main flex items-end gap-6 mt-2">
            <span className="price">
              ₹36,00,000
            </span>

            <span className="price-strike line-through opacity-70">
              ₹42,00,000
            </span>
          </div>

          {/* Save badge */}
         <div className="mt-4 save-with inline-block px-6 py-3 text-sm text-[#3F3428]">
   <span className="font-semibold">Save ₹6,00,000</span> with our early Phase 2 investor pricing
</div>


          {/* Description */}
          {!isMobile &&<p className="mt-6 one-time max-w-xl leading-relaxed">
            One-time investment that grants you fractional ownership of our
            property. Ownership remains with you lifetime until it is sold or
            transferred to nominees or legal heirs.
          </p>}

          {/* Bullet points */}
         {!isMobile&& <ul className="mt-6 text-gray-700">
            <li className="flex items-start gap-3 points">
              <span className="text-[#A29279] text-[18px]">●</span>
              Lifetime vacation vouchers worth 1 Lakh to 3.5 Lakhs every year
            </li>
            <li className="flex items-start gap-3 points">
              <span className="text-[#A29279] text-[18px]">●</span>
              Payback Period of 7 to 8 Years*
            </li>
          </ul>}
        </div>

       {/* RIGHT COLUMN */}
<div>

  {/* RIGHT CARD */}
  <div className="bg-white border border-[#D8CFC3] rounded-2xl p-8 shadow-sm payment-plan-main">

    <h3 className="payment-plan decoration-[#A29279] decoration-[0.6px] text-[#413529] underline underline-offset-1">
      Payment Plan
    </h3>

    {/* Inner Box */}
    <div className="mt-8 border border-[#D8CFC3] rounded-xl p-6">
      <h4 className="installment-option">
        Installment Option
      </h4>

      <ul className="mt-2 text-gray-600 text-sm leading-relaxed">
        <li className="flex items-start gap-3 installment-option-points">
          <span className="text-[#A29279] text-base">●</span>
          Only 25% down-payment required for securing your slot
        </li>
        <li className="flex items-start gap-3 installment-option-points">
          <span className="text-[#A29279] text-base">●</span>
Remaining amount can be comfortable paid over 2 year Monthly Payment Plan        </li>
        <li className="flex items-start gap-3 installment-option-points">
          <span className="text-[#A29279] text-base">●</span>
          No annual fees or hidden extra charges
        </li>
      </ul>
    </div>

    {/* Button */}
    <button 
      onClick={() => {
        const scheduleSection = document.getElementById('book-investment');
        if (scheduleSection) {
          scheduleSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
      className="consultation-button group w-full mt-6 bg-[#A29279] text-white py-7 rounded-xl tracking-wide hover:bg-[#8f7f6b] transition-all duration-300 flex items-center justify-center gap-3"
    >
      <span>SCHEDULE A CONSULTATION CALL</span>
      <svg 
        className="consultation-icon w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <svg 
        className="consultation-icon-hover w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  </div>

  {/* FOOTNOTE now sits directly under the card */}
  <p className="mt-4 text-xs text-gray-400 leading-relaxed market-conditions">
    *Market conditions play a vital role in the projection of financial statements.
    All projections are subject to change based on internal and external factors.
  </p>

</div>

      </div>

      {/* Footer note */}
     
    </section>
  );
}

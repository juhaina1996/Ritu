import Image from "next/image";
import { useIsMobile } from "../hooks";

export default function Footer({ onOpenScheduleCall }) {
  const isMobile = useIsMobile();

  return (
    <section className="w-full bg-[#2f2f2f] py-20">
      <div className="max-w-7xl mx-10 md:px-20">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between md:items-baseline mb-16">
          {/* Left */}
          <div className="lettakButton">
            <h2 className="lettalk text-4xl md:text-5xl font-light text-white mb-4">
              Let's talk
            </h2>

            <button 
              onClick={onOpenScheduleCall}
              className="inline-flex items-center gap-3 bg-[#3b3b3b] text-white px-5 py-2 rounded-full hover:bg-[#444] transition group"
            >
              <span className="text-sm">Schedule a Call</span>
              <span className="flex h-6 w-6 items-center justify-center animate-pulse-horizontal">
                <Image
                  src="/images/arrowIconButton.svg"
                  alt="Arrow"
                  width={25}
                  height={25}
                />
              </span>
            </button>
          </div>

          {/* Right Logo */}
          {!isMobile && (
            <div className="mt-10 md:mt-0">
              <Image
                src="/images/sz-developerImg.svg"
                alt="SZ Developers"
                width={167}
                height={70}
                className="object-contain mr-20"
              />
            </div>
          )}
        </div>

        {/* BOTTOM ROW */}
        <div className="bottom-row grid  grid-cols-2 md:grid-cols-3 gap-10 text-[#d6d6d6] text-sm mt-30">
          {/* Contact */}
          <div>
            <h5 className="text-white mb-3 contact">Contact</h5>
            <p className="contact-sub">+91 9539 00 33 06</p>
            <p className="contact-sub">info@szdevelopers.com</p>
          </div>

          {/* Social */}
          <div>
            <h5 className="text-white mb-3 contact">Social</h5>

            <div className="flex flex-col">
              <a 
                href="https://www.instagram.com/ritufarms?igsh=MTZ6MG01NG55ajZwbA=="
                target="_blank"
                rel="noopener noreferrer"
                className="contact-sub group cursor-pointer"
              >
                <span className="relative">
                  Instagram
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#A29279] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </a>

              <a 
                href="https://www.facebook.com/share/1AKkk3Xe7b/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-sub group cursor-pointer"
              >
                <span className="relative">
                  Facebook
                  <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-[#A29279] transition-all duration-300 ease-out group-hover:w-full"></span>
                </span>
              </a>
            </div>
          </div>

          {/* Visit */}
          {!isMobile && (
            <div>
              <h5 className="text-white mb-3 contact">Visit Us</h5>
              <p className="contact-sub">
                3rd Floor, Nechikkadan Tower, Mini Bypass Rd,
                <br /> near Swapna Nagari, Kozhikode, Kerala 673006
              </p>
            </div>
          )}
        </div>
        {isMobile && (
          <div className="mt-26 md:mt-0">
            <Image
              src="/images/sz-developerImg.svg"
              alt="SZ Developers"
              width={167}
              height={70}
              className="object-contain mx-auto"
            />
          </div>
        )}
        {isMobile && (
          <div className="contact-mob-div">
            {" "}
            <p className="contact-mob">
              3rd Floor, Nechikkadan Tower, Mini Bypass Rd, near Swapna Nagari,
              Kozhikode, Kerala 673006
            </p>
            <p className="contact-mob-sub">SZ Developers © 2026 </p>
            <p className="contact-mob-sub">All Rights Reserved</p>
          </div>
        )}
      </div>
    </section>
  );
}

import Image from "next/image";

export default function Footer() {
  return (
    <section className="w-full bg-[#2f2f2f] py-20">
      <div className="max-w-7xl mx-auto px-20">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16">
          {/* Left */}
          <div>
            <h2 
              className="lettalk text-4xl md:text-5xl font-light text-white mb-4"
              
            >
              Let's talk
            </h2>

            <button 
              className="inline-flex items-center gap-3 bg-[#3b3b3b] text-white px-5 py-2 rounded-full hover:bg-[#444] transition"
             
            >
              <span className="text-sm">Schedule a Call</span>
              <span className="flex h-6 w-6 items-center justify-center">
                <Image
                  src="/images/arrow.png"
                  alt="Arrow"
                  width={25}
                  height={25}
                />
              </span>
            </button>
          </div>

          {/* Right Logo */}
          <div 
            className="mt-10 md:mt-0"
           
          >
            <Image
              src="/images/developericon.png"
              alt="SZ Developers"
              width={167}
              height={70}
              className="object-contain mr-20"
            />
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-[#d6d6d6] text-sm mt-30">
          {/* Contact */}
          <div
            
          >
            <h5 className="text-white mb-3 contact">Contact</h5>
            <p className="contact-sub">+91 9539 00 33 06</p>
            <p className="contact-sub">info@szdevelopers.com</p>
          </div>

          {/* Social */}
          <div
           
          >
            <h5 className="text-white mb-3 contact">Social</h5>
            <p className="contact-sub">Instagram</p>
            <p className="contact-sub">Facebook</p>
          </div>

          {/* Visit */}
          <div
            
          >
            <h5 className="text-white mb-3 contact">Visit Us</h5>
            <p className="contact-sub">
              3rd Floor, Nechikkadan Tower, Mini Bypass Rd, near Swapna Nagari,
              Kozhikode, Kerala 673006
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
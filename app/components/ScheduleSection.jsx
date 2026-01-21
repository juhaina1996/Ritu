import ScheduleCall from "../components/ScheduleCall";

export default function ScheduleSection() {
  return (
    <section className="bg-[#f2f0ed] py-20 pt-0">
      <div className="max-w-4xl mx-auto text-center">
       <p className="consultation-top-title">
        BOOK YOUR INVESTMENT
      </p>

      {/* Main Heading */}
      <h2 className="consultation-heading">
        Schedule Your Private Consultation
      </h2>

      {/* Subtitle */}
      <p className="consultation-subtext">
        Meet with our investment consultants to explore the exclusive benefits and secure your co-ownership.
      </p>


      <ScheduleCall/>
      </div>
    </section>
  );
}

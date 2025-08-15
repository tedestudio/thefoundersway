import Image from "next/image";

export default function Sponsors() {
  const sponsors = [
    { src: "/Ellipse 1.svg", alt: "Sponsor 1" },
    { src: "/Ellipse 2.svg", alt: "Sponsor 2" },
    { src: "/Ellipse 3.svg", alt: "Sponsor 3" },
    // Empty slots for placeholders
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  return (
    <section className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Title Row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-black relative">
            SPONSORS
            <span className="absolute right-0 -bottom-2 w-1/2 border-b-2 border-black"></span>
          </h2>
          <a
            href="#"
            className="text-orange-500 text-sm font-medium"
          >
            {`{Become a Sponsor}`}
          </a>
        </div>

        {/* Logos */}
        <div className="flex items-center gap-6 flex-wrap">
          {sponsors.map((sponsor, idx) =>
            sponsor ? (
              <div key={idx} className="w-16 h-16 relative">
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                key={idx}
                className="w-16 h-16 bg-gray-300 rounded-full"
              ></div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
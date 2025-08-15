import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Subscribe Section */}
      <div className="w-[1200px] mx-auto rounded-[12px] pt-[21px] pr-[34px] pb-[10px] pl-[34px] gap-[10px] flex items-center bg-white opacity-100">
        <input
          type="email"
          placeholder="Enter your email..."
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-sm px-2 py-1"
        />
        <button className="text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-200">
          SUBSCRIBE
        </button>
      </div>

      {/* Footer Links */}
      <div className="max-w-[1510px] mx-auto flex flex-wrap justify-between px-[48px] py-8">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <Image
            src="/image 2.svg"
            alt="The Founder's Way Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-2 underline">Quick Links</h3>
          <ul className="space-y-1">
            {["About", "Agenda", "Investors", "Guests", "Team"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-2 underline">Legal</h3>
          <ul className="space-y-1">
            {[
              "Terms & Conditions",
              "Code of Conduct",
              "Privacy Policy",
              "Refunds & Returns",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Download */}
        <div>
          <h3 className="font-bold mb-2 underline">Download</h3>
          <ul className="space-y-1">
            {[
              "Download Brochure",
              "Download Agenda",
              "Download Investors' Deck",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-bold mb-2 underline">Social</h3>
          <div className="flex space-x-4 text-2xl">
            {[
              { href: "https://instagram.com", src: "/instagram.svg", alt: "Instagram" },
              { href: "https://linkedin.com", src: "/linkedin.svg", alt: "LinkedIn" },
              { href: "https://youtube.com", src: "/youtube.svg", alt: "YouTube" },
              { href: "https://twitter.com", src: "/twitter.svg", alt: "Twitter" },
            ].map(({ href, src, alt }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-all duration-200 ease-in-out"
              >
                <Image src={src} alt={alt} width={32} height={32} />
              </a>
            ))}
          </div>
        </div>
      </div> 

      {/* Copyright Section */}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-[1510px] mx-auto px-[48px] text-center md:text-right">
          <p className="text-[12px] leading-[100%] font-normal font-[Gellix]">
            © 2025 The Founder’s Way. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

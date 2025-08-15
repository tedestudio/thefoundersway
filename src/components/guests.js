export default function GuestsOfHonour() {
  return (
    <div className="bg-white text-black p-8">
      {/* Heading with underline */}
      <h2 className="text-2xl font-semibold mb-6">
        GUESTS <span className="pb-2 border-b-2 border-black">OF HONOUR</span>
      </h2>

      {/* All images in one row */}
      <div className="flex gap-6 pb-4">
        
        {/* Card 1 */}
        <div className="bg-gray-100 rounded-[24px] overflow-hidden w-[392px] h-[571px] flex-shrink-0 transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative">
          <div className="w-full h-full relative">
            <img
              src="/nara-lokesh.png"
              alt="Nara Lokesh"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 text-black">
              <h3 className="text-2xl font-bold">Nara Lokesh</h3>
              <p className="text-lg">Hon’ble Minister of HRT, IT, RTG</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-100 rounded-[24px] overflow-hidden w-[392px] h-[571px] flex-shrink-0 transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative">
          <div className="w-full h-full relative">
            <img
              src="/sri-bharat.png"
              alt="Sri Bharat Mathukumilli"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 text-black">
              <h3 className="text-2xl font-bold">Sri Bharat Mathukumilli</h3>
              <p className="text-lg">Hon’ble Member of Parliament, Visakhapatnam</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-gray-100 rounded-[24px] overflow-hidden w-[392px] h-[571px] flex-shrink-0 transform transition-all duration-500 hover:-translate-y-2 hover:scale-105 relative">
          <div className="w-full h-full relative">
            <img
              src="/pavan-guntupalli.png"
              alt="Pavan Guntupalli"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full p-6 text-black">
              <h3 className="text-2xl font-bold">Pavan Guntupalli</h3>
              <p className="text-lg">Founder, Rapido</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

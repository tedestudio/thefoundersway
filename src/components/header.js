
export default function AuditoriumImage() {
  return (
    <div className="w-full bg-white flex flex-col items-center px-4 pt-8">
      <div className="relative w-full max-w-[1438px]">
        <img
          src="/auditorium.svg"
          alt="Auditorium"
          className="w-full h-auto rounded-[2vw] object-cover shadow-lg"
        />

        <img
          src="/shoresimage.svg"
          alt="Shores"
          className="absolute left-0 w-full h-auto top-[95%] max-w-[80%]"
        />

        <img
          src="/logo.svg"
          alt="Logo"
          className="absolute top-[3%] left-[2%] w-[8%] md:w-[7%] h-auto"
        />

        <nav className="absolute top-[42px] left-[13.21%] w-[82.4%] 
                        bg-white px-8 py-4 rounded-3xl shadow-md 
                        flex items-center justify-between font-[Gellix]">
          <ul className="flex gap-x-10 text-2xl">
            <li><a href="#" className="text-black">About</a></li>
            <li><a href="#" className="text-black">Investors</a></li>
            <li><a href="#" className="text-black">Guests</a></li>
            <li><a href="#" className="text-black">Gallery</a></li>
            <li><a href="#" className="text-black">Team</a></li>
          </ul>

          <button className="bg-orange-500 px-6 font-[Gellix] py-2 rounded-md text-white hover:text-[#F15A29]">
            Register
          </button>
        </nav>
      </div>
    </div>
  );
}

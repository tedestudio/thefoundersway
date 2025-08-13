// components/ContactForm.jsx
export default function ContactForm() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between p-8 md:p-16 bg-white max-w-7xl mx-auto gap-12">
      {/* Left Column */}
      <div className="md:w-5/12 w-full text-center md:text-left flex flex-col justify-between min-h-[256px]">
        <div>
          <h2 className="text-4xl font-semibold text-gray-800">
            CONTACT <span className="relative">US
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-black"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-800 mt-4">event@thefoundersway.in</p>
        </div>

        {/* Grey placeholder box */}
        <div className="bg-[#D9D9D9] rounded-lg h-[120px] w-full"></div>
      </div>

      {/* Vertical Divider Image */}
      <div className="hidden md:flex flex-col items-center">
        <img
          src="/Vector%204.svg"
          alt="Divider"
          className="h-64 object-contain"
        />
      </div>

      {/* Right Column (Form) */}
      <div className="md:w-5/12 w-full">
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-800 border border-black border-b-4 border-l-4"
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-800 border border-black border-b-4 border-l-4"
          />
          <textarea
            rows="5"
            placeholder="Type your concern..."
            className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none text-gray-800 border border-black border-b-4 border-l-4"
          ></textarea>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-black border-2 border-black hover:bg-gray-100 transition-colors duration-200"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

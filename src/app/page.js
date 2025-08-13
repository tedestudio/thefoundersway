
import Header from "../components/Header";

export default function Homepage() {
  return (
    <div className="mt-[270px] flex items-start gap-8 px-[57px]">
       
      <div className="w-[1141px] h-[233px] font-[Gellix] font-normal text-[24px] leading-[150%] text-justify">
        
        <p >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut enim ligula...
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin 
        ut enim ligula... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut enim ligula.
    Ut quis nunc in dolor bibendum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Proin ut enim ligula. Ut quis nunc in dolor bibendum tincidunt bibendum sed nibh. 
    Vivamus ac diam non lorem euismod volutpat non at arcu. Integer a leo vitae ipsum rhoncus 
    placerat id a lacus. Donec a nisi elit. Maecenas posuere lacus eu posuere mollis.
    Suspendisse eget eleifend ligula, ac tincidunt nibh. Etiam ornare fermentum ex,
    sed sodales ante lacinia id. Nunc tristique id ante eu efficitur.
    Aliquam non massa a lorem egestas luctus. Suspendisse aliquam tristique erat,
    eu euismod ligula feugiat in
        </p>
        

<div className="mt-8 w-[237px] h-[70px] rounded-[12px] 
    border border-[#F15A29] flex items-center justify-center gap-[20px] 
    py-[24px] px-[32px] shadow-[-4px_4px_0px_0px_rgba(255,109,31,1)]">
  <button className="text-[#F15A29] font-[Gellix] text-[20px] leading-[24px]">
    Register
  </button>
</div>
<div>
        <img
          src="/arrow.svg"
          alt="Vector"
          className="w-[789.5px] h-[353.5px] rounded-[10px] top-[1669.5px] left-[33px]"
        />
      </div>
        
</div>
      
    <img
          src="/Rectangle 4.svg"
          alt="Host"
          className="w-[183px] h-[756px] rounded-[35px] object-cover top-[1187px]"
        />

<div className="absolute top-[1800px] left-[850px] w-[288.6px] h-[160.8px] 
  flex flex-col gap-[48px]">

  <button className="flex items-center gap-2 hover:text-orange-500">
    <img src="/arrowdown.svg" alt="Download" className="w-[21.6px] h-[21.6px]" />
    <span className="text-sm font-medium">Download Brochure</span>
  </button>

  <button className="flex items-center gap-2 hover:text-orange-500">
    <img src="/arrowdown.svg" alt="Download" className="w-[21.6px] h-[21.6px]" />
    <span className="text-sm font-medium">Download Agenda</span>
  </button>

  <button className="flex items-center gap-2 hover:text-orange-500">
    <img src="/arrowdown.svg" alt="Download" className="w-[21.6px] h-[21.6px]" />
    <span className="text-sm font-medium">Download Investor's Deck</span>
  </button>

</div>
   <div className="absolute left-0   w-[1512px] h-[301px] top-[2024px]"><img src="Frame 10.png" alt="Details"/></div>

    </div>
  );
}

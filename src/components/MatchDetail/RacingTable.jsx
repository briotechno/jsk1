import React, { useState } from "react";
import { FaLock, FaChevronDown } from "react-icons/fa";

const RacingTable = ({ runners, onBetClick = () => {} }) => {
  const [expandedRunners, setExpandedRunners] = useState({});

  const toggleRunner = (id) => {
    setExpandedRunners(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="bg-[#f2f2f2] rounded-sm overflow-hidden border border-gray-300">
      <div className="bg-[#055172] text-white text-[15px] font-bold px-2 py-1 flex justify-between items-center h-[23px]">
        <span>MATCH_ODDS</span>
      </div>
      
      {/* Table Header Row */}
      <div className="grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_80px_80px_80px_80px_80px_80px] text-center border-b border-[#c7c8ca] min-h-[32px] items-stretch">
        <div className="bg-gray-100 border-r border-[#c7c8ca] flex items-center px-2 text-[11px] font-bold text-[#055172]">Max: 1.00</div>
        
        {/* Mobile Headers */}
        <div className="md:hidden bg-[#72bbee] text-[#1b3f55] flex items-center justify-center border-r border-[#c7c8ca] py-[2px] text-[16px] font-bold uppercase">Back</div>
        <div className="md:hidden bg-[#f9a9ba] text-[#7b1c2e] flex items-center justify-center py-[2px] text-[16px] font-bold uppercase">Lay</div>

        {/* Desktop Headers */}
        <div className="hidden md:flex bg-white border-r border-[#eee]" />
        <div className="hidden md:flex bg-white border-r border-[#eee]" />
        <div className="hidden md:flex bg-[#72bbee] text-[#1b3f55] items-center justify-center border-r border-[#c7c8ca] py-[2px] text-[16px] font-bold uppercase">Back</div>
        <div className="hidden md:flex bg-[#f9a9ba] text-[#7b1c2e] items-center justify-center border-r border-[#eee] py-[2px] text-[16px] font-bold uppercase">Lay</div>
        <div className="hidden md:flex bg-white border-r border-[#eee]" />
        <div className="hidden md:flex bg-white" />
      </div>

      {/* Runners Rows */}
      {runners.map((r, i) => (
        <React.Fragment key={r.id}>
          <div className="grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_80px_80px_80px_80px_80px_80px] border-b border-[#c7c8ca] min-h-[44px] items-stretch bg-white relative">
            
            {r.isRemoved ? (
              <>
                {/* Mobile: Full Row Removed Message */}
                <div className="md:hidden col-span-3 bg-[#373636d6] backdrop-blur-xs text-white flex items-center justify-center text-[12px] font-bold h-[44px] relative">
                  <div className="flex items-center gap-2">
                    <FaLock className="text-white w-[12px] h-[12px]" />
                    <span>{r.name} - REMOVED - {r.percent}, {r.time}</span>
                  </div>
                </div>

                {/* Desktop: Keep Left Side ENABLED */}
                <div className="hidden md:flex items-center px-1 py-1 gap-1.5 border-r border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-center min-w-[24px]">
                     <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 accent-[#055172]" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-[14px] min-w-[24px] font-medium text-gray-800 leading-tight">
                    <span>{r.id}</span>
                    <span>({r.id})</span>
                  </div>
                  <div className="w-[30px] h-[30px] flex items-center justify-center shrink-0">
                    <img src="https://sitethemedata.com/race_icons/6017826176122/505140.png" className="w-full h-full rounded-full object-contain" alt="" />
                  </div>
                  <div className="flex flex-col ml-0.5">
                    <span className="text-[14px] font-bold text-black leading-[1.2]">{i + 1}. {r.name}</span>
                  </div>
                </div>
                <div className="hidden md:flex col-span-6 bg-[#373636d6] backdrop-blur-xs text-white items-center justify-center text-[12px] font-bold">
                  <div className="flex items-center gap-2">
                    <FaLock className="text-white w-[12px] h-[12px]" />
                    <span>REMOVED - {r.percent}, {r.time}</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center px-1 py-1 gap-1.5 border-r border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-center min-w-[18px] md:min-w-[24px]">
                    <input type="checkbox" className="w-3.5 h-3.5 border-gray-300 accent-[#055172]" />
                  </div>
                  <div className="flex flex-col items-center justify-center text-[12px] md:text-[14px] min-w-[18px] md:min-w-[24px] font-medium text-gray-400 leading-tight">
                    <span>{r.id}</span>
                    <span>({r.id})</span>
                  </div>
                  <div className="w-[26px] h-[26px] md:w-[30px] md:h-[30px] flex items-center justify-center shrink-0">
                    <img src="https://sitethemedata.com/race_icons/6017826176122/505140.png" className="w-full h-full rounded-full object-contain shadow-sm border border-gray-100" alt="" />
                  </div>
                  <div className="flex flex-col ml-0.5 overflow-hidden">
                    <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => toggleRunner(r.id)}>
                       <span className="text-[13px] md:text-[14px] font-bold text-black leading-tight truncate">{i + 1}. {r.name}</span>
                       <FaChevronDown className={`md:hidden shrink-0 w-2.5 h-2.5 text-gray-500 transition-transform ${expandedRunners[r.id] ? 'rotate-180' : ''}`} />
                    </div>
                    {/* Desktop Bio Info */}
                    <div className="hidden md:flex text-[10px] items-center leading-tight flex-wrap gap-x-2 mt-0.5">
                      <span className="bg-[#ddd] px-1.5 py-[1px] rounded-[2px] flex items-center gap-1">
                        <span className="text-[12px] font-bold text-gray-800">Jockey:</span>
                        <span className="text-[12px] font-semibold text-gray-600">{r.jockey}</span>
                      </span>
                      <span className="bg-[#ddd] px-1.5 py-[1px] rounded-[2px] flex items-center gap-1">
                        <span className="text-[12px] font-bold text-gray-800">Trainer:</span>
                        <span className="text-[12px] font-semibold text-gray-600">{r.trainer}</span>
                      </span>
                      <span className="bg-[#ddd] px-1.5 py-[1px] rounded-[2px] flex items-center gap-1">
                        <span className="text-[12px] font-bold text-gray-800">Age:</span>
                        <span className="text-[12px] font-semibold text-gray-600">{r.age}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Odds */}
                <div 
                  onClick={() => onBetClick(r.name, r.back[0].p, "back")}
                  className={`md:hidden relative flex flex-col items-center justify-center border-r border-[#c7c8ca] py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.back[0].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#72bbee]' : 'bg-[#72bbee]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#1b3f55]">{r.back[0].p}</span>
                  <span className="relative z-10 text-[14px] text-gray-600 mt-[2px]">{r.back[0].s}</span>
                </div>
                <div 
                  onClick={() => onBetClick(r.name, r.lay[0].p, "lay")}
                  className={`md:hidden relative flex flex-col items-center justify-center py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.lay[0].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#f9a9ba]' : 'bg-[#f9a9ba]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#7b1c2e]">{r.lay[0].p}</span>
                  <span className="relative z-10 text-[14px] text-pink-900 mt-[2px]">{r.lay[0].s}</span>
                </div>

                {/* Desktop Odds: 6 Columns */}
                <div 
                  onClick={() => onBetClick(r.name, r.back[2].p, "back")}
                  className={`hidden md:flex relative flex-col items-center justify-center border-r border-white/40 py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.back[2].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#cbdffa]' : 'bg-[#cbdffa]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#1b3f55]">{r.back[2].p}</span>
                  <span className="relative z-10 text-[14px] text-gray-600 mt-[-2px]">{r.back[2].s}</span>
                </div>
                <div 
                  onClick={() => onBetClick(r.name, r.back[1].p, "back")}
                  className={`hidden md:flex relative flex-col items-center justify-center border-r border-white/40 py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.back[1].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#a7d0fa]' : 'bg-[#a7d0fa]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#1b3f55]">{r.back[1].p}</span>
                  <span className="relative z-10 text-[14px] text-gray-600 mt-[2px]">{r.back[1].s}</span>
                </div>
                <div 
                  onClick={() => onBetClick(r.name, r.back[0].p, "back")}
                  className={`hidden md:flex relative flex-col items-center justify-center border-r border-[#c7c8ca] py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.back[0].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#72bbee]' : 'bg-[#72bbee]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#1b3f55]">{r.back[0].p}</span>
                  <span className="relative z-10 text-[14px] text-gray-600 mt-[2px]">{r.back[0].s}</span>
                </div>
                <div 
                  onClick={() => onBetClick(r.name, r.lay[0].p, "lay")}
                  className={`hidden md:flex relative flex-col items-center justify-center border-r border-white/40 py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.lay[0].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#f9a9ba]' : 'bg-[#f9a9ba]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#7b1c2e]">{r.lay[0].p}</span>
                  <span className="relative z-10 text-[14px] text-pink-900 mt-[2px]">{r.lay[0].s}</span>
                </div>
                <div 
                  onClick={() => onBetClick(r.name, r.lay[1].p, "lay")}
                  className={`hidden md:flex relative flex-col items-center justify-center border-r border-white/40 py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.lay[1].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#fbcdde]' : 'bg-[#fbcdde]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#7b1c2e]">{r.lay[1].p}</span>
                  <span className="relative z-10 text-[14px] text-pink-900 mt-[2px]">{r.lay[1].s}</span>
                </div>
                <div 
                  onClick={() => onBetClick(r.name, r.lay[2].p, "lay")}
                  className={`hidden md:flex relative flex-col items-center justify-center py-[2px] leading-none overflow-hidden cursor-pointer hover:brightness-95 transition-all ${r.lay[2].h ? 'after:absolute after:inset-0 after:bg-[#ffeb3b] after:animate-[blink_1s_infinite] bg-[#fde4f1]' : 'bg-[#fde4f1]'}`}
                >
                  <span className="relative z-10 text-[18px] font-bold text-[#7b1c2e]">{r.lay[2].p}</span>
                  <span className="relative z-10 text-[14px] text-pink-900 mt-[2px]">{r.lay[2].s}</span>
                </div>
              </>
            )}
          </div>
          
          {/* Mobile Expansion Block */}
          {expandedRunners[r.id] && (
            <div className="md:hidden bg-[#ddd] p-3 text-[14px] leading-loose flex flex-col border-b border-[#c7c8ca]">
              <div className="font-bold text-gray-800">Jockey: <span className="font-normal text-gray-600">{r.jockey}</span></div>
              <div className="font-bold text-gray-800">Trainer: <span className="font-normal text-gray-600">{r.trainer}</span></div>
              <div className="font-bold text-gray-800">Age: <span className="font-normal text-gray-600">{r.age}</span></div>
            </div>
          )}
        </React.Fragment>
      ))}

      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default RacingTable;

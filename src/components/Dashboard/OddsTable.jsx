import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { GiClubs } from "react-icons/gi";
import { LuTv, LuGamepad } from "react-icons/lu";

const OddsTable = ({ items }) => {
  const navigate = useNavigate();

  const getPrice = (item, idx, fallback = "-") => {
    const val = item.odds?.[idx];
    if (val === undefined || val === null) {
      return item.odds === undefined ? fallback : "-";
    }
    return (typeof val === 'object' && val !== null && val.price !== undefined) ? val.price : val;
  };

  const isPairLocked = (item, idx1, idx2, allowUndefinedLock = true) => {
    if (item.suspended) return true;
    if (item.odds === undefined) return allowUndefinedLock;
    const p1 = getPrice(item, idx1);
    const p2 = getPrice(item, idx2);
    return (p1 === "-" || p1 === "") && (p2 === "-" || p2 === "");
  };

  return (
    <div className="w-full mt-2">
      {/* Desktop View Table */}
      <div className="hidden md:block bg-[#f7f7f7] overflow-hidden">
        {/* Table Head */}
        <div className="grid grid-cols-[1fr_190px_190px_190px] h-[30px] border-b border-[#c7c8ca]">
          <div className="px-[5px] flex items-center text-[14px] font-bold text-gray-800 tracking-tighter">
            Game
          </div>
          {/* Header 1 */}
          <div className="flex items-center justify-center text-[14px] font-bold text-gray-900 border-l border-gray-100">
            1
          </div>
          {/* Header X */}
          <div className="flex items-center justify-center text-[14px] font-bold text-gray-900 border-l border-gray-100">
            X
          </div>
          {/* Header 2 */}
          <div className="flex items-center justify-center text-[14px] font-bold text-gray-900 border-l border-gray-100">
            2
          </div>
        </div>

        {/* Rows */}
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              if (item.id === 2) {
                navigate(`/tournament/PSL`);
              } else {
                navigate(`/match/${item.sport}/${item.id}`);
              }
            }}
            className="grid grid-cols-[1fr_190px_190px_190px] h-[28px] border-b border-[#c7c8ca] hover:bg-gray-50 items-center cursor-pointer transition-colors"
          >
            {/* Left Info: Game Name + Icons */}
            <div className="px-[5px] flex items-center justify-between overflow-hidden h-full">
              <span className="text-[14px] font-normal text-[#333] truncate mr-2">
                {item.name}
              </span>
              <div className="flex items-center justify-center shrink-0 h-full">
                <div className="w-[30px] flex justify-center items-center">
                  {item.isLive && (
                    <div className="w-[10px] h-[10px] rounded-full bg-[#1db922] shadow-[0_0_2px_rgba(29,185,34,0.4)]"></div>
                  )}
                </div>
                <div className="w-[30px] flex justify-center items-center">
                  {item.hasTv && (
                    <LuTv className="w-[16px] h-[16px] text-gray-800" />
                  )}
                </div>
                <div className="w-[30px] flex justify-center items-center">
                  {item.hasF && (
                    <span className="text-[11px] font-bold italic text-black leading-none">f</span>
                  )}
                </div>
                <div className="w-[30px] flex justify-center items-center">
                  {item.hasBM && (
                    <span className="text-[11px] font-bold text-black leading-none">BM</span>
                  )}
                </div>
                <div className="w-[30px] flex justify-center items-center">
                  {item.hasSuit && (
                     <GiClubs className="w-[14px] h-[14px] text-red-600" />
                  )}
                </div>
                <div className="w-[30px] flex justify-center items-center">
                  {item.hasGame && (
                    <LuGamepad className="w-[18px] h-[18px] text-black" />
                  )}
                </div>
              </div>
            </div>

            {/* Column 1 Pairs */}
            <div className="h-full border-l border-[#c7c8ca] relative">
              <div className="grid grid-cols-2 h-full">
                <div className="h-full flex items-center justify-center bg-[#72bbee] border-r border-white/40">
                  <span className="text-[14px] font-bold text-[#1b3f55]">{getPrice(item, 0, "5.5")}</span>
                </div>
                <div className="h-full flex items-center justify-center bg-[#f9a9ba]">
                  <span className="text-[14px] font-bold text-[#1b3f55]">{getPrice(item, 1, "1000")}</span>
                </div>
              </div>
              {isPairLocked(item, 0, 1, true) && (
                <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-xs flex items-center justify-center">
                  <FaLock className="text-white w-[14px] h-[14px]" />
                </div>
              )}
            </div>

            {/* Column X Pairs */}
            <div className="h-full border-l border-[#c7c8ca] relative">
              <div className="grid grid-cols-2 h-full">
                <div className="h-full flex items-center justify-center bg-[#72bbee] border-r border-white/40">
                  <span className="text-[#055172] text-[14px] font-bold">{getPrice(item, 2, "28")}</span>
                </div>
                <div className="h-full flex items-center justify-center bg-[#f9a9ba]">
                  <span className="text-pink-900 text-[14px] font-bold">{getPrice(item, 3, "1000")}</span>
                </div>
              </div>
              {isPairLocked(item, 2, 3, false) && (
                <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-xs flex items-center justify-center">
                  <FaLock className="text-white w-[14px] h-[14px]" />
                </div>
              )}
            </div>

            {/* Column 2 Pairs */}
            <div className="h-full border-l border-[#c7c8ca] relative">
              <div className="grid grid-cols-2 h-full">
                <div className="h-full flex items-center justify-center bg-[#72bbee] border-r border-white/40">
                  <span className="text-[14px] font-bold text-[#055172]">{getPrice(item, 4, "1.03")}</span>
                </div>
                <div className="h-full flex items-center justify-center bg-[#f9a9ba]">
                  <span className="text-[14px] font-bold text-pink-900">{getPrice(item, 5, "1.04")}</span>
                </div>
              </div>
              {isPairLocked(item, 4, 5, true) && (
                <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-xs flex items-center justify-center">
                  <FaLock className="text-white w-[14px] h-[14px]" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View Rows */}
      <div className="md:hidden flex flex-col gap-1">
        {items.map((item) => (
          <div key={item.id} className="bg-white border-b border-gray-300 p-2 pb-1" onClick={() => {
            if (item.id === 2) {
              navigate(`/tournament/PSL`);
            } else {
              navigate(`/match/${item.sport}/${item.id}`);
            }
          }}>
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black uppercase leading-[1.2]">{item.name}</span>
                <span className="text-[11px] text-gray-500 font-bold mt-0.5 tracking-tight">
                  {item.startTime || "01/04/2026 13:30:00"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {item.isLive && (
                   <div className="w-[10px] h-[10px] rounded-full bg-[#1db922]" />
                )}
                {item.hasTv && (
                   <LuTv className="w-[16px] h-[16px] text-gray-800" />
                )}
                <span className="text-[11px] font-extrabold text-black uppercase ml-0.5 whitespace-nowrap">BM</span>
              </div>
            </div>

            {/* Headers 1 X 2 */}
            <div className="grid grid-cols-3 mt-2 text-center text-[13px] font-extrabold text-gray-950">
               <span>1</span>
               <span>X</span>
               <span>2</span>
            </div>

            {/* Mobile Odds Grid (Now split into 3 parts for independent locks) */}
            <div className="grid grid-cols-3 gap-0 h-[32px] mt-1 relative border-t border-gray-100">
               {/* Pair 1 */}
               <div className="grid grid-cols-2 h-full relative border-r border-[#0000000a]">
                  <div className="flex items-center justify-center bg-[#72bbee] border-r border-[#ffffff40]">
                     <span className="text-[13px] font-bold text-[#1b3f55]">{getPrice(item, 0, "5.5")}</span>
                  </div>
                  <div className="flex items-center justify-center bg-[#f9a9ba]">
                     <span className="text-[13px] font-bold text-[#1b3f55]">{getPrice(item, 1, "1000")}</span>
                  </div>
                  {isPairLocked(item, 0, 1, true) && (
                     <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-[1px] flex items-center justify-center z-10">
                        <FaLock className="text-white w-[13px] h-[13px] drop-shadow-md" />
                     </div>
                  )}
               </div>
               {/* Pair X */}
               <div className="grid grid-cols-2 h-full relative border-r border-[#0000000a]">
                  <div className="flex items-center justify-center bg-[#72bbee] border-r border-[#ffffff40]">
                     <span className="text-[13px] font-bold text-[#1b3f55]">{getPrice(item, 2, "28")}</span>
                  </div>
                  <div className="flex items-center justify-center bg-[#f9a9ba]">
                     <span className="text-[13px] font-bold text-[#1b3f55]">{getPrice(item, 3, "1000")}</span>
                  </div>
                  {isPairLocked(item, 2, 3, false) && (
                     <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-[1px] flex items-center justify-center z-10">
                        <FaLock className="text-white w-[13px] h-[13px] drop-shadow-md" />
                     </div>
                  )}
               </div>
               {/* Pair 2 */}
               <div className="grid grid-cols-2 h-full relative">
                  <div className="flex items-center justify-center bg-[#72bbee] border-r border-[#ffffff40]">
                     <span className="text-[13px] font-bold text-[#1b3f55]">{getPrice(item, 4, "1.03")}</span>
                  </div>
                  <div className="flex items-center justify-center bg-[#f9a9ba]">
                     <span className="text-[13px] font-bold text-[#1b3f55]">{getPrice(item, 5, "1.04")}</span>
                  </div>
                  {isPairLocked(item, 4, 5, true) && (
                     <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-[1px] flex items-center justify-center z-10">
                        <FaLock className="text-white w-[13px] h-[13px] drop-shadow-md" />
                     </div>
                  )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OddsTable;

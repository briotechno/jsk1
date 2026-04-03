import React, { useState } from "react";

const BetSlip = ({ selection, odds, side, onCancel }) => {
  const [stake, setStake] = useState("");
  const isBack = side === "back";
  // The side background (blue for back, pink for lay)
  const bgColor = isBack ? "bg-[#a5d8ff]" : "bg-[#f9a9ba]";
  // In the image, the profit is displayed as 0 when no stake is entered
  const profit = stake ? (parseFloat(stake) * (parseFloat(odds) - 1)).toFixed(2) : "0";

  const stakeOptions = ["+1k", "+2k", "+5k", "+10k", "+20k", "+25k", "+50k", "+75k"];

  const handleStakeValue = (val) => {
    const num = parseInt(val.replace("+", "").replace("k", "")) * 1000;
    setStake(prev => {
      const current = prev ? parseInt(prev) : 0;
      return (current + num).toString();
    });
  };

  return (
    <div className="flex flex-col rounded-none overflow-hidden border border-gray-300 mb-1 font-[family-name:var(--font-roboto-condensed)] w-full">
      {/* Top Title Bar */}
      <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center h-[30px] select-none">
        Place Bet
      </div>

      {/* Labels Header (Gray background from image) */}
      <div className="grid grid-cols-[3.5fr_1fr_1.2fr_1fr] bg-[#cccccc] px-3 py-1.5 text-[14px] font-bold text-gray-800 ">
        <span>(Bet for)</span>
        <span className="text-center">Odds</span>
        <span className="text-center">Stake</span>
        <span className="text-right">Profit</span>
      </div>

      {/* Main Betting Area (The pink/blue side background) */}
      <div className={`${bgColor} flex flex-col`}>
        {/* Selection & Inputs row */}
        <div className="grid grid-cols-[3.5fr_1fr_1.2fr_1fr] px-3 py-2 items-center gap-1">
          <span className="text-[14px] font-bold text-gray-900 truncate leading-tight drop-shadow-sm">{selection}</span>
          <div className="px-0.5">
            <input
              type="text"
              value={odds}
              readOnly
              className="w-full h-[28px] text-center bg-white border border-gray-400 rounded-none text-[14px] font-bold text-gray-700 outline-none"
            />
          </div>
          <div className="px-0.5">
            <input
              type="text"
              placeholder=""
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              autoFocus
              className="w-full h-[28px] text-center bg-white border border-gray-400 rounded-none text-[14px] font-bold text-gray-900 outline-none focus:ring-1 focus:ring-[#0088cc]"
            />
          </div>
          <span className="text-[15px] font-black text-gray-900 text-right pr-1">{profit}</span>
        </div>

        {/* Stake Buttons Grid (5 columns) */}
        <div className="grid grid-cols-5 gap-1.5  p-[5px]">
          {stakeOptions.slice(0, 5).map(opt => (
            <button key={opt} onClick={() => handleStakeValue(opt)} className="bg-[#cccccc] hover:bg-white/60 py-2.5 text-[14px] font-black text-gray-900 transition-colors uppercase">
              {opt}
            </button>
          ))}
          {stakeOptions.slice(5).map(opt => (
            <button key={opt} onClick={() => handleStakeValue(opt)} className="bg-[#cccccc] hover:bg-white/60 py-2.5 text-[14px] font-black text-gray-900 transition-colors uppercase">
              {opt}
            </button>
          ))}
          <div className="bg-[#cccccc]" />
          <button
            onClick={() => setStake("")}
            className="bg-transparent hover:bg-white/20 py-2.5 text-[13px] font-bold text-[#0088cc] underline transition-colors"
          >
            clear
          </button>
        </div>

        {/* Action Buttons Row */}
        <div className="flex gap-2 p-2 pt-3">
          <button className="h-[38px] min-w-[80px] px-3 py-[0.375rem] bg-[#008ba3] hover:bg-[#00748a] text-white text-[16px] font-bold rounded-none transition-all shadow-sm">
            Edit
          </button>
          <div className="flex-1" />
          <button
            onClick={onCancel}
            className="h-[38px] min-w-[80px] px-3 py-[0.375rem] bg-[#c12e2e] hover:bg-[#a92828] text-white text-[16px] font-bold rounded-none transition-all shadow-sm"
          >
            Reset
          </button>
          <button className="h-[38px] min-w-[80px] px-3 py-[0.375rem] bg-[#63968e] hover:bg-[#527d76] text-white text-[16px] font-bold rounded-none transition-all shadow-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetSlip;

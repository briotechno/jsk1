import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { getRunnerRates, getMarketStatus } from "../../utils/rateRefiner";

const SectionBlock = ({ title, children, defaultOpen = true, extraHeader }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-1 font-[family-name:var(--font-roboto-condensed)]">
      <div
        className="bg-[#055172] text-white text-[18px] font-bold px-3 py-1 flex justify-between items-center cursor-pointer select-none h-[32px]"
        onClick={() => setOpen(p => !p)}
      >
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-tight">{title}</span>
          {extraHeader && <span className="text-[12px] font-normal text-blue-200">{extraHeader}</span>}
        </div>
        <span className="text-[11px] font-normal bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-sm">
          {open ? "Collapse" : "Expand"}
        </span>
      </div>
      {open && <div className="bg-[#f7f7f7]">{children}</div>}
    </div>
  );
};

const LockOverlay = () => (
  <>
    {/* Desktop: Lock over odds part only */}
    <div className="hidden md:flex absolute inset-0 bg-[#373636d6] backdrop-blur-xs items-center justify-center z-10">
      <div className="flex items-center gap-1.5 transition-all">
        <span className="text-red-500 font-extrabold text-[13px] uppercase tracking-wider drop-shadow-sm">SUSPENDED</span>
      </div>
    </div>
    {/* Mobile: Full Row Lock */}
    <div className="md:hidden absolute inset-0 bg-[#373636d6] backdrop-blur-xs flex items-center justify-center z-10">
      <div className="flex items-center gap-1.5 transition-all">
        <span className="text-red-500 font-extrabold text-[16px] uppercase tracking-widest drop-shadow-sm">SUSPENDED</span>
      </div>
    </div>
  </>
);

export const MultiRunnerOddsTable = ({ title, runners, maxLimit = "1.00", isBookmaker = false, footerMarquee = null, onBetClick = () => {} }) => {
  const desktopGrid = isBookmaker ? "md:grid-cols-[1fr_100px_100px]" : "md:grid-cols-[1fr_80px_80px_80px_80px_80px_80px]";
  const mobileGrid = "grid-cols-[1fr_80px_80px]";

  const getPrice = (odd) => (odd?.p !== undefined ? odd.p : (odd || "-"));

  return (
    <SectionBlock title={title} defaultOpen={true}>
      {/* Table Header Row */}
      <div className={`grid ${mobileGrid} ${desktopGrid} overflow-hidden border-b border-[#c7c8ca] text-[15px] font-bold text-center text-gray-800 min-h-[30px]`}>
        <div className="bg-[#f2f2f2] border-r border-[#c7c8ca] flex items-center px-2 text-[15px] text-[#055172] font-bold leading-none">
          {isBookmaker ? "Min: 100.00 Max: 50K" : `Max: ${maxLimit}`}
        </div>
        
        {!isBookmaker ? (
          <>
            <div className="hidden md:block bg-white border-r border-[#eee]" />
            <div className="hidden md:block bg-white border-r border-[#eee]" />
            <div className="bg-[#72bbee] text-[#1b3f55] flex items-center justify-center border-r border-[#c7c8ca]">Back</div>
            <div className="bg-[#f9a9ba] text-[#7b1c2e] flex items-center justify-center md:border-r md:border-[#eee]">Lay</div>
            <div className="hidden md:block bg-white border-r border-[#eee]" />
            <div className="hidden md:block bg-white" />
          </>
        ) : (
          <>
            <div className="bg-[#72bbee] text-[#1b3f55] flex items-center justify-center border-r border-[#c7c8ca]">Back</div>
            <div className="bg-[#f9a9ba] text-[#7b1c2e] flex items-center justify-center">Lay</div>
          </>
        )}
      </div>

      {/* Rows */}
      {runners.map((r, idx) => (
        <div key={idx} className="relative">
          {r.suspended && <div className="md:hidden absolute inset-0 z-20"><LockOverlay /></div>}

          <div className={`grid ${mobileGrid} ${desktopGrid} border-b border-[#c7c8ca] min-h-[44px] relative bg-[#f7f7f7]`}>
            {/* Runner Name Column */}
            <div className="flex items-center px-2 text-[15px] font-bold text-[#333] border-r border-gray-200 truncate leading-tight">
              {r.name}
            </div>

            <div className={`relative contents`}>
               {!isBookmaker ? (
                  <>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.b3), "back")}
                      className="hidden md:flex relative flex-col items-center justify-center bg-[#cbdffa] border-r border-white/50 cursor-pointer hover:brightness-95 transition-all"
                    >
                      <span className="text-[18px] font-bold text-[#1b3f55] leading-tight">{r.b3?.p || r.b3 || "-"}</span>
                      <span className="text-[13px] font-medium text-gray-700 leading-tight">{r.b3?.s || "3333"}</span>
                    </div>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.b2), "back")}
                      className="hidden md:flex relative flex-col items-center justify-center bg-[#a7d0fa] border-r border-white/50 cursor-pointer hover:brightness-95 transition-all"
                    >
                      <span className="text-[18px] font-bold text-[#1b3f55] leading-tight">{r.b2?.p || r.b2 || "-"}</span>
                      <span className="text-[13px] font-medium text-gray-700 leading-tight">{r.b2?.s || "53.96"}</span>
                    </div>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.b1), "back")}
                      className="relative flex flex-col items-center justify-center bg-[#72bbee] border-r border-[#c7c8ca] cursor-pointer hover:brightness-95 transition-all"
                    >
                      <span className="text-[18px] font-bold text-[#1b3f55] leading-tight">{r.b1?.p || r.b1 || "-"}</span>
                      <span className="text-[13px] font-medium text-gray-700 leading-tight">{r.b1?.s || "1.68"}</span>
                    </div>

                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.l1), "lay")}
                      className="relative flex flex-col items-center justify-center bg-[#f9a9ba] md:border-r md:border-white/50 cursor-pointer hover:brightness-95 transition-all"
                    >
                      <span className="text-[18px] font-bold text-[#7b1c2e] leading-tight">{r.l1?.p || r.l1 || "-"}</span>
                      <span className="text-[13px] font-medium text-[#7b1c2e] leading-tight">{r.l1?.s || "6.95"}</span>
                    </div>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.l2), "lay")}
                      className="hidden md:flex relative flex-col items-center justify-center bg-[#fbcdde] border-r border-white/50 cursor-pointer hover:brightness-95 transition-all"
                    >
                      <span className="text-[18px] font-bold text-[#7b1c2e] leading-tight">{r.l2?.p || r.l2 || "-"}</span>
                      <span className="text-[13px] font-medium text-[#7b1c2e] leading-tight">{r.l2?.s || "5"}</span>
                    </div>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.l3), "lay")}
                      className="hidden md:flex relative flex-col items-center justify-center bg-[#fde4f1] cursor-pointer hover:brightness-95 transition-all"
                    >
                      <span className="text-[18px] font-bold text-[#7b1c2e] leading-tight">{r.l3?.p || r.l3 || "-"}</span>
                      <span className="text-[13px] font-medium text-[#7b1c2e] leading-tight">{r.l3?.s || "0"}</span>
                    </div>
                    {r.suspended && <div className="hidden md:block absolute inset-0 left-[unset] right-0 w-[480px]"><LockOverlay /></div>}
                  </>
               ) : (
                  <>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.back), "back")}
                      className="relative flex flex-col items-center justify-center bg-[#72bbee] border-r border-[#c7c8ca] cursor-pointer hover:brightness-95"
                    >
                      <span className="text-[18px] font-bold text-[#1b3f55] leading-tight">{r.back?.p || r.back || "-"}</span>
                      <span className="text-[13px] font-medium text-gray-700 leading-tight">{r.back?.s || "50000"}</span>
                    </div>
                    <div 
                      onClick={() => !r.suspended && onBetClick(r.name, getPrice(r.lay), "lay")}
                      className="relative flex flex-col items-center justify-center bg-[#f9a9ba] cursor-pointer hover:brightness-95"
                    >
                      <span className="text-[18px] font-bold text-[#7b1c2e] leading-tight">{r.lay?.p || r.lay || "-"}</span>
                      <span className="text-[13px] font-medium text-pink-900 leading-tight">{r.lay?.s || "0"}</span>
                    </div>
                    {r.suspended && <div className="hidden md:block absolute inset-0 left-[unset] right-0 w-[200px]"><LockOverlay /></div>}
                  </>
               )}
            </div>
          </div>
        </div>
      ))}

      {footerMarquee && (
        <div className="bg-[#f7f7f7] p-1 border-t border-[#c7c8ca] text-[11px] font-bold text-[#055172] italic tracking-wide overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block pl-[100%] leading-none py-1">
            {footerMarquee}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');
        @keyframes marquee {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-100%, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </SectionBlock>
  );
};

export const FancyLineMarketTable = ({ title, markets, liveRates, onBetClick }) => {
  const isFancy = title.toUpperCase().includes("FANCY");
  const isLine = title.toUpperCase().includes("LINE");

  return (
    <SectionBlock title={title} defaultOpen={true}>
      {/* Table Header Row */}
      <div className="grid grid-cols-[1fr_80px_80px_100px] overflow-hidden border-b border-[#c7c8ca] text-[15px] font-bold text-center text-gray-800 min-h-[30px]">
        <div className="bg-[#f2f2f2] border-r border-[#c7c8ca] flex items-center px-2 text-[15px] text-[#055172] font-bold leading-none">
          Active Markets
        </div>
        <div className="bg-[#f9a9ba] text-[#7b1c2e] flex items-center justify-center border-r border-[#c7c8ca]">NO</div>
        <div className="bg-[#72bbee] text-[#1b3f55] flex items-center justify-center border-r border-[#c7c8ca]">YES</div>
        <div className="bg-[#f2f2f2] flex items-center justify-center text-[12px] font-semibold text-gray-600">Min/Max</div>
      </div>

      {/* Rows */}
      {markets.map((m, idx) => {
        const marketId = m.eid || m.MarketId || m.marketid || m.id;
        const rateData = liveRates[marketId];
        const marketType = m.Type || (isFancy ? 'FANCY' : 'LINE');
        
        const { isSuspended, msg: suspensionMsg } = getMarketStatus(rateData, marketType);
        const rates = getRunnerRates(rateData, 0, idx, marketType);

        // Suspension details
        const isSusp = isSuspended || rates?.isRunnerSuspended;
        const finalSuspMsg = rates?.suspensionMsg || suspensionMsg || 'SUSPENDED';

        const name = m.name || m.RunnerName || "Fancy Market";
        const minVal = m.min || "100";
        const maxVal = m.max || "50K";

        const backVal = rates?.back?.p1 || "-";
        const backSize = rates?.back?.v1 || "-";
        const layVal = rates?.lay?.p1 || "-";
        const laySize = rates?.lay?.v1 || "-";

        return (
          <div key={marketId || idx} className="relative">
            {isSusp && (
              <div className="absolute inset-0 bg-[#373636d6] backdrop-blur-xs flex items-center justify-center z-20">
                <span className="text-red-500 font-extrabold text-[15px] uppercase tracking-wider">{finalSuspMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-[1fr_80px_80px_100px] border-b border-[#c7c8ca] min-h-[44px] bg-[#f7f7f7]">
              {/* Market Name */}
              <div className="flex items-center px-2 text-[14px] font-bold text-[#333] border-r border-gray-200 leading-tight">
                {name}
              </div>

              {/* NO (Lay) Button */}
              <div 
                onClick={() => !isSusp && layVal !== "-" && onBetClick(name, layVal, "lay")}
                className="relative flex flex-col items-center justify-center bg-[#f9a9ba] border-r border-[#c7c8ca] cursor-pointer hover:brightness-95 transition-all text-center"
              >
                <span className="text-[17px] font-bold text-[#7b1c2e] leading-tight">{layVal}</span>
                <span className="text-[11px] font-medium text-[#7b1c2e] leading-tight">{laySize}</span>
              </div>

              {/* YES (Back) Button */}
              <div 
                onClick={() => !isSusp && backVal !== "-" && onBetClick(name, backVal, "back")}
                className="relative flex flex-col items-center justify-center bg-[#72bbee] border-r border-[#c7c8ca] cursor-pointer hover:brightness-95 transition-all text-center"
              >
                <span className="text-[17px] font-bold text-[#1b3f55] leading-tight">{backVal}</span>
                <span className="text-[11px] font-medium text-gray-700 leading-tight">{backSize}</span>
              </div>

              {/* Min/Max */}
              <div className="flex flex-col items-center justify-center text-[10px] text-gray-500 font-bold leading-tight px-1 text-center bg-gray-50/50">
                <div>{minVal}</div>
                <div className="text-[9px] font-semibold text-gray-400 mt-0.5">{maxVal}</div>
              </div>
            </div>
          </div>
        );
      })}
    </SectionBlock>
  );
};

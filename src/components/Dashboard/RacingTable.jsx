import { useState } from "react";
import { MdMonitor } from "react-icons/md";

const RacingTable = ({ data }) => {
  const regions = Object.keys(data || {});
  const [activeRegion, setActiveRegion] = useState(regions[0] || "");

  if (!regions.length) return null;

  const tracks = data[activeRegion] || [];

  return (
    <div className="w-full bg-[#eeeeee] font-sans">
      {/* Region Tabs */}
      <div className="flex bg-white mt-1 ">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`px-4 py-2 text-[16px] font-medium uppercase border-r last:border-r-0 border-[#035273] transition-all ${activeRegion === region
              ? "bg-[#035175] text-white"
              : "bg-[#cccccc] text-[#444444] hover:bg-[#cccccc]"
              }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Tracks Table */}
      <div className="flex flex-col bg-white">
        {tracks.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row border-b border-gray-300 last:border-b-0"
          >
            {/* Track Info */}
            <div className="w-full md:w-[400px] shrink-0 flex items-center gap-2 px-3 py-2.5 h-full">
              <MdMonitor className="text-black text-[18px]" />
              <span className="text-[14px] font-bold text-gray-800 tracking-tight">{item.track}</span>
            </div>

            {/* Times Grid */}
            <div className="flex-1 flex flex-wrap gap-2 px-3 py-3 bg-[#eeeeee] md:bg-transparent">
              {item.times.map((time, tIdx) => (
                <button
                  key={tIdx}
                  className="px-[8px] py-[4px] bg-[#cccccc] text-[#333333] text-[13px] font-medium rounded-[4px] transition-colors min-w-[60px] h-[32px] flex items-center justify-center border border-gray-300 shadow-sm"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RacingTable;

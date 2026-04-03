import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MultiRunnerOddsTable } from "./MarketTable";
import BetSlip from "./BetSlip";
import { IoIosInformationCircle } from "react-icons/io";
import { LuTv } from "react-icons/lu";

const TournamentDetail = () => {
  const { tournamentId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("odds");
  const [activeBet, setActiveBet] = useState(null);

  // Mock data for Tournament View (e.g. PSL)
  const tournamentName = "PAKISTAN SUPER LEAGUE";
  const tournamentDate = "24/03/2026 17:30:00";
  const runners = [
    { name: "Islamabad United", b1: 7.8, l1: 50, b2: 4, l2: 990, b3: 1.16, l3: null, suspended: false },
    { name: "Multan Sultans", b1: 2.24, l1: 5.7, b2: 2.02, l2: 25, b3: 1.16, l3: 990 },
    { name: "Karachi Kings", b1: 2, l1: 25, b2: 1.16, l2: 50, b3: 1.15, l3: 990 },
    { name: "Peshawar Zalmi", b1: 2, l1: 50, b2: 1.16, l2: 990, b3: 1.15, l3: null },
    { name: "Hyderabad Kingsmen", b1: 4.1, l1: 5, b2: 3, l2: 6, b3: 1.01, l3: 6 },
    { name: "Lahore Qalandars", b1: 3.15, l1: 6, b2: 2, l2: 6.2, b3: 1.16, l3: 6.2 },
    { name: "Quetta Gladiators", b1: 5, l1: 10, b2: 3, l2: 50, b3: 2.2, l3: 50 },
    { name: "Rawalpindi Pindiz", b1: 5, l1: 50, b2: 3, l2: 990, b3: 1.16, l3: null },
  ];

  const bookmakerRunners = runners.map(r => ({
    name: r.name,
    back: idx_to_odds(r.name) ? null : { p: 750, s: 50000 },
    lay: null,
    suspended: idx_to_odds(r.name) === 1 || idx_to_odds(r.name) === 7
  }));

  function idx_to_odds(name) {
    if (name === "Islamabad United") return 1;
    if (name === "Quetta Gladiators") return 7;
    return 0;
  }

  const handleBetClick = (name, price, side) => {
    setActiveBet({ name, price, side });
  };

  const marqueeText = "The King of All MATKA Market Open And Close Every Hour! LIVE RESULTS, 100% TRUSTED & SECURE PLATFORM! THE KING OF ALL MATKA MARKET OPEN AND CLOSE EVERY HOUR! LIVE RESULTS, 100% TRUSTED & SECURE PLATFORM!";

  return (
    <div className="flex flex-1 overflow-hidden h-full bg-[#e0e0e0] font-[family-name:var(--font-roboto-condensed)]">
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Header - Moved inside Left Section */}
        <div className="flex items-center gap-1 shrink-0 h-[32px] px-1 pt-1 mb-1">
          <div className="flex-1 bg-[#055172] text-white px-3 h-full flex justify-between items-center text-[15px] font-bold">
            <span className="uppercase tracking-tight truncate">{tournamentName}</span>
            <span className="text-[11px] font-normal leading-none opacity-90">{tournamentDate}</span>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden flex bg-[#0088cc] text-white h-[40px] items-center text-center font-bold text-[13px] border-b border-white/20 shrink-0">
          <div onClick={() => setActiveTab("odds")} className={`flex-1 border-r border-white/20 h-full flex items-center justify-center cursor-pointer transition-colors ${activeTab === 'odds' ? 'bg-white/20' : 'active:bg-white/10'}`}>ODDS</div>
          <div onClick={() => setActiveTab("matched")} className={`flex-1 border-r border-white/20 h-full flex items-center justify-center cursor-pointer transition-colors ${activeTab === 'matched' ? 'bg-white/20' : 'active:bg-white/10'}`}>MATCHED BET (0)</div>
          <div onClick={() => setActiveTab("tv")} className={`w-[60px] h-full flex items-center justify-center cursor-pointer transition-colors ${activeTab === 'tv' ? 'bg-white/20' : 'active:bg-white/10'}`}><LuTv size={20} /></div>
        </div>

        {/* Market Tables Area */}
        <div className="flex-1 overflow-y-auto p-1 [scrollbar-width:none] overflow-x-hidden pb-4">
          <div className="md:block hidden">
            <MultiRunnerOddsTable title="TOURNAMENT_WINNER" runners={runners} maxLimit="1.00" onBetClick={handleBetClick} />
            <MultiRunnerOddsTable title="PSL Cup Winner Bookmaker" runners={bookmakerRunners} isBookmaker={true} footerMarquee={marqueeText} onBetClick={handleBetClick} />
          </div>

          <div className="md:hidden block">
            {activeTab === "odds" && (
              <>
                {activeBet && <div className="mb-2"><BetSlip selection={activeBet.name} odds={activeBet.price} side={activeBet.side} onCancel={() => setActiveBet(null)} /></div>}
                <MultiRunnerOddsTable title="TOURNAMENT_WINNER" runners={runners} maxLimit="1.00" onBetClick={handleBetClick} />
                <MultiRunnerOddsTable title="PSL Cup Winner Bookmaker" runners={bookmakerRunners} isBookmaker={true} footerMarquee={marqueeText} onBetClick={handleBetClick} />
              </>
            )}
            {activeTab === "matched" && (
              <div className="flex flex-col bg-white rounded-none overflow-hidden border border-gray-300">
                <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center h-[30px]">My Bet</div>
                <div className="grid grid-cols-[1fr_80px_80px] bg-[#f7f7f7] border-b border-gray-300 h-[28px] items-center px-3 text-[12px] font-bold">
                  <span>Matched Bet</span><span className="text-center">Odds</span><span className="text-right">Stake</span>
                </div>
                <div className="p-4 text-center text-gray-400 text-[12px] italic">No matched bets found.</div>
              </div>
            )}
            {activeTab === "tv" && (
              <div className="bg-black flex items-center justify-center text-center p-8 h-[250px] border border-gray-800 rounded-none shadow-lg">
                <div className="text-red-600 font-black text-[24px] uppercase leading-tight tracking-wider">PLEASE LOGIN <br /> TO WATCH LIVE TV</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-[450px] min-w-[450px] border-l border-gray-300 bg-transparent">
        <RightPanel sport="Cricket" activeBet={activeBet} onCancelBet={() => setActiveBet(null)} />
      </div>
    </div>
  );
};

const RightPanel = ({ sport, activeBet, onCancelBet }) => (
  <div className="flex flex-col gap-2 p-1 overflow-y-auto h-full [scrollbar-width:none]">
    {/* User Branding - Top */}
    <div className="flex bg-transparent h-[30px] items-center justify-start px-2 gap-1.5 shrink-0">
      <IoIosInformationCircle size={16} className="text-black/80" />
      <span className="text-[#055172] text-[18px] font-bold tracking-tight">Dolidana</span>
    </div>

    {/* Place Bet (Conditional) */}
    {activeBet && (
      <BetSlip
        selection={activeBet.name}
        odds={activeBet.price}
        side={activeBet.side}
        onCancel={onCancelBet}
      />
    )}

    {/* My Bet Section */}
    <div className="flex flex-col bg-white rounded-none overflow-hidden border border-gray-300">
      <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center justify-between h-[30px]">
        <span>My Bet</span>
      </div>
      <div className="grid grid-cols-[1fr_80px_80px] bg-[#f7f7f7] border-b border-gray-300 h-[28px] items-center px-3 text-[12px] font-bold text-gray-800">
        <span>Matched Bet</span><span className="text-center">Odds</span><span className="text-right">Stake</span>
      </div>
      <div className="p-4 text-center text-gray-400 text-[12px] italic">
        No matched bets found.
      </div>
    </div>
  </div>
);

export default TournamentDetail;



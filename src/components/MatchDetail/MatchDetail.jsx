import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuTv } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";
import RacingTable from "./RacingTable";
import { MultiRunnerOddsTable } from "./MarketTable";
import BetSlip from "./BetSlip";
import racingRunners from "../../data/racingRunners.json";

// ─── Static match data ────────────────────────────────────────────────────────

export const matchesData = {
  "djokovic-v-alcaraz": {
    title: "Andrii Derevianko - Yevhenii Holoborodko", date: "02/04/2026 23:10:00", sport: "tennis",
    isLive: true,
    team1: "DER", team2: "HOL", time: "04 : 39 : 10", status: "Not started",
    matchOdds: {
      team1: { name: "Djokovic", b3: { p: "-", s: "3333" }, b2: { p: "-", s: "53.96" }, b1: { p: "-", s: "1.68" }, l1: { p: "-", s: "6.95" }, l2: { p: "-", s: "5" }, l3: { p: "-", s: "0" } },
      team2: { name: "Alcaraz", b3: { p: "-", s: "3333" }, b2: { p: "-", s: "53.96" }, b1: { p: "-", s: "1.68" }, l1: { p: "-", s: "6.95" }, l2: { p: "-", s: "5" }, l3: { p: "-", s: "0" } },
    },
    bookmaker: {
      team1: { name: "Djokovic", back: { p: "-", s: "50000" }, lay: { p: "-", s: "0" } },
      team2: { name: "Alcaraz", back: { p: "-", s: "50000" }, lay: { p: "-", s: "0" } },
    },
  },
};

const buildGenericMatch = (slug, sport) => {
  const parts = slug.split("-v-");
  const team1Name = (parts[0] || "Home").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const team2Name = (parts[1] || "Away").split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return {
    title: team1Name + " v " + team2Name, date: "02/04/2026 23:10:00", sport,
    isLive: true,
    team1: team1Name.substring(0, 3).toUpperCase(),
    team2: team2Name.substring(0, 3).toUpperCase(),
    time: "04 : 39 : 10",
    status: "Not started",
    matchOdds: {
      team1: { name: team1Name, b3: { p: "-", s: "3333" }, b2: { p: "-", s: "53.96" }, b1: { p: "-", s: "1.68" }, l1: { p: "-", s: "6.95" }, l2: { p: "-", s: "5" }, l3: { p: "-", s: "0" } },
      team2: { name: team2Name, b3: { p: "-", s: "3333" }, b2: { p: "-", s: "53.96" }, b1: { p: "-", s: "1.68" }, l1: { p: "-", s: "6.95" }, l2: { p: "-", s: "5" }, l3: { p: "-", s: "0" } },
    },
    bookmaker: {
      team1: { name: team1Name, back: { p: "-", s: "50000" }, lay: { p: "-", s: "0" } },
      team2: { name: team2Name, back: { p: "-", s: "50000" }, lay: { p: "-", s: "0" } },
    },
  };
};

const Scoreboard = ({ team1, team2, time, status }) => (
  <div className="flex w-full h-[145px] mb-1 overflow-hidden shadow-sm">
    <div className="flex-1 bg-[#47918b] p-3 flex flex-col justify-between text-white border-r border-[#333]">
      <div className="text-[12px] opacity-90 font-bold uppercase tracking-wide">{status || "Not started"}</div>
      <div className="flex flex-col gap-2 mt-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full border border-blue-500 overflow-hidden flex items-center justify-center">
            <div className="w-full h-1/2 bg-blue-600 self-start" />
          </div>
          <span className="text-[15px] font-bold uppercase tracking-tight">{team1 || "DER"}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded-full border border-blue-500 overflow-hidden flex items-center justify-center">
            <div className="w-full h-1/2 bg-blue-600 self-start" />
          </div>
          <span className="text-[15px] font-bold uppercase tracking-tight">{team2 || "HOL"}</span>
        </div>
      </div>
      <div className="text-[32px] font-black tracking-widest mt-auto font-sans">{time || "04 : 39 : 10"}</div>
    </div>
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-[#1a1a1a] flex items-center justify-center text-gray-400 text-[14px] font-bold uppercase tracking-widest">
        No data
      </div>
      <div className="h-[40px] bg-[#333] flex items-center justify-center text-gray-500 text-[12px]"></div>
    </div>
  </div>
);

const RightPanel = ({ sport, activeBet, onCancelBet }) => {
  const isMainSport = ["cricket", "football", "tennis", "racing", "horse-racing", "greyhound-racing"].includes(sport?.toLowerCase());

  return (
    <div className="hidden lg:flex flex-col w-[450px] min-w-[450px] overflow-y-auto bg-transparent p-1  [scrollbar-width:none] gap-2">
      {/* User Branding - Moved to Top */}
      <div className="flex bg-transparent h-[30px] items-center justify-start px-2 gap-1.5 shrink-0">
        <IoIosInformationCircle size={16} className="text-black/80" />
        <span className="text-[#055172] text-[18px] font-bold tracking-tight">Dolidana</span>
      </div>

      {/* Live Match / TV Section (Only for main sports) */}
      {isMainSport && (
        <div className="flex flex-col bg-white rounded-none overflow-hidden border border-gray-300">
          <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center h-[30px] gap-2">
            <LuTv size={18} />
            <span>Live Match</span>
          </div>
          <div className="bg-black flex items-center justify-center text-center p-6 h-[250px] border-b border-gray-800">
            <div className="text-red-600 font-black text-[24px] uppercase leading-tight tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              PLEASE LOGIN <br /> TO WATCH LIVE TV
            </div>
          </div>
        </div>
      )}

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
      <div className="flex flex-col bg-white rounded-none border border-gray-300">
        <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center h-[30px] justify-between">
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
};

const RacingBanner = ({ country, location, time, distance, bg }) => (
  <div className="relative w-full h-[70px] rounded-none overflow-hidden mb-1 flex items-center bg-black">
    <img src={bg} className="absolute inset-0 w-full h-full object-cover opacity-70" alt="" />
    <div className="absolute left-4 z-10 text-[#28a745] text-xl font-black uppercase italic tracking-tighter drop-shadow-lg">SUSPENDED</div>
    <div className="absolute inset-0 flex flex-col justify-center items-end px-4 text-white text-right z-10">
      <div className="text-[14px] font-black leading-none mb-1">{country} &gt; {location}</div>
      <div className="text-[9px] font-medium opacity-90 leading-none">{time} | {distance}</div>
    </div>
  </div>
);

const RacingView = ({ onBetClick }) => {
  const [activeTab, setActiveTab] = useState("odds");
  return (
    <div className="flex flex-col w-full bg-gray-50 h-full overflow-y-auto [scrollbar-width:none]">
      <RacingBanner country="ZA" location="Vaal" time="19:15:00" distance="R7 1450m Hcap" bg="https://images.unsplash.com/photo-1599411516008-013f9f94f99b?q=80&w=2072&auto=format&fit=crop" />
      <div className="md:hidden flex bg-[#0088cc] text-white h-[40px] items-center text-center font-bold text-[13px] border-b border-white/20 shrink-0">
        <div onClick={() => setActiveTab("odds")} className={`flex-1 border-r border-white/20 h-full flex items-center justify-center transition-colors ${activeTab === 'odds' ? 'bg-white/20' : 'active:bg-white/10'}`}>ODDS</div>
        <div onClick={() => setActiveTab("matched")} className={`flex-1 border-r border-white/20 h-full flex items-center justify-center transition-colors ${activeTab === 'matched' ? 'bg-white/20' : 'active:bg-white/10'}`}>MATCHED BET (0)</div>
        <div onClick={() => setActiveTab("tv")} className={`w-[60px] h-full flex items-center justify-center transition-colors ${activeTab === 'tv' ? 'bg-white/20' : 'active:bg-white/10'}`}><LuTv size={20} /></div>
      </div>
      <div className="flex-1 overflow-x-auto [scrollbar-width:none] px-1 pt-1">
        <div className="md:block hidden">
          <RacingTable runners={racingRunners} onBetClick={onBetClick} />
        </div>
        <div className="md:hidden block">
          {activeTab === "odds" && <RacingTable runners={racingRunners} onBetClick={onBetClick} />}
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
            <div className="bg-black flex items-center justify-center text-center p-8 h-[250px] border border-gray-800 rounded-none">
              <div className="text-red-600 font-black text-[28px] uppercase leading-tight tracking-wider">PLEASE LOGIN <br /> TO WATCH LIVE TV</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MatchDetail = () => {
  const { matchId, sport: sportParam } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("odds");
  const [activeBet, setActiveBet] = useState(null);

  const staticMatch = matchesData[matchId];
  const effectiveSport = (sportParam || staticMatch?.sport || "cricket").toLowerCase();
  const isRacing = ["racing", "horse-racing", "greyhound-racing"].includes(effectiveSport);
  const match = staticMatch || buildGenericMatch(matchId || "unknown-v-unknown", effectiveSport);

  const handleBetClick = (name, price, side) => {
    setActiveBet({ name, price, side });
  };

  return (
    <div className="flex flex-1 overflow-hidden h-full bg-[#e0e0e0] font-[family-name:var(--font-roboto-condensed)]">
      <div className="flex-1 overflow-y-auto pb-4 [scrollbar-width:none]">
        {isRacing ? (
          <RacingView onBetClick={handleBetClick} />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-1 shrink-0 h-[32px] mb-px px-1 pt-1 mb-1">
              <div className="flex-1 bg-[#055172] text-white px-3 h-full flex justify-between items-center text-[15px] font-bold">
                <span className="uppercase tracking-tight truncate">{match.title}</span>
                <span className="text-[11px] font-normal leading-none opacity-90">{match.date}</span>
              </div>
            </div>
            <div className="flex-1 px-1 pt-0 overflow-y-auto [scrollbar-width:none]">
              <button onClick={() => navigate("/")} className="hidden md:flex items-center gap-1 text-[#055172] text-[12px] font-bold mb-1 hover:underline cursor-pointer"> ← Home </button>
              <div className="md:block hidden">
                {match.isLive && <Scoreboard team1={match.team1} team2={match.team2} time={match.time} status={match.status} />}
                <MultiRunnerOddsTable title="MATCH_ODDS" runners={[match.matchOdds.team1, match.matchOdds.team2]} onBetClick={handleBetClick} />
                <MultiRunnerOddsTable title="Bookmaker" runners={[match.bookmaker.team1, match.bookmaker.team2]} isBookmaker={true} onBetClick={handleBetClick} />
              </div>
              <div className="md:hidden block">
                {activeTab === "odds" && (
                  <>
                    {match.isLive && <Scoreboard team1={match.team1} team2={match.team2} time={match.time} status={match.status} />}
                    {activeBet && (
                      <div className="mb-2">
                        <BetSlip selection={activeBet.name} odds={activeBet.price} side={activeBet.side} onCancel={() => setActiveBet(null)} />
                      </div>
                    )}
                    <MultiRunnerOddsTable title="MATCH_ODDS" runners={[match.matchOdds.team1, match.matchOdds.team2]} onBetClick={handleBetClick} />
                    <MultiRunnerOddsTable title="Bookmaker" runners={[match.bookmaker.team1, match.bookmaker.team2]} isBookmaker={true} onBetClick={handleBetClick} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <RightPanel sport={effectiveSport} activeBet={activeBet} onCancelBet={() => setActiveBet(null)} />
    </div>
  );
};

export default MatchDetail;

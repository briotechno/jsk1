import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuTv } from "react-icons/lu";
import { IoIosInformationCircle } from "react-icons/io";
import RacingTable from "./RacingTable";
import { MultiRunnerOddsTable, FancyLineMarketTable } from "./MarketTable";
import BetSlip from "./BetSlip";
import racingRunners from "../../data/racingRunners.json";

import { useAuth } from "../../contexts/AuthContext";
import { marketController, userController } from "../../controller";
import { useRatePolling } from "../../hooks/useRatePolling";
import { getRunnerRates } from "../../utils/rateRefiner";

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

const Scoreboard = ({ team1, team2, time, status, html, title, date }) => {
  if (html) {
    return (
      <div className="w-full mb-1 overflow-hidden shadow-sm bg-[#1a1a1a] border-b-4 border-[#055172]">
        <div 
          className="w-full text-white text-[12px] md:text-[14px] leading-normal [&_iframe]:w-full [&_iframe]:min-h-[160px] [&_iframe]:border-none [&_table]:w-full [&_table]:text-white"
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </div>
    );
  }

  return (
    <div className="w-full mb-2 bg-gradient-to-r from-[#055172] to-[#0a75a3] text-white p-4 flex flex-col justify-between shadow-md h-[130px] relative overflow-hidden font-[family-name:var(--font-roboto-condensed)]">
      {/* Decorative backdrop graphics */}
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 skew-x-12 transform origin-top-right pointer-events-none" />
      
      <div className="flex justify-between items-center z-10">
        <span className="text-[12px] uppercase font-bold tracking-wider px-2 py-0.5 bg-black/25 rounded">
          {status || "Scheduled"}
        </span>
        <span className="text-[11px] font-medium opacity-90">{date}</span>
      </div>

      <div className="flex items-center justify-center gap-6 my-2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-black uppercase tracking-tight">{team1 || "Team A"}</span>
        </div>
        <span className="text-[13px] font-bold text-blue-200">VS</span>
        <div className="flex flex-col items-center">
          <span className="text-[18px] font-black uppercase tracking-tight">{team2 || "Team B"}</span>
        </div>
      </div>

      <div className="text-center text-[12px] font-bold tracking-widest opacity-80 z-10 uppercase">
        {time || "Match starting soon"}
      </div>
    </div>
  );
};

// Responsive Live TV stream player wrapper
const ResponsiveTvIframe = ({ src }) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setScale(width / 640);
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: `${360 * scale}px`,
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      <iframe
        src={src}
        scrolling="no"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms"
        style={{
          width: '640px',
          height: '360px',
          border: '0',
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

const MyBetsList = ({ bets, isLoading }) => {
  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="w-5 h-5 border-2 border-[#0088cc] border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
        <span className="text-[11px] font-bold text-gray-500 uppercase">Loading bets...</span>
      </div>
    );
  }

  if (bets.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400 text-[12px] italic">
        No matched bets found.
      </div>
    );
  }

  const groupedBets = bets.reduce((acc, bet) => {
    const gameName = bet.Game || bet.Market || 'Other Market';
    if (!acc[gameName]) acc[gameName] = [];
    acc[gameName].push(bet);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-1.5 p-1 bg-white">
      {Object.entries(groupedBets).map(([gameName, gameBets], gIdx) => {
        const firstBet = gameBets[0];
        const rawSport = (firstBet.Sport || firstBet.sport || firstBet.SportName || firstBet.Type || firstBet.Game_Type || 'SPORTS').toLowerCase();
        const displaySport = rawSport.includes('soccer') || rawSport.includes('football') ? 'FOOTBALL' 
                          : rawSport.includes('tennis') ? 'TENNIS' 
                          : rawSport.includes('cricket') ? 'CRICKET' : 'SPORTS';

        return (
          <div key={gIdx} className="border border-gray-300 overflow-hidden text-[11px] font-[family-name:var(--font-roboto-condensed)]">
            {/* Header */}
            <div className="bg-[#243a48] text-white px-2 py-1 flex justify-between items-center font-bold">
              <span className="truncate pr-2 uppercase">{gameName}</span>
              <span className="text-[9px] text-[#ffb400] shrink-0 font-extrabold">{displaySport}</span>
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-[25%_35%_12%_13%_15%] bg-[#dce5ec] text-[#253845] font-black uppercase py-1 text-center border-b border-gray-200">
              <div>Market</div>
              <div>Selection</div>
              <div>Rate</div>
              <div>Stake</div>
              <div>Date</div>
            </div>

            {/* Bet Rows */}
            <div className="flex flex-col">
              {gameBets.map((bet, idx) => {
                const sideRaw = bet.Side || bet.type || bet.Type || '';
                const isBack = sideRaw.toLowerCase() === 'back' || sideRaw.toLowerCase() === 'yes' || sideRaw.toLowerCase() === 'b';
                const bgColor = isBack ? 'bg-[#a5d8ff]' : 'bg-[#f8b9c6]';
                
                const rawDate = bet.Matched_Date || bet.Date || bet.datetime || bet.PlaceDate || bet.Placed_Date || '';
                let displayDate = rawDate;
                if (rawDate && rawDate.includes(' ')) {
                  displayDate = rawDate.split(' ')[0] || rawDate;
                }

                const gameTypeUpper = (bet.Game_Type || bet.Type || '').toUpperCase();
                const displayMarket = (gameTypeUpper === 'LINE' || gameTypeUpper === 'FANCY')
                  ? gameTypeUpper
                  : (bet.Event || bet.Game_Type || '-');

                return (
                  <div key={idx} className={`grid grid-cols-[25%_35%_12%_13%_15%] items-center text-center py-1 border-b border-gray-200 last:border-b-0 ${bgColor} text-black font-semibold`}>
                    <div className="truncate px-0.5 uppercase" title={displayMarket}>{displayMarket}</div>
                    <div className="truncate px-0.5 uppercase" title={bet.Selection}>{bet.Selection}</div>
                    <div>{bet.Rate || bet.UserRate || bet.User_Rate || '-'}</div>
                    <div>{parseFloat(bet.Stake || bet.Amount || 0).toLocaleString()}</div>
                    <div className="text-[9px] opacity-75">{displayDate}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const RightPanel = ({ sport, activeBet, onCancelBet, isLoggedIn, user, matchId, tvVisible, myBets, isMyBetsLoading }) => {
  const isMainSport = ["cricket", "football", "tennis", "racing", "horse-racing", "greyhound-racing"].includes(sport?.toLowerCase());
  const tvUrl = `https://ambikaexch.in/extsys/newopentv/${matchId}`;

  return (
    <div className="hidden lg:flex flex-col w-[450px] min-w-[450px] overflow-y-auto bg-transparent p-1 [scrollbar-width:none] gap-2 font-[family-name:var(--font-roboto-condensed)]">
      {/* User Branding - Moved to Top */}
      <div className="flex bg-transparent h-[30px] items-center justify-start px-2 gap-1.5 shrink-0">
        <IoIosInformationCircle size={16} className="text-black/80" />
        <span className="text-[#055172] text-[18px] font-bold tracking-tight">Dolidana</span>
      </div>

      {/* Live Match / TV Section (Only for main sports) */}
      {isMainSport && (!isLoggedIn || tvVisible) && (
        <div className="flex flex-col bg-white rounded-none overflow-hidden border border-gray-300">
          <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center h-[30px] gap-2">
            <LuTv size={18} />
            <span>Live Match</span>
          </div>
          {isLoggedIn ? (
            <ResponsiveTvIframe src={tvUrl} />
          ) : (
            <div className="bg-black flex items-center justify-center text-center p-6 h-[250px] border-b border-gray-800">
              <div className="text-red-600 font-black text-[24px] uppercase leading-tight tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                PLEASE LOGIN <br /> TO WATCH LIVE TV
              </div>
            </div>
          )}
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
        {isLoggedIn ? (
          <MyBetsList bets={myBets} isLoading={isMyBetsLoading} />
        ) : (
          <>
            <div className="grid grid-cols-[1fr_80px_80px] bg-[#f7f7f7] border-b border-gray-300 h-[28px] items-center px-3 text-[12px] font-bold text-gray-800">
              <span>Matched Bet</span><span className="text-center">Odds</span><span className="text-right">Stake</span>
            </div>
            <div className="p-4 text-center text-gray-400 text-[12px] italic">
              Please login to view your bets.
            </div>
          </>
        )}
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

  const { isLoggedIn, user } = useAuth();
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scoreboardHtml, setScoreboardHtml] = useState(null);
  const [tvVisible, setTvVisible] = useState(true);
  const [myBets, setMyBets] = useState([]);
  const [isMyBetsLoading, setIsMyBetsLoading] = useState(false);

  const { liveRates, scoreboardHtml: liveScoreboardHtml } = useRatePolling(matchId, gameData, 1000);

  useEffect(() => {
    if (liveScoreboardHtml) {
      setScoreboardHtml(liveScoreboardHtml);
    }
  }, [liveScoreboardHtml]);

  const fetchGameData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setIsLoading(true);
      let res;
      if (isLoggedIn && user?.loginToken) {
        res = await marketController.getGameDataLogin(user.loginToken, matchId);
      } else {
        res = await marketController.getGameData(matchId);
      }
      if (res && !res.error) {
        let parsed = typeof res === 'string' ? JSON.parse(res) : res;
        if (parsed && parsed["0"]) parsed = parsed["0"];
        setGameData(parsed);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      if (showLoading) setIsLoading(false);
    }
  }, [isLoggedIn, user?.loginToken, matchId]);

  const fetchMyBets = useCallback(async () => {
    if (!isLoggedIn || !user?.loginToken) return;
    try {
      setIsMyBetsLoading(true);
      const res = await userController.getMyBets(user.loginToken);
      if (res && typeof res === 'object' && !res.error) {
        let betArray = Object.values(res).filter(item => typeof item === 'object' && item !== null);
        if (matchId) {
          betArray = betArray.filter(b => {
            const gid = b.gid || b.Gid || b.eventId || b.matchId || b.MatchId || b.Eid || b.eid;
            return gid && gid.toString() === matchId.toString();
          });
        }
        setMyBets(betArray);
      }
    } catch (err) {
      console.error('Failed to fetch my bets:', err);
    } finally {
      setIsMyBetsLoading(false);
    }
  }, [isLoggedIn, user?.loginToken, matchId]);

  useEffect(() => {
    if (matchId) {
      fetchGameData(true);
      const interval = setInterval(() => fetchGameData(false), 5000);
      return () => clearInterval(interval);
    }
  }, [matchId, isLoggedIn, user?.loginToken, fetchGameData]);

  useEffect(() => {
    if (isLoggedIn && user?.loginToken) {
      fetchMyBets();
      const interval = setInterval(fetchMyBets, 10000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, user?.loginToken, fetchMyBets]);

  const handleBetClick = (name, price, side) => {
    setActiveBet({ name, price, side });
  };

  const getTableRunners = (market) => {
    if (!market || !market.runners) return [];
    const runnersList = Object.values(market.runners);
    const mType = market.Type?.toUpperCase() || 'ODDS';
    const mId = (market.MarketId?.toString().startsWith('1.') || market.marketid?.toString().startsWith('1.'))
      ? (market.MarketId || market.marketid)
      : (market.eid || market.MarketId || market.marketid);

    const mRates = liveRates[mId];
    
    return runnersList.map((runner, idx) => {
      const rId = runner.selectionId || runner.SelectionId || runner.id || idx;
      const rates = getRunnerRates(mRates, rId, idx, mType);
      const isRunnerSuspended = rates?.isRunnerSuspended || false;
      
      if (mType === 'BOOKMAKER') {
        return {
          name: runner.RunnerName || runner.name,
          suspended: isRunnerSuspended,
          back: rates ? { p: rates.back.p1 || '-', s: rates.back.v1 || '' } : '-',
          lay: rates ? { p: rates.lay.p1 || '-', s: rates.lay.v1 || '' } : '-',
        };
      } else {
        return {
          name: runner.RunnerName || runner.name,
          suspended: isRunnerSuspended,
          b1: rates ? { p: rates.back.p1 || '-', s: rates.back.v1 || '' } : '-',
          b2: rates ? { p: rates.back.p2 || '-', s: rates.back.v2 || '' } : '-',
          b3: rates ? { p: rates.back.p3 || '-', s: rates.back.v3 || '' } : '-',
          l1: rates ? { p: rates.lay.p1 || '-', s: rates.lay.v1 || '' } : '-',
          l2: rates ? { p: rates.lay.p2 || '-', s: rates.lay.v2 || '' } : '-',
          l3: rates ? { p: rates.lay.p3 || '-', s: rates.lay.v3 || '' } : '-',
        };
      }
    });
  };

  const staticMatch = matchesData[matchId];
  const effectiveSport = (sportParam || staticMatch?.sport || "cricket").toLowerCase();
  const isRacing = ["racing", "horse-racing", "greyhound-racing"].includes(effectiveSport);
  const match = staticMatch || buildGenericMatch(matchId || "unknown-v-unknown", effectiveSport);

  const eventList = gameData ? Object.values(gameData.events || {}) : [];
  const matchOddsMarket = eventList.find(e => e.Type === 'ODDS' || e.name?.toUpperCase().includes('MATCH ODDS'));
  const bookmakerMarket = eventList.find(e => e.Type === 'BOOKMAKER' || e.name?.toUpperCase().includes('BOOKMAKER'));
  const fancyMarkets = eventList.filter(e => e.Type === 'FANCY');
  const lineMarkets = eventList.filter(e => (e.Type === 'LINE' || (e.name && e.name.toUpperCase().includes('LINE'))));

  const displayTeam1 = gameData?.Team1 || match.team1;
  const displayTeam2 = gameData?.Team2 || match.team2;
  const displayTitle = gameData?.Game_name || match.title;
  const displayDate = gameData?.DateTime || match.date;
  const displayStatus = gameData?.status || (gameData?.Inplay === 'true' || gameData?.Inplay === 'Y' || gameData?.Inplay === true ? "In Play" : match.status);

  const displayMatchOddsRunners = matchOddsMarket ? getTableRunners(matchOddsMarket) : [match.matchOdds.team1, match.matchOdds.team2];
  const displayBookmakerRunners = bookmakerMarket ? getTableRunners(bookmakerMarket) : [match.bookmaker.team1, match.bookmaker.team2];

  return (
    <div className="flex flex-1 overflow-hidden h-full bg-[#e0e0e0] font-[family-name:var(--font-roboto-condensed)]">
      <div className="flex-1 overflow-y-auto pb-4 [scrollbar-width:none]">
        {isRacing ? (
          <RacingView onBetClick={handleBetClick} />
        ) : (
          <div className="flex flex-col h-full">
            {/* Top Event Header */}
            <div className="bg-[#253845] text-white px-3.5 py-2.5 flex flex-row items-center justify-between shrink-0 mb-1 border-b border-[#3b5160] shadow-sm select-none gap-3">
              <button
                onClick={() => navigate("/")}
                className="bg-[#ffb400] hover:bg-[#e5a200] text-black font-bold text-[11px] px-3 py-1 rounded-sm uppercase cursor-pointer flex items-center gap-1.5 transition-all border-none"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                Back
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="margin-0 text-[14.5px] font-bold text-white leading-tight pr-1 tracking-wide uppercase truncate">
                    {displayTitle}
                  </h2>
                  {displayStatus === "In Play" && (
                    <span className="bg-[#2aa84a] text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-sm uppercase flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      In-Play
                    </span>
                  )}
                </div>
                <div className="text-[10.5px] text-[#ffb400] font-semibold mt-1 flex items-center gap-1 leading-none">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{displayDate}</span>
                </div>
              </div>
              
              <button
                onClick={() => setTvVisible(v => !v)}
                className={`flex items-center gap-1.5 px-3.5 h-[32px] rounded-sm font-black text-[12px] uppercase transition-all cursor-pointer border-none shrink-0 ${tvVisible ? 'bg-[#ffb400] text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                title="Toggle Live TV"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>{tvVisible ? 'Hide TV' : 'Live TV'}</span>
              </button>
            </div>

            <div className="flex-1 px-1 pt-0 overflow-y-auto [scrollbar-width:none]">
              {/* Desktop View */}
              <div className="md:block hidden">
                <Scoreboard team1={displayTeam1} team2={displayTeam2} time={gameData?.time || match.time} status={displayStatus} html={scoreboardHtml} title={displayTitle} date={displayDate} />
                <MultiRunnerOddsTable title={matchOddsMarket?.name || "MATCH_ODDS"} runners={displayMatchOddsRunners} onBetClick={handleBetClick} />
                <MultiRunnerOddsTable title={bookmakerMarket?.name || "Bookmaker"} runners={displayBookmakerRunners} isBookmaker={true} onBetClick={handleBetClick} />
                
                {lineMarkets.length > 0 && (
                  <FancyLineMarketTable title="LINE MARKET" markets={lineMarkets} liveRates={liveRates} onBetClick={handleBetClick} />
                )}
                {fancyMarkets.length > 0 && (
                  <FancyLineMarketTable title="FANCY MARKET" markets={fancyMarkets} liveRates={liveRates} onBetClick={handleBetClick} />
                )}
              </div>
              
              {/* Mobile View */}
              <div className="md:hidden block">
                <div className="flex bg-[#0088cc] text-white h-[40px] items-center text-center font-bold text-[13px] border-b border-white/20 shrink-0 mb-1">
                  <div onClick={() => setActiveTab("odds")} className={`flex-1 border-r border-white/20 h-full flex items-center justify-center cursor-pointer transition-colors ${activeTab === 'odds' ? 'bg-white/20' : 'active:bg-white/10'}`}>ODDS</div>
                  <div onClick={() => setActiveTab("matched")} className={`flex-1 border-r border-white/20 h-full flex items-center justify-center cursor-pointer transition-colors ${activeTab === 'matched' ? 'bg-white/20' : 'active:bg-white/10'}`}>MATCHED BET ({myBets.length})</div>
                  <div onClick={() => setActiveTab("tv")} className={`w-[60px] h-full flex items-center justify-center cursor-pointer transition-colors ${activeTab === 'tv' ? 'bg-white/20' : 'active:bg-white/10'}`}><LuTv size={20} /></div>
                </div>

                {activeTab === "odds" && (
                  <>
                    <Scoreboard team1={displayTeam1} team2={displayTeam2} time={gameData?.time || match.time} status={displayStatus} html={scoreboardHtml} title={displayTitle} date={displayDate} />
                    {activeBet && (
                      <div className="mb-2">
                        <BetSlip selection={activeBet.name} odds={activeBet.price} side={activeBet.side} onCancel={() => setActiveBet(null)} />
                      </div>
                    )}
                    <MultiRunnerOddsTable title={matchOddsMarket?.name || "MATCH_ODDS"} runners={displayMatchOddsRunners} onBetClick={handleBetClick} />
                    <MultiRunnerOddsTable title={bookmakerMarket?.name || "Bookmaker"} runners={displayBookmakerRunners} isBookmaker={true} onBetClick={handleBetClick} />
                    
                    {lineMarkets.length > 0 && (
                      <FancyLineMarketTable title="LINE MARKET" markets={lineMarkets} liveRates={liveRates} onBetClick={handleBetClick} />
                    )}
                    {fancyMarkets.length > 0 && (
                      <FancyLineMarketTable title="FANCY MARKET" markets={fancyMarkets} liveRates={liveRates} onBetClick={handleBetClick} />
                    )}
                  </>
                )}

                {activeTab === "matched" && (
                  <div className="flex flex-col bg-white rounded-none border border-gray-300">
                    <div className="bg-[#055172] text-white text-[14px] font-bold px-3 py-1 flex items-center h-[30px]">My Bets</div>
                    <MyBetsList bets={myBets} isLoading={isMyBetsLoading} />
                  </div>
                )}

                {activeTab === "tv" && (
                  <div className="bg-black flex items-center justify-center text-center h-[250px] border border-gray-800 rounded-none overflow-hidden">
                    {isLoggedIn ? (
                      <iframe src={`https://ambikaexch.in/extsys/newopentv/${matchId}`} className="w-full h-full border-none" allowFullScreen />
                    ) : (
                      <div className="text-red-600 font-black text-[24px] uppercase leading-tight tracking-wider">PLEASE LOGIN <br /> TO WATCH LIVE TV</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <RightPanel 
        sport={effectiveSport} 
        activeBet={activeBet} 
        onCancelBet={() => setActiveBet(null)}
        isLoggedIn={isLoggedIn}
        user={user}
        matchId={matchId}
        tvVisible={tvVisible}
        myBets={myBets}
        isMyBetsLoading={isMyBetsLoading}
      />
    </div>
  );
};

export default MatchDetail;

import { useState, useEffect, useRef } from 'react';
import { marketController } from '../controller';

const parseDate = (str) => {
  if (!str) return null;
  const dateVal = str.includes('T') ? str : str.replace(' ', 'T');
  let d = new Date(dateVal);
  if (isNaN(d.getTime())) {
    const parts = str.split(/[-/ :]/);
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (day <= 31 && month <= 11) {
        const hour = parseInt(parts[3] || '0', 10);
        const minute = parseInt(parts[4] || '0', 10);
        const second = parseInt(parts[5] || '0', 10);
        d = new Date(year, month, day, hour, minute, second);
      }
    }
  }
  return d && !isNaN(d.getTime()) ? d : null;
};

const formatTime = (date) => {
  if (!date || isNaN(date.getTime())) return '';
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

const formatDateTimeRelative = (date) => {
  if (!date || isNaN(date.getTime())) return '';
  const now = new Date();
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const targetDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const timeStr = formatTime(date);

  if (targetDay.getTime() === today.getTime()) {
    return `Today at ${timeStr}`;
  } else if (targetDay.getTime() === tomorrow.getTime()) {
    return `Tomorrow ${timeStr}`;
  } else {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year} ${timeStr}`;
  }
};

const extractOdd = (runner) => {
  if (!runner) return { price: "-", vol: "" };
  const bp = runner.back || runner.availableToBack || (runner.ex && runner.ex.availableToBack);
  const backPrices = Array.isArray(bp) ? bp : (bp ? Object.values(bp) : []);
  const bestBack = backPrices[0];
  if (!bestBack) return { price: "-", vol: "" };
  
  let price = bestBack.price || bestBack.rate || '-';
  let vol = bestBack.size || bestBack.volume || '';
  if (vol && Number(vol) >= 1000) {
    vol = (Number(vol) / 1000).toFixed(1) + 'k';
  }
  return { price: price.toString(), vol: vol.toString() };
};

const extractLayOdd = (runner) => {
  if (!runner) return { price: "-", vol: "" };
  const lp = runner.lay || runner.availableToLay || (runner.ex && runner.ex.availableToLay);
  const layPrices = Array.isArray(lp) ? lp : (lp ? Object.values(lp) : []);
  const bestLay = layPrices[0];
  if (!bestLay) return { price: "-", vol: "" };
  
  let price = bestLay.price || bestLay.rate || '-';
  let vol = bestLay.size || bestLay.volume || '';
  if (vol && Number(vol) >= 1000) {
    vol = (Number(vol) / 1000).toFixed(1) + 'k';
  }
  return { price: price.toString(), vol: vol.toString() };
};

export const useSportsData = (sports = 'Cricket,Football,Soccer,Tennis') => {
  const [inplayEvents, setInplayEvents] = useState([]);
  const [todayEvents, setTodayEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const pollingRef = useRef(null);
  
  const [matches, setMatches] = useState([]);
  const [odds, setOdds] = useState({});

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const res = await marketController.getGameList(sports);
        let matchData = [];
        if (res && res.matches) {
          matchData = res.matches;
        } else if (res && typeof res === 'object') {
          matchData = Object.values(res).filter(v => typeof v === 'object' && v !== null && (v.MarketId || v.marketid));
        } else if (Array.isArray(res)) {
          matchData = res;
        }
        
        // Remove empty records
        matchData = matchData.filter(m => m.MarketId || m.marketid);

        setMatches(matchData);
      } catch (err) {
        console.error('Failed to fetch matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [sports]);

  useEffect(() => {
    if (matches.length === 0) return;
    const marketIds = matches.map(m => m.marketId || m.MarketId).filter(id => !!id).join(',');
    if (!marketIds) return;

    const fetchRates = async () => {
      try {
        const res = await marketController.getLiveRates(marketIds);
        if (res && typeof res === 'object' && !res.error) {
          setOdds(prev => ({ ...prev, ...res }));
        }
      } catch (err) { }
    };

    let isMounted = true;
    const poll = async () => {
      if (!isMounted) return;
      await fetchRates();
      pollingRef.current = setTimeout(poll, 1500);
    };
    poll();
    return () => {
      isMounted = false;
      if (pollingRef.current) clearTimeout(pollingRef.current);
    };
  }, [matches]);

  useEffect(() => {
    const now = new Date();

    const inplay = [];
    const todayMatches = [];
    const upcoming = [];

    matches.forEach(m => {
      const startTimeStr = m.DateTime || m.dateTime || m.Datetime || m.staredtime || m.StartTime || '';
      const startTime = parseDate(startTimeStr);
      
      const team1 = m.Team1 || m.team1;
      const team2 = m.Team2 || m.team2;
      const gName = m.Game_name || m.GameName || m.ename || m.name || m.Competition;
      
      let teams = ["Team 1", "Team 2"];
      if (team1 && team2) {
        teams = team2 === 'TOURNAMENT_WINNER' ? [team1, ""] : [team1, team2];
      } else if (gName) {
        teams = [gName, ""];
      }

      const isLive = (startTime && startTime <= now) || (m.status === 'IN_PLAY' || m.inplay);
      
      const marketId = m.marketId || m.MarketId;
      const matchOdds = odds[marketId] || {};
      const status = (matchOdds.status || matchOdds.Status || '').toUpperCase();
      const suspended = status === 'SUSPENDED' || status === 'CLOSED';

      const rawRunners = matchOdds.runner || matchOdds.runners || [];
      const runnerArr = Array.isArray(rawRunners) ? rawRunners : Object.values(rawRunners);

      const rowOdds = [null, null, null];
      if (typeof rawRunners === 'object' && !Array.isArray(rawRunners)) {
        if (rawRunners["0"]) rowOdds[0] = rawRunners["0"];
        if (rawRunners["1"]) rowOdds[1] = rawRunners["1"];
        if (rawRunners["2"]) rowOdds[2] = rawRunners["2"];
      } else {
        runnerArr.forEach((r, idx) => { if (idx < 3) rowOdds[idx] = r; });
      }
      
      if (rowOdds[0] && rowOdds[1] && !rowOdds[2]) {
        rowOdds[2] = rowOdds[1];
        rowOdds[1] = null;
      }

      const formattedOdds = [];
      for (let i = 0; i < 3; i++) {
        formattedOdds.push(extractOdd(rowOdds[i])); // Back
        formattedOdds.push(extractLayOdd(rowOdds[i])); // Lay
      }

      const eventItem = {
        id: m.gid || m.Gid || m.Event_Id || m.eid || marketId || Math.random(),
        name: gName || teams.join(' v '),
        startTime: startTimeStr,
        time: formatDateTimeRelative(startTime),
        teams: teams,
        hasTv: !!(m.tv || m.TV === 'Y' || m.isTV === 'Y'),
        hasBM: !!(m.bm || m.bookmaker || m.BM === 'Y'),
        hasF: !!(m.f || m.fancy || m.Fancy === 'Y'),
        hasGoal: !!(m.Goal === 'Y' || m.goal === 'Y'),
        hasWset: !!(m.Wset === 'Y' || m.wset === 'Y'),
        odds: formattedOdds,
        suspended: suspended,
        isLive: isLive,
        sport: (m.sport || sports || '').toLowerCase()
      };

      if (isLive) {
        inplay.push(eventItem);
      } else {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const targetDay = startTime ? new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()) : null;

        if (targetDay && targetDay.getTime() === today.getTime()) {
          todayMatches.push(eventItem);
        } else {
          upcoming.push(eventItem);
        }
      }
    });

    setInplayEvents(inplay);
    setTodayEvents(todayMatches);
    setUpcomingEvents(upcoming);
  }, [matches, odds, sports]);

  return { inplayEvents, todayEvents, upcomingEvents, loading };
};

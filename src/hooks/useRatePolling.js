import { useState, useEffect, useRef } from 'react';
import { marketController } from '../controller';

const findData = (obj, mid, ekey, currentDepth = 0) => {
  if (!obj || typeof obj !== 'object' || currentDepth > 5) return null;

  // 1. Direct match by key
  if (ekey && obj[ekey]) return obj[ekey];
  if (mid && obj[mid]) return obj[mid];

  // 2. Check if the object itself is the market we want
  const objId = obj.MarketId || obj.marketId || obj.eid || obj.ekey || obj.marketid || obj.id;
  if (mid && objId?.toString() === mid?.toString()) return obj;
  if (ekey && objId?.toString() === ekey?.toString()) return obj;

  // 3. Search children
  const keys = Object.keys(obj);
  for (const k of keys) {
    let val = obj[k];
    if (typeof val === 'string' && (val.startsWith('{') || val.startsWith('['))) {
      try { val = JSON.parse(val); } catch (e) { }
    }

    if (typeof val === 'object' && val !== null) {
      const subId = val.MarketId || val.marketId || val.eid || val.ekey || val.marketid || val.id;
      if (mid && subId?.toString() === mid?.toString()) return val;
      if (ekey && subId?.toString() === ekey?.toString()) return val;

      if (Array.isArray(val)) {
        for (const item of val) {
          let pItem = item;
          if (typeof item === 'string') try { pItem = JSON.parse(item); } catch (e) { }
          const itemId = pItem?.MarketId || pItem?.marketId || pItem?.eid || pItem?.ekey || pItem?.id;
          if (mid && itemId?.toString() === mid?.toString()) return pItem;
          if (ekey && itemId?.toString() === ekey?.toString()) return pItem;

          if (typeof pItem === 'object' && pItem !== null) {
            const found = findData(pItem, mid, ekey, currentDepth + 1);
            if (found) return found;
          }
        }
      } else {
        const found = findData(val, mid, ekey, currentDepth + 1);
        if (found) return found;
      }
    }
  }
  return null;
};

export const useRatePolling = (matchId, gameData, interval = 1000) => {
  const [liveRates, setLiveRates] = useState({});
  const [scoreboardHtml, setScoreboardHtml] = useState(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    let timeoutId;

    const poll = async () => {
      if (!isMountedRef.current || !gameData) return;

      const eventList = [
        ...(gameData.ODDS || []),
        ...(gameData.BOOKMAKER || []),
        ...(gameData.FANCY || []),
        ...(gameData.events ? Object.values(gameData.events) : [])
      ];

      const seenIds = new Set();
      const marketsToPoll = [];
      eventList.forEach(m => {
        if (!m) return;
        const isSpecial = ['LINE', 'FANCY', 'BOOKMAKER', 'EXTRA', 'GOAL'].includes(m.Type || m.category) ||
          (m.name || '').toLowerCase().includes('line');
        const mid = (m.MarketId?.toString().startsWith('1.') || m.marketid?.toString().startsWith('1.'))
          ? (m.MarketId || m.marketid)
          : (isSpecial ? (m.eid || m.MarketId || m.marketid) : (m.MarketId || m.marketid || m.eid));

        if (mid && !seenIds.has(mid.toString())) {
          seenIds.add(mid.toString());
          marketsToPoll.push({
            gid: matchId,
            MarketId: mid.toString(),
            eventid: gameData.Event_Id || gameData.eventid || matchId,
            gkey: m.gkey || '',
            ekey: m.ekey || ''
          });
        }
      });

      if (marketsToPoll.length > 0) {
        try {
          const baseRequest = {
            gid: matchId,
            eventid: gameData.Event_Id || gameData.eventid || matchId
          };

          const betfairMarketIds = marketsToPoll
            .map(m => m.MarketId)
            .filter(id => id && id.toString().startsWith('1.'));
          const uniqueBetfairIds = [...new Set(betfairMarketIds)];

          const requests = [];
          if (uniqueBetfairIds.length > 0) {
            uniqueBetfairIds.forEach(marketId => {
              requests.push(marketController.getGameRate({ ...baseRequest, MarketId: marketId }));
            });
          } else {
            requests.push(marketController.getGameRate(baseRequest));
          }

          const responses = await Promise.all(requests);
          if (!isMountedRef.current) return;

          const res = {};
          responses.forEach(response => {
            if (response && !response.error) {
              Object.keys(response).forEach(k => {
                if (typeof response[k] === 'object' && response[k] !== null && !Array.isArray(response[k])) {
                  res[k] = { ...(res[k] || {}), ...response[k] };
                } else if (!res[k]) {
                  res[k] = response[k];
                }
              });
            }
          });

          if (Object.keys(res).length > 0) {
            // Scoreboard extraction
            let foundHtml = null;
            const lookupKeys = ["2", "1", "3", 2, 1, 3];

            // Check root level first
            for (const k of lookupKeys) {
              const val = res[k];
              if (val && typeof val === 'string' && (val.includes('<div') || val.includes('<style'))) {
                foundHtml = val;
                break;
              }
            }

            // If not at root, check inside markets
            if (!foundHtml) {
              for (const m of marketsToPoll) {
                for (const k of lookupKeys) {
                  const val = m.MarketId && res[m.MarketId] && res[m.MarketId][k];
                  if (val && typeof val === 'string' && (val.includes('<div') || val.includes('<style'))) {
                    foundHtml = val;
                    break;
                  }
                }
                if (foundHtml) break;
              }
            }
            if (foundHtml) setScoreboardHtml(foundHtml);

            // Market data extraction
            setLiveRates(prev => {
              const updatedRates = { ...prev };
              let hasChanges = false;

              marketsToPoll.forEach(m => {
                let finalData = findData(res, m.MarketId, m.ekey);
                if (finalData) {
                  if (typeof finalData === 'string') {
                    try { finalData = JSON.parse(finalData); } catch (e) { }
                  }
                  updatedRates[m.MarketId] = finalData;
                  hasChanges = true;
                }
              });

              return hasChanges ? updatedRates : prev;
            });
          }
        } catch (e) {
          console.error('Polling error for game:', matchId, e);
        }
      }

      timeoutId = setTimeout(poll, interval);
    };

    poll();

    return () => {
      isMountedRef.current = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [matchId, gameData, interval]);

  return { liveRates, scoreboardHtml };
};

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsXLg } from "react-icons/bs";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";

// ─── Data ────────────────────────────────────────────────────────────────────

const racingItems = [
  {
    id: "horse-racing",
    label: "Horse Racing",
    subItems: [
      { label: "13:01 Cambridge (NZ)", href: "#" },
      { label: "13:15 Pakenham (AU)", href: "#" },
      { label: "13:22 Newcastle (AU)", href: "#" },
      { label: "13:27 Cambridge (NZ)", href: "#" },
      { label: "13:28 Belmont (AU)", href: "#" },
      { label: "13:29 Kilmore (AU)", href: "#" },
      { label: "13:45 Pakenham (AU)", href: "#" },
      { label: "13:51 Newcastle (AU)", href: "#" },
      { label: "13:53 Cambridge (NZ)", href: "#" },
      { label: "14:05 Belmont (AU)", href: "#" },
      { label: "14:06 Kilmore (AU)", href: "#" },
      { label: "14:15 Pakenham (AU)", href: "#" },
      { label: "14:21 Newcastle (AU)", href: "#" },
      { label: "14:24 Cambridge (NZ)", href: "#" },
      { label: "14:35 Belmont (AU)", href: "#" },
      { label: "14:36 Kilmore (AU)", href: "#" },
      { label: "14:45 Pakenham (AU)", href: "#" },
      { label: "14:51 Newcastle (AU)", href: "#" },
    ],
  },
  {
    id: "greyhound-racing",
    label: "Greyhound Racing",
    subItems: [
      { label: "13:04 Shepparton (AU)", href: "#" },
      { label: "13:12 Richmond (AU)", href: "#" },
      { label: "13:22 Devonport (AU)", href: "#" },
    ],
  },
];

const othersItems = [
  { id: "our-casino", label: "Our Casino", href: "#", blink: true },
  { id: "our-vip-casino", label: "Our VIP Casino", href: "#", blink: true },
  { id: "our-premium-casino", label: "Our Premium Casino", href: "#", blink: true },
  { id: "our-virtual", label: "Our Virtual", href: "#", blink: true },
  { id: "tembo", label: "Tembo", href: "#", blink: false },
  { id: "live-casino", label: "Live Casino", href: "#", blink: false },
  { id: "slot-game", label: "Slot Game", href: "#", blink: false },
  { id: "fantasy-game", label: "Fantasy Game", href: "#", blink: false },
];

const allSportsItems = [
  {
    id: "politics",
    label: "Politics",
    subItems: [
      { label: "Assembly Election 2026", subItems: [{ label: "Who will be CM of WB?", href: "#" }, { label: "Bihar Assembly Elections 2025", href: "#" }] },
      { label: "World Politics", subItems: [{ label: "US Presidential Election", href: "#" }] },
    ],
  },
  {
    id: "cricket",
    label: "Cricket",
    subItems: [
      { label: "Indian Premier League", subItems: [{ label: "Lucknow Super Giants v Delhi Capitals", href: "#" }, { label: "Mumbai Indians v Kolkata Knight Riders", href: "#" }, { label: "Chennai Super Kings v Royal Challengers", href: "#" }] },
      { label: "T5 XI", subItems: [{ label: "T5 XI Match 1", href: "#" }] },
      { label: "Pakistan Super League", subItems: [{ label: "Karachi Kings v Lahore Qalandars", href: "#" }, { label: "Peshawar Zalmi v Islamabad United", href: "#" }] },
      { label: "Virtual Cricket League", subItems: [{ label: "Virtual Match 1", href: "#" }, { label: "Virtual Match 2", href: "#" }] },
      { label: "Womens One Day Internationals", subItems: [{ label: "India Women v Australia Women", href: "#" }] },
      { label: "T10 XI", subItems: [{ label: "T10 XI Match 1", href: "#" }] },
      { label: "Womens Premier League", subItems: [{ label: "Mumbai Indians W v Delhi Capitals W", href: "#" }] },
      { label: "Virtual Cricket - IPL", subItems: [{ label: "Virtual IPL Match 1", href: "#" }] },
      { label: "Caribbean Premier League", subItems: [{ label: "Trinbago Knight Riders v Barbados Royals", href: "#" }] },
      { label: "T20 Blast", subItems: [{ label: "Yorkshire v Lancashire", href: "#" }, { label: "Surrey v Essex", href: "#" }] },
      { label: "The Hundred", subItems: [{ label: "Oval Invincibles v London Spirit", href: "#" }] },
      { label: "Inter-Provincial Cup", subItems: [{ label: "North West Warriors v Leinster Lightning", href: "#" }] },
      { label: "Royal London One-Day Cup", subItems: [{ label: "Hampshire v Surrey", href: "#" }] },
    ],
  },
  {
    id: "football",
    label: "Football",
    subItems: [
      { label: "UEFA Champions League", subItems: [{ label: "Real Madrid v Bayern Munich", href: "#" }, { label: "PSG v Arsenal", href: "#" }] },
      { label: "UEFA Conference League", subItems: [{ label: "Chelsea v Fiorentina", href: "#" }] },
      { label: "ENGLAND Premier League", subItems: [{ label: "Manchester City v Liverpool", href: "#" }, { label: "Arsenal v Chelsea", href: "#" }] },
      { label: "ENGLAND League One", subItems: [{ label: "Preston v Oxford", href: "#" }] },
      { label: "SPAIN LaLiga", subItems: [{ label: "Barcelona v Real Madrid", href: "#" }, { label: "Atletico Madrid v Sevilla", href: "#" }] },
      { label: "SPAIN LaLiga2", subItems: [{ label: "Elche v Mirandes", href: "#" }] },
      { label: "FRANCE Ligue 1", subItems: [{ label: "PSG v Lyon", href: "#" }, { label: "Marseille v Monaco", href: "#" }] },
      { label: "GERMANY Bundesliga", subItems: [{ label: "Dortmund v Bayern Munich", href: "#" }, { label: "RB Leipzig v Bayer Leverkusen", href: "#" }] },
      { label: "ITALY Serie A", subItems: [{ label: "Juventus v AC Milan", href: "#" }, { label: "Inter v Napoli", href: "#" }] },
      { label: "URUGUAY Liga AUF Uruguaya", subItems: [{ label: "Torque v Nacional (Uru)", href: "#" }] },
      { label: "KENYA Premier League", subItems: [{ label: "Gor Mahia v AFC Leopards", href: "#" }] },
      { label: "SAUDI ARABIA Division 2", subItems: [{ label: "Al Taawoun v Al Batin", href: "#" }] },
      { label: "MEXICO Liga MX Women", subItems: [{ label: "America Women v Chivas Women", href: "#" }] },
    ],
  },
  {
    id: "tennis",
    label: "Tennis",
    subItems: [
      { label: "ATP - Roland Garros", subItems: [{ label: "Djokovic v Alcaraz", href: "#" }, { label: "Sinner v Medvedev", href: "#" }] },
      { label: "WTA - Roland Garros", subItems: [{ label: "Swiatek v Sabalenka", href: "#" }] },
      { label: "ATP - Wimbledon", subItems: [{ label: "Tiafoe v Sinner", href: "#" }] },
    ],
  },
  {
    id: "table-tennis",
    label: "Table Tennis",
    subItems: [
      { label: "World Tour", subItems: [{ label: "Fan Zhendong v Ma Long", href: "#" }, { label: "Wang Chuqin v Calderano", href: "#" }] },
    ],
  },
  {
    id: "badminton",
    label: "Badminton",
    subItems: [
      { label: "BWF World Tour", subItems: [{ label: "Viktor Axelsen v Shi Yuqi", href: "#" }, { label: "Carolina Marin v An Seyoung", href: "#" }] },
    ],
  },
  {
    id: "esoccer",
    label: "Esoccer",
    subItems: [
      { label: "Battle - 8 mins play", subItems: [{ label: "FC Barcelona v Real Madrid", href: "#" }, { label: "Man City v Liverpool", href: "#" }] },
    ],
  },
  {
    id: "basketball",
    label: "Basketball",
    subItems: [
      { label: "NBA", subItems: [{ label: "LA Lakers v Golden State Warriors", href: "#" }, { label: "Boston Celtics v Milwaukee Bucks", href: "#" }] },
      { label: "EuroLeague", subItems: [{ label: "Real Madrid v CSKA Moscow", href: "#" }] },
    ],
  },
  {
    id: "volleyball",
    label: "Volleyball",
    subItems: [
      { label: "CEV Champions League", subItems: [{ label: "Trentino v Zenit Kazan", href: "#" }] },
    ],
  },
  {
    id: "snooker",
    label: "Snooker",
    subItems: [
      { label: "World Championship", subItems: [{ label: "O'Sullivan v Judd Trump", href: "#" }, { label: "Selby v Neil Robertson", href: "#" }] },
    ],
  },
  {
    id: "ice-hockey",
    label: "Ice Hockey",
    subItems: [
      { label: "NHL", subItems: [{ label: "Toronto Maple Leafs v Montreal", href: "#" }] },
      { label: "KHL", subItems: [{ label: "CSKA Moscow v SKA St Petersburg", href: "#" }] },
    ],
  },
  {
    id: "egames",
    label: "E Games",
    subItems: [
      { label: "CS:GO", subItems: [{ label: "Natus Vincere v Astralis", href: "#" }] },
      { label: "Dota 2", subItems: [{ label: "Team Spirit v PSG.LGD", href: "#" }] },
    ],
  },
  {
    id: "futsal",
    label: "Futsal",
    subItems: [
      { label: "UEFA Futsal CL", subItems: [{ label: "Barcelona v Sporting CP", href: "#" }] },
    ],
  },
  {
    id: "handball",
    label: "Handball",
    subItems: [
      { label: "EHF Champions League", subItems: [{ label: "THW Kiel v FC Barcelona", href: "#" }] },
    ],
  },
  {
    id: "kabaddi",
    label: "Kabaddi",
    subItems: [
      { label: "Pro Kabaddi League", subItems: [{ label: "Patna Pirates v Jaipur Pink Panthers", href: "#" }, { label: "Bengaluru Bulls v UP Yoddha", href: "#" }] },
    ],
  },
  {
    id: "golf",
    label: "Golf",
    subItems: [
      { label: "PGA Tour", subItems: [{ label: "The Masters - Round 1", href: "#" }, { label: "US Open - Round 2", href: "#" }] },
    ],
  },
  {
    id: "rugby-league",
    label: "Rugby League",
    subItems: [
      { label: "NRL", subItems: [{ label: "Melbourne Storm v Sydney Roosters", href: "#" }, { label: "Brisbane Broncos v Penrith Panthers", href: "#" }] },
    ],
  },
  {
    id: "boxing",
    label: "Boxing",
    subItems: [
      { label: "Heavyweight Championship", subItems: [{ label: "Tyson Fury v Anthony Joshua", href: "#" }] },
    ],
  },
  {
    id: "beach-volleyball",
    label: "Beach Volleyball",
    subItems: [
      { label: "FIVB World Tour", subItems: [{ label: "Brazil v USA", href: "#" }] },
    ],
  },
  {
    id: "mixed-martial-arts",
    label: "Mixed Martial Arts",
    subItems: [
      { label: "UFC", subItems: [{ label: "Adesanya v Pereira", href: "#" }, { label: "Jon Jones v Ciryl Gane", href: "#" }] },
    ],
  },
  {
    id: "motocf",
    label: "MotoCF",
    subItems: [
      { label: "MotoGP World Championship", subItems: [{ label: "Marquez v Bagnaia", href: "#" }] },
    ],
  },
  {
    id: "chess",
    label: "Chess",
    subItems: [
      { label: "FIDE World Championship", subItems: [{ label: "Magnus Carlsen v Ding Liren", href: "#" }] },
    ],
  },
  {
    id: "cycling",
    label: "Cycling",
    subItems: [
      { label: "Tour de France", subItems: [{ label: "Stage 1 - Winner", href: "#" }, { label: "Overall Classification", href: "#" }] },
    ],
  },
  {
    id: "motorbikes",
    label: "Motorbikes",
    subItems: [
      { label: "Superbike World Championship", subItems: [{ label: "Race 1 - Phillip Island", href: "#" }] },
    ],
  },
  {
    id: "athletics",
    label: "Athletics",
    subItems: [
      { label: "World Athletics Championship", subItems: [{ label: "100m Men Final", href: "#" }, { label: "Marathon Women", href: "#" }] },
    ],
  },
  {
    id: "basketball-3x3",
    label: "Basketball 3X3",
    subItems: [
      { label: "FIBA 3x3 World Tour", subItems: [{ label: "USA v France", href: "#" }] },
    ],
  },
  {
    id: "sumo",
    label: "Sumo",
    subItems: [
      { label: "Grand Sumo Tournament", subItems: [{ label: "Yokohama Basho - Day 1", href: "#" }] },
    ],
  },
  {
    id: "virtual-sports",
    label: "Virtual sports",
    subItems: [
      { label: "Virtual Football", subItems: [{ label: "Virtual Premier League", href: "#" }] },
      { label: "Virtual Horse Racing", subItems: [{ label: "Virtual Cheltenham", href: "#" }] },
    ],
  },
  {
    id: "motor-sports",
    label: "Motor Sports",
    subItems: [
      { label: "Formula 1", subItems: [{ label: "Max Verstappen v Lewis Hamilton", href: "#" }, { label: "Monaco Grand Prix", href: "#" }] },
      { label: "NASCAR", subItems: [{ label: "Daytona 500", href: "#" }] },
    ],
  },
  {
    id: "baseball",
    label: "Baseball",
    subItems: [
      { label: "MLB", subItems: [{ label: "New York Yankees v Boston Red Sox", href: "#" }, { label: "LA Dodgers v San Francisco Giants", href: "#" }] },
    ],
  },
  {
    id: "rugby-union",
    label: "Rugby Union",
    subItems: [
      { label: "Six Nations", subItems: [{ label: "England v Ireland", href: "#" }, { label: "France v Scotland", href: "#" }] },
    ],
  },
  {
    id: "darts",
    label: "Darts",
    subItems: [
      { label: "PDC World Championship", subItems: [{ label: "van Gerwen v Luke Littler", href: "#" }] },
    ],
  },
  {
    id: "american-football",
    label: "American Football",
    subItems: [
      { label: "NFL", subItems: [{ label: "Kansas City Chiefs v 49ers", href: "#" }, { label: "Dallas Cowboys v Eagles", href: "#" }] },
    ],
  },
  {
    id: "soccer",
    label: "Soccer",
    subItems: [
      { label: "MLS", subItems: [{ label: "LA Galaxy v New York City FC", href: "#" }, { label: "Inter Miami v Toronto FC", href: "#" }] },
    ],
  },
  {
    id: "esports",
    label: "Esports",
    subItems: [
      { label: "League of Legends", subItems: [{ label: "T1 v Gen.G", href: "#" }] },
      { label: "VALORANT", subItems: [{ label: "Sentinels v Cloud9", href: "#" }] },
    ],
  },
  {
    id: "boat-racing",
    label: "Boat Racing",
    subItems: [
      { label: "Formula E-Powerboat", subItems: [{ label: "Grand Prix of Dubai", href: "#" }] },
    ],
  },
  {
    id: "wrestling",
    label: "Wrestling",
    subItems: [
      { label: "WWE", subItems: [{ label: "WrestleMania - Main Event", href: "#" }, { label: "Royal Rumble", href: "#" }] },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Convert any label to a URL-safe slug */
const toSlug = (str) =>
  str
    .toLowerCase()
    .replace(/\s+\/\s+/g, "-v-")   // "A / B" → "A-v-B"
    .replace(/\s+v\s+/gi, "-v-")  // "A v B" → "A-v-B"
    .replace(/[^a-z0-9-]/g, "-")  // strip non-alphanum
    .replace(/-+/g, "-")           // collapse dashes
    .replace(/^-|-$/g, "");        // trim edges

// ─── Components ───────────────────────────────────────────────────────────────

/** Level 3 — Match link — navigates to /match/:sport/:slug */
const MatchItem = ({ label, sport }) => {
  const navigate = useNavigate();
  const slug = toSlug(label);
  return (
    <a
      className="sb-match"
      href="#"
      onClick={e => { e.preventDefault(); navigate(`/match/${sport || 'cricket'}/${slug}`); }}
    >
      {label}
    </a>
  );
};

/** Level 2 — League with match submenu */
const LeagueItem = ({ label, subItems, sport }) => {
  const [open, setOpen] = useState(false);
  const has = subItems && subItems.length > 0;
  return (
    <div>
      <div className={`sb-league${has ? " sb-clickable" : ""}`} onClick={() => has && setOpen(p => !p)}>
        <span className="sb-icon">{open ? <BsDashSquare /> : <BsPlusSquare />}</span>
        <span className="sb-lbl">{label}</span>
      </div>
      {open && has && (
        <div className="sb-match-list">
          {subItems.map((m, i) => <MatchItem key={i} {...m} sport={sport} />)}
        </div>
      )}
    </div>
  );
};

/** Level 1 — Sport with league submenu */
const SportItem = ({ label, subItems }) => {
  const [open, setOpen] = useState(false);
  const has = subItems && subItems.length > 0;
  const sportSlug = toSlug(label); // e.g. "football", "cricket", "tennis"
  return (
    <div>
      <div className={`sb-sport${has ? " sb-clickable" : ""}`} onClick={() => has && setOpen(p => !p)}>
        <span className="sb-icon">{open ? <BsDashSquare /> : <BsPlusSquare />}</span>
        <span className="sb-lbl">{label}</span>
      </div>
      {open && has && (
        <div className="sb-league-list">
          {subItems.map((l, i) => <LeagueItem key={i} {...l} sport={sportSlug} />)}
        </div>
      )}
    </div>
  );
};

/** Plain link — Others section (no icon, optional blink) */
const PlainItem = ({ label, href, blink }) => (
  <a href={href} className={`sb-plain${blink ? " sb-blink" : ""}`}>{label}</a>
);

/** Racing item — expandable to time slots, each slot navigates to match */
const RacingItem = ({ label, subItems }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const slug = toSlug(label);
  return (
    <div>
      <a
        href="#"
        className="sb-plain"
        onClick={e => { e.preventDefault(); if (subItems?.length) setOpen(p => !p); else navigate(`/match/racing/${slug}`); }}
      >
        {label}
      </a>
      {open && subItems?.length > 0 && (
        <div className="sb-match-list">
          {subItems.map((m, i) => <MatchItem key={i} {...m} sport="racing" />)}
        </div>
      )}
    </div>
  );
};

/** Section accordion header */
const Section = ({ title, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="sb-section">
      <button className="sb-section-hdr" onClick={() => setOpen(p => !p)}>
        <span>{title}</span>
        {/* chevron: points DOWN when open, points RIGHT when closed */}
        <svg
          className={`sb-chevron${open ? " sb-open" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="sb-body">{children}</div>}
    </div>
  );
};

// ─── Root ─────────────────────────────────────────────────────────────────────

const Sidebar = ({ onClose }) => {
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [popoverTop, setPopoverTop] = useState(0);
  const navigate = useNavigate();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeSubMenu && 
          !event.target.closest('.sb-popover') && 
          !event.target.closest('.sb-plain') && 
          !event.target.closest('.sb-sport')) {
        setActiveSubMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeSubMenu]);

  const handleRacingClick = (e, item) => {
    e.preventDefault();
    if (item.subItems?.length) {
      if (activeSubMenu?.id === item.id) {
        setActiveSubMenu(null);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        const parentRect = e.currentTarget.closest('.flex').getBoundingClientRect();
        let topOffset = rect.top - parentRect.top;
        
        // Prevent menu from going off-screen at the bottom
        const popoverMaxHeight = 450;
        const availableHeight = window.innerHeight - 75; // Approx header height
        if (topOffset + popoverMaxHeight > availableHeight) {
          topOffset = Math.max(0, availableHeight - popoverMaxHeight);
        }

        setPopoverTop(topOffset);
        setActiveSubMenu(item);
      }
    } else {
      navigate(`/match/racing/${toSlug(item.label)}`);
      setActiveSubMenu(null);
    }
  };

  return (
    <>
      <style>{`
      /* ── Container ── */
      /* ── Container ── */
      .sb-root {
        width: 240px;
        min-width: 240px;
        background: #bbbbbb;
        overflow-y: auto;
        height: 100%;
        scrollbar-width: none;
        -ms-overflow-style: none;
        font-family: Arial, Helvetica, sans-serif;
        border-right: 1px solid #999;
        position: relative;
      }
      .sb-root::-webkit-scrollbar { display: none; }

      /* ── Section header ── */
      .sb-section-hdr {
        width: 100%;
        background: #0088cc;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        padding: 5px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        border: none;
        border-bottom: 1px solid rgba(255,255,255,0.2);
        user-select: none;
        text-align: left;
      }
      .sb-section-hdr:hover { background: #007ab8; }

      /* ── Chevron: DOWN (∨) when closed, UP (∧) when open ── */
      .sb-chevron {
        width: 12px;
        height: 12px;
        flex-shrink: 0;
        transition: transform 0.2s;
        transform: rotate(0deg);    /* closed = pointing down ∨ */
      }
      .sb-chevron.sb-open {
        transform: rotate(180deg);  /* open = pointing up ∧ */
      }

      /* ── Section body ── */
      .sb-body { background: #bbbbbb; }

      /* ── Plain item (Racing items, Others items — no icon) ── */
      .sb-plain {
        display: flex;
        align-items: center;
        padding: 2px 5px 2px 15px;
        min-height: 26px;
        font-size: 14px;
        color: #000;
        text-decoration: none;
        border-bottom: 0.8px solid #9e9e9e;
        background: #bbbbbb;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sb-plain:hover, .sb-plain.sb-active { background: #a5a5a5; }
      .sb-plain.sb-blink { animation: sb-blink 1s step-start infinite; }

      @keyframes sb-blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }

      /* ── Sport row — Level 1 (has [+] icon) ── */
      .sb-sport {
        display: flex;
        align-items: center;
        padding: 2px 5px;
        min-height: 26px;
        font-size: 14px;
        color: #000;
        border-bottom: 0.8px solid #9e9e9e;
        background: #bbbbbb;
        user-select: none;
      }
      .sb-sport.sb-clickable { cursor: pointer; }
      .sb-sport.sb-clickable:hover { background: #a5a5a5; }

      /* ── League container — Level 2 ── */
      .sb-league-list { background: #c8c8c8; }

      /* ── League row — Level 2 ── */
      .sb-league {
        display: flex;
        align-items: center;
        padding: 2px 5px 2px 15px;
        min-height: 26px;
        font-size: 13px;
        color: #000;
        border-bottom: 0.8px solid #9e9e9e;
        background: #c8c8c8;
        user-select: none;
      }
      .sb-league.sb-clickable { cursor: pointer; }
      .sb-league.sb-clickable:hover { background: #b8b8b8; }

      /* ── Match container — Level 3 ── */
      .sb-match-list { background: #d5d5d5; }

      /* ── Match row — Level 3 ── */
      .sb-match {
        display: block;
        padding: 2px 5px 2px 30px;
        min-height: 24px;
        line-height: 18px;
        font-size: 12px;
        color: #111;
        text-decoration: none;
        border-bottom: 0.8px solid #bbb;
        background: #d5d5d5;
        white-space: normal;
        word-break: break-word;
      }
      .sb-match:hover { background: #c5c5c5; }

      /* ── Icon wrapper ── */
      .sb-icon {
        display: flex;
        align-items: center;
        margin-right: 5px;
        font-size: 12px;
        flex-shrink: 0;
        color: #333;
      }

      /* ── Text label ── */
      .sb-lbl {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* ── Side Menu Panel (Popout) ── */
      .sb-popover {
        position: absolute;
        left: 240px;
        width: 215px;
        max-height: 450px;
        background: #fff;
        z-index: 1000;
        box-shadow: 2px 2px 12px rgba(0,0,0,0.25);
        border: 1px solid #ccc;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        min-height: 0;
        scrollbar-width: thin;
        scrollbar-color: #bbbbbb transparent;
      }
      .sb-popover::-webkit-scrollbar { width: 5px; }
      .sb-popover::-webkit-scrollbar-thumb { background: #bbb; border-radius: 10px; }
      .sb-popover-hdr {
        padding: 10px 15px;
        font-size: 17px;
        font-weight: 800;
        color: #000;
        border-bottom: 2px solid #ddd;
        background: #fff;
        position: sticky;
        top: 0;
        z-index: 10;
        text-align: left;
      }
      .sb-popover-item {
        padding: 7px 15px;
        font-size: 14.5px;
        color: #333;
        text-decoration: none;
        border-bottom: 1px solid #f2f2f2;
        transition: background 0.15s;
        white-space: nowrap;
      }
      .sb-popover-item:hover {
        background: #f8f8f8;
        color: #000;
      }
    `}</style>

    <div className="flex h-full relative" onMouseLeave={() => {}}>
      <aside className="sb-root shrink-0 h-full overflow-y-auto">
        {/* Racing Sports */}
        <Section title="Racing Sports">
          {racingItems.map(item => (
            <a
              key={item.id}
              href="#"
              className={`sb-plain ${activeSubMenu?.id === item.id ? "sb-active" : ""}`}
              onClick={e => handleRacingClick(e, item)}
            >
              {item.label}
            </a>
          ))}
        </Section>

        {/* Others */}
        <Section title="Others">
          {othersItems.map(item => <PlainItem key={item.id} {...item} />)}
        </Section>

        {/* All Sports */}
        <Section title="All Sports">
          {allSportsItems.map(item => <SportItem key={item.id} {...item} />)}
        </Section>
      </aside>

      {/* Popover Side Menu */}
      {activeSubMenu && (
        <div 
          className="sb-popover animate-in slide-in-from-left-1 duration-200"
          style={{ top: popoverTop }}
        >
          <div className="sb-popover-hdr">All {activeSubMenu.label}</div>
          {activeSubMenu.subItems.map((sub, i) => (
            <a
              key={i}
              href={sub.href}
              className="sb-popover-item"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/match/racing/${toSlug(sub.label)}`);
                setActiveSubMenu(null);
              }}
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Sidebar;

import { useState, useEffect } from "react";
import { MdSportsCricket, MdSportsSoccer } from "react-icons/md";
import { IoIosTennisball } from "react-icons/io";
import { FaTableTennis, FaUserFriends, FaHorse, FaDog, FaPlane } from "react-icons/fa";
import { GiConsoleController } from "react-icons/gi";
import { BsWhatsapp } from "react-icons/bs";
import OddsTable from "./OddsTable";
import RacingTable from "./RacingTable";
import dashboardData from "../../data/dashboardData.json";
import BannerModal from "../Modals/BannerModal";

const MainDashboard = ({ isLoggedIn }) => {
  const { matches, casinoGames, racing } = dashboardData;
  const [activeSport, setActiveSport] = useState("Cricket");
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  useEffect(() => {
    // Show banner modal automatically when dashboard loads and user is logged in
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setIsBannerModalOpen(true);
      }, 500); // Slight delay for smoother experience
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const tabs = [
    "Cricket", "Football", "Tennis", "Table Tennis", "Esoccer", "Horse Racing",
    "Greyhound Racing", "Basketball", "Wrestling", "Volleyball", "Badminton",
    "Snooker", "Darts", "Boxing", "Mixed Martial Arts", "American Football",
    "E Games", "Ice Hockey", "Futsal", "Politics", "Motor Sports", "Kabaddi"
  ];

  const handleTabClick = (e, tab) => {
    setActiveSport(tab);
    if (e && e.target) {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Filter matches based on the active tab
  const filteredMatches = matches.filter(
    (match) => match.sport.toLowerCase() === activeSport.toLowerCase()
  );

  return (
    <div className="flex-1 bg-gray-100 overflow-y-auto [scrollbar-width:none] font-sans mt-0.5 mx-0.5">

      {/* Top Navigation Tier 1: Top Matches - Gaps and Margins for Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-5 bg-[#055172] md:bg-transparent text-white border-b border-white/10 md:border-none shrink-0 md:gap-1 md:my-1">
        {matches.slice(0, 5).map((match, idx) => (
          <div
            key={match.id}
            className={`items-center gap-1 p-1.5 bg-[#055172] border-r border-white/20 md:border-none overflow-hidden ${idx >= 2 ? 'hidden md:flex' : 'flex'}`}
          >
            <MdSportsCricket className="text-white shrink-0" size={14} />
            <span className="text-[12px] md:text-[14px] font-bold truncate leading-tight animate-blink">
              {match.name.split(' / ')[0]}
            </span>
          </div>
        ))}
      </div>

      {/* Tier 2: Categories - Hidden on Desktop, Visible on Mobile */}
      <div className="flex md:hidden bg-[#0088cc] text-white overflow-x-auto no-scrollbar border-y border-white/10 h-[34px]">
        {[
          {
            name: "CRASH",
            icon: (
              <svg className="w-[30px] h-auto animate-blink" viewBox="0 0 457.6 277.4" fill="#e40539">
                <path d="M61.85,273.4c-1.8-3.5-2.3-3.9-4-3-3.2,1.7-5.5,1.1-9-2.5l-3.3-3.4,4.4-1.9c2.4-1.1,8-2.2,12.4-2.6,27.1-2.5,84.1-19.2,161-47.1,32.1-11.7,80.4-30.1,81.3-31,1.2-1.2-1-1.5-11.9-1.7-10.6-.2-11.7,0-16.5,2.4-13.1,6.8-74.6,31.2-92.8,36.7l-6.9,2.1-6.4-5-6.5-4.9-3.6,1.5c-21.3,9-88,36.4-89.2,36.6-1,.2-1.6-.6-1.8-2.3-.3-2.4.5-3,7.8-6.9,4.5-2.3,7.9-4.5,7.5-4.8-.3-.4-4.3-.9-8.9-1.3-9.7-.8-17.3-4-28.2-11.9-4.8-3.5-7.8-5-10-5-4.3,0-6.4.9-6.4,2.7,0,.8,6.8,8.7,15.1,17.6,13,13.7,14.9,16.2,13.3,16.8-3.7,1.5-4.8.8-16.3-10.3-6.4-6.2-14.6-14.2-18.3-17.7l-6.7-6.5-8.8,4.2-8.8,4.2-.3-3.4c-.2-2,.2-4.4.8-5.5s6.5-4.8,13.1-8.2c11.8-6,14.2-8,12.2-10-.7-.7-4.1.5-10.2,3.5l-9.1,4.6v-2.5c0-2,1.4-3.3,7.7-7,10.3-6,17.3-8.1,22.3-6.6,2.1.6,10.7,6.3,19.1,12.6,19,14.3,29.4,19.9,35.9,19.2,5.3-.5,34-13.7,61.9-28.5,18.3-9.7,21.6-12.1,19.5-14.2-.7-.7-7.1,1.8-21.4,8.5-14.7,7-20.5,9.3-21.1,8.4-1.2-2-.1-3.3,5.6-6.3,3-1.6,5.5-3.4,5.5-4,0-.7-1.3-2.5-2.8-4l-2.9-2.7-19.8,9.6c-10.9,5.2-20,9.3-20.2,9.1-.8-.7,2.5-12.8,3.8-14.1.8-.8,9.5-5.6,19.4-10.8,17.7-9.4,18-9.6,17.8-12.7,0-1.7-.4-3.4-.7-3.7s-3.9.9-8,2.7l-7.4,3.3-8.9-9.3c-4.8-5.1-8.9-9.6-9.1-10-.5-1.4,8.8-7.9,14.6-10.1,10.4-4,10.9-3.9,118.5,11.3,35.6,5,65.5,9.7,66.5,10.4,1.6,1.1,1.6,1.4-.1,4.8l-1.7,3.7,2.8,1c1.5.5,5.8,2.1,9.5,3.6l6.9,2.5,10.1-4.3c12.4-5.2,32.9-15.6,45.6-23.2l9.4-5.5,3.2,2.4c3.2,2.4,6.9,3.1,7.9,1.6.3-.5-2.5-6.9-6.3-14.3-3.7-7.4-8.7-18.4-11-24.4-2.4-6.1-4.8-11.6-5.4-12.4-.9-1-3.3-1.2-10.7-.8-10.8.5-18.1,2.6-42,12-15.4,6-67.7,31.5-70.6,34.4-1.3,1.4-3.4,1.4-19.2-.1-9.7-.9-18-1.6-18.4-1.6-1.4,0-.8-5.5,1.1-9.7,1.6-3.4,3.9-5.4,14-12.1,14.3-9.5,28.2-16.5,37.4-18.9l6.5-1.7,9.9,3.9c14.3,5.6,16.3,5.6,39.8-1,38.2-10.6,43.5-11.8,52.2-11.9,8-.1,8.3,0,11.6,3.3,2.6,2.5,5.7,8.3,12,23,4.7,10.8,9,21.3,9.7,23.5,1.7,5.4.8,11.9-2.4,16-6.7,8.8-38,25.2-82.1,42.8-22.8,9.1-61.8,21.9-162.5,53.3-31.1,9.7-64.7,20.3-74.6,23.6-10,3.2-18.9,5.9-19.8,5.9-.8,0-2.5-1.8-3.6-4ZM291.35,168.4c3.8-2.3,7.1-6.9,5.8-8-.6-.5-144.9-20.8-158.8-22.3-1.2-.1-2,.4-2,1.3,0,1.2,15.5,4.6,72,16.1,39.6,8.1,73.7,14.7,75.9,14.8,2.3.1,5.2-.7,7.1-1.9h0ZM247.65,122c4.2-2.3,11.2-5.8,15.4-7.7,4.3-1.9,7.8-3.7,7.8-4.1s-2.8-1.3-6.2-2c-7.7-1.7-13.7-.9-22.4,3.3-6.7,3.1-18.9,11.7-18.1,12.6.6.5,9.3,1.9,13.5,2.2,1.3,0,5.8-1.9,10-4.3h0ZM282.15,115.8c7.5-3.8,10.7-6,10.5-7.1-.4-2.1-18.3-9.2-23.4-9.3-2.2,0-4.9.6-6,1.4q-2.1,1.6,10.4,6.5c2.6,1,4.8,2.3,5,2.9s-1.9,2.2-4.7,3.6c-5.5,2.8-6.6,4-5.7,6.1.8,2.3,2.3,1.9,13.9-4.1h0Z"></path><path d="M440.55,196.2c-6.8-10.1-13.5-20.3-14.9-22.8-1.5-2.5-5.5-14.1-9.1-25.7l-6.5-21.3,5.1-5c2.7-2.8,5.1-4.9,5.2-4.8.1.2,5.2,9.4,11.4,20.6,11.9,21.3,15.8,31,23.1,58,3.3,11.9,3.3,12.3,1.7,15.7-.9,1.9-2.1,3.5-2.6,3.5s-6.5-8.2-13.4-18.2h0ZM454.65,206.5c.2-1.9-.5-4.6-1.7-6.7-1.8-3.1-22-30.4-24.3-32.9-1.2-1.3-3,1.5-2.2,3.5,1.2,3.4,26,39.9,26.9,39.6.6-.1,1.1-1.7,1.3-3.5h0Z"></path><path d="M295.35,148.3c-13.2-2.6-24.6-4.9-25.4-5.1-.8-.2,11.3-5.4,27-11.6l28.3-11.4,5.3,5.9c2.9,3.2,5.2,6.3,5.3,6.9,0,.6-2.3,5.5-5.1,10.8-4.8,9.1-5.2,9.6-8.2,9.5-1.8-.1-14-2.3-27.2-5h0Z"></path><path d="M334.85,152.1c0-.2,1.6-3.6,3.6-7.5,1.9-4,4.1-9,4.9-11.1l1.3-3.8-5.3-6.9c-5.3-6.8-5.4-6.9-3.2-8.1,2-1.1,2.6-.8,6.2,3.2,2.2,2.5,4.3,4.5,4.6,4.5s1.7-3.9,3-8.7l2.4-8.8.3,4.9c.2,2.6-.2,8-.8,11.8l-1,7,5.1,6.4,5.1,6.4-2.7,1c-2.2.9-2.9.6-5-1.8-1.3-1.5-2.5-3-2.5-3.4-.1-2.3-1.9-.1-3.9,4.6-1.2,3-2.8,5.9-3.5,6.5-1.4,1.1-8.6,4.3-8.6,3.8h0Z"></path><path d="M404.75,114.7c-7.2-16.1-7.3-16.4-5.8-17.5,1.5-1,21.2-.4,24.2.7.9.4,1.7,1.4,1.7,2.2,0,4.2-12.6,21.3-15.6,21.3-.9,0-2.8-2.9-4.5-6.7h0ZM414.15,104.7c4.8-2,8.7-4,8.7-4.4,0-1.2-4.4-1.9-13.2-1.9-8.2,0-8.8.1-8.8,2,0,2.4,2.7,8,3.8,8,.4,0,4.6-1.6,9.5-3.7Z"></path><path d="M385.05,75.9c-10.7-19.1-14-27.3-20.7-51.6-4-14.3-4.3-18.7-1.6-22l1.9-2.3,14.8,22.3,14.8,22.3,7.6,24.2c4.2,13.2,7.4,24.2,7.1,24.3-.3.1-3.5.3-7.1.6l-6.5.4-10.3-18.2h0ZM391.85,46.5c0-1.5-23.2-37.5-26.1-40.6-1.3-1.3-2.9,1.2-2.9,4.7,0,2.5,8.8,15.4,22.3,32.7,4.6,6,6.7,7,6.7,3.2Z"></path>
              </svg>
            )
          },
          { name: "LOTTERY" }, { name: "SPORTS" }, { name: "OUR CASINO" },
          { name: "LIVE_CASINO" }, { name: "SLOTS" }, { name: "FANTASY" }
        ].map((item) => (
          <div key={item.name} className="flex items-center px-4 border-r border-white/20 whitespace-nowrap text-[12px] font-bold cursor-pointer hover:bg-white/10 transition-colors">
            {item.icon && <span className="mr-1 text-[14px]">{item.icon}</span>}
            {item.name}
          </div>
        ))}
      </div>

      {/* Tier 3: Sports Icons - Hidden on Desktop, Visible on Mobile */}
      <div className="flex md:hidden bg-[#045271] text-white overflow-x-auto no-scrollbar scroll-smooth">
        {[
          { name: "Cricket", icon: <MdSportsCricket /> },
          { name: "Politics", icon: <FaUserFriends /> },
          { name: "Football", icon: <MdSportsSoccer /> },
          { name: "Tennis", icon: <IoIosTennisball /> },
          { name: "Table Tennis", icon: <FaTableTennis /> },
          { name: "Esoccer", icon: <GiConsoleController /> },
          { name: "Horse Racing", icon: <FaHorse /> },
          { name: "Greyhound Racing", icon: <FaDog /> },
        ].map((sport) => (
          <button
            key={sport.name}
            onClick={(e) => handleTabClick(e, sport.name)}
            className={`flex flex-col items-center justify-center min-w-[80px] py-1 transition-all relative ${activeSport === sport.name ? "border-t-[3px] border-white" : ""}`}
          >
            <div className="text-[20px] mb-1">{sport.icon}</div>
            <span className="text-[12px] font-bold uppercase tracking-tighter">{sport.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop Sports Tabs Bar */}
      <div className="hidden md:flex bg-[#cdccca] border-b border-gray-400 overflow-x-auto no-scrollbar mt-2 scroll-smooth">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={(e) => handleTabClick(e, tab)}
            className={`px-4 py-2 text-[16px] font-normal font-sans whitespace-nowrap transition-all border-r border-[#999999] text-center ${activeSport === tab ? "bg-[#035175] text-white" : "text-[#444444] hover:bg-[#a0a0a0]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Content: OddsTable or RacingTable */}
      {activeSport === "Greyhound Racing" || activeSport === "Horse Racing" ? (
        <RacingTable data={racing[activeSport]} />
      ) : (
        <OddsTable items={filteredMatches} />
      )}

      {/* Casino Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-0.5 p-0.5 bg-white mt-1">
        {casinoGames.map((title, idx) => (
          <div key={idx} className="relative aspect-square overflow-hidden bg-black cursor-pointer group rounded-[4px]">
            <img
              src={title.img}
              alt={title.title}
              className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-0 left-0 w-full h-[27px] flex items-center justify-center text-[8.5px] md:text-[10px] font-bold text-white uppercase rounded-b-[4px] bg-gradient-to-b from-[#0088CC] to-[#035273] px-1 text-center leading-tight">
              {title.title}
            </div>
          </div>
        ))}
      </div>

      {/* Floating WhatsApp */}
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform z-50">
        <BsWhatsapp className="w-7 h-7" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .animate-blink { animation: blink 0.8s infinite; }
      `}} />
      {/* Banner Modal */}
      <BannerModal
        isOpen={isBannerModalOpen}
        onClose={() => setIsBannerModalOpen(false)}
      />
    </div>
  );
};

export default MainDashboard;

import { useState } from "react";
import logo from "../assets/logo.png";
import { BsAndroid2 } from "react-icons/bs";
import { FaSearchPlus, FaChevronDown, FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SetButtonValuesModal from "./Modals/SetButtonValuesModal";
import RulesModal from "./Modals/RulesModal";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isSetButtonModalOpen, setIsSetButtonModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [showExposure, setShowExposure] = useState(true);

  const menuRoutes = {
    "Withdraw Statement": "/withdraw-statement",
    "Deposit Statement": "/deposit-statement",
    "Account Statement": "/account-statement",
    "Activity Logs": "/activity-logs",
    "Casino Results": "/casino-results",
    "Live Casino Bets": "/live-casino-bets",
    "Bonus": "/bonus",
    "Coupon": "/coupon",
    "Security Auth Verification": "/security-auth",
    "Current Bet": "/current-bets",
    "Change Password": "/change-password"
  };

  const navItems = [
    { name: "HOME", path: "/" },
    { name: "CRICKET", path: "/sport/cricket" },
    { name: "TENNIS", path: "/sport/tennis" },
    { name: "FOOTBALL", path: "/sport/football" },
    { name: "TABLE TENNIS", path: "/sport/table tennis" },
    { name: "BACCARAT", path: "/#" },
    { name: "32 CARDS", path: "/#" },
    { name: "TEENPATTI", path: "/#" },
    { name: "POKER", path: "/#" },
    { name: "LUCKY 7", path: "/#" },
    { name: "CRASH", path: "/#" },
  ];


  return (
    <header className="w-full font-sans">
      <div className="h-[4px] w-full bg-[#cc0000]"></div>
      {/* Desktop Header */}
      <div className="hidden md:flex flex-row items-center justify-between bg-[#0088cc] px-4 h-[75px]">
        <div className="flex items-center h-full mr-2">
          <Link to="/">
            <img src={logo} alt="JSK1 Logo" className="h-[60px] w-auto object-contain transition-all duration-300" />
          </Link>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 text-white">
                <div className="flex items-center gap-3 mr-1 relative">
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${isSearchOpen ? 'w-[180px] opacity-100 mr-2' : 'w-0 opacity-0'}`}>
                    <input
                      type="text"
                      placeholder="Search here"
                      className="w-full h-[35px] px-3 py-1 text-gray-800 text-[14px] outline-none rounded-none bg-white border border-transparent shadow-sm"
                    />
                  </div>
                  <FaSearchPlus
                    className="text-white text-[28px] cursor-pointer hover:scale-110 transition-transform shrink-0"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                  />
                  <div 
                    className="flex flex-col text-white cursor-pointer -mt-0.5 min-w-fit pr-1"
                    onClick={() => setIsRulesModalOpen(true)}
                  >
                    <span className="text-[16px] font-[700] leading-tight hover:text-white/80 transition-colors">Rules</span>
                    <span className="text-[16px] font-[700] flex items-center gap-1 leading-tight whitespace-nowrap">
                      Download Apk <BsAndroid2 size={16} />
                    </span>
                  </div>
                </div>
                <Link
                  to="/deposit"
                  className="bg-[#146c43] border-[#13653f] text-white text-[16px] font-normal h-[38px] px-[0.75rem] py-[0.375rem] border inline-flex items-center justify-center text-center transition-colors rounded-none"
                >
                  Deposit
                </Link>
                <Link
                  to="/withdraw"
                  className="bg-[#bb2d3b] border-[#b02a37] text-white text-[16px] font-normal h-[38px] px-[0.75rem] py-[0.375rem] border inline-flex items-center justify-center text-center transition-colors rounded-none"
                >
                  Withdraw
                </Link>
                <div className="hidden sm:flex flex-col text-white ml-1 mr-2 cursor-default">
                  <span className="text-[13px] font-bold leading-none">Balance:0</span>
                  <span className="text-[13px] font-bold leading-none mt-1">Exp:0</span>
                </div>
                <div
                  className="flex items-center gap-1 text-white font-bold cursor-pointer hover:text-white/90 relative"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                >
                  <span className="text-[15px] max-w-[80px] truncate">Kingraja11</span>
                  <FaChevronDown size={10} className={`mt-0.5 transition-transform duration-300 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />

                  {/* Account Dropdown Menu */}
                  {isAccountMenuOpen && (
                    <div className="absolute top-[35px] right-0 flex flex-col z-1000 animate-in fade-in slide-in-from-top-2 duration-200 min-w-40 py-2 m-0 text-[1rem] text-[#212529] text-left list-none bg-white bg-clip-padding border border-black/15 rounded-sm shadow-[0_0.5rem_1rem_rgba(0,0,0,0.175)]">
                      {[
                        "Withdraw Statement", "Deposit Statement", "Bonus", "Coupon",
                        "Account Statement", "Current Bet", "Activity Logs", "Casino Results",
                        "Live Casino Bets", "Set Button Values", "Rules", "Security Auth Verification",
                        "Change Password"
                      ].map((item) => (
                        menuRoutes[item] ? (
                          <Link
                            key={item}
                            to={menuRoutes[item]}
                            onClick={() => setIsAccountMenuOpen(false)}
                            className="transition-colors cursor-pointer hover:underline text-[#212529] hover:text-[#666] flex items-center px-4 w-full h-[27px] clear-both font-normal text-[16px] whitespace-nowrap bg-transparent border-0"
                          >
                            {item}
                          </Link>
                        ) : (
                          <div
                            key={item}
                            onClick={() => {
                              if (item === "Set Button Values") {
                                setIsSetButtonModalOpen(true);
                              }
                              if (item === "Rules") {
                                setIsRulesModalOpen(true);
                              }
                              setIsAccountMenuOpen(false);
                            }}
                            className="transition-colors cursor-pointer hover:underline text-[#212529] hover:text-[#666] flex items-center px-4 w-full h-[27px] clear-both font-normal text-[16px] whitespace-nowrap bg-transparent border-0"
                          >
                            {item}
                          </div>
                        )
                      ))}
                      <div className="border-t border-gray-200 my-1"></div>
                      <div
                        className="transition-colors cursor-pointer hover:underline text-[#212529] hover:text-[#666] flex items-center px-4 w-full h-[27px] clear-both font-normal text-[16px] whitespace-nowrap bg-transparent border-0"
                        onClick={() => setIsLoggedIn(false)} // Logout logic
                      >
                        SignOut
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div className="hidden lg:flex items-center gap-1 text-white font-bold text-[14px] mr-2 cursor-pointer hover:bg-white/10 p-1 px-2 rounded transition-all">
                  <span>Download Apk</span>
                  <BsAndroid2 />
                </div>
                <button
                  className="bg-[#045271] text-white px-4 py-2 rounded-none text-[16px] font-bold shadow-md hover:bg-[#03405a] transition-all duration-500 cursor-pointer"
                  onClick={() => setIsLoggedIn(true)} // Dummy login for demo
                >
                  Demo
                </button>
                <Link
                  to="/login"
                  className="bg-[#045271] text-white px-4 py-2 rounded-none text-[16px] font-bold shadow-md hover:bg-[#03405a] transition-all duration-500 cursor-pointer inline-block"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-[#045271] text-white px-4 py-2 rounded-none text-[16px] font-bold shadow-md hover:bg-[#03405a] transition-all duration-500 cursor-pointer inline-block"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="w-[300px] overflow-hidden whitespace-nowrap bg-transparent relative">
            <div className="inline-block animate-marquee-text italic text-[14px] text-white">
              Win Big Instantly with Scratch Lottery!
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex md:hidden flex-col bg-[#0088cc] px-2 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/">
              <FaHome className="text-white text-[28px]" />
            </Link>
            <Link to="/">
              <img src={logo} alt="JSK1 Logo" className="h-[40px] w-auto object-contain" />
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col items-end text-white relative">
              {showBalance && <span className="text-[13px] font-bold leading-tight">Balance:0</span>}
              <div
                className="flex items-center gap-1 cursor-pointer mt-0.5"
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
              >
                {showExposure && <span className="text-[13px] font-bold leading-tight">Exp:0</span>}
                <span className="text-[14px] font-bold leading-tight ml-1">Kingraja11</span>
                <FaChevronDown size={10} className={`transition-transform duration-300 ${isAccountMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Mobile Account Dropdown */}
              {isAccountMenuOpen && (
                <div className="absolute top-[40px] right-0 flex flex-col z-1000 animate-in fade-in slide-in-from-top-2 duration-200 min-w-48 py-2 m-0 text-[1rem] text-[#212529] text-left list-none bg-white bg-clip-padding border border-black/15 rounded-sm shadow-[0_0.5rem_1rem_rgba(0,0,0,0.175)]">
                  {[
                    "Withdraw Statement", "Deposit Statement", "Bonus", "Coupon",
                    "Account Statement", "Current Bet", "Activity Logs", "Casino Results",
                    "Live Casino Bets", "Set Button Values", "Security Auth Verification",
                    "Change Password", "Rules"
                  ].map((item) => (
                    menuRoutes[item] ? (
                      <Link
                        key={item}
                        to={menuRoutes[item]}
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="transition-colors cursor-pointer hover:underline text-[#212529] hover:text-[#666] flex items-center px-4 w-full h-[32px] clear-both font-normal text-[15px] whitespace-nowrap bg-transparent border-0"
                      >
                        {item}
                      </Link>
                    ) : (
                      <div
                        key={item}
                        onClick={() => {
                          if (item === "Set Button Values") {
                            setIsSetButtonModalOpen(true);
                          }
                          if (item === "Rules") {
                            setIsRulesModalOpen(true);
                          }
                          setIsAccountMenuOpen(false);
                        }}
                        className="transition-colors cursor-pointer hover:underline text-[#212529] hover:text-[#666] flex items-center px-4 w-full h-[32px] clear-both font-normal text-[15px] whitespace-nowrap bg-transparent border-0"
                      >
                        {item}
                      </div>
                    )
                  ))}

                  {/* Balance Toggle */}
                  <div
                    className="flex items-center justify-between px-4 h-[32px] cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowBalance(!showBalance);
                    }}
                  >
                    <span className="text-[15px] font-normal text-[#212529]">Balance</span>
                    <div className={`w-[16px] h-[16px] border border-gray-300 rounded-[2px] flex items-center justify-center transition-all ${showBalance ? 'bg-[#035273] border-[#035273]' : 'bg-white'}`}>
                      {showBalance && (
                        <svg className="w-[12px] h-[12px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Exposure Toggle */}
                  <div
                    className="flex items-center justify-between px-4 h-[32px] cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowExposure(!showExposure);
                    }}
                  >
                    <span className="text-[15px] font-normal text-[#212529]">Exposure</span>
                    <div className={`w-[16px] h-[16px] border border-gray-300 rounded-[2px] flex items-center justify-center transition-all ${showExposure ? 'bg-[#035273] border-[#035273]' : 'bg-white'}`}>
                      {showExposure && (
                        <svg className="w-[12px] h-[12px] text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-1"></div>
                  <div
                    className="transition-colors cursor-pointer hover:underline text-[#212529] hover:text-[#666] flex items-center px-4 w-full h-[32px] clear-both font-normal text-[15px] whitespace-nowrap bg-transparent border-0"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    SignOut
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <button
                className="bg-[#045271] text-white px-3 py-1.5 font-bold text-[13px] shadow-sm"
                onClick={() => setIsLoggedIn(true)}
              >
                Demo
              </button>
              <Link to="/login" className="bg-[#045271] text-white px-3 py-1.5 font-bold text-[13px] shadow-sm">
                Login
              </Link>
              <Link to="/register" className="bg-[#045271] text-white px-3 py-1.5 font-bold text-[13px] shadow-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center bg-[#5ba1cf] h-[36px] grow relative">
            <div className="absolute left-0 top-0 bottom-0 w-[36px] flex items-center justify-center bg-[#0088cc]/20">
              <FaSearchPlus className="text-white text-[20px]" />
            </div>
            <input
              type="text"
              className="w-full h-full bg-transparent outline-none pl-10 pr-2 text-white placeholder-white/70 text-[14px]"
              placeholder=""
            />
          </div>
          <Link to="/deposit" className="bg-[#146c43] text-white h-[36px] px-4 flex items-center justify-center font-bold text-[15px] min-w-[80px]">
            Deposit
          </Link>
          <Link to="/withdraw" className="bg-[#bb2d3b] text-white h-[36px] px-4 flex items-center justify-center font-bold text-[15px] min-w-[85px]">
            Withdraw
          </Link>
        </div>
      </div>


      {/* Nav Bar (Dark Blue) */}
      <nav className="hidden md:block bg-[#045271] border-t border-[#0088cc]/30 shadow-inner overflow-x-auto no-scrollbar">
        <ul className="flex items-center gap-1 md:gap-5 px-4 min-w-max h-[40px]">
          {navItems.map((item) => (
            <li key={item.name} className="shrink-0 h-full flex items-center relative">
              <Link
                to={item.path}
                className={`text-[10px] md:text-sm font-bold text-white uppercase tracking-tight hover:text-white/80 transition-colors flex items-center gap-1 h-full px-1`}
              >
                {item.name === 'CRASH' && (
                  <span className="flex">
                    <svg className="w-3 h-3 text-[#33bcff]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14H11V21L20 10H13Z" />
                    </svg>
                  </span>
                )}
                {item.name}
              </Link>
              {/* Active Bottom Line */}
              {location.pathname === item.path && (
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-white"></div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Set Button Values Modal */}
      <SetButtonValuesModal 
        isOpen={isSetButtonModalOpen} 
        onClose={() => setIsSetButtonModalOpen(false)} 
      />

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
      />
    </header>
  );
};

export default Header;

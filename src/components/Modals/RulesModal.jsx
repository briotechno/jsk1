import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaChevronDown } from 'react-icons/fa';

const RulesModal = ({ isOpen, onClose }) => {
  const [activeSport, setActiveSport] = useState('Football');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  if (!isOpen) return null;

  const sports = [
    'Football', 'Horse Racing', 'E Games', 'Basketball', 'MotoGP', 'Chess',
    'Volleyball', 'Ice Hockey', 'Tennis', 'Badminton', 'Cycling',
    'Mixed Martial Arts', 'Motorbikes', 'Athletics', 'Basketball 3X3',
    'Sumo', 'Virtual sports', 'Handball', 'Cricket', 'Politics', 'Golf',
    'Motor Sports', 'Baseball', 'Rugby Union'
  ];

  const rulesData = {
    Football: [
      {
        section: 'bookmaker',
        rules: [
          { text: 'If the match will not take place within 48 hours of the original kick-off time bets will be void.' },
          { text: 'If the selection is in a multiple bet or accumulator any refund must be requested before kick-off of the first leg of the multiple bet.', color: 'red' },
          { text: 'Please note that games which have their kick-off altered well in advance to accommodate live TV, or to ease fixture congestion will not be classed as postponed.' },
          { text: 'If a match is forfeited or a team is given a walkover victory without the match having kicked off, then all bets will be void. Any subsequently awarded scoreline will not count for settlement purposes.', color: 'red' },
          { text: 'Where a confirmed postponed match features as part of a multiple bet, the bet will stand on the remaining selections in the multiple.', color: 'red' }
        ]
      },
      {
        section: 'fancy',
        rules: [
          { text: 'Tournament Total Goals, Team Total Goals goals. scored in 90 minutes or in extra-time will count.Goals scored in penalty shootouts do not count.', color: 'red' },
          { text: 'Tournament Corners - Only corners taken in 90 minutes count.', color: 'red' },
          { text: 'Tournament Penalties Missed/Converted - Penalties taken in 90 minutes, extra-time and penalty shootouts all count. If a penalty has to be re-taken the previous disallowed penalty(ies) do not count.', color: 'red' }
        ]
      },
      {
        section: 'match',
        rules: [
          { text: 'Match Odds :- All bets apply to the relevant full \'regular time\' period including stoppage time. Any extra-time and/or penalty shoot-out is not included. For the cancellation of a goal, due to VAR, bets matched between the time of the goal being scored and the time at which the video assistant referee finishes the review will be voided. For the cancellation of a red card, due to VAR, bets matched after the time at which the video assistant referee commences the review will be voided.' },
          { text: 'Under_Over Goals :- In the event of a match starting but not being completed, all bets will be void, unless the specific market outcome is already determined,' },
          { text: '1st Period Winner :- Bets will be void if the match is abandoned before half-time.' },
          { text: 'Next Goal :- Own goals count to the side credited with the goal.' },
          { text: 'Draw No Bet :- Predict which team will be the winner. In case of a draw, all bets will be void. If a game is abandoned, bets will be void.' }
        ]
      }
    ],
    // Add other sports as needed...
  };

  const currentRules = rulesData[activeSport] || rulesData['Football'];

  return (
    <div className="fixed inset-0 z-10002 flex items-center justify-center bg-black/70 backdrop-blur-[2px] p-2 md:p-4 font-sans px-2">
      <div className="bg-white w-full max-w-[1100px] h-full max-h-[90vh] md:max-h-[95vh] flex flex-col shadow-lg overflow-hidden relative rounded-none">
        {/* Header */}
        <div className="bg-[#0088cc] flex items-center justify-between px-3 h-[58px] shrink-0">
          <h2 className="text-white font-bold text-[18px] ml-1">Rules</h2>
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <div
                className="h-[38px] bg-[#cccccc] text-black font-normal text-[14px] px-2 flex items-center gap-2 border border-gray-400 cursor-pointer rounded-none min-w-[110px]"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              >
                <img src="https://flagcdn.com/w40/gb.png" alt="English" className="h-[14px] w-auto border border-gray-300" />
                <span className="uppercase">English</span>
                <FaChevronDown size={10} className={`ml-auto transition-transform ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
              </div>

              {isLanguageMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-400 border-t-0 z-10 shadow-md">
                  <div
                    className="h-[38px] px-2 flex items-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setIsLanguageMenuOpen(false)}
                  >
                    <img src="https://flagcdn.com/w40/gb.png" alt="English" className="h-[14px] w-auto border border-gray-200" />
                    <span className="font-normal text-[14px] uppercase text-black">English</span>
                  </div>
                </div>
              )}
            </div>
            <IoMdClose
              className="text-white text-[28px] cursor-pointer hover:scale-110 transition-transform"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content Container - Flush */}
        <div className="grow flex flex-col md:flex-row overflow-hidden bg-white border-t border-gray-100">
          {/* Mobile Categories - Horizontal Scroll */}
          <div className="md:hidden block w-full bg-[#cccccc] shrink-0 border-b border-gray-300">
            <div className="flex overflow-x-auto no-scrollbar">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={`whitespace-nowrap px-4 h-[40px] flex items-center justify-center font-normal text-[13.5px] uppercase transition-all border-r border-gray-300 last:border-r-0
                    ${activeSport === sport
                      ? 'bg-[#0088cc] text-white'
                      : 'bg-[#cccccc] text-black hover:bg-gray-300'}`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          <div className="grow flex flex-col md:flex-row overflow-hidden md:p-[10px] p-2">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex flex-col w-[220px] shrink-0 bg-[#cccccc] overflow-y-auto no-scrollbar border border-gray-400">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={`w-full cursor-pointer h-[33px] min-h-[33px] flex items-center justify-center font-normal text-[16px] border-b border-black transition-all
                    ${activeSport === sport
                      ? 'bg-[#0088cc] text-white'
                      : 'bg-[#d3d3d3] text-[#000000] '
                    }`}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Main Rules Content Area */}
            <div className="grow overflow-y-auto bg-white md:p-2 md:pt-0 pt-0 custom-scrollbar">
              {currentRules.map((section, idx) => (
                <div key={idx} className="mb-6 md:mb-4 border border-gray-300">
                  <div className="bg-[#035175] px-4 py-2 font-bold text-white text-[16px] h-[35px]">
                    {section.section}
                  </div>
                  <div className="flex flex-col bg-[#fcfcfc]">
                    {section.rules.map((rule, rIdx) => (
                      <div
                        key={rIdx}
                        className={`px-4 py-3 text-[14px] border-b border-gray-200 last:border-b-0 leading-[1.6] ${rule.color === 'red' ? 'text-[#cc0000]' : 'text-[#444]'}`}
                      >
                        {rule.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 pr-4 flex justify-end shrink-0 bg-white border-t border-gray-100">
          <button
            className="bg-[#bb2d3b] hover:bg-[#a52834] text-white px-6 h-[34px] font-bold text-[15px] transition-colors rounded-[2px] shadow-sm uppercase"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #888; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}} />
    </div>
  );
};

export default RulesModal;

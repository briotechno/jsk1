import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaKey, FaPhoneAlt, FaHandPointDown } from 'react-icons/fa';
import { countries } from '../../utils/countries';

export default function Register() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries.find(c => c.code === 'IN') || countries[0]);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.dialCode.includes(search)
  );

  return (
    <div className="flex flex-col">
      {/* Heading */}
      <h2
        style={{ color: '#008de4', margin: '0 0 18px', fontSize: 26, fontWeight: 600, textAlign: 'center', lineHeight: '1.2' }}
        className="flex items-center justify-center gap-1.5"
      >
        Register <FaHandPointDown style={{ fontSize: 20 }} />
      </h2>

      {/* WhatsApp block */}
      <div className="bg-[#d2d2d2] p-[10px] pb-3 rounded-[3px] text-center mb-[18px]">
        <p className="text-[14px] font-bold text-black leading-none mb-1">Register as New User</p>
        <p className="text-[15px] font-bold text-black mb-[10px]">Get your Instant ID from whatsapp</p>
        <button className="w-full bg-[#39ba4c] hover:bg-[#34a443] text-white font-bold py-[8px] px-4 rounded-[4px] flex items-center justify-center gap-2 shadow-sm relative overflow-hidden h-[46px]">
          <div className="absolute left-0 top-0 h-full w-[46px] bg-[#4cc85d] flex items-center justify-center border-r border-[#39ba4c] shadow-[1px_0_3px_rgba(0,0,0,0.1)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </div>
          <span className="text-[16px] font-[800] tracking-wide relative">CLICK HERE</span>
        </button>
      </div>

      {/* OR divider */}
      <div className="flex items-center justify-center mb-6">
        <div className="border-t border-[#c6c6c6] flex-grow max-w-[30px]" />
        <span className="mx-2 text-[13px] font-[800] text-black uppercase tracking-wide">OR</span>
        <div className="border-t border-[#c6c6c6] flex-grow max-w-[30px]" />
      </div>

      <form className="space-y-[14px]">
        {/* Username */}
        <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] overflow-hidden h-[44px]">
          <input
            type="text"
            placeholder="Username"
            className="flex-grow px-3 bg-transparent text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none placeholder:font-normal"
          />
          <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0">
            <FaUser className="text-[#333] text-[17px]" />
          </div>
        </div>

        {/* Password */}
        <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] overflow-hidden h-[44px]">
          <input
            type="password"
            placeholder="Password"
            className="flex-grow px-3 bg-transparent text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none placeholder:font-normal"
          />
          <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0">
            <FaKey className="text-[#333] text-[16px]" />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] overflow-hidden h-[44px]">
          <input
            type="password"
            placeholder="Confirm Password"
            className="flex-grow px-3 bg-transparent text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none placeholder:font-normal"
          />
          <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0">
            <FaKey className="text-[#333] text-[16px]" />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex gap-2 h-[44px]">
          <div className="flex bg-white border border-[#d4d4d4] rounded-[3px] flex-grow relative" ref={dropdownRef}>
            {/* Dropdown Trigger */}
            <div
              className="flex items-center justify-center px-3 bg-white border-r border-[#d4d4d4] cursor-pointer flex-shrink-0 gap-1.5 hover:bg-gray-50 transition-colors h-full rounded-l-[2px]"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img
                src={`https://flagcdn.com/w20/${(selectedCountry?.code || 'IN').toLowerCase()}.png`}
                width="22"
                alt={selectedCountry?.code || 'IN'}
                className="block h-auto"
              />
              <span className="text-[10px] text-gray-600">▼</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-[calc(100%+4px)] left-0 w-[260px] max-h-[220px] overflow-y-auto bg-white border border-[#d4d4d4] rounded shadow-2xl z-[999] flex flex-col">
                <div className="p-2 sticky top-0 bg-white border-b border-[#d4d4d4] shadow-sm z-10">
                  <input
                    type="text"
                    placeholder="Search country..."
                    className="w-full border border-gray-300 p-1.5 text-[13px] rounded focus:outline-none focus:border-[#008de4]"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                {filteredCountries.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 text-[14px] hover:bg-gray-100 cursor-pointer border-b border-gray-50 last:border-0"
                    onClick={() => { setSelectedCountry(c); setIsDropdownOpen(false); setSearch(''); }}
                  >
                    <img src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`} width="20" alt={c.code} className="block h-auto flex-shrink-0" />
                    <span className="truncate flex-grow text-gray-800 text-left">{c.name}</span>
                    <span className="text-gray-500 font-medium">{c.dialCode}</span>
                  </div>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="p-3 text-center text-[13px] text-gray-500">No countries found</div>
                )}
              </div>
            )}

            <input type="tel" className="w-full px-3 bg-transparent text-[15px] text-gray-700 focus:outline-none placeholder:font-normal" placeholder="" />

            {/* Right Icon Block */}
            <div className="bg-[#e4e4e4] w-[44px] border-l border-[#d4d4d4] flex items-center justify-center flex-shrink-0 rounded-r-[2px]">
              <FaPhoneAlt className="text-[#333] text-[16px]" />
            </div>
          </div>

          <button type="button" className="bg-[#66ae95] hover:bg-[#528d79] text-white text-[14px] px-3 rounded-[3px] font-medium whitespace-nowrap transition-colors flex-shrink-0 shadow-sm">
            Verify Number
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#71a3e8] hover:bg-[#5e92db] text-white font-medium py-[11px] px-4 rounded-[3px] flex items-center justify-center relative mt-5 transition-colors shadow-sm text-[16px]"
        >
          <span>Register</span>
          <div className="absolute right-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
          </div>
        </button>
      </form>

      <div className="mt-5 text-center text-[15px] font-bold text-black pt-2 flex flex-col items-center w-full">
        <div className="mb-[10px] text-[15px]">
          Already have User? <Link to="/login" className="text-[#0056b3] hover:underline font-bold">Login here</Link>
        </div>
        <p className="text-[11px] font-normal text-[#5b5b5b] max-w-[280px] mt-1.5 leading-tight">
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="#" className="text-[#0056b3] hover:underline">Privacy Policy</a> and{' '}
          <a href="#" className="text-[#0056b3] hover:underline">Terms of Service</a> apply.
        </p>
      </div>
    </div>
  );
}

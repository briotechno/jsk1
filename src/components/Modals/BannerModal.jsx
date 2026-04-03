import React from 'react';
import { IoClose } from 'react-icons/io5';
import { FaExclamationTriangle } from 'react-icons/fa';
import iplBanner from '../../assets/ipl_banner.png';

const BannerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-start justify-center p-4 pt-[5vh] md:pt-[10vh] bg-black/70 backdrop-blur-[2px]">
      <div className="relative w-full md:w-[800px] md:h-[450px] flex flex-col bg-white rounded-none shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-[#0088cc] flex items-center justify-between p-[10px] shadow-md shrink-0">
          <div className="flex items-center gap-2 text-white">
            <FaExclamationTriangle className="text-yellow-400 text-[18px] md:text-[24px] shrink-0" />
            <span className="text-[14px] md:text-[18px] font-bold leading-tight uppercase tracking-tight">
              Beware Of Phishing Websites Before Login. Enable Security Auth To Secure Your ID
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Content / Banner */}
        <div className="p-0 flex-1 overflow-hidden">
          <img
            src={iplBanner}
            alt="IPL 2026 Banner"
            className="w-full h-full object-fill block border-0 select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerModal;

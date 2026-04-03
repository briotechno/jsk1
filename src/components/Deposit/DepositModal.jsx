import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

const DepositModal = ({ isOpen, onClose }) => {
  const [utrNumber, setUtrNumber] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-[#0088cc] p-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-xl uppercase tracking-wide">Deposit</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
            <IoIosClose size={32} />
          </button>
        </div>
        
        <div className="p-6">
          <label className="block text-gray-700 font-bold text-sm mb-2 uppercase">
            UTR/Transaction Number:
          </label>
          <input
            type="text"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
            placeholder="Enter UTR Number"
            className="w-full border border-gray-300 rounded p-3 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
          />
          
          <div className="bg-[#c1272d] text-white p-3 rounded-sm text-sm font-bold leading-relaxed mb-6 flex gap-3">
            <div className="flex-1">
              Expected Format: UTR / Transaction ID must be 12-22 characters and can contain only letters (A-Z, a-z) and numbers (0-9)
            </div>
          </div>
          
          <button
            className="w-full bg-[#0088cc] text-white py-3 rounded font-bold text-lg hover:bg-blue-600 transition-colors shadow-md"
            onClick={onClose}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;

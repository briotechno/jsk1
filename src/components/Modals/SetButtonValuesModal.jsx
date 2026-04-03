import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

const SetButtonValuesModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Game Buttons');
  
  if (!isOpen) return null;

  const gameButtons = [
    { label: '1k', value: '1000' },
    { label: '2k', value: '2000' },
    { label: '5k', value: '5000' },
    { label: '10k', value: '10000' },
    { label: '20k', value: '20000' },
    { label: '25k', value: '25000' },
    { label: '50k', value: '50000' },
    { label: '75k', value: '75000' },
  ];

  const casinoButtons = [
    { label: '25', value: '25' },
    { label: '50', value: '50' },
    { label: '100', value: '100' },
    { label: '200', value: '200' },
    { label: '500', value: '500' },
    { label: '1000', value: '1000' },
  ];

  const currentItems = activeTab === 'Game Buttons' ? gameButtons : casinoButtons;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-[1px] p-4">
      <div className="bg-white w-full max-w-[600px] overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="bg-[#0088cc] flex items-center justify-between px-4 h-[45px]">
          <h2 className="text-white font-bold text-[18px]">Set Button Value</h2>
          <IoMdClose 
            className="text-white text-[24px] cursor-pointer hover:scale-110 transition-transform" 
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-4 h-[35px]">
            <button 
              onClick={() => setActiveTab('Game Buttons')}
              className={`px-6 h-full flex items-center justify-center font-bold text-[15px] transition-all ${activeTab === 'Game Buttons' ? 'bg-[#035175] text-white' : 'bg-[#e0e0e0] text-[#444444] hover:bg-[#d0d0d0]'}`}
            >
              Game Buttons
            </button>
            <button 
              onClick={() => setActiveTab('Casino Buttons')}
              className={`px-6 h-full flex items-center justify-center font-bold text-[15px] transition-all ml-[1px] ${activeTab === 'Casino Buttons' ? 'bg-[#035175] text-white' : 'bg-[#e0e0e0] text-[#444444] hover:bg-[#d0d0d0]'}`}
            >
              Casino Buttons
            </button>
          </div>

          <div className="flex gap-4 mb-2">
            <div className="flex-1 font-bold text-[16px] text-black">Price Label:</div>
            <div className="flex-1 font-bold text-[16px] text-black">Price Value:</div>
          </div>

          <div className="space-y-2 mb-6 max-h-[400px] overflow-y-auto pr-1">
            {currentItems.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    defaultValue={item.label}
                    className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[16px] text-black focus:border-[#0088cc] rounded-none" 
                  />
                </div>
                <div className="flex-1">
                  <input 
                    type="text" 
                    defaultValue={item.value}
                    className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[16px] text-black focus:border-[#0088cc] rounded-none" 
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Footer Button */}
          <div className="px-0 pt-2">
            <button 
              className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold h-[45px] text-[18px] transition-colors uppercase rounded-none"
              onClick={onClose}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetButtonValuesModal;

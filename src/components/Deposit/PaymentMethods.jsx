import React, { useState } from 'react';
import { FaBolt, FaUniversity, FaCoins } from 'react-icons/fa';
import { BsArrowLeft } from 'react-icons/bs';
import { MdOutlineInfo } from 'react-icons/md';

const PaymentCard = ({ name, badge, sub, qr, limit, icon: Icon, onPayNow }) => {
  return (
    <div className="border border-gray-200 rounded-2xl shadow-sm bg-white flex flex-col h-full overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-[#64748b] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.5),0_8px_10px_-6px_rgba(0,0,0,0.5)] relative">
      <div className="h-[4px] w-full bg-linear-to-r from-[#0088CC] to-[#035273]"></div>
      <div className="text-[#111] border-b border-black/5 bg-transparent p-4 pb-2 w-full flex flex-wrap justify-between items-start min-h-[55px] rounded-t-[3px]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-800 text-lg uppercase tracking-tight">{name}</h3>
            {badge && (
              <span className="text-[#0088CC] font-medium px-3 py-1.5 rounded-[8px] bg-[#0088CC]/10 border border-[#0088CC]/20 inline-block w-fit uppercase text-[16px]">
                {badge}
              </span>
            )}
          </div>
        </div>
        <div className="w-[22px] h-[22px] bg-[#64748b] rounded-full flex items-center justify-center text-white cursor-pointer shadow-sm">
          <MdOutlineInfo size={14} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {sub && (
          <div className="text-[#0088CC] font-medium px-3 py-1.5 rounded-[8px] bg-[#0088CC]/10 border border-[#0088CC]/20 relative overflow-hidden z-0 inline-block w-fit uppercase text-[16px] mb-4">
            {sub}
          </div>
        )}

        {qr && (
          <div className="flex flex-col items-center justify-center bg-transparent py-6 rounded-2xl mb-4">
            {name === 'LEO PAY' && (
              <div className="text-[#0088CC] font-medium px-3 py-1.5 rounded-[8px] bg-[#0088CC]/10 border border-[#0088CC]/20 relative overflow-hidden z-0 inline-flex items-center gap-1 w-fit uppercase text-[16px] mb-3 cursor-pointer text-center">
                LEO <span className="flex items-center italic underline">📋 UPLOD@UTR</span>
              </div>
            )}
            {name === 'TEST' && (
              <span className="font-bold text-gray-700 flex items-center gap-2 uppercase text-[15px] mb-3">TEST <span className="flex items-center italic underline underline-offset-4 cursor-pointer">📋 TEST</span></span>
            )}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${name === 'TEST' ? 'TEST_DATA' : 'JSK1DEPOSIT'}`}
              alt="QR Code"
              className="w-32 h-32 object-contain"
            />
          </div>
        )}

        {!qr && !sub && <div className="h-28"></div>}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-black font-normal text-lg">Limit: {limit}</span>
          <button
            onClick={onPayNow}
            className="bg-[#0088CC] text-white px-4 py-2 rounded-[10px] font-bold text-sm h-[38px] border-0 transition-transform duration-200 hover:scale-105 hover:opacity-85 no-underline shadow-sm"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

const PaymentMethods = ({ amount, onBack, onPayNow }) => {
  const [activeTab, setActiveTab] = useState('UPI');

  const upiMethods = [
    { id: 'turbo', name: 'TURBO PAY', sub: 'SUPERFAST (UPI+IMPS)', limit: '200 - 100000' },
    { id: 'leo', name: 'LEO PAY', badge: 'PAY', limit: '500 - 100000', qr: true },
    { id: 'tylt', name: 'TYLT UPI', sub: 'WE ACCEPT UPI PAYMENT', limit: '500 - 50000' },
    { id: 'timi', name: 'TIMIPAY', badge: 'UPI', limit: '500 - 50000' },
    { id: 'paypay', name: 'PAY-PAY', badge: 'UPI', limit: '500 - 50000' },
    { id: 's88', name: 'S88-PAY', sub: 'ONLY UPI PAYMENTS', limit: '500 - 40000' },
    { id: 'cowpay', name: 'COWPAY', sub: 'UPI PAYMENTS ONLY', limit: '500 - 100000' },
  ];

  const cryptoMethods = [
    { id: 'tyltpay', name: 'TYLTPAY', sub: 'CRYPTO PAYMENT', limit: '4675 - 1000000' },
  ];

  return (
    <div className="p-4 bg-white min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="bg-transparent border-2 border-[#ef4444] text-[#ef4444] rounded-[12px] font-semibold transition-all duration-200 px-4 py-[10px] text-[18px] h-auto flex items-center gap-2 hover:bg-[#ef4444] hover:text-white"
        >
          <BsArrowLeft strokeWidth={1} /> Back
        </button>

        <div className="bg-white px-5 py-[10px] rounded-full border border-[#c9cdd5] inline-flex items-center gap-2 font-normal text-[20px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] text-black">
          Selected Amount: <span className="bg-linear-to-r from-[#4ade80] to-[#3b82f6] bg-clip-text text-transparent font-bold">{amount}</span>
        </div>
      </div>

      <div className="bg-[#d4d5d9] p-[5px] rounded-[15px] border border-[#e5e7eb] inline-flex flex-wrap gap-0 mb-6">
        <button
          onClick={() => setActiveTab('UPI')}
          className={`flex items-center gap-2 px-[25px] py-[10px] rounded-[12px] font-medium text-[16px] transition-all duration-300 ease-in-out mr-[5px] ${activeTab === 'UPI' ? 'bg-[#0088CC] text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)]' : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
          <FaBolt size={14} /> UPI
        </button>
        <button
          onClick={() => setActiveTab('BANK')}
          className={`flex items-center gap-2 px-[25px] py-[10px] rounded-[12px] font-medium text-[16px] transition-all duration-300 ease-in-out mr-[5px] ${activeTab === 'BANK' ? 'bg-[#0088CC] text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)]' : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
          <FaUniversity size={14} /> BANK
        </button>
        <button
          onClick={() => setActiveTab('CRYPTO')}
          className={`flex items-center gap-2 px-[25px] py-[10px] rounded-[12px] font-medium text-[16px] transition-all duration-300 ease-in-out ${activeTab === 'CRYPTO' ? 'bg-[#0088CC] text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)]' : 'text-gray-600 hover:bg-gray-200'
            }`}
        >
          <FaCoins size={14} /> CRYPTO
        </button>
      </div>

      {activeTab === 'UPI' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upiMethods.map(m => (
            <PaymentCard key={m.id} {...m} icon={FaBolt} onPayNow={onPayNow} />
          ))}
        </div>
      )}

      {activeTab === 'BANK' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PaymentCard
            name="TEST"
            badge="TEST"
            limit="200 - 500000"
            icon={FaUniversity}
            qr={true}
            onPayNow={onPayNow}
          />
        </div>
      )}

      {activeTab === 'CRYPTO' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cryptoMethods.map(m => (
            <PaymentCard key={m.id} {...m} icon={FaCoins} onPayNow={onPayNow} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;

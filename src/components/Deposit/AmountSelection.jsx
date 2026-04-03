import React from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const AmountSelection = ({ amount, setAmount, onNext, onShowReport }) => {
  const quickAmounts = ['1k', '2k', '5k', '10k', '20k'];

  const handleQuickAmount = (val) => {
    const numeric = parseInt(val.replace('k', '')) * 1000;
    setAmount(numeric);
  };

  const increment = () => setAmount(prev => prev + 500);
  const decrement = () => setAmount(prev => (prev > 500 ? prev - 500 : 500));

  return (
    <div className="p-2 md:p-4 bg-white">
      {/* Quick Amounts - Responsive Horizontal Scroll */}
      <div className="flex md:flex-wrap overflow-x-auto no-scrollbar gap-1 mb-2 pb-1">
        {quickAmounts.map(val => {
          const isSelected = (parseInt(val.replace('k', '')) * 1000) === amount;
          return (
            <button
              key={val}
              onClick={() => handleQuickAmount(val)}
              className={`py-[10px] px-[18px] h-[38px] min-w-[70px] md:w-[75px] border-2 rounded-xl font-normal transition-all duration-200 outline-none shrink-0 md:shrink
                ${isSelected
                  ? 'border-[#0088cc] text-[#0088cc] bg-blue-50 shadow-sm'
                  : 'border-[#c9cdd5] text-gray-700 bg-[#f9fafb] hover:border-blue-200'
                }`}
            >
              {val}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
        {/* Amount Input with Controls */}
        <div className="w-full md:w-[242px] h-[54px] flex items-center border border-[#c9cdd5] bg-[#f9fafb] rounded-[15px] md:rounded-[15px] overflow-hidden px-1">
          <button onClick={decrement} className="p-3 text-black">
            <IoMdRemove size={24} />
          </button>
          <input
            type="text"
            value={amount === 0 ? '' : amount}
            onChange={(e) => setAmount(Number(e.target.value.replace(/\D/g, '')))}
            placeholder="Enter Amount"
            className="flex-1 text-center outline-none font-normal text-black text-lg min-w-0"
          />
          <button onClick={increment} className="p-3 text-black">
            <IoMdAdd size={24} />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onNext}
            className="flex-1 md:flex-none md:w-[160px] h-[54px] rounded-xl font-bold text-lg text-white shadow-md transition-all whitespace-nowrap active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' }}
          >
            Submit
          </button>

          <button
            onClick={onShowReport}
            className="flex-1 md:flex-none md:w-[160px] border border-[#13b378] text-[#13b378] h-[54px] rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all whitespace-nowrap active:scale-[0.98]"
          >
            Report
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

export default AmountSelection;

import React from 'react';

const SecurityAuth = () => {
  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white min-h-[150px]">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex items-center gap-2 h-[41px] uppercase">
        Secure Auth Verification
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[16px] text-gray-800 font-medium whitespace-nowrap">Secure Auth Verification Status:</span>
          <span className="bg-[#bb2d3b] text-white px-3 py-1 text-[16px] font-bold">Disabled</span>
        </div>
        
        <p className="text-[14px] text-gray-700 mb-4 font-medium italic">
          Please select below option to enable secure auth verification
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-0 w-full max-w-[600px]">
          <button className="flex-1 border border-[#146c43] bg-white text-[#146c43] py-2.5 px-4 font-bold text-[14px] hover:bg-[#146c43] hover:text-white transition-all uppercase whitespace-nowrap">
            ENABLE USING MOBILE
          </button>
          <button className="flex-1 border border-[#146c43] bg-white text-[#146c43] py-2.5 px-4 font-bold text-[14px] hover:bg-[#146c43] hover:text-white transition-all uppercase whitespace-nowrap md:border-l-0">
            ENABLE USING TELEGRAM
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityAuth;

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import iplBanner from '../../assets/ipl_banner.png';

const Coupon = () => {
    return (
        <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white">
          <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex items-center gap-2 h-[41px]">
            Coupons <FaInfoCircle size={14} className="ml-1 cursor-pointer"/>
          </div>
          <div className="flex flex-col lg:flex-row border-t border-gray-300">
             {/* Left Banner */}
             <div className="lg:w-7/12 p-2 bg-[#0088cc]/10">
                <img 
                  src={iplBanner} 
                  alt="IPL Lottery 2026" 
                  className="w-full h-auto object-contain border border-[#0088cc]/30 shadow-sm"
                />
             </div>
             {/* Right Table */}
             <div className="lg:w-5/12 overflow-x-auto">
                <table className="w-full text-left border-collapse lg:border-l border-gray-300">
                  <thead>
                    <tr className="bg-[#035273] md:bg-[#F7F7F7] border-b border-gray-300 h-[33px]">
                       <th className="px-2 py-0 text-[14px] font-bold border-r border-gray-300 text-white md:text-black text-left align-middle whitespace-nowrap">Coupon Name</th>
                       <th className="px-2 py-0 text-[14px] font-bold text-white md:text-black text-left align-middle whitespace-nowrap">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300 bg-[#E6E6E6] h-[33px]">
                      <td colSpan={2} className="px-2 py-1 text-center text-gray-800 text-[14px] font-bold italic h-[33px] align-middle">No record found!</td>
                    </tr>
                  </tbody>
                </table>
             </div>
          </div>
        </div>
    );
};

export default Coupon;

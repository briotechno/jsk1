import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const Bonus = () => {
  const table1Cols = ["Date", "Tran. No", "Amount"];
  const table2Cols = ["Coupon Name", "Coupon Amount", "Depo Amount", "Tran. No", "Status", "Given Date", "Expire Date"];

  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex flex-wrap items-center gap-2 h-auto md:h-[41px]">
        Bonus <span className="text-[14px] flex items-center gap-1 md:ml-2 font-normal hover:underline cursor-pointer">Terms and Conditions <FaInfoCircle size={14}/></span>
      </div>
      
      <div className="p-0">
        {/* Table 1 */}
        <div className="overflow-x-auto w-full md:w-1/2">
           <table className="w-full text-left border-collapse border border-gray-300 md:border-0">
             <thead>
               <tr className="bg-[#035273] md:bg-[#F7F7F7] border-b border-gray-300 h-[33px]">
                 {table1Cols.map((col, i) => (
                   <th key={i} className="px-2 py-0 text-[14px] font-bold border-r border-gray-300 text-white md:text-black text-left align-middle whitespace-nowrap">
                     {col}
                   </th>
                 ))}
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-gray-300 bg-[#E6E6E6] h-[33px]">
                 <td colSpan={table1Cols.length} className="px-2 py-1 text-center text-gray-800 text-[14px] font-bold italic whitespace-nowrap">No record found!</td>
               </tr>
             </tbody>
           </table>
        </div>

        {/* Table 2 */}
        <div className="overflow-x-auto w-full mt-4">
           <table className="w-full text-left border-collapse border border-gray-300 md:border-0">
             <thead>
               <tr className="bg-[#035273] md:bg-[#F7F7F7] border-b border-gray-300 h-[33px]">
                 {table2Cols.map((col, i) => (
                   <th key={i} className="px-2 py-0 text-[14px] font-bold border-r border-gray-300 text-white md:text-black text-left align-middle whitespace-nowrap">
                     {col}
                   </th>
                 ))}
               </tr>
             </thead>
             <tbody>
               <tr className="border-b border-gray-300 bg-[#E6E6E6] h-[33px]">
                 <td colSpan={table2Cols.length} className="px-2 py-1 text-center text-gray-800 text-[14px] font-bold italic">No record found!</td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Bonus;

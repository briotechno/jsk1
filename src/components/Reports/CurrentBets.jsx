import React, { useState } from 'react';

const CurrentBets = () => {
  const [reportType, setReportType] = useState("Select Report Type");
  const [betType, setBetType] = useState("All");

  const columns = ["Event Name", "Nation", "User Rate", "Amount", "Place Date"];

  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex items-center gap-2 h-[41px]">
        Current Bets
      </div>

      <div className="p-1.5">
        {/* Filter Section */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="border border-gray-300 rounded-none px-3 w-full md:w-[200px] h-[38px] text-[16px] text-black outline-none bg-white font-normal"
          >
            <option>Select Report Type</option>
            <option>Sports</option>
            <option>Casino</option>
          </select>

          <button className="bg-[#0088cc] text-white w-full md:w-[120px] h-[38px] flex items-center justify-center rounded-none font-normal text-[16px] hover:bg-blue-600 transition-colors uppercase">
            Submit
          </button>
        </div>

        {/* Entries and Search Section */}
        <div className="flex flex-col gap-4 mt-6 mb-2">
          {/* Row 1: Show Entries and Radio Buttons */}
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex items-center gap-2 text-[14px] text-black">
              Show
              <select className="border border-gray-300 rounded-none px-2 h-[38px] flex items-center outline-none text-black text-[14px] bg-white min-w-[70px]">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              Entries
            </div>

            <div className="flex items-center gap-4">
              {["All", "Back", "Lay"].map((type) => (
                <label key={type} className="flex items-center gap-1.5 text-[14px] text-black cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="betType"
                      checked={betType === type}
                      onChange={() => setBetType(type)}
                      className="peer appearance-none w-[16px] h-[16px] border border-gray-400 rounded-full bg-white checked:border-[#005a78] transition-all cursor-pointer"
                    />
                    <div className="absolute w-[8px] h-[8px] rounded-full bg-[#005a78] opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                  </div>
                  <span className="font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Row 2: Totals and Search */}
          <div className="flex flex-row items-center justify-between w-full gap-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] font-bold text-black min-w-fit">
              <span>Total Bets: 0</span>
              <span>Total Amount: 0</span>
            </div>

            <div className="flex items-center gap-2 text-[14px] text-black grow justify-end">
              Search:
              <input
                type="text"
                placeholder="0 records..."
                className="border border-gray-300 rounded-none px-3 h-[38px] outline-none w-full max-w-[200px]"
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse min-w-[800px] border border-gray-300">
            <thead>
              <tr className="bg-[#035273] md:bg-[#F7F7F7] border-b border-gray-300 h-[33px]">
                {columns.map((col, i) => (
                  <th 
                    key={i} 
                    className={`px-2 py-0 text-[14px] font-bold border-r border-gray-300 text-white md:text-black text-left align-middle whitespace-nowrap ${i === 0 ? 'w-[45%]' : 'w-[10%]'}`}
                  >
                    {col}
                  </th>
                ))}
                <th className="px-2 py-0 text-center border-gray-300 align-middle w-[5%] bg-[#035273] md:bg-[#F7F7F7]">
                   <div className="flex items-center justify-center">
                     <div className="relative flex items-center justify-center">
                       <input 
                         type="checkbox" 
                         className="peer appearance-none w-[14px] h-[14px] border border-gray-400 bg-white checked:bg-gray-800 cursor-pointer transition-colors" 
                       />
                       <div className="absolute inset-[2px] bg-white opacity-0 peer-checked:opacity-0 pointer-events-none transition-opacity"></div>
                     </div>
                   </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 bg-[#E6E6E6] h-[33px]">
                <td colSpan={columns.length + 1} className="px-2 py-4 text-center text-gray-500 text-[14px]">No data available in table</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CurrentBets;

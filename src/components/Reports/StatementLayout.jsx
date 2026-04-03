import React, { useState } from 'react';

const StatementLayout = ({ 
  title, 
  data = [],
  columns = [],
  statusOptions = ["All", "Success", "Pending", "Failed"],
  showStatusFilter = true,
  statusLabel = "Status"
}) => {
  const [status, setStatus] = useState(statusOptions[0]);

  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex items-center gap-2 h-[41px]">
        {title}
      </div>

      <div className='p-1.5'>
        <div className=" bg-white ">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
            <div className="flex items-center border border-gray-300 rounded-none px-3 py-0 w-full md:w-[200px] h-[38px] bg-white cursor-pointer hover:border-gray-400">
              <input
                type="date"
                defaultValue="2026-03-29"
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                className="w-full h-full outline-none text-black text-[16px] font-normal pr-2 bg-transparent cursor-pointer"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-none px-3 py-0 w-full md:w-[200px] h-[38px] bg-white cursor-pointer hover:border-gray-400">
              <input
                type="date"
                defaultValue="2026-03-31"
                onClick={(e) => e.target.showPicker && e.target.showPicker()}
                className="w-full h-full outline-none text-black text-[16px] font-normal pr-2 bg-transparent cursor-pointer"
              />
            </div>

            {showStatusFilter && (
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-none px-3 w-full md:w-[200px] h-[38px] text-[16px] text-black outline-none bg-white font-normal"
              >
                {statusOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            <button className="bg-[#0088cc] text-white px-10 w-full md:w-auto h-[38px] flex items-center justify-center rounded-none font-normal text-[16px] hover:bg-blue-600 transition-colors uppercase">
              Submit
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 gap-3 md:gap-0">
            <div className="flex items-center gap-2 text-[16px] text-black">
              Show
              <select className="border border-gray-300 rounded-none px-2 h-[38px] flex items-center outline-none text-black text-[16px] bg-white min-w-[70px]">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              Entries
            </div>

            <div className="flex items-center gap-2 text-[16px] text-black w-full md:w-auto">
              Search:
              <input
                type="text"
                placeholder={`${data.length} records...`}
                className="border border-gray-300 rounded-none px-3 h-[38px] outline-none grow md:grow-0 md:w-[200px] text-black text-[16px]"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left border-collapse min-w-[800px] border border-gray-300">
            <thead>
              <tr className="bg-[#035273] md:bg-[#F7F7F7] border-b border-gray-300 h-[33px]">
                {columns.map((col, i) => (
                  <th 
                    key={i} 
                    className={`px-2 py-0 text-[16px] font-bold ${i !== columns.length - 1 ? 'border-r' : ''} border-gray-300 text-white md:text-black text-left align-middle whitespace-nowrap`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? data.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-300 bg-[#E6E6E6] h-[33px]">
                  {columns.map((_, i) => (
                    <td key={i} className={`px-2 py-0 text-[16px] text-black ${i !== columns.length - 1 ? 'border-r' : ''} border-gray-300 align-middle`}>
                       {/* Handle dynamic data here */}
                       {row[i] || '-'}
                    </td>
                  ))}
                </tr>
              )) : (
                <tr className="border-b border-gray-300 bg-[#E6E6E6] h-[33px]">
                  <td colSpan={columns.length} className="px-2 py-4 text-center text-gray-500 text-[16px]">No data available in table</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StatementLayout;

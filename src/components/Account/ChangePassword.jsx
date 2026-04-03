import React from 'react';

const ChangePassword = () => {
  return (
    <div className="flex flex-col mx-1.5 mt-4 overflow-hidden rounded-none shadow-[0_0_5px_#a4a4a4] bg-white min-h-[150px]">
      <div className="bg-[#005a78] text-white px-4 py-2 font-normal text-[20px] flex items-center gap-2 h-[41px]">
        Change Password
      </div>
      
      <div className="p-6">
        <form className="max-w-[400px]">
          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">
              Current Password:
            </label>
            <input
              type="password"
              placeholder="Enter Current password"
              className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[14px] text-gray-700 focus:border-[#0088cc] rounded-none placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">
              New Password:
            </label>
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[14px] text-gray-700 focus:border-[#0088cc] rounded-none placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[14px] font-bold text-gray-800 mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 h-[38px] px-3 outline-none text-[14px] text-gray-700 focus:border-[#0088cc] rounded-none placeholder:text-gray-400 placeholder:italic"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#0088cc] text-white px-6 w-full md:w-auto h-[38px] flex items-center justify-center rounded-none font-semibold text-[14px] hover:bg-blue-600 transition-colors uppercase whitespace-nowrap"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

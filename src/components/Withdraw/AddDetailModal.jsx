import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const AddDetailModal = ({ isOpen, onClose, onAdd, type }) => {
  const [formData, setFormData] = useState({
    accountName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
    walletAddress: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    // Reset form after add
    setFormData({
      accountName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: '',
      upiId: '',
      walletAddress: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="bg-[#0088CC] text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Add New Detail</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-all">
            <FaTimes size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {type === 'BANK' && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900 uppercase">ACCOUNT NAME</label>
                <input
                  type="text"
                  name="accountName"
                  value={formData.accountName}
                  onChange={handleChange}
                  placeholder="Enter ACCOUNT NAME"
                  className="w-full border border-gray-300 rounded-[5px] p-2 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900 uppercase">BANK NAME</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="Enter BANK NAME"
                  className="w-full border border-gray-300 rounded-[5px] p-2 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900 uppercase">ACCOUNT NUMBER</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Enter ACCOUNT NUMBER"
                  className="w-full border border-gray-300 rounded-[5px] p-2 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-gray-900 uppercase">IFSC CODE</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleChange}
                  placeholder="Enter IFSC CODE"
                  className="w-full border border-gray-300 rounded-[5px] p-2 text-sm outline-none focus:border-blue-500"
                  required
                />
              </div>
            </>
          )}

          {type === 'UPI' && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-900 uppercase invisible">Enter</label> {/* Invisible label to match height of Bank Modal */}
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="Enter"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-sm outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          {type === 'CRYPTO' && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold text-gray-900 uppercase">Wallet Address</label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                placeholder="Enter Wallet Address"
                className="w-full border border-gray-300 rounded-[5px] p-2 text-sm outline-none focus:border-blue-500"
                required
              />
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#c41624] text-white py-2 px-6 rounded-[2px] font-bold text-base hover:bg-red-800 transition-all uppercase shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDetailModal;

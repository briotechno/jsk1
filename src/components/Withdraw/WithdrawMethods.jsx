import React, { useState } from 'react';
import { FaUniversity, FaBolt, FaCoins, FaRegTimesCircle, FaChevronDown } from 'react-icons/fa';
import { RiInformationLine } from 'react-icons/ri';
import AddDetailModal from './AddDetailModal';
import { walletController } from '../../controller';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const WithdrawMethods = ({ accounts, fetchAccounts, selectedAccountId, setSelectedAccountId, activeTab, setActiveTab }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();
  const { showToast } = useToast();

  const handleDelete = async (tab, id) => {
    if (tab === 'CRYPTO') return; // USDT Wallet is just updated, not deleted this way
    try {
      const res = await walletController.deleteBankAccount(user.loginToken, id);
      if (res && res.error === '0') {
        showToast('Account removed', 'success');
        fetchAccounts();
      } else {
        showToast(res?.message || 'Failed to remove account', 'error');
      }
    } catch (err) {
      showToast('Error removing account', 'error');
    }
  };

  const handleAdd = async (newData) => {
    try {
      let res;
      if (activeTab === 'CRYPTO') {
        res = await walletController.updateUSDTWallet({
          LoginToken: user.loginToken,
          Waddress: newData.walletAddress,
          WQr: newData.walletQr || ''
        });
      } else {
        // Prepare bank save payload
        res = await walletController.saveBankAccount({
          LoginToken: user.loginToken,
          ACname: newData.accountName || newData.upiId || 'Account',
          Bank: activeTab === 'UPI' ? 'UPI' : (newData.bankName || 'Bank'),
          ACholdername: newData.accountName || newData.upiId || 'Holder',
          ACno: newData.accountNumber || newData.upiId,
          Isfc: newData.ifscCode || 'IFSC0000000'
        });
      }

      if (res && res.error === '0') {
        showToast('Successfully added', 'success');
        fetchAccounts();
      } else {
        showToast(res?.message || 'Failed to add', 'error');
      }
    } catch (err) {
      showToast('Error adding detail', 'error');
    }
    setShowAddModal(false);
  };

  const tabs = [
    { id: 'BANK', label: 'BANK', icon: FaUniversity },
    { id: 'CRYPTO', label: 'CRYPTO', icon: FaCoins },
  ];

  const currentAccounts = accounts[activeTab] || [];

  return (
    <div className="p-4 bg-white min-h-[400px]">
      <div className="bg-[#d4d5d9] p-[5px] rounded-[15px] border border-[#e5e7eb] inline-flex flex-wrap gap-0 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-[25px] py-[10px] rounded-[12px] font-medium text-[16px] transition-all duration-300 ease-in-out mr-[5px] ${activeTab === tab.id ? 'bg-[#0088CC] text-white shadow-[0_4px_15px_rgba(168,85,247,0.4)]' : 'text-gray-600 hover:bg-gray-200'
              }`}
          >
            <tab.icon size={14} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="border border-gray-100 rounded-none bg-[#f0f0f0]">
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#f0f0f0] rounded-none">
          <div className="flex items-start gap-3">
            <div 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="w-7 h-7 bg-black rounded-full flex items-center justify-center text-white cursor-pointer transition-transform duration-300 mt-1"
              style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}
            >
              <FaChevronDown size={14} />
            </div>
            
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-800 uppercase flex items-center gap-2" style={{ fontSize: '22px', fontWeight: '700' }}>
                {activeTab === 'BANK' ? 'INSTANT WITHDRAWAL' : 
                 activeTab === 'UPI' ? 'UPI PAYMENT' : 'Crypto Payment'}
                <RiInformationLine size={20} className="text-gray-500 cursor-pointer mb-0.5" />
              </h3>

              {activeTab === 'BANK' && (
                <div className="rounded-[5px] px-3 py-1 bg-[#d3e9f6] w-fit">
                  <span className="text-[#0088CC] text-xs font-bold uppercase">Express Withdrawal</span>
                </div>
              )}

              {activeTab === 'UPI' && (
                <div className="rounded-[5px] px-3 py-1 bg-[#d3e9f6] w-fit">
                  <span className="text-[#0088CC] text-xs font-bold uppercase">UPI Payments</span>
                </div>
              )}

              {activeTab === 'CRYPTO' && (
                <div className="rounded-[5px] px-3 py-1 bg-[#d3e9f6] w-fit">
                  <span className="text-[#0088CC] text-xs font-bold uppercase">Crypto Address Only</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#0088CC] text-white rounded-none border border-transparent transition-all shadow-sm flex items-center justify-center cursor-pointer"
            style={{
              height: '38px',
              padding: '.375rem .75rem',
              fontWeight: '400',
              fontSize: '16px'
            }}
          >
            {activeTab === 'CRYPTO' && currentAccounts.length > 0 ? 'Update' : 'Add New'}
          </button>
        </div>
        
        {!isCollapsed && (
          <div className="animate-in slide-in-from-top-2 duration-300">
            <div className="p-4 flex flex-col gap-4">
              {currentAccounts.map(acc => (
                <div 
                  key={acc.Id || acc.id} 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setSelectedAccountId(acc.Id || acc.id)}
                >
                  <div className="flex items-center justify-center">
                    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedAccountId === (acc.Id || acc.id) 
                      ? 'border-[#033E5D] bg-white' 
                      : 'border-[#c9cdd5] bg-white'
                    }`}>
                      {selectedAccountId === (acc.Id || acc.id) && (
                        <div className="w-[10px] h-[10px] rounded-full bg-[#033E5D]" />
                      )}
                    </div>
                  </div>
                  
                  <div 
                    className="relative border-none rounded-none w-fit min-w-[350px] flex items-start transition-all"
                    style={{
                      padding: '5px',
                      background: '#f4f4f4',
                      boxShadow: '0 0 3px #666',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1 pr-6">
                      {activeTab === 'BANK' ? (
                        <>
                          <span className="text-[14px] font-[400] text-gray-900 uppercase">Account Name</span>
                          <span className="text-[14px] font-[400] text-gray-900 text-right">{acc.ACholdername || acc.accountName}</span>
                          <span className="text-[14px] font-[400] text-gray-900 uppercase">Bank Name</span>
                          <span className="text-[14px] font-[400] text-gray-900 text-right">{acc.Bank || acc.bankName}</span>
                          <span className="text-[14px] font-[400] text-gray-900 uppercase">Account Number</span>
                          <span className="text-[14px] font-[400] text-gray-900 text-right">{acc.ACno || acc.accountNumber}</span>
                          <span className="text-[14px] font-[400] text-gray-900 uppercase">IFSC Code</span>
                          <span className="text-[14px] font-[400] text-gray-900 text-right">{acc.Isfc || acc.ifscCode}</span>
                        </>
                      ) : activeTab === 'UPI' ? (
                        <>
                          <span className="text-[14px] font-[400] text-gray-900 uppercase">UPI ID</span>
                          <span className="text-[14px] font-[400] text-gray-900 text-right">{acc.ACno || acc.upiId}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[14px] font-[400] text-gray-900">Wallet Address</span>
                          <span className="text-[14px] font-[400] text-gray-900 text-right">{acc.walletAddress}</span>
                        </>
                      )}
                    </div>
                    {activeTab !== 'CRYPTO' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(activeTab, acc.Id || acc.id);
                        }}
                        className="absolute top-[-10px] right-[-10px] text-black bg-white rounded-full p-0.5 hover:text-red-500 transition-all border border-gray-200 shadow-sm z-10"
                      >
                        <FaRegTimesCircle size={22} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {currentAccounts.length === 0 && (
                <div className="text-gray-500 text-sm">No {activeTab} accounts saved yet.</div>
              )}
            </div>
          </div>
        )}
      </div>

      <AddDetailModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
        onAdd={handleAdd}
        type={activeTab}
      />
    </div>
  );
};

export default WithdrawMethods;

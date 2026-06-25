import React, { useState, useEffect } from 'react';
import WithdrawAmountSelection from './WithdrawAmountSelection';
import WithdrawMethods from './WithdrawMethods';
import DepositStatement from '../Deposit/DepositStatement';
import { useAuth } from '../../contexts/AuthContext';
import { walletController } from '../../controller';
import { useToast } from '../../contexts/ToastContext';

const Withdraw = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [amount, setAmount] = useState(2000);
  const [showReport, setShowReport] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [accounts, setAccounts] = useState({ BANK: [], UPI: [], CRYPTO: [] });
  const [activeTab, setActiveTab] = useState('BANK');

  const fetchAccounts = async () => {
    if (!user?.loginToken) return;
    try {
      const res = await walletController.getBankAccounts(user.loginToken);
      let newAccounts = [];
      const raw = res?.data || res?.list || res;
      if (Array.isArray(raw)) newAccounts = raw;
      else if (typeof raw === 'object' && raw !== null) {
        newAccounts = Object.values(raw).filter(v => v && typeof v === 'object' && (v.ACno || v.Id));
      }
      
      const bankAccounts = newAccounts.filter(a => !a.Type || a.Type.toUpperCase() === 'BANK');
      const upiAccounts = newAccounts.filter(a => a.Type?.toUpperCase() === 'UPI');
      
      setAccounts(prev => ({ ...prev, BANK: bankAccounts, UPI: upiAccounts }));

      const usdtRes = await walletController.getUSDTWallet(user.loginToken);
      if (usdtRes && usdtRes.error === '0' && usdtRes.data && usdtRes.data.Waddress) {
        setAccounts(prev => ({ ...prev, CRYPTO: [{ Id: 'usdt', walletAddress: usdtRes.data.Waddress }] }));
      }
    } catch (error) {
      console.error("Error fetching accounts", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user?.loginToken]);

  const handleWithdraw = async () => {
    if (!selectedAccountId) {
      showToast('Please select a withdrawal method', 'error');
      return;
    }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      showToast('Please enter a valid amount', 'error');
      return;
    }
    
    if (amt > parseFloat(user?.balance || 0)) {
      showToast('Insufficient balance', 'error');
      return;
    }

    try {
      let res;
      if (activeTab === 'CRYPTO') {
        res = await walletController.withdrawUSDT({ LoginToken: user.loginToken, Amount: amt });
      } else {
        res = await walletController.requestWithdrawal(user.loginToken, selectedAccountId, amt);
      }

      if (res && res.error === '0') {
        showToast(res.message || 'Withdrawal initiated successfully', 'success');
        setAmount(0);
      } else {
        showToast(res?.message || 'Failed to initiate withdrawal', 'error');
      }
    } catch (error) {
      showToast('An error occurred', 'error');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <WithdrawAmountSelection 
        amount={amount} 
        setAmount={setAmount} 
        onWithdraw={handleWithdraw} 
        onShowReport={() => setShowReport(!showReport)}
      />
      
      {showReport ? (
        <DepositStatement 
          title="Withdraw Statement" 
          columns={["Status", "Amount", "Reference", "Date", "Remark"]}
          data={[]}
        />
      ) : (
        <WithdrawMethods 
          accounts={accounts}
          fetchAccounts={fetchAccounts}
          selectedAccountId={selectedAccountId}
          setSelectedAccountId={setSelectedAccountId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default Withdraw;

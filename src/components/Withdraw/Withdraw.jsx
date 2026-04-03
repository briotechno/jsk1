import React, { useState } from 'react';
import WithdrawAmountSelection from './WithdrawAmountSelection';
import WithdrawMethods from './WithdrawMethods';
import DepositStatement from '../Deposit/DepositStatement';

const Withdraw = () => {
  const [amount, setAmount] = useState(2000);
  const [showReport, setShowReport] = useState(false);

  const handleWithdraw = () => {
    // In a real app, this would trigger the withdrawal process
    alert(`Withdrawal of ${amount} initiated!`);
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
          data={[
            { status: 'Pending', amount: '2000', reference: 'W123456', date: '01/04/2026 12:30:45', remark: '' }
          ]}
        />
      ) : (
        <WithdrawMethods />
      )}
    </div>
  );
};

export default Withdraw;

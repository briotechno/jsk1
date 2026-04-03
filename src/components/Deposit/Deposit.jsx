import React, { useState } from 'react';
import AmountSelection from './AmountSelection';
import PaymentMethods from './PaymentMethods';
import DepositModal from './DepositModal';
import DepositStatement from './DepositStatement';

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(2000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {step === 1 ? (
        <>
          <AmountSelection 
            amount={amount} 
            setAmount={setAmount} 
            onNext={() => setStep(2)} 
            onShowReport={() => setShowReport(!showReport)}
          />
          {showReport && <DepositStatement />}
        </>
      ) : (
        <PaymentMethods 
          amount={amount} 
          onBack={() => setStep(1)} 
          onPayNow={() => setIsModalOpen(true)} 
        />
      )}

      <DepositModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Deposit;

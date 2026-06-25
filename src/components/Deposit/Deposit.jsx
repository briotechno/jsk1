import React, { useState, useEffect } from 'react';
import AmountSelection from './AmountSelection';
import PaymentMethods from './PaymentMethods';
import DepositModal from './DepositModal';
import DepositStatement from './DepositStatement';
import { useAuth } from '../../contexts/AuthContext';
import { walletController } from '../../controller';

const Deposit = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(2000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    if (user?.loginToken) {
      walletController.getDepositMethods(user.loginToken)
        .then(res => {
          const raw = res?.data || res?.list || res;
          let newMethods = [];
          if (Array.isArray(raw)) {
            newMethods = raw;
          } else if (typeof raw === 'object' && raw !== null) {
            newMethods = Object.values(raw).filter(v => v && typeof v === 'object' && v.Min);
          }
          setMethods(newMethods);
        })
        .catch(err => console.error("Error fetching deposit methods:", err));
    }
  }, [user?.loginToken]);

  const handlePayNow = (method) => {
    setSelectedMethod(method);
    setIsModalOpen(true);
  };

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
          onPayNow={handlePayNow} 
          methods={methods}
        />
      )}

      <DepositModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        method={selectedMethod}
        amount={amount}
        loginToken={user?.loginToken}
      />
    </div>
  );
};

export default Deposit;

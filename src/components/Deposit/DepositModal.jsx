import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { walletController } from '../../controller';
import { useToast } from '../../contexts/ToastContext';

const DepositModal = ({ isOpen, onClose, method, amount, loginToken }) => {
  const [utrNumber, setUtrNumber] = useState('');
  const [txHash, setTxHash] = useState('');
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotMime, setScreenshotMime] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  if (!isOpen) return null;

  const isCrypto = method?.Type?.toUpperCase() === 'CRYPTO' || method?.Type?.toUpperCase() === 'USDT';

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setScreenshotMime(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setScreenshot(base64String.split(',')[1] || base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!utrNumber.trim()) {
      showToast(isCrypto ? 'Please enter USDT Reference No' : 'Please enter valid UTR/Reference ID', 'error');
      return;
    }

    if (isCrypto && !txHash.trim()) {
      showToast('Please enter TX Hash', 'error');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (isCrypto) {
        response = await walletController.depositUSDT({
          LoginToken: loginToken,
          Amount: amount,
          usdt_ref: utrNumber,
          Mime_type: screenshotMime,
          Screenshot: screenshot || '',
          txhash: txHash
        });
      } else {
        response = await walletController.requestDeposit({
          LoginToken: loginToken,
          Amount: amount,
          Utr: utrNumber,
          BankId: method?.Bank_Id,
          Mime_type: screenshotMime,
          Screenshot: screenshot || ''
        });
      }

      if (response && response.error === "0") {
        showToast(response.message || 'Deposit request submitted successfully', 'success');
        onClose();
      } else {
        showToast(response?.message || 'Failed to submit deposit', 'error');
      }
    } catch (error) {
      showToast('An error occurred while submitting', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-[#0088cc] p-4 flex items-center justify-between">
          <h2 className="text-white font-bold text-xl uppercase tracking-wide">Deposit</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-full p-1 transition-colors">
            <IoIosClose size={32} />
          </button>
        </div>
        
        <div className="p-6">
          <label className="block text-gray-700 font-bold text-sm mb-2 uppercase">
            {isCrypto ? 'USDT Reference No:' : 'UTR/Transaction Number:'}
          </label>
          <input
            type="text"
            value={utrNumber}
            onChange={(e) => setUtrNumber(e.target.value)}
            placeholder={isCrypto ? 'Enter Reference No' : 'Enter UTR Number'}
            className="w-full border border-gray-300 rounded p-3 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
          />

          {isCrypto && (
            <>
              <label className="block text-gray-700 font-bold text-sm mb-2 uppercase">
                TX Hash:
              </label>
              <input
                type="text"
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                placeholder="Enter TX Hash"
                className="w-full border border-gray-300 rounded p-3 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300"
              />
            </>
          )}

          <label className="block text-gray-700 font-bold text-sm mb-2 uppercase">
            Upload Screenshot (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded p-2 mb-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
          />
          
          <div className="bg-[#c1272d] text-white p-3 rounded-sm text-sm font-bold leading-relaxed mb-6 flex gap-3">
            <div className="flex-1">
              Expected Format: {isCrypto ? 'Reference number' : 'UTR / Transaction ID'} must be valid characters.
            </div>
          </div>
          
          <button
            className={`w-full bg-[#0088cc] text-white py-3 rounded font-bold text-lg hover:bg-blue-600 transition-colors shadow-md ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;

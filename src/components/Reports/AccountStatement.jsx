import React, { useState, useEffect } from 'react';
import StatementLayout from './StatementLayout';
import { useAuth } from '../../contexts/AuthContext';
import { userController } from '../../controller';

const AccountStatement = () => {
  const { user, isLoggedIn } = useAuth();
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState([]); // Store raw data to lookup GID
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betLoading, setBetLoading] = useState(false);

  // Default dates: last 7 days (YYYY-MM-DD format for inputs)
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const formatDateForInput = (date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
  };

  const [startDate, setStartDate] = useState(formatDateForInput(sevenDaysAgo));
  const [endDate, setEndDate] = useState(formatDateForInput(today));

  // Convert YYYY-MM-DD to DD-MM-YYYY for the API
  const formatDateForApi = (dateStr) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}-${m}-${y}`;
  };

  const fetchStatement = async () => {
    if (!isLoggedIn || !user?.loginToken) return;
    try {
      const res = await userController.getAccountStatement(
        user.loginToken, 
        formatDateForApi(startDate), 
        formatDateForApi(endDate)
      );
      
      if (res && typeof res === 'object' && !res.error) {
        const dataArray = Object.values(res).filter(item => typeof item === 'object' && item !== null);
        
        let computed = [];
        let currentBalance = 0;
        let isChronological = true;
        
        const openingIndex = dataArray.findIndex(row => row["2"] === 'O');
        if (openingIndex > 0 && openingIndex === dataArray.length - 1) {
          isChronological = false;
        }

        const processRow = (row) => {
          const type = row["2"];
          const amount = Math.abs(parseFloat(row["1"]) || 0);
          let credit = 0; let debit = 0;

          if (type === 'O') {
            currentBalance = parseFloat(row["1"]) || 0;
          } else if (type === 'CR' || type === 'D') {
            credit = amount;
            currentBalance += amount;
          } else if (type === 'DR' || type === 'W') {
            debit = amount;
            currentBalance -= amount;
          }
          return { ...row, credit, debit, balance: currentBalance };
        };

        if (isChronological) {
          computed = dataArray.map(processRow);
        } else {
          const temp = [...dataArray].reverse();
          computed = temp.map(processRow);
          computed.reverse();
        }

        setRawData(computed);

        const tableData = computed.map(item => [
          item["0"] || '---', // Date
          item["4"] || '---', // Sr no / Transaction ID (gid)
          item.credit > 0 ? `+${item.credit}` : '-', // Credit
          item.debit > 0 ? `-${item.debit}` : '-', // Debit
          item.balance !== undefined ? item.balance.toFixed(2) : '0.00', // Pts (Balance)
          item["3"] || '---' // Remark
        ]);
        setData(tableData);
      } else {
        setData([]);
        setRawData([]);
      }
    } catch (error) {
      console.error('Failed to fetch account statement:', error);
    }
  };

  useEffect(() => {
    fetchStatement();
  }, [user?.loginToken, isLoggedIn]);

  const handleRowClick = async (rowArray, idx) => {
    const rowObject = rawData[idx];
    if (!rowObject || !rowObject["4"]) return; // No GID

    setBetLoading(true);
    setIsModalOpen(true);
    setSelectedBet(null);

    try {
      const res = await userController.getBetStatement(rowObject["4"], user.loginToken);
      if (res && typeof res === 'object' && !res.error) {
        setSelectedBet(res);
      } else if (res && res.error === "0") {
        setSelectedBet(res);
      } else {
        setSelectedBet({ error: "1", msg: res?.msg || "No details found" });
      }
    } catch (err) {
      console.error('Failed to fetch bet statement:', err);
      setSelectedBet({ error: "1", msg: "Error fetching details" });
    } finally {
      setBetLoading(false);
    }
  };

  return (
    <>
      <StatementLayout
        title="Account Statement"
        columns={["Date", "Sr no", "Credit", "Debit", "Pts", "Remark"]}
        data={data}
        statusOptions={["Deposite/Withdraw Reports"]}
        showStatusFilter={false}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={fetchStatement}
        onRowClick={handleRowClick}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded shadow-xl flex flex-col relative overflow-hidden">
            <div className="bg-[#005a78] text-white px-4 py-3 flex justify-between items-center">
              <h3 className="font-bold text-[16px] m-0">Bet Detail Receipt</h3>
              <button className="text-white text-[24px] leading-none" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              {betLoading ? (
                <div className="text-center py-6 text-gray-500 font-bold uppercase">Fetching...</div>
              ) : selectedBet?.error === "1" ? (
                <div className="text-center py-6 text-red-500 font-bold">{selectedBet.msg}</div>
              ) : (
                <div className="flex flex-col gap-4">
                  {Object.entries(selectedBet || {})
                    .filter(([key]) => !isNaN(Number(key)))
                    .map(([key, bet]) => (
                      <div key={key} className="bg-gray-100 rounded p-3 text-[14px]">
                        <div className="font-bold text-[15px] border-b border-gray-300 pb-2 mb-2 flex justify-between items-center">
                          {bet.Game?.replace(/&nbsp;/g, ' ')}
                          <span className={`px-2 py-0.5 rounded text-[11px] text-white ${
                            bet.Side?.toUpperCase() === 'BACK' ? 'bg-[#72bbef]' : 
                            bet.Side?.toUpperCase() === 'LAY' ? 'bg-[#faa9ba]' : 'bg-gray-500'
                          }`}>
                            {bet.Side || bet.Type}
                          </span>
                        </div>
                        <div className="flex justify-between mb-1"><span className="text-gray-600">Selection</span><span className="font-bold">{bet.Selection}</span></div>
                        <div className="flex justify-between mb-1"><span className="text-gray-600">Rate</span><span className="font-bold">{bet.Rate}</span></div>
                        <div className="flex justify-between mb-1"><span className="text-gray-600">Stake</span><span className="font-bold">₹{bet.Stake}</span></div>
                        <div className="flex justify-between"><span className="text-gray-600">Date</span><span className="text-[12px]">{bet.Date}</span></div>
                      </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountStatement;

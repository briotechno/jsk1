import React, { useState, useEffect } from 'react';
import StatementLayout from './StatementLayout';
import { useAuth } from '../../contexts/AuthContext';
import { walletController } from '../../controller';

const WithdrawStatement = () => {
  const { user, isLoggedIn } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
      if (!isLoggedIn || !user?.loginToken) return;
      try {
        const res = await walletController.getWithdrawalHistory(user.loginToken);
        if (res) {
          const possibleData = res.data || res.list || res.withdrawlist;
          const rawData = possibleData || (typeof res === 'object' && (res.error === '0' || !res.error) && Object.keys(res).some(k => !isNaN(k)) ? res : null);
          
          let formattedData = [];
          if (Array.isArray(rawData)) {
            formattedData = rawData;
          } else if (rawData && typeof rawData === 'object') {
            formattedData = Object.values(rawData).filter(v => v && typeof v === 'object' && (v.Amount !== undefined || v.amount !== undefined || v[0] !== undefined));
          } else if (Array.isArray(res)) {
            formattedData = res;
          }

          const tableData = formattedData.map(item => [
            item.Method || item.method || item.BankName || item.AccountNo || item.Type || 'Bank',
            item.Amount || item.amount || 0,
            item.Status || item.status || 'Pending',
            item.Date || item.date || item.datetime || item.created_at || '---',
            item.Remarks || item.remarks || '---'
          ]);
          setData(tableData);
        }
      } catch (error) {
        console.error('Failed to fetch withdrawal history:', error);
      }
    };
    
    fetchWithdrawalHistory();
  }, [user?.loginToken, isLoggedIn]);

  return (
    <StatementLayout
      title="Withdraw Statement"
      columns={["Withdraw Name", "Amount", "Status", "Date", "Remark"]}
      data={data}
      statusOptions={["All", "Pending", "Success", "Failed"]}
    />
  );
};

export default WithdrawStatement;

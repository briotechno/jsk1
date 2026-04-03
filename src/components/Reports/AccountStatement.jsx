import React from 'react';
import StatementLayout from './StatementLayout';

const AccountStatement = () => {
  return (
    <StatementLayout
      title="Account Statement"
      columns={["Date", "Sr no", "Credit", "Debit", "Pts", "Remark"]}
      statusOptions={["Deposite/Withdraw Reports"]}
    />
  );
};

export default AccountStatement;

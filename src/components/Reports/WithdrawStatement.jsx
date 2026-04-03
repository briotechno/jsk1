import React from 'react';
import StatementLayout from './StatementLayout';

const WithdrawStatement = () => {
  return (
    <StatementLayout
      title="Withdraw Statement"
      columns={["Withdraw Name", "Amount", "Status", "Date", "Remark"]}
      statusOptions={["All", "Pending", "Success", "Failed"]}
    />
  );
};

export default WithdrawStatement;

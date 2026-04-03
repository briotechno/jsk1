import React from 'react';
import StatementLayout from '../Reports/StatementLayout';

const DepositStatement = () => {
  return (
    <StatementLayout
      title="Deposit Statement"
      columns={["Deposit Name", "Amount", "Status", "Date", "Remark"]}
      statusOptions={["All", "Success", "Pending", "Failed"]}
    />
  );
};

export default DepositStatement;

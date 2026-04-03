import React from 'react';
import StatementLayout from './StatementLayout';

const LiveCasinoBets = () => {
  return (
    <StatementLayout
      title="Live Casino Bets"
      columns={["Bet Date", "Match Name", "Stake", "Status", "Profit/Loss"]}
      statusOptions={["All", "Settled", "Unsettled"]}
    />
  );
};

export default LiveCasinoBets;

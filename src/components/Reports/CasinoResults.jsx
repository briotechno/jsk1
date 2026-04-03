import React from 'react';
import StatementLayout from './StatementLayout';

const CasinoResults = () => {
  return (
    <StatementLayout
      title="Casino Results"
      columns={["Match Name", "Match Date", "Result"]}
      statusOptions={["All"]}
    />
  );
};

export default CasinoResults;

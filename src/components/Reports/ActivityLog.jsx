import React from 'react';
import StatementLayout from './StatementLayout';

const ActivityLog = () => {
  return (
    <StatementLayout
      title="Activity Log"
      columns={["Username", "Date", "Ip Address"]}
      statusOptions={["Select Log Type"]}
    />
  );
};

export default ActivityLog;

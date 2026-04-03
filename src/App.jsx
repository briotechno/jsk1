import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MainDashboard from './components/Dashboard/MainDashboard';
import SportsPage from './components/Dashboard/SportsPage';
import Header from './components/Header';
import MatchDetail from './components/MatchDetail/MatchDetail';
import Sidebar from './components/Sidebar/Sidebar';
import AuthLayout from './components/Auth/AuthLayout';

import TournamentDetail from './components/MatchDetail/TournamentDetail';

import './App.css';

import Deposit from './components/Deposit/Deposit';
import Withdraw from './components/Withdraw/Withdraw';
import WithdrawStatement from './components/Reports/WithdrawStatement';
import DepositStatement from './components/Deposit/DepositStatement';
import AccountStatement from './components/Reports/AccountStatement';
import ActivityLog from './components/Reports/ActivityLog';
import CasinoResults from './components/Reports/CasinoResults';
import LiveCasinoBets from './components/Reports/LiveCasinoBets';
import SecurityAuth from './components/Account/SecurityAuth';
import Bonus from './components/Account/Bonus';
import Coupon from './components/Account/Coupon';
import CurrentBets from './components/Reports/CurrentBets';
import ChangePassword from './components/Account/ChangePassword';

// Dashboard layout with Header and Sidebar
function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Lifted from Header

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100">
      <Header 
        onToggleSidebar={() => setSidebarOpen(p => !p)} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn} 
      />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay backdrop on mobile when sidebar open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar — always visible on md+, drawer on mobile */}
        <div className={`
          fixed md:relative top-0 left-0 h-full z-40 md:z-50
          transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          flex-shrink-0
        `}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Content Area with Routes */}
        <div className="flex-1 overflow-auto bg-gray-50 contents-container">
          <Routes>
            <Route path="/" element={<MainDashboard isLoggedIn={isLoggedIn} />} />
            <Route path="/sport/:sportName" element={<SportsPage />} />
            {/* <Route path="/match/:matchId" element={<MatchDetail />} /> */}
            <Route path="/match/:sport/:matchId" element={<MatchDetail />} />
            <Route path="/tournament/:tournamentId" element={<TournamentDetail />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/withdraw-statement" element={<WithdrawStatement />} />
            <Route path="/deposit-statement" element={<DepositStatement />} />
            <Route path="/account-statement" element={<AccountStatement />} />
            <Route path="/activity-logs" element={<ActivityLog />} />
            <Route path="/casino-results" element={<CasinoResults />} />
            <Route path="/live-casino-bets" element={<LiveCasinoBets />} />
            <Route path="/bonus" element={<Bonus />} />
            <Route path="/coupon" element={<Coupon />} />
            <Route path="/security-auth" element={<SecurityAuth />} />
            <Route path="/current-bets" element={<CurrentBets />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Auth Routes with AuthLayout (No Header/Sidebar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Main Pages with MainLayout (Includes Header/Sidebar) */}
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

export default App;

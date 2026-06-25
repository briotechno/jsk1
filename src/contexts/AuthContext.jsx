import React, { createContext, useContext, useState, useEffect } from 'react';
import { userController } from '../controller';

// Cookie Utilities
const setCookie = (name, value, days = 7) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
};

const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
};

const eraseCookie = (name) => {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [stakes, setStakes] = useState([
    { label: 'S1', value: '1000' },
    { label: 'S2', value: '10000' },
    { label: 'S3', value: '20000' },
    { label: 'S4', value: '100' },
    { label: 'S5', value: '200' },
    { label: 'S6', value: '500' },
  ]);

  // Initialize from cookie on mount
  useEffect(() => {
    const userCookie = getCookie('authUser');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        if (userData && userData.loginToken) {
          setIsLoggedIn(true);
          setUser(userData);
        }
      } catch (e) {
        console.error("Failed to parse auth cookie", e);
      }
    }
    setIsInitializing(false);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setCookie('authUser', JSON.stringify(userData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    eraseCookie('authUser');
    localStorage.removeItem('loginToken');
    localStorage.removeItem('username');
  };

  useEffect(() => {
    let intervalId;

    const fetchBalance = async () => {
      if (!isLoggedIn || !user?.loginToken) return;
      try {
        const response = await userController.getBalance(user.loginToken);
        if (response && (response.error === "0" || response.error === 0)) {
          setUser((prevUser) => {
            if (!prevUser) return null;
            const updatedUser = {
              ...prevUser,
              balance: response.balance !== undefined ? response.balance : prevUser.balance,
              exposure: response.exposure !== undefined ? response.exposure : prevUser.exposure,
              available_balance: response.available_balance !== undefined ? response.available_balance : prevUser.available_balance,
            };
            // Also update the cookie to keep fresh state on reload
            setCookie('authUser', JSON.stringify(updatedUser));
            return updatedUser;
          });
        }
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    if (isLoggedIn) {
      // Fetch immediately, then every 5 seconds
      fetchBalance();
      intervalId = setInterval(fetchBalance, 5000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoggedIn, user?.loginToken]);

  // Fetch stakes once when logged in
  useEffect(() => {
    const fetchStakes = async () => {
      if (!isLoggedIn || !user?.loginToken) return;
      try {
        const response = await userController.getStakeButtons(user.loginToken);
        if (response && typeof response === 'object' && !response.error) {
          const fetchedStakes = [];
          for (let i = 1; i <= 6; i++) {
            const item = response[i.toString()] || response[i];
            if (item) {
              fetchedStakes.push({
                label: item.Btnname || item.btnname || `S${i}`,
                value: item.Btnval || item.btnval || '0'
              });
            }
          }
          if (fetchedStakes.length > 0) {
            setStakes(fetchedStakes);
          }
        }
      } catch (err) {
        console.error('Failed to fetch stakes:', err);
      }
    };
    
    if (isLoggedIn && user?.loginToken) {
      fetchStakes();
    }
  }, [isLoggedIn, user?.loginToken]);

  const updateStakes = (newStakes) => {
    setStakes(newStakes);
  };

  if (isInitializing) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, stakes, updateStakes, showLogin, setShowLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

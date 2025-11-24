import React, { createContext, useState, useEffect, useContext } from "react";
import { getAccountInfo } from '@libs/api';
import { BrowserRouter } from "react-router-dom";
import { AppLoader } from "./AppLoader"
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);

  // Fetch accounts once when the provider mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const users = await getAccountInfo();
        setAccounts(users); // store accounts in state
        console.log("Accounts fetched:", users);
      } catch (err) {
        console.error("Failed to fetch accounts:", err);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <AppContext.Provider value={{ accounts }}>
      <BrowserRouter>
        <AppLoader>
          {children}
        </AppLoader>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

import React, { createContext, useState, useEffect, useContext } from "react";
import { getAccountInfo } from '@libs/api';
import { BrowserRouter } from "react-router-dom";
import { AppLoader } from "./AppLoader";
import { ApiError } from "./ApiError";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      setApiFailed(false);
      setLoading(true);

      const users = await getAccountInfo();
      setAccounts(users);
    } catch (err) {
      setApiFailed(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <AppContext.Provider value={{ accounts }}>
      <BrowserRouter>
        <AppLoader loading={loading} apiFailed={apiFailed} onRetry={fetchAccounts}>
          {children}
        </AppLoader>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

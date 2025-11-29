import React, { createContext, useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getAccountInfo } from '@libs/api';
import { BrowserRouter } from "react-router-dom";
import { AppLoader } from "./AppLoader";
import { ApiError } from "./ApiError";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [apiFailed, setApiFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  // Breakpoints using MUI standards
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));      // <600px
  const isSm = useMediaQuery(theme.breakpoints.down("md"));      // <900px
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));      // <1200px

  const isSmallScreen = isXs || isSm; // Mobile + Tablets <900px
  const isMediumScreen = isMd && !isSm;

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
    <AppContext.Provider value={{ accounts, isSmallScreen, isMediumScreen, isXs, isSm, isMd }}>
      <BrowserRouter>
        <AppLoader loading={loading} apiFailed={apiFailed} onRetry={fetchAccounts}>
          {children}
        </AppLoader>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

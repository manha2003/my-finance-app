import { useState, useEffect } from 'react';
import { ColorModeContext, useMode, Box } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import {jwtDecode} from 'jwt-decode'; // Added Navigate for redirection
import Topbar from "./scences/global/TopBar";
import Sidebar from "./scences/global/Sidebar";
import Dashboard from "./scences/dashboard";
import EventCalendar from './scences/reminders';
import Budgets from "./scences/budgets";
import ManageBudget from "./scences/budgets/ManageBudget";
import PersonalInformation from './scences/personal';
import BudgetHistory from "./scences/budgets/BudgetHistory";
import Categories from "./scences/categories";
import LoginSignup from './scences/loginSignup/LoginSignup';
import Transactions from './scences/transactions';
import Loader from './components/Loader/Loader';
import React from "react";
import WalletOverview from './scences/wallets';
import WalletManagement from './scences/wallets/WalletManagement';

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const checkTokenValidity = async() => {
      const delay = new Promise(resolve => setTimeout(resolve, 4000)); 
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            localStorage.removeItem('authToken');
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Invalid token', error);
          setIsAuthenticated(false);
        }
      } 
      else 
      {
        setIsAuthenticated(false);
      }
      await delay
      setLoading(false);
    };

    checkTokenValidity();
  }, []);
    
  
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Loader /> 
      </ThemeProvider>
    );
  }

  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
          {isAuthenticated && <Sidebar />}
          <main className="content">
            
            {isAuthenticated && <Topbar setIsAuthenticated={setIsAuthenticated}/>}
            <Routes>
             
            
              <Route
                path="/login"
                element={
                  !isAuthenticated ? (
                    <LoginSignup setIsAuthenticated={setIsAuthenticated} />
                  ) : (
                    <Navigate to="/" /> 
                  )
                }
              />

              
              {isAuthenticated ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  {/* <Route path="/team" element={<Team />} /> */}
                  <Route path="/budgets" element={<Budgets />} />
                  <Route path="/budgets/history" element={<BudgetHistory />} />
                  <Route path="/category" element={<Categories />} />
                  <Route path="/budgets/invoices" element={<ManageBudget />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/personal" element={< PersonalInformation/>} />
                  <Route path="/wallets" element={< WalletOverview/>} />
                  <Route path="/calendar" element={<EventCalendar />} />
                  <Route path="/wallets/walletmanage" element={<WalletManagement />} />

                </>
              ) : (
                
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from './AuthContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [summaryRes, txRes, stocksRes, nudgesRes, subsRes, goalsRes] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/transactions'),
        api.get('/stocks'),
        api.get('/nudges'),
        api.get('/subscriptions'),
        api.get('/goals')
      ]);
      
      setDashboard({
        summary: summaryRes.data,
        transactions: txRes.data,
        stocks: stocksRes.data,
        nudges: nudgesRes.data,
        subscriptions: subsRes.data,
        goals: goalsRes.data
      });
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    } else {
      setDashboard(null);
      setLoading(true);
    }
  }, [user]);

  return (
    <DataContext.Provider value={{ dashboard, loading, refreshData: fetchDashboardData }}>
      {children}
    </DataContext.Provider>
  );
};

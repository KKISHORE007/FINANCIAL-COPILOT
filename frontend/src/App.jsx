import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import CopilotPage from './pages/CopilotPage';

const PrivateRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-[#0D1117] flex items-center justify-center text-[#E2E8F0]">Loading dashboard...</div>;
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <div className="min-h-screen bg-[#0D1117] text-[#E2E8F0] font-sans selection:bg-[#00B386] selection:text-[#0D1117]">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              } />
              <Route path="/copilot" element={
                <PrivateRoute>
                  <CopilotPage />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

import './styles/index.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Activity, BarChart3, Settings } from 'lucide-react';

// Pages
import PredictionPage from './pages/PredictionPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ModelsPage from './pages/ModelsPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import { useHealth } from './hooks/useApi';

function App() {
  const { healthy, loading } = useHealth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);

  // Show toast notification
  const showToast = (type, message) => {
    setToast({ type, message });
  };

  // Health check notification
  useEffect(() => {
    if (!loading && !healthy) {
      showToast('error', 'Backend API is offline. Please check your connection.');
    }
  }, [healthy, loading]);

  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header 
              onMenuClick={() => setSidebarOpen(!sidebarOpen)}
              isHealthy={healthy}
              isHealthLoading={loading}
            />

            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<PredictionPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/models" element={<ModelsPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
          </div>

          {/* Toast Notifications */}
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;


import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './hooks/useStore';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import HomePage from './pages/HomePage';
import NoticeBoardPage from './pages/NoticeBoardPage';
import StaffPage from './pages/StaffPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent: React.FC = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex flex-col min-h-screen" style={{ fontFamily: "'Inter', sans-serif" }}>
            {!isAdminRoute && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/notice-board" element={<NoticeBoardPage />} />
                    <Route path="/staff" element={<StaffPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route 
                        path="/admin/dashboard" 
                        element={
                            <ProtectedRoute>
                                <AdminDashboardPage />
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
            </main>
            {!isAdminRoute && <Footer />}
            {!isAdminRoute && <FloatingButtons />}
        </div>
    );
};


const App: React.FC = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
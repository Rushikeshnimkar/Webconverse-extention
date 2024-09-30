import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DiscussionProvider } from './contexts/DiscussionContext';
import Home from './pages/Home';
import Discussion from './pages/Discussion';
import Profile from './pages/Profile';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import './styles/global.css';
import AuthPage from './pages/AuthPage';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

function AppContent() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      {user && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/discussion" element={<ProtectedRoute><Discussion /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
        </Routes>
      </main>
      {user && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DiscussionProvider>
        <Router>
          <AppContent />
        </Router>
      </DiscussionProvider>
    </AuthProvider>
  );
}

export default App;
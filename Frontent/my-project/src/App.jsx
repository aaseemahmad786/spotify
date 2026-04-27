import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './pages/Upload';
import ComingSoon from './pages/ComingSoon';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Player from './components/Player';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-black text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  
  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto spotify-gradient p-6 pb-24">
          {children}
        </main>
      </div>
      <Player />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout><Home /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Layout><Home /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/library" element={
              <ProtectedRoute>
                <Layout><ComingSoon title="Your Library" /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/playlist" element={
              <ProtectedRoute>
                <Layout><ComingSoon title="Create Playlist" /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/liked" element={
              <ProtectedRoute>
                <Layout><ComingSoon title="Liked Songs" /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/upload" element={
              <ProtectedRoute role="artist">
                <Layout><Upload /></Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
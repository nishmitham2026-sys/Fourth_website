import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Page Views
import Home from './pages/Home';
import History from './pages/History';
import Musics from './pages/Musics';
import Results from './pages/Results';
import Gallery from './pages/Gallery';
import Video from './pages/Video';
import Recordings from './pages/Recordings';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ApprovalPending from './pages/ApprovalPending';
import AdminDashboard from './pages/AdminDashboard';
import ProofreaderDetails from './pages/ProofreaderDetails';
import EditedSongs from './pages/EditedSongs';
import Articles from './pages/Articles';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: 'var(--primary-bg)' }}>
          {/* Sticky Navigation Header */}
          <Navbar />
          
          {/* Main Router Content Wrapper */}
          <main className="flex-shrink-0">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/about" element={<History />} /> {/* Route matching legacy /about */}
              <Route path="/musics" element={<Musics />} />
              <Route path="/results" element={<Results />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/gallary" element={<Gallery />} />
              <Route path="/video" element={<Video />} />
              <Route path="/recordings" element={<Recordings />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forget-password" element={<ForgotPassword />} />
              <Route path="/approval-pending" element={<ApprovalPending />} />
              
              {/* Protected / Admin Dashboards */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/proofreader-details" element={<ProofreaderDetails />} />
              <Route path="/edited" element={<EditedSongs />} />
              
              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          {/* Cultural Contemporary Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

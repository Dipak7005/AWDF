import React, { Suspense, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { LoadingFallback } from './components/LoadingFallback';
import { Sparkles } from 'lucide-react';
import { lazyWithDelay } from './utils/lazyWithDelay';

// Route-based code splitting using React.lazy with simulated latency for visual fallback verification
const DashboardPage = lazyWithDelay(() => import('./pages/DashboardPage'), 300);
const ProjectsPage = lazyWithDelay(() => import('./pages/ProjectsPage'), 300);
const ContactPage = lazyWithDelay(() => import('./pages/ContactPage'), 300);
const AnalyticsPage = lazyWithDelay(() => import('./pages/AnalyticsPage'), 300);

// Lazy loading heavy WebGL shader background component separately
const BackgroundShader = React.lazy(() =>
  import('./components/ui/background-shader').then(module => ({ default: module.BackgroundShader }))
);

export default function App() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
        {/* Lazy Loaded Heavy WebGL Background Shader */}
        <Suspense fallback={null}>
          <BackgroundShader />
        </Suspense>

        {/* Ambient Glass Orbs */}
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        <MainLayout />
      </div>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const createModalRef = useRef(null);

  const handleGetStartedClick = () => {
    if (createModalRef.current) {
      createModalRef.current();
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', position: 'relative', zIndex: 1 }}>
        <div className="glass-panel" style={{ padding: '30px 40px', textAlign: 'center' }}>
          <Sparkles size={32} style={{ animation: 'pulse 1.5s infinite', color: 'var(--accent-cyan)', marginBottom: '12px' }} />
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>Initializing Secure Session...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Navbar onGetStarted={isAuthenticated ? handleGetStartedClick : null} />

      {isAuthenticated ? (
        <Suspense fallback={<LoadingFallback message="Loading dynamic route module chunk..." />}>
          <Routes>
            <Route path="/" element={<DashboardPage onOpenCreateModal={createModalRef} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      ) : (
        <AuthModal />
      )}
    </div>
  );
};



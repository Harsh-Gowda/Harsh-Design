import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { motion as motionBase } from 'framer-motion';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import TradeMind from './pages/TradeMind';
import SafarBot from './pages/SafarBot';
import Pickry from './pages/Pickry';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundParticles from './components/BackgroundParticles';

const motion = motionBase as any;

// Helper to scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout component to handle conditional rendering of Portfolio UI vs App UI
const Layout: React.FC = () => {
  const location = useLocation();
  // Check if the current route is one of the standalone apps
  const isAppMode = ['/trademind', '/safarbot', '/pickry'].includes(location.pathname);
  const isHome = location.pathname === '/';

  return (
    <div className={`min-h-screen ${isAppMode ? '' : 'bg-[#0a0a0f]'} text-white selection:bg-[#00d4ff]/30`}>
      <CustomCursor />

      {/* Only show Portfolio UI elements if NOT in App Mode */}
      {!isAppMode && (
        <>
          <BackgroundParticles />
          <Navbar />
        </>
      )}

      <main className={!isAppMode && !isHome ? "pt-20" : ""}>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/trademind" element={<TradeMind />} />
            <Route path="/safarbot" element={<SafarBot />} />
            <Route path="/pickry" element={<Pickry />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAppMode && <Footer />}

      {/* Floating WhatsApp CTA - Only on Portfolio */}
      {!isAppMode && (
        <motion.a
          href="https://wa.me/+918088727376"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 p-4 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] shadow-lg shadow-[#7c3aed]/30 border border-white/10 flex items-center gap-2 group hover:scale-110 transition-all duration-300"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
            Live Demo
          </span>
        </motion.a>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';
import BrandLogo from './BrandLogo';

// Fix: Use any cast for motion components to resolve environment-specific type conflicts
const motion = motionBase as any;

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVariants = {
    closed: { y: 50, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/5' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brutalist Logo Lockup */}
          <Link to="/" className="flex items-center gap-3 group relative z-[70]">
            <div className="w-10 h-10 flex items-center justify-center">
              <BrandLogo className="w-full h-full" monochrome={false} />
            </div>
            <div className="flex items-center gap-1.5 leading-none mt-0.5">
              <span className="font-heading font-bold text-2xl tracking-tighter text-[#FAFAFA]">
                Harsh
              </span>
              <span className="font-heading font-bold text-2xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
                DZN
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-[#00d4ff] ${location.pathname === link.path ? 'text-[#00d4ff]' : 'text-gray-400'}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
              Let's Talk
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className={`md:hidden text-white relative z-[70] p-2 hover:bg-white/5 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0 scale-0 pointer-events-none' : 'opacity-100 scale-100'}`}
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[65] bg-[#050508]/98 backdrop-blur-xl flex flex-col justify-center items-center md:hidden"
          >
            {/* Close Button */}
            <motion.button
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-[#00d4ff] transition-all border border-white/5 z-[80] shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              aria-label="Close Menu"
            >
              <X size={32} strokeWidth={2.5} />
            </motion.button>

            {/* Background Decorations */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00d4ff]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Menu Content */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col items-center justify-center w-full px-6"
            >
              {/* Navigation Links */}
              <div className="space-y-6 text-center mb-12">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div variants={itemVariants} key={link.name} className="overflow-hidden">
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`relative block text-4xl sm:text-5xl font-heading font-extrabold tracking-tight transition-all duration-300 group ${isActive ? 'text-[#00d4ff]' : 'text-white hover:text-gray-300'}`}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-4">
                          {link.name}
                          {isActive && <motion.div layoutId="activeIndicator" className="w-2 h-2 rounded-full bg-[#00d4ff]" />}
                        </span>
                        {!isActive && (
                          <span className="absolute -left-8 top-1/2 -translate-y-1/2 text-[#00d4ff] opacity-0 group-hover:opacity-100 group-hover:-left-12 transition-all duration-300">
                            <ArrowUpRight size={32} />
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Separator */}
              <motion.div variants={itemVariants} className="w-12 h-1 bg-white/10 rounded-full mb-12" />

              {/* Socials & Contact */}
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-8">
                <div className="flex gap-6">
                  {[
                    { Icon: Github, href: "https://github.com/harshdzn" },
                    { Icon: Linkedin, href: "#" },
                    { Icon: Instagram, href: "#" },
                    { Icon: MessageCircle, href: "https://wa.me/+918088727376" }
                  ].map(({ Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-[#00d4ff]/30 hover:scale-110 transition-all"
                    >
                      <Icon size={24} />
                    </a>
                  ))}
                </div>

                <a href="mailto:harshgowdaujire@gmail.com" className="text-gray-500 font-mono text-sm hover:text-[#00d4ff] transition-colors">
                  harshgowdaujire@gmail.com
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
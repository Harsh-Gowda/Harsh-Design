import React from 'react';
import { Heart, Github, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10 items-center">
        <div className="md:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-24 md:h-24 transition-transform duration-300 group-hover:scale-110">
              <BrandLogo className="w-full h-full" />
            </div>
            <div className="flex items-center gap-2 md:gap-4 leading-none">
              <span className="font-heading font-extrabold text-3xl md:text-7xl uppercase text-white tracking-tighter">HARSH</span>
              <span className="font-mono text-3xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">DZN</span>
            </div>
          </Link>
          <p className="text-gray-500 max-w-sm text-sm font-mono">
            Empowering the modern traveler with AI-driven deal discovery and seamless automation.
          </p>
          <div className="flex gap-4">
            <a href="https://github.com/Harsh-Gowda" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00d4ff]/50 hover:bg-[#00d4ff]/10 transition-all group">
              <Github size={18} />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:bg-[#0077b5]/10 transition-all group">
              <Linkedin size={18} />
            </a>
            <a href="https://www.instagram.com/harsh_____gowda?igsh=a2R5NGlxajU1OXhv" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#E1306C] hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10 transition-all group">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/+918088727376" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all group">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-[#00d4ff]">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4 text-sm uppercase tracking-widest text-[#ff6b35]">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><Link to="/projects" className="hover:text-white transition-colors">Latest Projects</Link></li>
            <li><Link to="/trademind" className="hover:text-white transition-colors">TradeMind SaaS</Link></li>
            <li><Link to="/safarbot" className="hover:text-white transition-colors">Safar AI Bot</Link></li>
            <li><a href="https://github.com/Harsh-Gowda" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Github Repo</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
        <p>© {new Date().getFullYear()} Harsh DZN. Built for the future.</p>
        <div className="flex items-center gap-1">
          Made with <Heart size={12} className="text-[#ff6b35]" /> by the founder.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
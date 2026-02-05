import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-12 mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 relative z-10">
        <div className="md:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-3">
             <div className="w-8 h-8">
               <BrandLogo />
             </div>
             <div className="flex items-center gap-1 leading-none">
                <span className="font-heading font-extrabold text-lg uppercase text-white">HARSH</span>
                <span className="font-mono text-lg font-bold tracking-tight text-[#00d4ff]">DZN</span>
             </div>
          </Link>
          <p className="text-gray-500 max-w-sm text-sm font-mono">
            Empowering the modern traveler with AI-driven deal discovery and seamless automation.
          </p>
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
            <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Affiliate Terms</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Github Repo</a></li>
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
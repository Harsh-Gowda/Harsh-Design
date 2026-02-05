import React from 'react';
import { motion as motionBase } from 'framer-motion';
import { 
  ExternalLink, Github, Layers, Smartphone, LineChart, Brain, Play, 
  MessageCircle, ShoppingBag, CreditCard, Globe, Zap, TrendingUp, 
  ShieldCheck, Search, Plane, ArrowUpRight, Wallet, Bell, Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix: Use any cast for motion components to resolve environment-specific type conflicts
const motion = motionBase as any;

interface Project {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  problem?: string;
  solution?: string;
  internalLink?: string;
  link?: string;
  github?: string;
  featured: boolean;
  color: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "TradeMind",
      subtitle: "Fintech App",
      desc: "A comprehensive trading journal and psychology dashboard. Features real-time equity curves, emotional tracking, and risk management analytics.",
      tech: ["React", "Recharts", "LocalStorage", "Tailwind"],
      problem: "Traders fail because they don't track their psychological state alongside their PnL.",
      solution: "A data-driven journal that correlates mood with performance to prevent tilt.",
      internalLink: "/trademind",
      github: "#",
      featured: true,
      color: "#00C853"
    },
    {
      title: "Safar Bot",
      subtitle: "AI Assistant",
      desc: "An AI-powered travel assistant built for WhatsApp, connecting users with real-time affiliate deals from top travel platforms.",
      tech: ["Node.js", "Express", "OpenAI", "Puppeteer", "WhatsApp API"],
      problem: "Traditional travel booking sites are overwhelming and slow for mobile users.",
      solution: "A lightweight, chat-based UI that delivers curated deals directly in WhatsApp.",
      internalLink: "/safarbot",
      github: "#",
      featured: true,
      color: "#1E5aaf"
    },
    {
      title: "Pickry",
      subtitle: "Affiliate Discovery",
      desc: "A curated shopping platform with intelligent deal comparison and conversion tracking. Features flash sale engines and real-time affiliate analytics.",
      tech: ["React", "Recharts", "Framer Motion", "Tailwind"],
      problem: "Users are overwhelmed by choice; creators struggle to track affiliate performance effectively.",
      solution: "A conversion-optimized UI that simplifies discovery for shoppers and maximizes earnings for creators.",
      internalLink: "/pickry",
      github: "#",
      featured: true,
      color: "#0D7377"
    },
    {
      title: "NomadPay",
      subtitle: "Web3 Payments",
      desc: "Cryptocurrency payment gateway optimized for travel-related services and remote worker invoices. Zero-knowledge proof invoicing.",
      tech: ["Solidity", "Web3.js", "Next.js", "Polygon"],
      problem: "Freelancers lose 5-10% in forex fees and wait days for international transfers.",
      solution: "Instant stablecoin settlements with automated tax compliance receipts.",
      link: "#",
      github: "#",
      featured: true,
      color: "#ff6b35"
    }
  ];

  // --- High-Fidelity Visual Components ---

  const TradeMindVisual = () => (
    <div className="w-full h-full bg-[#050B14] relative overflow-hidden flex flex-col items-center justify-center font-mono">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 200, 83, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 200, 83, 0.05) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-transparent" />

      {/* Main Terminal Window */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[85%] h-[70%] bg-[#0B1120] rounded-xl border border-white/5 shadow-[0_0_50px_rgba(0,200,83,0.1)] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="h-8 border-b border-white/5 bg-white/5 flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <div className="ml-auto text-[10px] text-gray-500">LIVE MARKET DATA</div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 relative">
           {/* Chart */}
           <div className="absolute inset-x-0 bottom-0 top-16 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                 <path d="M0 150 C 50 150, 50 100, 100 120 C 150 140, 150 50, 200 80 C 250 110, 250 150, 300 100 C 350 50, 350 80, 400 20 L 400 200 L 0 200 Z" fill="url(#tradeGradient)" />
                 <path d="M0 150 C 50 150, 50 100, 100 120 C 150 140, 150 50, 200 80 C 250 110, 250 150, 300 100 C 350 50, 350 80, 400 20" fill="none" stroke="#00C853" strokeWidth="2" />
                 <defs>
                    <linearGradient id="tradeGradient" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#00C853" stopOpacity="0.5" />
                       <stop offset="100%" stopColor="#00C853" stopOpacity="0" />
                    </linearGradient>
                 </defs>
              </svg>
           </div>
           
           {/* Stats Cards */}
           <div className="grid grid-cols-2 gap-3 relative z-10">
              <div className="bg-[#1a2333]/80 backdrop-blur border border-white/5 p-3 rounded-lg">
                 <div className="text-[10px] text-gray-500">TOTAL EQUITY</div>
                 <div className="text-xl text-white font-bold tracking-tight">$24,592.00</div>
                 <div className="text-[10px] text-[#00C853] flex items-center gap-1 mt-1">
                    <TrendingUp size={10} /> +12.5%
                 </div>
              </div>
              <div className="bg-[#1a2333]/80 backdrop-blur border border-white/5 p-3 rounded-lg">
                 <div className="text-[10px] text-gray-500">PSYCHOLOGY SCORE</div>
                 <div className="text-xl text-white font-bold tracking-tight">94/100</div>
                 <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[94%] bg-[#00C853]" />
                 </div>
              </div>
           </div>

           {/* Floating Notification */}
           <motion.div 
             initial={{ x: 50, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 1, duration: 0.5 }}
             className="absolute bottom-4 right-4 bg-[#00C853] text-black p-2 px-3 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2"
           >
              <Zap size={12} fill="black" /> Trade Executed
           </motion.div>
        </div>
      </motion.div>
    </div>
  );

  const SafarBotVisual = () => (
    <div className="w-full h-full bg-gradient-to-br from-[#E0F2F1] to-[#B2DFDB] relative overflow-hidden flex items-center justify-center">
       {/* Animated Map Background */}
       <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center mix-blend-multiply" />
       
       {/* Phone Mockup */}
       <motion.div 
         initial={{ y: 50 }}
         whileInView={{ y: 0 }}
         transition={{ type: "spring", bounce: 0.4 }}
         className="relative w-64 h-[85%] bg-white rounded-[2rem] border-8 border-white shadow-2xl overflow-hidden flex flex-col"
       >
          {/* Header */}
          <div className="bg-[#075E54] p-4 text-white pb-6 pt-8">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                   <Plane size={16} />
                </div>
                <div>
                   <div className="font-bold text-sm">Safar Bot</div>
                   <div className="text-[10px] opacity-80">Online</div>
                </div>
             </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-[#E5DDD5] p-3 space-y-3 relative overflow-hidden">
             <div className="opacity-10 absolute inset-0 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat bg-[length:300px_300px]" />
             
             <motion.div 
                initial={{ scale: 0, originX: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[85%] shadow-sm relative z-10 text-xs"
             >
                <div className="text-[#075E54] font-bold text-[10px] mb-1">Safar Bot</div>
                Namaste! Where to today? 🌍
             </motion.div>

             <motion.div 
                initial={{ scale: 0, originX: 1 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-[#DCF8C6] p-2 rounded-lg rounded-tr-none self-end ml-auto max-w-[85%] shadow-sm relative z-10 text-xs"
             >
                Flight to Goa, cheapest?
             </motion.div>

             <motion.div 
                initial={{ scale: 0, originX: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-white p-2 rounded-lg rounded-tl-none self-start max-w-[90%] shadow-sm relative z-10"
             >
                <div className="bg-gray-100 rounded p-2 mb-2 flex items-center gap-3">
                   <div className="bg-orange-500 w-8 h-8 rounded flex items-center justify-center text-white font-bold text-xs">AI</div>
                   <div>
                      <div className="text-xs font-bold">Air India AI-402</div>
                      <div className="text-[10px] text-gray-500">10:00 AM • Non-stop</div>
                   </div>
                </div>
                <div className="text-center font-bold text-[#075E54] text-sm">₹3,499 ONLY</div>
                <div className="mt-2 w-full bg-[#25D366] text-white text-center py-1 rounded text-xs font-bold">Book Now</div>
             </motion.div>
          </div>
       </motion.div>

       {/* Floating Elements */}
       <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute right-10 top-20 bg-white p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
       >
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-bold text-gray-600">Review: 4.9/5</span>
       </motion.div>
    </div>
  );

  const PickryVisual = () => (
    <div className="w-full h-full bg-[#FAFAFA] relative overflow-hidden flex flex-col items-center justify-center">
       {/* Background Circles */}
       <div className="absolute top-[-50%] left-[-20%] w-[100%] h-[100%] bg-[#0D7377]/10 rounded-full blur-3xl" />
       <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#FF6B35]/10 rounded-full blur-3xl" />

       {/* Floating Product Card */}
       <motion.div 
         whileHover={{ scale: 1.05 }}
         className="relative z-10 w-64 bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 p-4 overflow-hidden"
       >
          <div className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-20">
             FLASH SALE
          </div>
          
          <div className="w-full h-32 bg-gray-50 rounded-xl mb-4 flex items-center justify-center relative group">
             <ShoppingBag size={40} className="text-gray-300 group-hover:scale-110 transition-transform duration-300" />
             <motion.div 
               initial={{ scale: 0 }}
               whileInView={{ scale: 1 }}
               className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-lg"
             >
                <div className="bg-[#0D7377] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                   -40%
                </div>
             </motion.div>
          </div>

          <div className="space-y-2">
             <div className="h-3 w-3/4 bg-gray-100 rounded-full" />
             <div className="h-3 w-1/2 bg-gray-100 rounded-full" />
          </div>

          <div className="mt-6 flex items-center justify-between">
             <div>
                <div className="text-xs text-gray-400 line-through">₹2,999</div>
                <div className="text-xl font-bold text-[#0D7377]">₹1,799</div>
             </div>
             <div className="w-8 h-8 rounded-full bg-[#0D7377] flex items-center justify-center text-white">
                <ArrowUpRight size={16} />
             </div>
          </div>
       </motion.div>

       {/* Analytics Panel Floating Behind */}
       <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 30, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-4 rounded-xl shadow-lg border border-gray-100 w-40 z-0"
       >
          <div className="flex items-center gap-2 mb-2">
             <div className="w-2 h-2 rounded-full bg-green-500" />
             <span className="text-[10px] font-bold text-gray-500 uppercase">Live Clicks</span>
          </div>
          <div className="text-2xl font-bold text-[#212121]">842</div>
          <div className="h-8 flex items-end gap-1 mt-2">
             {[40, 60, 30, 80, 50, 90].map((h, i) => (
                <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   whileInView={{ height: `${h}%` }}
                   transition={{ delay: 0.5 + i * 0.1 }}
                   className="w-full bg-[#FF6B35] rounded-t-sm opacity-80"
                />
             ))}
          </div>
       </motion.div>
    </div>
  );

  const NomadPayVisual = () => (
    <div className="w-full h-full bg-[#0F0F13] relative overflow-hidden flex items-center justify-center">
       {/* Holographic Mesh */}
       <div className="absolute inset-0 opacity-20" 
         style={{ 
           backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)',
           backgroundSize: '100% 100%'
         }} 
       />
       <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .03) 25%, rgba(255, 255, 255, .03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .03) 75%, rgba(255, 255, 255, .03) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .03) 25%, rgba(255, 255, 255, .03) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .03) 75%, rgba(255, 255, 255, .03) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />

       {/* 3D Floating Card */}
       <motion.div 
          animate={{ rotateY: [0, 5, 0, -5, 0], rotateX: [0, -5, 0, 5, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
          className="relative z-10 w-72 h-44 rounded-2xl p-6 flex flex-col justify-between border border-white/10 shadow-[0_0_50px_rgba(255,107,53,0.2)] overflow-hidden"
       >
          {/* Card Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/20 via-[#7c3aed]/20 to-black/80 backdrop-blur-xl" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          
          {/* Card Content */}
          <div className="relative z-10 flex justify-between items-start">
             <Wallet size={24} className="text-white" />
             <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
             </div>
          </div>

          <div className="relative z-10">
             <div className="text-[10px] text-gray-400 font-mono tracking-widest mb-1">BALANCE</div>
             <div className="text-2xl text-white font-mono font-bold tracking-wider flex items-center gap-2">
                $14,290.50 <span className="text-[10px] text-green-500 bg-green-500/10 px-1 rounded">+2.4%</span>
             </div>
          </div>
          
          <div className="relative z-10 pt-4 border-t border-white/10 flex justify-between items-end">
             <div>
                <div className="text-[10px] text-gray-400 font-mono tracking-widest mb-1">CARD HOLDER</div>
                <div className="text-sm text-white font-mono uppercase">Harsh DZN</div>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                 <div className="w-4 h-4 rounded-full bg-[#ff6b35]" />
             </div>
          </div>
       </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050B14] pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00d4ff] text-xs font-bold uppercase tracking-widest mb-6">
            <Layers size={12} /> Portfolio 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6 tracking-tight">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
            A curation of high-impact applications focused on <span className="text-white font-medium">Fintech</span>, <span className="text-white font-medium">Automation</span>, and <span className="text-white font-medium">E-Commerce</span>. Built for scale, designed for users.
          </p>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-3/5 aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 relative group">
                   <div className="absolute inset-0 bg-[#0B1120] group-hover:scale-105 transition-transform duration-700">
                      {project.title === 'TradeMind' && <TradeMindVisual />}
                      {project.title === 'Safar Bot' && <SafarBotVisual />}
                      {project.title === 'Pickry' && <PickryVisual />}
                      {project.title === 'NomadPay' && <NomadPayVisual />}
                   </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-2/5 space-y-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3">
                         <span className="w-12 h-[1px] bg-white/20"></span>
                         <span className="text-[#00d4ff] font-bold tracking-widest text-xs uppercase">{project.subtitle}</span>
                      </div>
                      <h2 className="text-4xl font-heading font-bold text-white">{project.title}</h2>
                      <p className="text-gray-400 leading-relaxed text-lg">{project.desc}</p>
                   </div>

                   <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                         <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                            <Brain size={14} /> The Problem
                         </h4>
                         <p className="text-sm text-gray-300">{project.problem}</p>
                      </div>
                      <div className="bg-[#00d4ff]/5 p-4 rounded-xl border border-[#00d4ff]/10">
                         <h4 className="text-xs font-bold text-[#00d4ff] uppercase mb-2 flex items-center gap-2">
                            <Zap size={14} /> The Solution
                         </h4>
                         <p className="text-sm text-gray-300">{project.solution}</p>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-3 py-1 rounded-full bg-white/5 text-xs font-bold text-gray-500 border border-white/5">
                           {t}
                        </span>
                      ))}
                   </div>

                   <div className="flex gap-4 pt-4">
                      {project.internalLink ? (
                        <Link 
                          to={project.internalLink} 
                          className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                           View Deployment <ArrowUpRight size={16} />
                        </Link>
                      ) : (
                        <a 
                          href={project.link || '#'} 
                          className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                        >
                           View Deployment <ArrowUpRight size={16} />
                        </a>
                      )}
                      
                      <a 
                        href={project.github} 
                        className="px-6 py-3 rounded-full border border-white/10 text-white font-bold text-sm hover:bg-white/5 transition-colors flex items-center gap-2"
                      >
                         <Github size={16} /> Source
                      </a>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Projects;
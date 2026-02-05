import React, { useState, useEffect, useRef } from 'react';
import { motion as motionBase, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Code, Zap, TrendingUp, ExternalLink,
  MessageSquare, Calendar, Mail, CheckCircle2,
  Layout, Database, ShoppingBag, Globe, Smartphone,
  ChevronLeft, ChevronRight, Star, Cpu, MousePointer2,
  Shield, Layers, Rocket, Lock,
  Braces, Command, Hash, FileJson, GitBranch
} from 'lucide-react';
import { Link } from 'react-router-dom';
// @ts-ignore
import PickryProductImg from '../Asset/Pickry.webp';
// @ts-ignore
import TradeProductImg from '../Asset/Trade.webp';
// @ts-ignore
import SafarProductImg from '../Asset/safar.webp';

const motion = motionBase as any;

// --- Components ---

// 1. Matrix Rain Effect
const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initial Resize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    const chars = '0101010101HD';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(11, 17, 32, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#06B6D4'; // Cyan
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none" />;
};

// 2. Typing Effect (Fixed to prevent state accumulation)
const TypingEffect = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="font-mono text-[#06B6D4] min-w-[20px] inline-block">
      {displayedText}
    </span>
  );
};

// 3. Floating Icons Effect (Top to Bottom)
const FloatingIcons = () => {
  // 5 Distinct icons floating across the full hero section
  const icons = [
    { Icon: Code, size: 21, left: '10%', duration: 25, delay: 0 },
    { Icon: Database, size: 26, left: '85%', duration: 30, delay: 5 },
    { Icon: Cpu, size: 32, left: '20%', duration: 28, delay: 2 },
    { Icon: Globe, size: 25, left: '70%', duration: 35, delay: 8 },
    { Icon: Layers, size: 30, left: '50%', duration: 22, delay: 12 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-[#06B6D4]/15"
          style={{ left: item.left, top: '-20%' }}
          animate={{
            top: '120%',
            rotate: 360
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "linear",
            delay: item.delay
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState(0);

  const projects = [
    {
      title: "Pickry",
      category: "Affiliate Platform",
      tech: ["React", "Node.js", "Tailwind", "PostgreSQL"],
      desc: "A high-performance deal discovery engine featuring automated price tracking, real-time alerts, and a scalable affiliate network architecture designed for maximum conversion.",
      link: "/pickry",
      image: PickryProductImg,
      className: "md:col-span-2"
    },
    {
      title: "TradeMind",
      category: "Fintech SaaS",
      tech: ["React", "Supabase", "Chart.js"],
      desc: "A psychology-first trading journal that empowers traders with data-driven insights, behavioral analysis, and a suite of tools to master their market mindset.",
      link: "/trademind",
      image: TradeProductImg,
      className: "md:col-span-1"
    },
    {
      title: "Magnific Redesign",
      category: "Client Work",
      tech: ["WordPress", "Elementor", "PHP", "SEO"],
      desc: "A comprehensive overhaul for a premium design agency, focusing on cutting-edge aesthetics, 40% faster load times, and a seamless responsive user experience.",
      link: "/projects",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      className: "md:col-span-1"
    },
    {
      title: "Safar Bot",
      category: "AI Automation",
      tech: ["WhatsApp API", "OpenAI", "Node.js"],
      desc: "An intelligent AI travel agent capable of handling complex bookings, providing personalized recommendations, and automating 24/7 customer engagement via WhatsApp.",
      link: "/safarbot",
      image: SafarProductImg,
      className: "md:col-span-2"
    }
  ];

  const professionalHighlights = [
    {
      title: "Strategic Architecture",
      desc: "I don't just write code; I design systems. From database normalization to scalable API endpoints, every line is written with future growth in mind.",
      icon: <Layers size={24} />,
      tag: "Engineering"
    },
    {
      title: "Business Logic First",
      desc: "Understanding the 'Why' before the 'How'. My development process focuses on solving actual business problems and driving measurable KPIs.",
      icon: <TrendingUp size={24} />,
      tag: "Strategy"
    },
    {
      title: "Performance Obsessed",
      desc: "Speed is a feature. I optimize Core Web Vitals, reduce TTFB, and ensure buttery smooth interactions to maximize user retention.",
      icon: <Rocket size={24} />,
      tag: "Performance"
    }
  ];

  const techStack = [
    { icon: <Layout />, name: "UI Design" },
    { icon: <Code />, name: "Frontend" },
    { icon: <Database />, name: "Backend" },
    { icon: <ShoppingBag />, name: "E-Comm" },
    { icon: <Cpu />, name: "AI Integration" },
    { icon: <Globe />, name: "Deployments" },
  ];

  return (
    <div className="bg-[#0B1120] min-h-screen font-sans selection:bg-[#06B6D4]/30 overflow-x-hidden">

      {/* SECTION 1: HERO COMMAND */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden px-4 md:px-6 pt-24 pb-12">
        {/* Technical Grid Background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] pointer-events-none" />

        {/* Floating Code Icons Animation */}
        <FloatingIcons />

        <div className="z-10 flex flex-col items-center text-center max-w-6xl mx-auto space-y-8 md:space-y-12 relative w-full">

          {/* Main Copy */}
          <div className="space-y-6 md:space-y-8">
            <div className="h-6 flex justify-center items-center">
              <TypingEffect text=" Agency Grade · Scalable · Secure " speed={50} />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[1.1] tracking-tight px-2"
            >
              Architecting Digital Ecosystems <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]">For Scale & Speed.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-2xl mx-auto leading-relaxed font-normal px-4"
            >
              Expertise in high-frequency trading dashboards, AI travel agents, and scalable affiliate networks. Building the future of commerce.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto px-6 sm:px-0 justify-center"
          >
            <Link
              to="/contact"
              className="group relative px-8 py-4 rounded-xl bg-[#F97316] text-white font-bold text-lg overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all hover:scale-105 flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                Start Your Project <ArrowRight size={20} />
              </span>
            </Link>
            <Link
              to="/projects"
              className="px-8 py-4 rounded-xl border border-white/10 bg-transparent text-white font-bold text-lg hover:bg-white/5 hover:border-white/20 transition-all flex items-center justify-center gap-2"
            >
              View Case Studies <Code size={20} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => document.getElementById('deployments')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <MousePointer2 size={16} className="text-gray-500 group-hover:text-[#06B6D4] transition-colors" />
          <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent group-hover:from-[#06B6D4] transition-all" />
        </motion.div>
      </section>

      {/* SECTION 2: ACTIVE DEPLOYMENTS (BENTO GRID) */}
      <section id="deployments" className="py-12 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white">Active <span className="text-[#06B6D4]">Deployments</span></h2>
            <p className="text-gray-400 font-mono text-sm max-w-md border-l-2 border-[#06B6D4] pl-4">
              Live systems generating real value. Not just code repositories, but revenue-generating engines.
            </p>
          </div>
          <Link to="/projects" className="group flex items-center gap-2 text-white font-bold border-b border-white/20 pb-1 hover:border-[#06B6D4] transition-all">
            View All Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative bg-[#111827] rounded-3xl border border-white/5 overflow-hidden hover:border-[#06B6D4]/30 transition-all ${project.className}`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/80 to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-40"
                />
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex flex-col justify-end p-6 md:p-8">
                <div className="mb-auto flex justify-end items-start text-white">
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 hidden md:flex">
                    <ExternalLink size={18} />
                  </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-none">{project.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
                  </div>

                  <div className="flex gap-2 pt-2 flex-wrap">
                    {project.tech?.map((t: string, idx: number) => (
                      <span key={idx} className="text-[10px] uppercase font-bold text-gray-500 bg-black/40 px-2 py-1 rounded border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link to={project.link} className="absolute inset-0 z-30" aria-label={`View ${project.title}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TRUST TERMINAL */}
      <section className="py-12 md:py-32 px-4 md:px-6 bg-[#0F172A] border-y border-white/5 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#06B6D4]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 md:gap-12">

          {/* Left Panel: Technical Arsenal */}
          <div className="lg:col-span-5 space-y-8 md:space-y-10">
            <div className="inline-flex items-center gap-2 text-[#F97316] font-bold font-mono text-xs uppercase tracking-widest">
              <Shield size={14} /> Trust Terminal
            </div>

            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              Technical <span className="text-[#F97316] border-b-4 border-[#F97316]/20 pb-1">Arsenal</span>
            </h2>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              My stack isn't just a list of tools; it's a carefully selected toolkit for building scalable, high-performance digital products.
            </p>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { tool: "React", sub: "Next.js & Ecosystem" },
                { tool: "Node.js", sub: "Scalable Backend" },
                { tool: "WordPress", sub: "Custom & Headless" },
                { tool: "AI/LLM", sub: "AI & Automation" },
              ].map((item, i) => (
                <div key={i} className="p-4 md:p-6 rounded-2xl bg-[#0B1120] border border-white/5 group hover:border-[#F97316]/30 transition-all hover:-translate-y-1">
                  <h3 className="text-lg md:text-xl font-heading font-bold text-white mb-2 group-hover:text-[#F97316] transition-colors">{item.tool}</h3>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-bold">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Professional Focus & Tech Stack */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8">

            {/* Professional Focus Slider */}
            <div className="flex-1 bg-[#0B1120] border border-white/10 rounded-3xl p-6 md:p-12 relative overflow-hidden group hover:border-[#06B6D4]/20 transition-all min-h-[320px]">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-[#06B6D4]">
                <Layers size={100} />
              </div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeHighlight}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#06B6D4]/10 text-[#06B6D4] flex items-center justify-center mb-6">
                      {professionalHighlights[activeHighlight].icon}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                      {professionalHighlights[activeHighlight].title}
                    </h3>

                    <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                      "{professionalHighlights[activeHighlight].desc}"
                    </p>

                    <div className="pt-4">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-white">
                        {professionalHighlights[activeHighlight].tag}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex gap-2 mt-8 justify-end">
                  <button
                    onClick={() => setActiveHighlight(prev => (prev === 0 ? professionalHighlights.length - 1 : prev - 1))}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setActiveHighlight(prev => (prev === professionalHighlights.length - 1 ? 0 : prev + 1))}
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Tech Stack Strip */}
            <div className="bg-[#1E293B]/50 border border-white/5 rounded-2xl p-4 md:p-6 flex flex-wrap items-center justify-between gap-4 md:gap-6">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest w-full md:w-auto">Domains of Expertise:</span>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {techStack.map((tech, i) => (
                  <div key={i} className="group relative">
                    <div className="text-gray-400 group-hover:text-white transition-colors transform scale-75 md:scale-100">
                      {tech.icon}
                    </div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MISSION CONTROL */}
      <section className="relative py-12 md:py-24 px-4 md:px-6 overflow-hidden">
        <MatrixRain />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-4">
              Your Project + My Code = <span className="text-[#06B6D4]">Launch</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400">
              Currently accepting <span className="text-[#F97316] font-bold"> new clients</span> for ths Year.
            </p>
          </div>

          <div className="glass bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl">
            <form className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#06B6D4] outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email</label>
                  <input type="email" placeholder="john@company.com" className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#06B6D4] outline-none transition-all" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Project Type</label>
                  <select className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#06B6D4] outline-none transition-all appearance-none cursor-pointer">
                    <option>WordPress / WooCommerce</option>
                    <option>React Application</option>
                    <option>Affiliate System</option>
                    <option>Custom Development</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Budget</label>
                  <input type="text" placeholder="e.g. $1,000 or ₹80,000" className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#06B6D4] outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                <textarea rows={4} placeholder="Tell me about your project goals..." className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#06B6D4] outline-none transition-all resize-none"></textarea>
              </div>

              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all">
                Initialize Launch Sequence
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-6">
              <a href="mailto:harshgowdaujire@gmail.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Mail size={16} /> harshgowdaujire@gmail.com
              </a>
              <a href="https://wa.me/91XXXXXXXXXX" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#25D366] transition-colors">
                <MessageSquare size={16} /> WhatsApp Quick Chat
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#06B6D4] transition-colors">
                <Calendar size={16} /> Book 15-min Call
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-xs text-gray-600 font-mono border-t border-white/5 px-4">
        <p>Built by Harsh · Hosted on Harsh DZN · Commission links disclosed.</p>
      </footer>

    </div>
  );
};

export default Home;
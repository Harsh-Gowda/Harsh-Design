import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  Rocket, Code, TrendingUp,
  Bug, Eye, EyeOff, Github,
  GraduationCap, Laptop, Server, Download,
  Layers, Shield, Terminal
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float, Text, MeshDistortMaterial, Html, OrbitControls, Stars, Line } from '@react-three/drei';
import * as THREE from 'three';

// Fix: Use any cast for Three.js intrinsic elements to resolve environment-specific type conflicts with JSX.IntrinsicElements
const Group = 'group' as any;
const Mesh = 'mesh' as any;
const SphereGeometry = 'sphereGeometry' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;

// --- 3D Background & Portrait Components ---
const ParticlePortrait = () => {
  const pointsRef = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      pointsRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  // Create a sphere of particles as a proxy for the portrait
  const count = 3000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = 2.5;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
  }

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00d4ff"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const SkillsConstellation = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const groupRef = useRef<THREE.Group>(null!);

  const skills = [
    { name: 'React JS', desc: 'Frontend Library', project: 'Safar Bot UI', pos: [-2, 2, 0], color: '#61DAFB' },
    { name: 'HTML', desc: 'Web Structure', project: 'All Projects', pos: [-3.5, 2, -1], color: '#E34F26' },
    { name: 'CSS', desc: 'Visual Styling', project: 'Portfolio', pos: [-1.5, 3.5, -2], color: '#1572B6' },
    { name: 'Tailwind', desc: 'Utility CSS', project: 'Safar Bot', pos: [-2, 0, 2.5], color: '#38B2AC' },
    { name: 'JavaScript', desc: 'Core Logic', project: 'Interactivity', pos: [1, 2.5, 1], color: '#F7DF1E' },
    { name: 'TypeScript', desc: 'Type Safety', project: 'Enterprise Apps', pos: [0, 3.5, 0], color: '#3178C6' },
    { name: 'PHP', desc: 'Server Side', project: 'Legacy Backends', pos: [2.5, -1.5, -2], color: '#777BB4' },
    { name: 'Git', desc: 'Version Control', project: 'Collaboration', pos: [3, 1, 0], color: '#F05032' },
    { name: 'WordPress', desc: 'CMS', project: 'Client Sites', pos: [2, -2.5, 2], color: '#21759B' },
    { name: 'Elementor', desc: 'Page Builder', project: 'Rapid Design', pos: [3.5, -3, 1], color: '#92003B' },
    { name: 'Responsive', desc: 'Mobile First', project: 'Adaptive UI', pos: [-1, -2, 1.5], color: '#00d4ff' },
    { name: 'n8n', desc: 'Automation', project: 'Workflows', pos: [1, -3.5, -0.5], color: '#FF6D5A' },
    { name: 'AI/LLMs', desc: 'Intelligence', project: 'Chatbots', pos: [2, 3, 2], color: '#10A37F' },
    { name: 'Bootstrap', desc: 'UI Framework', project: 'Dashboards', pos: [-3, -0.5, 3], color: '#7952B3' },
    { name: 'Supabase', desc: 'BaaS', project: 'Realtime DB', pos: [0, -3, -3], color: '#3ECF8E' },
  ];

  // Calculate lines between nearby nodes
  const lines = useMemo(() => {
    const connections: any[] = [];
    skills.forEach((skill, i) => {
      skills.forEach((other, j) => {
        if (i < j) {
          const dist = new THREE.Vector3(...(skill.pos as [number, number, number]))
            .distanceTo(new THREE.Vector3(...(other.pos as [number, number, number])));
          if (dist < 4) {
            connections.push({
              start: skill.pos,
              end: other.pos,
              id: `${i}-${j}`
            });
          }
        }
      });
    });
    return connections;
  }, []);

  return (
    <Group ref={groupRef}>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Connections */}
      {lines.map((line) => (
        <Line
          key={line.id}
          points={[line.start, line.end]}
          color="#ffffff"
          opacity={0.1}
          transparent
          lineWidth={1}
        />
      ))}

      {/* Nodes */}
      {skills.map((skill, i) => (
        <Float key={i} speed={activeSkill === skill.name ? 5 : 2} rotationIntensity={1} floatIntensity={2}>
          <Group position={skill.pos as [number, number, number]}>
            <Mesh
              onClick={(e: any) => { e.stopPropagation(); setActiveSkill(activeSkill === skill.name ? null : skill.name); }}
              onPointerOver={() => document.body.style.cursor = 'pointer'}
              onPointerOut={() => document.body.style.cursor = 'auto'}
              scale={activeSkill === skill.name ? 1.5 : 1}
            >
              <SphereGeometry args={[0.3, 32, 32]} />
              <MeshDistortMaterial
                color={activeSkill === skill.name ? "#ffffff" : skill.color}
                emissive={activeSkill === skill.name ? skill.color : "#000000"}
                emissiveIntensity={activeSkill === skill.name ? 2 : 0}
                speed={5}
                distort={0.4}
              />
            </Mesh>

            <Text
              position={[0, 0.5, 0]}
              fontSize={0.25}
              color="white"
              anchorX="center"
              anchorY="middle"
              fillOpacity={activeSkill === skill.name ? 1 : 0.7}
            >
              {skill.name}
            </Text>

            {activeSkill === skill.name && (
              <Html distanceFactor={10} position={[0, 0.8, 0]} style={{ pointerEvents: 'none' }}>
                <div className="w-48 p-4 rounded-xl bg-[#0a0a0f]/90 backdrop-blur-md border border-[#00d4ff]/50 shadow-[0_0_20px_rgba(0,212,255,0.3)] text-left transform -translate-x-1/2 -translate-y-full mb-4">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-[#0a0a0f] border-r border-b border-[#00d4ff]/50"></div>
                  <h4 className="text-[#00d4ff] font-bold text-sm mb-1">{skill.name}</h4>
                  <p className="text-gray-300 text-xs mb-2 leading-tight">{skill.desc}</p>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 font-mono border-t border-white/10 pt-2">
                    <Code size={10} /> Used in: <span className="text-white">{skill.project}</span>
                  </div>
                </div>
              </Html>
            )}
          </Group>
        </Float>
      ))}
    </Group>
  );
};

const TimelineNode = ({ year, title, role, desc, tags, icon: Icon, index }: any) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`relative mb-24 md:mb-32 flex w-full justify-center md:justify-between items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    >
      <div className="hidden md:block w-5/12" />

      {/* Center Node Icon */}
      <div className="z-10 absolute left-4 md:left-1/2 md:-translate-x-1/2 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#0B1120] border-2 border-[#06B6D4] text-[#06B6D4] shadow-[0_0_20px_rgba(6,182,212,0.4)]">
        <Icon size={24} className="md:w-7 md:h-7" />
      </div>

      <div className="w-full pl-20 md:w-5/12 md:pl-0">
        <div className="glass p-6 md:p-8 rounded-3xl border-[#06B6D4]/20 group hover:border-[#06B6D4]/50 transition-all bg-[#1E293B]/80 relative overflow-hidden">
          {/* Year Badge */}
          <span className="inline-block px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-bold font-mono border border-[#06B6D4]/20 mb-3">
            {year}
          </span>

          <h3 className="text-2xl font-bold font-heading text-white group-hover:text-[#06B6D4] transition-colors">{title}</h3>
          {role && <p className="text-sm font-bold text-gray-400 mb-3">{role}</p>}

          <p className="text-gray-400 leading-relaxed font-sans text-sm mb-4">{desc}</p>

          {/* Skill Tags */}
          <div className="flex flex-wrap gap-2">
            {tags && tags.map((tag: string, i: number) => (
              <span key={i} className="text-[10px] font-bold px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5 group-hover:border-[#06B6D4]/30 group-hover:text-white transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const [focusMode, setFocusMode] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [activeButton, setActiveButton] = useState<'resume' | 'github' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  // Use scroll specifically for the timeline section
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const typingText = "while (alive) { innovate(); architect(); scale(); }";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(typingText.slice(0, i));
      i++;
      if (i > typingText.length) {
        clearInterval(interval);
        setTimeout(() => setTypingComplete(true), 500);
      }
    }, 50);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearInterval(interval);
    };
  }, []);

  const timelineData = [
    {
      year: "2021 - 2023",
      title: "Strategic Foundation",
      role: "B.Voc Software & App Dev",
      desc: "Cultivated a deep understanding of software engineering principles and algorithmic efficiency at SDM College. Focused on full-stack architecture and clean code paradigms. Achieved 76% aggregate.",
      tags: ["Software Engineering", "Algorithms", "System Design"],
      icon: GraduationCap
    },
    {
      year: "Aug - Dec 2023",
      title: "Scalable Engineering",
      role: "Web Developer @ Isarva Infotech",
      desc: "Engineered production-ready web ecosystems with a focus on modularity and high performance. Leveraged professional deployment workflows and collaborated on complex responsive themes for enterprise clients.",
      tags: ["Enterprise WordPress", "Performance Opt.", "CI/CD"],
      icon: Laptop
    },
    {
      year: "Mar 2024 - Present",
      title: "Architectural Ownership",
      role: "WordPress & Frontend Dev @ Magnific Designer",
      desc: "Leading the development of custom CRM infrastructures and high-fidelity React interfaces. Responsible for end-to-end architectural decisions, specialized plugin engineering, and optimizing business-critical workflows.",
      tags: ["React Architecture", "CRM Systems", "Strategic Dev"],
      icon: Server
    },
    {
      year: "2026 ROADMAP",
      title: "Venture Discovery",
      role: "Harsh DZN",
      desc: "Scaling a specialized product suite including Pickry, TradeMind, and Safar Bot. Focusing on hyper-performant React ecosystems, AI-driven automation, and building selective partnership channels for high-growth ventures.",
      tags: ["Product Strategy", "AI Automation", "Selective Growth"],
      icon: Rocket
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${focusMode ? 'bg-[#050508]' : 'bg-[#0a0a0f]'}`}>

      {/* Focus Mode Toggle */}
      <button
        onClick={() => setFocusMode(!focusMode)}
        className="fixed top-24 right-8 z-[70] p-3 rounded-full glass border-white/10 hover:border-[#00d4ff]/50 transition-all text-white"
        title="Toggle Focus Mode"
      >
        {focusMode ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
        {!focusMode && (
          <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 8] }}>
              <Suspense fallback={null}>
                <ParticlePortrait />
                <AmbientLight intensity={0.5} />
                <PointLight position={[10, 10, 10]} />
              </Suspense>
            </Canvas>
          </div>
        )}

        <div className="z-10 text-center px-6">
          <motion.p
            className="font-mono text-[#00d4ff] text-xl mb-6 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {displayText}
            <span className="animate-pulse ml-1">|</span>
          </motion.p>

          <AnimatePresence>
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-6xl md:text-8xl font-heading font-extrabold text-white tracking-tighter">
                  HARSH <span className="text-gradient">DZN</span>
                </h1>
                <p className="text-2xl md:text-3xl font-mono text-gray-400 max-w-2xl mx-auto flex flex-wrap justify-center gap-x-4 gap-y-2">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Product Strategist.</motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Full-Stack Architect.</motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>Growth Specialist.</motion.span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-12 rounded-full bg-gradient-to-b from-[#00d4ff] to-transparent opacity-50" />
        </motion.div>
      </section>

      {/* Timeline Path */}
      <section ref={timelineRef} className="relative max-w-5xl mx-auto px-6 py-16 md:py-32">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16 md:mb-32">Professional <span className="text-[#06B6D4]">Journey</span></h2>

        {/* The Animated Line */}
        {!focusMode && (
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2 block">
            <div className="h-full w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY: pathLength }}
                className="w-full h-full bg-gradient-to-b from-[#06B6D4] to-[#14B8A6] origin-top shadow-[0_0_20px_rgba(6,182,212,0.8)]"
              />
            </div>
          </div>
        )}

        <div className="relative">
          {timelineData.map((node, i) => (
            <TimelineNode key={i} {...node} index={i} />
          ))}
        </div>

        {/* Interactive SVG Connector & Buttons */}
        <div className="relative w-full max-w-4xl mx-auto mt-8 mb-16">
          {/* SVG Layer with Pipe Line Style */}
          {!focusMode && (
            <div className="absolute inset-0 -top-8 bottom-auto h-[120px] pointer-events-none z-0 hidden md:block">
              <svg className="w-full h-full" viewBox="0 0 600 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <motion.path
                  d="M 300 0 L 300 25 Q 300 35 300 35 L 300 35 Q 300 35 300 45 L 300 100"
                  animate={{
                    d: activeButton === 'resume'
                      ? "M 300 0 L 300 25 Q 300 35 290 35 L 175 35 Q 165 35 165 45 L 165 95"
                      : activeButton === 'github'
                        ? "M 300 0 L 300 25 Q 300 35 310 35 L 425 35 Q 435 35 435 45 L 435 95"
                        : "M 300 0 L 300 25 Q 300 35 300 35 L 300 35 Q 300 35 300 45 L 300 100",
                    stroke: activeButton ? "#06B6D4" : "url(#lineGrad)",
                    filter: activeButton ? "url(#glow)" : "none",
                    opacity: 1
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <motion.circle
                  r="4"
                  fill="#06B6D4"
                  animate={{
                    cx: activeButton === 'resume' ? 165 : activeButton === 'github' ? 435 : 300,
                    cy: activeButton ? 95 : 100,
                    scale: activeButton ? 1.3 : 0.8,
                    opacity: 1
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
            </div>
          )}

          {/* Buttons Row */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-24 relative z-10 pt-8 md:pt-24">
            <a
              href="/resume.pdf"
              download
              onMouseEnter={() => setActiveButton('resume')}
              onMouseLeave={() => setActiveButton(null)}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#F97316] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 transition-all group border border-white/5 w-64 justify-center relative"
            >
              <Download size={20} className="group-hover:animate-bounce" />
              Resume
            </a>

            <a
              href="https://github.com/harshdzn"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setActiveButton('github')}
              onMouseLeave={() => setActiveButton(null)}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-lg border border-white/20 hover:border-[#06B6D4]/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-105 transition-all group w-64 justify-center relative"
            >
              <Github size={20} className="group-hover:rotate-12 transition-transform" />
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* Skills Galaxy */}
      <section className="relative h-[60vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden py-10 md:py-20">
        <div className="absolute inset-0 z-0">
          {!focusMode && (
            <Canvas camera={{ position: [0, 0, 8] }}>
              <SkillsConstellation />
              <AmbientLight intensity={0.5} />
              <PointLight position={[10, 10, 10]} />
            </Canvas>
          )}
        </div>
        <div className="z-10 text-center pointer-events-none">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Skills <span className="text-[#00d4ff]">Galaxy</span></h2>
          <p className="text-gray-400 font-mono text-xs md:text-base">Drag to explore the interconnected universe of tools and technologies.</p>
        </div>
      </section>

      {/* Philosophy Objects */}
      <section className="py-16 md:py-32 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-center mb-12 md:mb-24">The <span className="text-[#ff00ff]">Why</span></h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {[
            {
              title: "Agile Validation & Scalable Design",
              story: "In the landscape of high-stakes product development, speed to market is the only true competitive advantage. I build for immediate validation while architecting for future scale.",
              color: "#00d4ff"
            },
            {
              title: "Systems Over Processes",
              story: "I believe in operational excellence through engineering. If a task can be quantified and automated, it belongs to the machine, freeing human intelligence for strategic innovation.",
              color: "#7c3aed"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ rotateY: 5, rotateX: 5, z: 20 }}
              className="glass p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border-white/5 relative group cursor-pointer"
            >
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-60 transition-opacity"
                style={{ backgroundColor: item.color }}
              />
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 md:mb-6">{item.title}</h3>
              <p className="text-base md:text-lg text-gray-400 font-mono leading-relaxed">{item.story}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Failure Museum */}
      <section className="py-16 md:py-32 px-6 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading font-bold">Failure <span className="text-red-500">Museum</span></h2>
            <p className="text-sm md:text-base text-gray-500 font-mono italic">"Success is stumbling from failure to failure with no loss of enthusiasm."</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 text-left">
            {[
              {
                title: "The 'Dead Link' Experiment",
                fail: "Launched a complex social aggregator with zero initial market resonance.",
                lesson: "Market validation must precede architectural deployment. Build public resonance first."
              },
              {
                title: "The Production Bottleneck",
                fail: "A high-traffic system failure traced to an oversight in environmental configuration.",
                lesson: "Rigorous testing and environment parity are not overhead; they are critical risk mitigation."
              }
            ].map((exhibit, i) => (
              <div key={i} className="glass p-6 md:p-8 rounded-2xl border-red-500/10 group overflow-hidden">
                <div className="glitch font-bold text-lg md:text-xl mb-4 group-hover:text-red-400 transition-colors" data-text={exhibit.title}>
                  {exhibit.title}
                </div>
                <div className="space-y-4 opacity-60 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs md:text-sm text-gray-400"><span className="text-red-500 font-bold">Fail:</span> {exhibit.fail}</p>
                  <p className="text-xs md:text-sm text-[#00d4ff]"><span className="text-[#00d4ff] font-bold">Lesson:</span> {exhibit.lesson}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
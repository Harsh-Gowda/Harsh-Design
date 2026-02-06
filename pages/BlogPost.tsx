import React, { useState } from 'react';
import { motion as motionBase, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, Clock, Calendar, Share2, Copy, Check, ExternalLink,
  ArrowRight, Github, LayoutGrid, Terminal, ChevronRight,
  Twitter, Linkedin as LinkedinIcon, MessageCircle as WhatsAppIcon
} from 'lucide-react';
import BrandLogo from '../components/BrandLogo';

// Fix: Use any cast for motion components
const motion = motionBase as any;

// --- Blog Posts Data Dictionary ---
const blogPosts: Record<string, any> = {
  "safar-bot-automation": {
    id: "safar-bot-automation",
    title: "Scaling WhatsApp Automation: From 0 to 10k Daily Queries",
    date: "Nov 15, 2023",
    readTime: "8 min read",
    category: "Automation",
    author: "Harsh DZN",
    authorRole: "Designer & Developer",
    image: "/Asset/safar.webp",
    projectId: "safarbot",
    content: [
      { type: 'paragraph', text: `WhatsApp has an open rate of 98%. For a travel tech ecosystem, that's the holy grail. I built Safar Bot to prove that travel planning doesn't need complex apps or fragmented websites—it just needs a conversation.` },
      { type: 'heading', level: 2, text: "The Frictionless Experience" },
      { type: 'paragraph', text: `Traditional booking flows are filled with drop-offs. By moving the search and discovery logic directly into the user's favorite chat app, we removed the friction of learning a new interface. Users can now search, compare, and plan entire itineraries with natural language prompts.` },
      { type: 'paragraph', text: `Our architecture was optimized to handle thousands of simultaneous queries, ensuring that every user gets an instant response. This isn't just automation; it's about providing a reliable travel companion that is available 24/7.` },
      { type: 'project', projectId: 'safarbot' },
      { type: 'heading', level: 2, text: "Intelligence Beyond Bots" },
      { type: 'paragraph', text: `Most bots fail because they lack context. We implemented a sophisticated intent engine that understands the nuances of travel planning. Whether it's a last-minute flight to Goa or a planned family vacation, the system maintains context and provides curated options that actually match user preferences.` },
      { type: 'heading', level: 2, text: "Results" },
      { type: 'paragraph', text: `By focusing on the user's primary communication channel, we've seen booking conversion rates reach levels nearly 3x higher than traditional web platforms. Safar Bot represents a shift towards truly accessible travel technology.` }
    ],
    toc: [
      { id: "the-frictionless-experience", text: "The Frictionless Experience" },
      { id: "intelligence-beyond-bots", text: "Intelligence Beyond Bots" },
      { id: "results", text: "Results" }
    ]
  },
  "trademind-psychology": {
    id: "trademind-psychology",
    title: "Engineering Psychology: Building TradeMind's Analytics Engine",
    date: "Oct 22, 2023",
    readTime: "12 min read",
    category: "Analytics",
    author: "Harsh DZN",
    authorRole: "Designer & Developer",
    image: "/Asset/trademind.webp",
    projectId: "trademind",
    content: [
      { type: 'paragraph', text: `Most traders fail not because of strategy, but because of psychology. I built TradeMind to make the invisible visible: correlating emotional states with real-world performance to gain a definitive edge in the markets.` },
      { type: 'heading', level: 2, text: "The Psychological Edge" },
      { type: 'paragraph', text: `In high-stakes trading, data is only half the story. We built an analytics engine that treats player sentiment and personal mood as primary metrics. This allows traders to identify exactly where their emotional leaks are happening—whether it's revenge trading after a loss or overconfidence after a win.` },
      { type: 'paragraph', text: `By visualizing these patterns, we provide a mirror for the trader's mind. The goal is to move from reactive 'tilt' to proactive performance management, ensuring that every decision is backed by clarity rather than impulse.` },
      { type: 'project', projectId: 'trademind' },
      { type: 'heading', level: 2, text: "Profit through Awareness" },
      { type: 'paragraph', text: `We believe self-awareness is the highest form of edge. The TradeMind dashboard overlays qualitative mood data directly onto quantitative performance charts. This immediate feedback loop has helped our beta users reduce 'unforced errors' significantly.` },
      { type: 'heading', level: 2, text: "Long-Term Impact" },
      { type: 'paragraph', text: `Consistency is the hallmark of professional trading. By focusing on mental fortitude and objective data tracking, TradeMind helps traders survive the learning curve and thrive in the long run. It's not just a journal; it's a performance coach.` }
    ],
    toc: [
      { id: "the-psychological-edge", text: "The Psychological Edge" },
      { id: "profit-through-awareness", text: "Profit through Awareness" },
      { id: "long-term-impact", text: "Long-Term Impact" }
    ]
  },
  "pickry-performance": {
    id: "pickry-performance",
    title: "Pickry: Optimizing Discovery with Intelligent Virtualization",
    date: "Sep 10, 2023",
    readTime: "6 min read",
    category: "Discovery",
    author: "Harsh DZN",
    authorRole: "Designer & Developer",
    image: "/Asset/Pickry.webp",
    projectId: "pickry",
    content: [
      { type: 'paragraph', text: `When we started building Pickry, the goal was simple: create a premium product discovery platform that feels like a native e-commerce app. We wanted to move beyond simple listings to a space that respects the user's time and focuses on high-quality curation.` },
      { type: 'heading', level: 2, text: "The Performance Threshold" },
      { type: 'paragraph', text: `In digital commerce, every millisecond counts. We realized that traditional grids were slowing down the discovery process. We optimized our architecture to ensure that even with thousands of products, the interface remains fluid and responsive, providing instant visual feedback.` },
      { type: 'paragraph', text: `By prioritizing smoothness and reducing interface friction, we created a browsing experience that feels natural. The result is a platform where users spend more time exploring and less time waiting for pages to load.` },
      { type: 'project', projectId: 'pickry' },
      { type: 'heading', level: 2, text: "Real-Time Value Intelligence" },
      { type: 'paragraph', text: `Users deserve to know the real value of what they're looking at. We built a dynamic intelligence engine that monitors market trends and updates pricing information instantly. This isn't about pushing sales; it's about providing the data users need to make informed decisions without manual research.` },
      { type: 'heading', level: 2, text: "Intentional Discovery" },
      { type: 'paragraph', text: `Clean design leads to clean decisions. We stripped away the noise typical of e-commerce sites to focus on what matters: the product and its utility. By using contextual logic, the platform helps users find complementary items that actually fit their lifestyle, from tech setups to essential gear.` },
      { type: 'heading', level: 2, text: "Conclusion" },
      { type: 'paragraph', text: `Ultimate optimization is about empathy for the user. By focusing on speed, clarity, and real-time accuracy, we've built a discovery ecosystem that respects intent and delivers value without the typical distractions of the modern web.` }
    ],
    toc: [
      { id: "the-performance-threshold", text: "The Performance Threshold" },
      { id: "real-time-value-intelligence", text: "Real-Time Value Intelligence" },
      { id: "intentional-discovery", text: "Intentional Discovery" },
      { id: "conclusion", text: "Conclusion" }
    ]
  }
};

// --- Helper Components ---

const ProjectEmbed: React.FC<{ projectId: string }> = ({ projectId }) => {
  const projects: any = {
    pickry: {
      title: "Pickry",
      desc: "Premium discovery platform with real-time price monitoring.",
      img: "/Asset/Pickry.webp",
      link: "/pickry",
      color: "#0D7377"
    },
    trademind: {
      title: "TradeMind",
      desc: "Psychology-first trading journal & analytics.",
      img: "/Asset/trademind.webp",
      link: "/trademind",
      color: "#00C853"
    },
    safarbot: {
      title: "Safar Bot",
      desc: "AI-powered WhatsApp travel assistant.",
      img: "/Asset/safar.webp",
      link: "/safarbot",
      color: "#1E5aaf"
    }
  };

  const p = projects[projectId];
  if (!p) return null;

  return (
    <div className="my-12 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
      <div className="glass p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center gap-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <img src={p.img} alt={p.title} className="w-20 h-20 rounded-xl object-cover shadow-lg border border-white/10" />

        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h4 className="font-heading font-bold text-xl">{p.title}</h4>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold border border-white/20 uppercase tracking-wide opacity-60">Project</span>
          </div>
          <p className="text-sm text-gray-400 mb-4 font-mono">{p.desc}</p>
          <Link
            to={p.link}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all"
          >
            Explore Project <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
};

const ToolEmbed: React.FC<{ name: string; desc: string; link: string }> = ({ name, desc, link }) => (
  <div className="my-8 bg-[#1E293B]/50 border-l-4 border-[#00d4ff] p-6 rounded-r-xl">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="font-bold text-[#00d4ff] flex items-center gap-2 mb-2">
          <Terminal size={16} /> {name}
        </h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
      <a href={link} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
        <ExternalLink size={18} />
      </a>
    </div>
  </div>
);

const CodeBlock: React.FC<{ lang: string; code: string }> = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10 bg-[#050508] shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-mono text-gray-500 lowercase">{lang}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-white transition-colors"
        >
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// --- Main Page Component ---

const BlogPost: React.FC = () => {
  const { id } = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const post = id && blogPosts[id] ? blogPosts[id] : blogPosts["safar-bot-automation"];

  return (
    <div className="min-h-screen bg-[#0B1120]">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#00d4ff] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Header Image & Title */}
      <header className="relative h-[60vh] min-h-[400px] flex items-end pb-12">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col gap-6">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#00d4ff] transition-colors mb-4">
              <ArrowLeft size={16} /> Back to Build Log
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#00d4ff]">
              <span className="px-3 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/20 rounded-full uppercase tracking-wider">{post.category}</span>
              <span className="flex items-center gap-1 text-gray-400"><Clock size={12} /> {post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white max-w-4xl leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16">

        {/* Main Content Body */}
        <article className="lg:col-span-8">
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-gray-300 prose-p:leading-8 prose-a:text-[#00d4ff] prose-img:rounded-2xl prose-strong:text-white">

            {/* Why I Built This Block */}
            <div className="bg-[#1E293B]/50 border border-white/5 p-8 rounded-2xl mb-12">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <LayoutGrid size={20} className="text-[#F97316]" /> About This Project
              </h3>
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {post.projectId === "safarbot" && "WhatsApp has an open rate of 98%. I built Safar Bot to prove that travel planning can move from static websites to dynamic, AI-driven conversations."}
                {post.projectId === "trademind" && "Most trading journals are just spreadsheets. TradeMind was built to visualize the psychological data that actually drives profit and loss."}
                {post.projectId === "pickry" && "Speed is the #1 factor in user discovery. Pickry was an experiment in extreme frontend optimization to create the most fluid search experience possible."}
              </p>
              <div className="flex gap-4">
                <Link to={`/${post.projectId}`} className="px-4 py-2 bg-white text-black font-bold text-xs rounded-lg hover:bg-gray-200 transition-colors">Live Demo</Link>
                <a href="#" className="px-4 py-2 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-colors">View Code</a>
              </div>
            </div>

            {/* Render Content Blocks */}
            {post.content.map((block: any, index: number) => {
              if (block.type === 'paragraph') return <p key={index}>{block.text}</p>;
              if (block.type === 'heading') {
                const Tag = `h${block.level}` as any;
                // Assign ID for TOC
                // Assign ID for TOC by slugifying the text
                const id = block.text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
                return <Tag id={id} key={index} className="scroll-mt-24">{block.text}</Tag>;
              }
              if (block.type === 'code') return <CodeBlock key={index} lang={block.lang} code={block.code} />;
              if (block.type === 'project') return <ProjectEmbed key={index} projectId={block.projectId} />;
              if (block.type === 'tool') return <ToolEmbed key={index} name={block.toolName} desc={block.description} link={block.link} />;
              return null;
            })}

          </div>

          <hr className="border-white/10 my-16" />

          {/* Post Footer: Author & Share */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center p-3">
                  <BrandLogo className="w-full h-full" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#00d4ff] border-2 border-[#0B1120] rounded-full shadow-[0_0_10px_rgba(0,212,255,0.5)]" title="Available for hire" />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg">{post.author}</h4>
                <p className="text-sm text-gray-500">{post.authorRole}</p>
                <div className="flex gap-2 mt-2">
                  <a href="#" className="text-gray-400 hover:text-white"><Github size={16} /></a>
                  <a href="#" className="text-gray-400 hover:text-[#00d4ff]"><ExternalLink size={16} /></a>
                </div>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsShareOpen(!isShareOpen)}
                className="flex items-center gap-2 text-white font-bold bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] px-6 py-3 rounded-xl hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all text-sm group"
              >
                <Share2 size={16} className="group-hover:scale-110 transition-transform" /> Share Article
              </button>

              <AnimatePresence>
                {isShareOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsShareOpen(false)}
                      className="fixed inset-0 z-[110]"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-4 w-56 glass border border-white/10 p-2 rounded-2xl z-[120] shadow-2xl origin-bottom-right"
                    >
                      <div className="space-y-1">
                        {[
                          {
                            name: 'Twitter',
                            icon: Twitter,
                            color: 'hover:text-[#1DA1F2]',
                            action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')
                          },
                          {
                            name: 'LinkedIn',
                            icon: LinkedinIcon,
                            color: 'hover:text-[#0077b5]',
                            action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')
                          },
                          {
                            name: 'WhatsApp',
                            icon: WhatsAppIcon,
                            color: 'hover:text-[#25D366]',
                            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`, '_blank')
                          }
                        ].map((social) => (
                          <button
                            key={social.name}
                            onClick={() => {
                              social.action();
                              setIsShareOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-gray-400 transition-all ${social.color}`}
                          >
                            <span className="text-sm font-bold">{social.name}</span>
                            <social.icon size={18} />
                          </button>
                        ))}
                        <div className="h-[1px] bg-white/5 my-1" />
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            setLinkCopied(true);
                            setTimeout(() => {
                              setLinkCopied(false);
                              setIsShareOpen(false);
                            }, 2000);
                          }}
                          className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all"
                        >
                          <span className="text-sm font-bold">{linkCopied ? 'Copied!' : 'Copy Link'}</span>
                          {linkCopied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </article>

        {/* Sidebar (TOC) */}
        <aside className="lg:col-span-4 space-y-8 hidden lg:block">
          <div className="sticky top-32">
            <div className="glass p-8 rounded-3xl border-white/5 mb-8">
              <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Table of Contents</h4>
              <nav className="space-y-4">
                {post.toc.map((item: any, i: number) => (
                  <a
                    key={i}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-400 hover:text-[#00d4ff] transition-colors border-l-2 border-transparent hover:border-[#00d4ff] pl-4"
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>

            {/* Newsletter Mini */}
            <div className="bg-gradient-to-b from-[#00d4ff]/10 to-transparent p-8 rounded-3xl border border-[#00d4ff]/20 text-center">
              <h4 className="font-bold text-white mb-2">Build in Public</h4>
              <p className="text-xs text-gray-400 mb-4">Get the source code for this project sent to your inbox.</p>
              <input type="email" placeholder="Email address" className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-3 py-2 text-xs text-white mb-3 focus:border-[#00d4ff] outline-none" />
              <button className="w-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white text-xs font-bold py-2 rounded-lg hover:brightness-110">Send Code</button>
            </div>
          </div>
        </aside>

      </div>

      {/* Continue Reading Section */}
      <section className="bg-[#050508] py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-heading font-bold mb-12 flex items-center gap-2">
            Continue Reading <ChevronRight className="text-[#00d4ff]" />
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {Object.values(blogPosts).filter(p => p.id !== post.id).map(p => (
              <Link key={p.id} to={`/blog/${p.id}`} className="glass p-6 rounded-2xl border-white/5 hover:border-[#00d4ff]/30 transition-all group">
                <span className="text-xs text-[#00d4ff] font-bold mb-2 block uppercase">Related Build</span>
                <h4 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                  {p.title}
                </h4>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {p.content[0].text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default BlogPost;
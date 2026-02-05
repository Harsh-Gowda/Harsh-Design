import React, { useState } from 'react';
import { motion as motionBase, useScroll, useSpring } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Clock, Calendar, Share2, Copy, Check, ExternalLink, 
  ArrowRight, Github, LayoutGrid, Terminal, ChevronRight
} from 'lucide-react';

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
    authorRole: "Founder & Lead Dev",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1200",
    projectId: "safarbot",
    content: [
      { type: 'paragraph', text: `WhatsApp has an open rate of 98%. For a travel affiliate business, that's the holy grail. But handling thousands of concurrent flight search queries on a chat interface is an engineering nightmare.` },
      { type: 'heading', level: 2, text: "The Concurrency Problem" },
      { type: 'paragraph', text: `Our initial prototype used a simple polling mechanism. It crashed at 50 users. The WhatsApp Business API webhook sends events faster than a single Node.js thread can process complex scraping tasks.` },
      { type: 'code', lang: 'javascript', code: `// The Solution: Redis Message Queue
const queue = new Queue('flight-search', {
  redis: { port: 6379, host: '127.0.0.1' }
});

queue.process(async (job) => {
  const { origin, dest, date } = job.data;
  const flights = await scraper.search(origin, dest, date);
  await whatsapp.sendReply(job.data.phone, flights);
});` },
      { type: 'paragraph', text: `By decoupling the webhook receiver from the heavy scraping logic using a Redis queue, we could scale worker nodes horizontally. We now run 5 worker instances during peak hours.` },
      { type: 'project', projectId: 'safarbot' },
      { type: 'heading', level: 2, text: "Handling Context" },
      { type: 'paragraph', text: `Unlike a web form, chat is unstructured. We implemented a Finite State Machine (FSM) to track user intent (e.g., 'Planning' -> 'Selecting Dates' -> 'Booking'). This ensures the bot doesn't get confused if a user types 'Goa' in the middle of a payment flow.` },
       { type: 'tool', toolName: 'Puppeteer', description: 'Used for scraping real-time flight data where APIs were too expensive.', link: '#' },
      { type: 'heading', level: 2, text: "Results" },
      { type: 'paragraph', text: `Safar Bot now handles 10k+ daily queries with 99.9% uptime. The affiliate conversion rate via WhatsApp is 3x higher than our traditional web landing pages.` }
    ],
    toc: [
      { id: "concurrency", text: "The Concurrency Problem" },
      { id: "context", text: "Handling Context" },
      { id: "results", text: "Results" }
    ]
  },
  "trademind-psychology": {
    id: "trademind-psychology",
    title: "Engineering Psychology: Building TradeMind's Analytics Engine",
    date: "Oct 22, 2023",
    readTime: "12 min read",
    category: "Fintech",
    author: "Harsh DZN",
    authorRole: "Founder & Lead Dev",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1200",
    projectId: "trademind",
    content: [
      { type: 'paragraph', text: `Most traders fail not because of strategy, but because of psychology. I built TradeMind to make the invisible visible: correlating emotional states with PnL performance.` },
      { type: 'heading', level: 2, text: "Data Modeling" },
      { type: 'paragraph', text: `We needed a schema that treats 'Mood' as a first-class citizen alongside 'Entry Price' and 'Exit Price'. This allows us to run queries like 'Show me my PnL when I felt Anxious vs. Calm'.` },
      { type: 'code', lang: 'typescript', code: `type Trade = {
  id: string;
  pnl: number;
  preTradeMood: 'Calm' | 'Anxious' | 'Excited';
  postTradeMood: 'Satisfied' | 'Frustrated';
  // ...other standard fields
};

const getWinRateByMood = (trades: Trade[]) => {
  return trades.reduce((acc, trade) => {
    if (!acc[trade.preTradeMood]) acc[trade.preTradeMood] = { wins: 0, total: 0 };
    acc[trade.preTradeMood].total++;
    if (trade.pnl > 0) acc[trade.preTradeMood].wins++;
    return acc;
  }, {});
};` },
      { type: 'paragraph', text: `This simple data structure powers the 'Psychology Matrix' on the dashboard, immediately showing traders their emotional leaks.` },
      { type: 'project', projectId: 'trademind' },
      { type: 'heading', level: 2, text: "Visualizing the Data" },
      { type: 'paragraph', text: `We used Recharts for the equity curve because of its composability. The challenge was overlaying qualitative data (mood) onto quantitative data (equity) without cluttering the UI. We solved this with color-coded markers on the main chart.` },
      { type: 'heading', level: 2, text: "Impact" },
      { type: 'paragraph', text: `Early beta users reported a 15% reduction in 'revenge trading' incidents after seeing their performance data visualized this way.` }
    ],
    toc: [
      { id: "modeling", text: "Data Modeling" },
      { id: "visualizing", text: "Visualizing the Data" },
      { id: "impact", text: "Impact" }
    ]
  },
  "pickry-performance": {
    id: "pickry-performance",
    title: "Pickry: Optimizing Affiliate Conversion with Virtualization",
    date: "Sep 10, 2023",
    readTime: "6 min read",
    category: "E-Commerce",
    author: "Harsh DZN",
    authorRole: "Founder & Lead Dev",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    projectId: "pickry",
    content: [
      { type: 'paragraph', text: `When we started building Pickry, the goal was simple: create an affiliate product discovery engine that feels like a native e-commerce app, not a spammy link farm. The initial MVP was functional, but conversion rates hovered around 1.2%. We knew we could do better.` },
      { type: 'heading', level: 2, text: "The Performance Bottleneck" },
      { type: 'paragraph', text: `Our initial profiling using Lighthouse revealed that Largest Contentful Paint (LCP) was taking 2.4s. For an affiliate site, speed is trust. Users who click a 'Deal' link expect instant gratification. We decided to rewrite the product grid component.` },
      { type: 'code', lang: 'tsx', code: `// Optimizing the Product Grid with Virtualization
import { FixedSizeGrid as Grid } from 'react-window';

const ProductGrid = ({ items }) => (
  <Grid
    columnCount={4}
    columnWidth={280}
    height={800}
    rowCount={Math.ceil(items.length / 4)}
    rowHeight={350}
    width={1120}
  >
    {({ columnIndex, rowIndex, style }) => {
      // Cell logic...
    }}
  </Grid>
);` },
      { type: 'paragraph', text: `By implementing virtualization, we reduced the DOM node count by 85% on category pages. This single change improved interaction latency and made the scrolling experience buttery smooth.` },
      { type: 'project', projectId: 'pickry' },
      { type: 'heading', level: 2, text: "The 'Flash Sale' Engine" },
      { type: 'paragraph', text: `Static prices don't convert. We built a background worker using Node.js that scrapes Amazon and Flipkart APIs every 15 minutes for products in user watchlists. When a price drop > 10% is detected, we trigger a UI notification.` },
      { type: 'tool', toolName: 'Cuelinks API', description: 'Used for automated affiliate link generation and real-time merchant status checks.', link: '#' },
      { type: 'heading', level: 2, text: "Contextual Recommendations" },
      { type: 'paragraph', text: `We realized that users looking at electronics often needed trading setups or travel gear. We began cross-promoting our other internal tools.` },
      { type: 'heading', level: 2, text: "Conclusion" },
      { type: 'paragraph', text: `Optimization isn't just about code speed; it's about reducing friction in the user journey. By cleaning up the UI and speeding up the load times, we pushed conversion from 1.2% to 1.7% in two weeks.` }
    ],
    toc: [
      { id: "performance", text: "The Performance Bottleneck" },
      { id: "flash-sale", text: "The 'Flash Sale' Engine" },
      { id: "recommendations", text: "Contextual Recommendations" },
      { id: "conclusion", text: "Conclusion" }
    ]
  }
};

// --- Helper Components ---

const ProjectEmbed: React.FC<{ projectId: string }> = ({ projectId }) => {
  const projects: any = {
    pickry: {
      title: "Pickry",
      desc: "Affiliate discovery platform with flash sale engine.",
      img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=200",
      link: "/pickry",
      color: "#0D7377"
    },
    trademind: {
      title: "TradeMind",
      desc: "Psychology-first trading journal & analytics.",
      img: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=200",
      link: "/trademind",
      color: "#00C853"
    },
    safarbot: {
      title: "Safar Bot",
      desc: "AI-powered WhatsApp travel assistant.",
      img: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?auto=format&fit=crop&q=80&w=200",
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F97316] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#ff8636] transition-colors"
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
              <span className="flex items-center gap-1 text-gray-400"><Calendar size={12} /> {post.date}</span>
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
                 {post.projectId === "safarbot" && "WhatsApp has an open rate of 98%. I built Safar Bot to prove that travel affiliate marketing can move from static websites to dynamic conversations."}
                 {post.projectId === "trademind" && "Most trading journals are just spreadsheets. TradeMind was built to visualize the psychological data that actually drives profit and loss."}
                 {post.projectId === "pickry" && "Speed is the #1 factor in affiliate conversion. Pickry was an experiment in extreme frontend optimization to maximize click-through rates."}
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
                 const id = block.text === "The Performance Bottleneck" ? "performance" : 
                            block.text === "The 'Flash Sale' Engine" ? "flash-sale" :
                            block.text === "Contextual Recommendations" ? "recommendations" : 
                            block.text === "Conclusion" ? "conclusion" : 
                            block.text === "The Concurrency Problem" ? "concurrency" :
                            block.text === "Handling Context" ? "context" :
                            block.text === "Results" ? "results" :
                            block.text === "Data Modeling" ? "modeling" :
                            block.text === "Visualizing the Data" ? "visualizing" :
                            block.text === "Impact" ? "impact" : undefined;
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
                <div className="w-16 h-16 rounded-full bg-white/10 overflow-hidden">
                   {/* Placeholder Avatar */}
                   <div className="w-full h-full bg-gradient-to-br from-[#00d4ff] to-[#7c3aed]" />
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#0B1120] rounded-full" title="Available for hire" />
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
            
            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm font-bold text-white">
               <Share2 size={16} /> Share Article
            </button>
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
               <button className="w-full bg-[#00d4ff] text-black text-xs font-bold py-2 rounded-lg hover:brightness-110">Send Code</button>
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
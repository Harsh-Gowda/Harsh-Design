import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Tag, Search, Zap, Code, TrendingUp, Layers, ExternalLink } from 'lucide-react';

// Fix: Use any cast for motion components
const motion = motionBase as any;

const categories = ["All", "Automation", "Analytics", "E-Commerce"];

const articles = [
  {
    id: "safar-bot-automation",
    title: "Scaling WhatsApp Automation: From 0 to 10k Daily Queries",
    excerpt: "Architecture deep dive: Handling concurrent travel queries on WhatsApp Business API using Node.js queues and Puppeteer to deliver instant flight prices.",
    date: "Nov 15, 2023",
    readTime: "8 min read",
    category: "Automation",
    tags: ["Node.js", "WhatsApp", "Scaling"],
    image: "/Asset/safar.webp",
    projectLink: "/safarbot",
    featured: true
  },
  {
    id: "trademind-psychology",
    title: "Engineering Psychology: Building TradeMind's Analytics Engine",
    excerpt: "How we mapped emotional states to PnL performance using React and Recharts. Moving beyond spreadsheets to visualize trader psychology in real-time.",
    date: "Oct 22, 2023",
    readTime: "12 min read",
    category: "Analytics",
    tags: ["React", "Data Viz", "Trading"],
    image: "/Asset/trademind.webp",
    projectLink: "/trademind",
    featured: false
  },
  {
    id: "pickry-performance",
    title: "Pickry: Optimizing Discovery with Intelligent Virtualization",
    excerpt: "Reducing TTFB to under 100ms for high-traffic discovery pages. A case study in aggressive caching, React virtualization, and enhancing user search experiences.",
    date: "Sep 10, 2023",
    readTime: "6 min read",
    category: "E-Commerce",
    tags: ["Performance", "UX", "Discovery"],
    image: "/Asset/Pickry.webp",
    projectLink: "/pickry",
    featured: false
  }
];

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesFilter = activeFilter === "All" || article.category === activeFilter;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Always use the first one as featured if available in filter
  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  // The rest go in the grid
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#0a0a0f] pb-24"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#00d4ff] mb-6"
          >
            <Code size={12} />
            Engineering & Growth
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-extrabold text-white mb-6"
          >
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Log</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed"
          >
            Deep dives into the code, architecture, and growth strategies behind my three flagship projects: Safar Bot, TradeMind, and Pickry.
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 sticky top-24 z-40 bg-[#0a0a0f]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${activeFilter === cat
                  ? 'bg-[#00d4ff] text-black border-[#00d4ff]'
                  : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00d4ff] transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search builds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#050508] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00d4ff]/50 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredArticle && (
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="grid md:grid-cols-2 gap-8 glass rounded-[2rem] border-white/10 overflow-hidden group hover:border-[#00d4ff]/30 transition-all duration-500"
            >
              <div className="h-[300px] md:h-[450px] overflow-hidden relative">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-3 py-1 bg-[#00d4ff] text-black text-xs font-bold uppercase tracking-wider rounded-lg">
                    Latest Build
                  </span>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-gray-400 font-mono mb-4">
                  <span className="flex items-center gap-1"><Clock size={12} /> {featuredArticle.readTime}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight group-hover:text-[#00d4ff] transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredArticle.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-xs font-bold text-gray-400 border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <Link
                    to={`/blog/${featuredArticle.id}`}
                    className="inline-flex items-center gap-2 text-[#00d4ff] font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
                  >
                    Read Build Notes <ArrowRight size={16} />
                  </Link>

                  <Link
                    to={(featuredArticle as any).projectLink}
                    className="inline-flex items-center gap-2 text-white/60 hover:text-white font-bold uppercase tracking-widest text-sm transition-all"
                  >
                    View Project <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {gridArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${article.id}`} className="block h-full glass rounded-3xl border-white/5 overflow-hidden group hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00d4ff]/10 transition-all duration-300">
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                    {article.category}
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-3 text-[10px] text-gray-500 font-mono mb-4">
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-2xl font-heading font-bold mb-4 leading-snug group-hover:text-[#00d4ff] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {article.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-bold text-gray-500 group-hover:text-gray-300 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 mt-32">
        <div className="max-w-4xl mx-auto glass p-12 rounded-[3rem] border-white/10 relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]" />
          <div className="relative z-10">
            <div className="w-16 h-16 bg-[#00d4ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#00d4ff]">
              <Zap size={32} />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-4">Get Build Updates</h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8 font-mono">
              Join the newsletter to receive technical deep dives, affiliate growth experiments, and source code snippets directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="dev@example.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00d4ff] outline-none"
              />
              <button className="bg-[#00d4ff] text-black font-bold px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

    </motion.div>
  );
};

export default Blog;
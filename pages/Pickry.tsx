import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Search, Heart, User, Star, ArrowRight, 
  TrendingDown, TrendingUp, Filter, Clock, Percent, 
  Share2, ExternalLink, LogOut, LayoutGrid, BarChart3,
  CheckCircle2, AlertCircle, Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar
} from 'recharts';

// --- Types ---
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  platform: 'Amazon' | 'Flipkart' | 'Myntra';
  affiliateCommission: string; // For Admin View
  clicks: number; // For Admin View
}

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5 Noise Canceling',
    category: 'Electronics',
    price: 29990,
    originalPrice: 34990,
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
    platform: 'Amazon',
    affiliateCommission: '4%',
    clicks: 1420
  },
  {
    id: '2',
    name: 'MacBook Air M2 Midnight',
    category: 'Electronics',
    price: 94990,
    originalPrice: 114900,
    rating: 4.9,
    reviews: 850,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&q=80&w=800',
    platform: 'Amazon',
    affiliateCommission: '2.5%',
    clicks: 890
  },
  {
    id: '3',
    name: 'Nike Air Jordan 1 Retro High',
    category: 'Fashion',
    price: 16995,
    originalPrice: 18995,
    rating: 4.7,
    reviews: 2100,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800',
    platform: 'Myntra',
    affiliateCommission: '10%',
    clicks: 3400
  },
  {
    id: '4',
    name: 'Kindle Paperwhite 16GB',
    category: 'Electronics',
    price: 12999,
    originalPrice: 14999,
    rating: 4.6,
    reviews: 5400,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    platform: 'Amazon',
    affiliateCommission: '4%',
    clicks: 650
  },
  {
    id: '5',
    name: 'Adidas Ultraboost Light',
    category: 'Fashion',
    price: 14999,
    originalPrice: 18999,
    rating: 4.5,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aef4?auto=format&fit=crop&q=80&w=800',
    platform: 'Flipkart',
    affiliateCommission: '8%',
    clicks: 1100
  },
  {
    id: '6',
    name: 'PlayStation 5 Console',
    category: 'Gaming',
    price: 49990,
    originalPrice: 54990,
    rating: 4.9,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800',
    platform: 'Amazon',
    affiliateCommission: '3%',
    clicks: 5600
  }
];

const ANALYTICS_DATA = [
  { name: 'Mon', clicks: 4000, revenue: 2400 },
  { name: 'Tue', clicks: 3000, revenue: 1398 },
  { name: 'Wed', clicks: 2000, revenue: 9800 },
  { name: 'Thu', clicks: 2780, revenue: 3908 },
  { name: 'Fri', clicks: 1890, revenue: 4800 },
  { name: 'Sat', clicks: 2390, revenue: 3800 },
  { name: 'Sun', clicks: 3490, revenue: 4300 },
];

const Pickry: React.FC = () => {
  const [view, setView] = useState<'shopper' | 'admin'>('shopper');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ h: 12, m: 45, s: 30 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Save Item Handler
  const toggleSave = (id: string) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Simulate Conversion
  const handleCheckPrice = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const filteredProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // --- Components ---

  const Countdown = () => (
    <div className="flex gap-2 text-[#FF6B35] font-mono font-bold text-sm items-center bg-[#FF6B35]/10 px-3 py-1 rounded-lg">
      <Clock size={14} />
      <span>{String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#212121] font-sans overflow-x-hidden transition-colors duration-500">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#0D7377] p-2 rounded-lg">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-[#0D7377]">Pickry</span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative group">
            <input 
              type="text" 
              placeholder="Search for best deals..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F5F5] border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#0D7377]/20 outline-none transition-all"
            />
            <Search className="absolute left-3.5 top-2.5 text-gray-400 group-focus-within:text-[#0D7377]" size={18} />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setView(view === 'shopper' ? 'admin' : 'shopper')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${view === 'admin' ? 'bg-[#212121] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {view === 'admin' ? <LayoutGrid size={14} /> : <BarChart3 size={14} />}
              {view === 'admin' ? 'Shopper View' : 'Affiliate Dash'}
            </button>
            <div className="relative cursor-pointer hover:text-[#FF6B35] transition-colors">
              <Heart size={20} />
              {savedItems.length > 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF6B35] rounded-full border-2 border-white"></span>}
            </div>
            <Link to="/" className="text-gray-400 hover:text-red-500"><LogOut size={20} /></Link>
          </div>

          <button className="md:hidden text-[#212121]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* SHOPPER VIEW */}
        {view === 'shopper' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            
            {/* Hero Section */}
            <section className="relative rounded-3xl overflow-hidden bg-[#0D7377] text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="z-10 space-y-6 max-w-lg">
                <span className="inline-block px-3 py-1 bg-[#FF6B35] text-xs font-bold rounded-full uppercase tracking-wider">Flash Sale</span>
                <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">Smart Savings for the <br/><span className="text-[#A2D2FF]">Modern Shopper</span></h1>
                <p className="text-white/80 font-mono text-sm">We track 10,000+ products daily to find price drops so you don't have to.</p>
                <div className="flex gap-4">
                  <button className="bg-white text-[#0D7377] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">Explore Deals</button>
                  <div className="flex -space-x-2 items-center">
                    {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-[#0D7377]" />)}
                    <span className="ml-4 text-xs font-bold">+2k Shoppers</span>
                  </div>
                </div>
              </div>
              <motion.div 
                className="z-10 bg-white text-[#212121] p-4 rounded-2xl shadow-2xl max-w-xs w-full"
                initial={{ y: 20 }} animate={{ y: 0 }} transition={{ type: 'spring', bounce: 0.5 }}
              >
                <div className="flex justify-between items-start mb-4">
                   <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">-40% Today</span>
                   <Heart size={16} className="text-gray-400" />
                </div>
                <img src={PRODUCTS[0].image} alt="Product" className="w-full h-32 object-cover rounded-lg mb-4" />
                <h3 className="font-bold text-sm mb-1">{PRODUCTS[0].name}</h3>
                <div className="flex items-end gap-2">
                   <span className="text-lg font-bold text-[#0D7377]">₹{PRODUCTS[0].price.toLocaleString()}</span>
                   <span className="text-xs text-gray-400 line-through mb-1">₹{PRODUCTS[0].originalPrice.toLocaleString()}</span>
                </div>
              </motion.div>
            </section>

            {/* Flash Deals Row */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-heading font-bold">Flash Deals</h2>
                  <Countdown />
                </div>
                <button className="text-sm font-bold text-[#0D7377] flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight size={16} /></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.slice(0, 4).map((product) => (
                  <motion.div 
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative"
                  >
                    <button onClick={() => toggleSave(product.id)} className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-gray-100 transition-colors">
                      <Heart size={16} className={savedItems.includes(product.id) ? "fill-[#FF6B35] text-[#FF6B35]" : "text-gray-400"} />
                    </button>
                    <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-gray-50">
                       <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                          <img src={`https://www.google.com/s2/favicons?domain=${product.platform.toLowerCase()}.in`} className="w-3 h-3 rounded-full" alt="" />
                          {product.platform}
                       </div>
                    </div>
                    
                    <div className="space-y-2">
                       <div className="flex justify-between items-start">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">{product.category}</span>
                          <div className="flex items-center gap-1 text-xs font-bold text-yellow-500">
                             <Star size={12} fill="currentColor" /> {product.rating}
                          </div>
                       </div>
                       <h3 className="font-bold text-sm line-clamp-2 min-h-[40px]">{product.name}</h3>
                       
                       <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                          <div>
                             <div className="flex gap-2 items-center">
                                <span className="font-bold text-lg">₹{product.price.toLocaleString()}</span>
                                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1 rounded">
                                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                </span>
                             </div>
                             <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                          </div>
                          <button 
                             onClick={handleCheckPrice}
                             className="bg-[#0D7377] text-white p-2.5 rounded-xl hover:bg-[#095a5d] transition-colors shadow-lg shadow-[#0D7377]/20 active:scale-95"
                          >
                             <ExternalLink size={18} />
                          </button>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Categories */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {['Electronics', 'Fashion', 'Home', 'Beauty'].map((cat, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:border-[#0D7377]/30 cursor-pointer transition-all group">
                     <div className="w-12 h-12 bg-gray-50 rounded-full mx-auto mb-3 flex items-center justify-center text-[#0D7377] group-hover:bg-[#0D7377] group-hover:text-white transition-colors">
                        <Filter size={20} />
                     </div>
                     <h3 className="font-bold">{cat}</h3>
                     <p className="text-xs text-gray-400">120+ Deals</p>
                  </div>
               ))}
            </section>

          </motion.div>
        )}

        {/* ADMIN VIEW */}
        {view === 'admin' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <header className="flex justify-between items-end mb-8">
                 <div>
                    <h2 className="text-3xl font-heading font-bold text-[#212121]">Affiliate Overview</h2>
                    <p className="text-gray-500 text-sm mt-1">Real-time performance tracking for Harsh DZN.</p>
                 </div>
                 <div className="flex gap-3">
                    <button className="text-sm font-bold bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50">Export Report</button>
                    <button className="text-sm font-bold bg-[#212121] text-white px-4 py-2 rounded-lg">Settings</button>
                 </div>
              </header>

              <div className="grid md:grid-cols-4 gap-6">
                 {[
                    { label: 'Total Clicks', val: '24,500', change: '+12%', icon: <Share2 size={20} /> },
                    { label: 'Conversions', val: '1,240', change: '+5%', icon: <CheckCircle2 size={20} /> },
                    { label: 'Est. Revenue', val: '₹4.2L', change: '+18%', icon: <TrendingUp size={20} /> },
                    { label: 'Avg. Commission', val: '4.8%', change: '-1%', icon: <Percent size={20} /> },
                 ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                       <div className="flex justify-between items-start mb-4">
                          <div className="p-3 bg-gray-50 rounded-xl text-[#0D7377]">{stat.icon}</div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{stat.change}</span>
                       </div>
                       <h3 className="text-2xl font-bold font-mono">{stat.val}</h3>
                       <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                 ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                 {/* Main Chart */}
                 <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-bold">Revenue & Clicks Trend</h3>
                       <select className="text-xs border-none bg-gray-50 rounded-lg px-2 py-1 outline-none"><option>Last 7 Days</option></select>
                    </div>
                    <ResponsiveContainer width="100%" height="85%">
                       <AreaChart data={ANALYTICS_DATA}>
                          <defs>
                             <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0D7377" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0D7377" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} stroke="#9ca3af" />
                          <YAxis axisLine={false} tickLine={false} fontSize={12} stroke="#9ca3af" />
                          <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                          <Area type="monotone" dataKey="revenue" stroke="#0D7377" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                          <Area type="monotone" dataKey="clicks" stroke="#FF6B35" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>

                 {/* Top Products */}
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <h3 className="font-bold mb-6">Top Performing Links</h3>
                    <div className="space-y-6">
                       {PRODUCTS.slice(0, 4).map((p, i) => (
                          <div key={i} className="flex items-center gap-4">
                             <div className="font-mono text-gray-300 font-bold text-lg">0{i+1}</div>
                             <img src={p.image} className="w-10 h-10 rounded-lg object-cover" alt="" />
                             <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold truncate">{p.name}</h4>
                                <p className="text-xs text-gray-400">{p.clicks} Clicks • {p.affiliateCommission} Comm.</p>
                             </div>
                             <div className="text-[#0D7377] font-bold text-sm">₹{(p.price * 0.04).toFixed(0)}</div>
                          </div>
                       ))}
                    </div>
                    <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-gray-300 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-colors">View All Products</button>
                 </div>
              </div>
           </motion.div>
        )}

      </main>

      {/* Confetti / Notification */}
      <AnimatePresence>
        {showConfetti && (
           <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 50, opacity: 0 }}
             className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#212121] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50"
           >
              <div className="bg-green-500 rounded-full p-1"><CheckCircle2 size={14} className="text-white" /></div>
              <span className="text-sm font-bold">Redirecting to Partner Store... Conversion Cookie Set! 🍪</span>
           </motion.div>
        )}
      </AnimatePresence>
      
      {/* Disclaimer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 mt-12 border-t border-gray-200 text-center">
         <p className="text-xs text-gray-400 max-w-2xl mx-auto">
            Pickry is a participant in the Amazon Associates Program and other affiliate programs. We earn commissions from qualifying purchases. Prices tracked in real-time but may vary on partner sites.
         </p>
      </footer>
    </div>
  );
};

export default Pickry;
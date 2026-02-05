import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, PlusCircle, History, Brain, Settings, 
  LogOut, TrendingUp, TrendingDown, DollarSign, AlertTriangle, 
  Download, Trash2, Calendar, Target, Activity, Zap
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { Link } from 'react-router-dom';

// --- Types ---
type Mood = 'Excited' | 'Anxious' | 'Calm' | 'Bored' | 'Frustrated';
type TradeType = 'Long' | 'Short';
type Trade = {
  id: string;
  date: string;
  symbol: string;
  type: TradeType;
  entry: number;
  exit: number;
  qty: number;
  fees: number;
  pnl: number;
  rMultiple: number;
  setup: string;
  preMood: Mood;
  postMood: Mood;
  notes: string;
};

// --- Initial Data ---
const MOCK_TRADES: Trade[] = [
  { id: '1', date: '2023-10-01', symbol: 'BTC/USD', type: 'Long', entry: 28000, exit: 29500, qty: 0.5, fees: 10, pnl: 740, rMultiple: 2.5, setup: 'Breakout', preMood: 'Calm', postMood: 'Excited', notes: 'Clean breakout retest' },
  { id: '2', date: '2023-10-03', symbol: 'ETH/USD', type: 'Short', entry: 1600, exit: 1620, qty: 10, fees: 5, pnl: -205, rMultiple: -1, setup: 'Rejection', preMood: 'Anxious', postMood: 'Frustrated', notes: 'Stopped out due to news' },
  { id: '3', date: '2023-10-05', symbol: 'SOL/USD', type: 'Long', entry: 22.5, exit: 24.0, qty: 100, fees: 2, pnl: 148, rMultiple: 1.8, setup: 'Trend Following', preMood: 'Bored', postMood: 'Calm', notes: 'Slow grinder' },
  { id: '4', date: '2023-10-06', symbol: 'BTC/USD', type: 'Short', entry: 30000, exit: 29800, qty: 1, fees: 15, pnl: 185, rMultiple: 1.2, setup: 'Range Fade', preMood: 'Calm', postMood: 'Calm', notes: 'Standard range trade' },
];

// --- Colors ---
const COLORS = {
  bg: '#0B1120',
  card: '#111827',
  text: '#E2E8F0',
  win: '#00C853',
  loss: '#FF1744',
  primary: '#3B82F6',
  accent: '#6366f1'
};

const TradeMind: React.FC = () => {
  const [activeView, setActiveView] = useState<'dashboard' | 'new' | 'journal' | 'psychology'>('dashboard');
  const [trades, setTrades] = useState<Trade[]>([]);
  const [startingBalance, setStartingBalance] = useState(10000);
  
  // New Trade Form State
  const [newTrade, setNewTrade] = useState<Partial<Trade>>({
    type: 'Long',
    preMood: 'Calm',
    qty: 1
  });

  // Load Data
  useEffect(() => {
    const saved = localStorage.getItem('trademind_trades');
    if (saved) {
      setTrades(JSON.parse(saved));
    } else {
      setTrades(MOCK_TRADES);
    }
  }, []);

  // Save Data
  useEffect(() => {
    localStorage.setItem('trademind_trades', JSON.stringify(trades));
  }, [trades]);

  // Calculations
  const totalPnL = trades.reduce((acc, t) => acc + t.pnl, 0);
  const currentBalance = startingBalance + totalPnL;
  const winRate = trades.length > 0 ? (trades.filter(t => t.pnl > 0).length / trades.length) * 100 : 0;
  
  // Equity Curve Data
  const equityCurve = trades.reduce((acc: any[], t, i) => {
    const prevBalance = i > 0 ? acc[i-1].balance : startingBalance;
    return [...acc, { name: t.date, balance: prevBalance + t.pnl, pnl: t.pnl }];
  }, []);

  // Daily Trades Check (Overtrading)
  const today = new Date().toISOString().split('T')[0];
  const tradesToday = trades.filter(t => t.date === today).length;
  const showOvertradingAlert = tradesToday > 4;

  // Actions
  const handleAddTrade = () => {
    if (!newTrade.symbol || !newTrade.entry || !newTrade.exit) return;
    
    const qty = newTrade.qty || 1;
    const fees = newTrade.fees || 0;
    const isLong = newTrade.type === 'Long';
    const entry = Number(newTrade.entry);
    const exit = Number(newTrade.exit);
    
    // Simple PnL Calc
    const rawPnL = isLong ? (exit - entry) * qty : (entry - exit) * qty;
    const netPnL = rawPnL - fees;
    
    // Approx R-Multiple (Assuming 1% risk for simplicity in demo)
    const risk = entry * 0.01 * qty; 
    const rMultiple = risk !== 0 ? Number((netPnL / risk).toFixed(2)) : 0;

    const trade: Trade = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      symbol: newTrade.symbol.toUpperCase(),
      type: newTrade.type as TradeType,
      entry,
      exit,
      qty,
      fees,
      pnl: netPnL,
      rMultiple,
      setup: newTrade.setup || 'Discretionary',
      preMood: newTrade.preMood as Mood,
      postMood: newTrade.postMood || 'Calm',
      notes: newTrade.notes || ''
    };

    setTrades([trade, ...trades]);
    setNewTrade({ type: 'Long', preMood: 'Calm', qty: 1 });
    setActiveView('dashboard');
  };

  const exportCSV = () => {
    const headers = Object.keys(trades[0]).join(',');
    const rows = trades.map(t => Object.values(t).join(',')).join('\n');
    const blob = new Blob([headers + '\n' + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trademind_export.csv';
    a.click();
  };

  // --- Views Components ---

  const SidebarItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-mono text-sm ${activeView === id ? 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#0B1120] text-gray-300 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0B1120] flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 rounded bg-[#00C853] flex items-center justify-center text-black font-bold">T</div>
          <span className="font-heading font-bold text-xl text-white">TradeMind</span>
        </div>

        <nav className="space-y-2 flex-1">
          <SidebarItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <SidebarItem id="new" icon={PlusCircle} label="Log Trade" />
          <SidebarItem id="journal" icon={History} label="Journal" />
          <SidebarItem id="psychology" icon={Brain} label="Psychology" />
        </nav>

        <div className="space-y-2 pt-6 border-t border-white/5">
          <div className="px-4 py-2">
            <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">Account Balance</p>
            <p className="text-xl font-mono text-white font-bold">${currentBalance.toLocaleString()}</p>
          </div>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 transition-all text-sm font-mono border border-transparent">
            <LogOut size={18} />
            <span>Exit Demo</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        
        {/* Alerts */}
        {showOvertradingAlert && (
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-red-500/10 border border-red-500/50 text-red-500 px-6 py-3 rounded-full backdrop-blur-md"
          >
            <AlertTriangle size={18} />
            <span className="font-bold text-sm">Overtrading Alert: {tradesToday} trades today. Take a break.</span>
          </motion.div>
        )}

        {/* Dynamic Content */}
        <div className="max-w-6xl mx-auto">
          
          {/* HEADER */}
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white capitalize">{activeView}</h2>
              <p className="text-gray-500 font-mono text-sm mt-1">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            {activeView === 'dashboard' && (
               <div className="flex gap-4">
                 <div className="bg-[#111827] px-4 py-2 rounded-lg border border-white/5">
                   <span className="text-xs text-gray-500 block">Win Rate</span>
                   <span className={`font-mono font-bold ${winRate >= 50 ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>{winRate.toFixed(1)}%</span>
                 </div>
                 <div className="bg-[#111827] px-4 py-2 rounded-lg border border-white/5">
                   <span className="text-xs text-gray-500 block">Total PnL</span>
                   <span className={`font-mono font-bold ${totalPnL >= 0 ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>
                     {totalPnL >= 0 ? '+' : ''}{totalPnL.toLocaleString()}
                   </span>
                 </div>
               </div>
            )}
          </div>

          {/* DASHBOARD VIEW */}
          {activeView === 'dashboard' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Equity Curve */}
              <div className="col-span-12 lg:col-span-8 bg-[#111827] p-6 rounded-2xl border border-white/5 h-[400px]">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Activity size={16} /> Equity Curve
                </h3>
                <ResponsiveContainer width="100%" height="85%">
                  <AreaChart data={equityCurve}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={totalPnL >= 0 ? COLORS.win : COLORS.loss} stopOpacity={0.3}/>
                        <stop offset="95%" stopColor={totalPnL >= 0 ? COLORS.win : COLORS.loss} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#0B1120', borderColor: '#334155', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff', fontFamily: 'monospace' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke={totalPnL >= 0 ? COLORS.win : COLORS.loss} 
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Stats & Psychology Widget */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                 {/* Win/Loss Ratio */}
                 <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 h-[190px] flex flex-col justify-center items-center relative">
                    <h3 className="absolute top-6 left-6 text-sm font-bold text-gray-400 uppercase tracking-wider">Performance</h3>
                    <div className="flex items-center gap-8 mt-4">
                       <div className="text-center">
                         <div className="text-3xl font-mono font-bold text-[#00C853]">{trades.filter(t => t.pnl > 0).length}</div>
                         <div className="text-xs text-gray-500 uppercase">Wins</div>
                       </div>
                       <div className="h-12 w-[1px] bg-white/10" />
                       <div className="text-center">
                         <div className="text-3xl font-mono font-bold text-[#FF1744]">{trades.filter(t => t.pnl <= 0).length}</div>
                         <div className="text-xs text-gray-500 uppercase">Losses</div>
                       </div>
                    </div>
                 </div>

                 {/* Recent Mood */}
                 <div className="bg-[#111827] p-6 rounded-2xl border border-white/5 h-[190px]">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Brain size={16} /> Psychology Pulse
                    </h3>
                    <div className="flex justify-between items-end h-[100px]">
                      {trades.slice(0, 5).map((t, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 group">
                           <div 
                             className={`w-2 rounded-full transition-all group-hover:w-4 ${t.pnl > 0 ? 'bg-[#00C853]' : 'bg-[#FF1744]'}`} 
                             style={{ height: `${Math.abs(t.rMultiple) * 20 + 20}px` }}
                           />
                           <span className="text-[10px] text-gray-500 truncate w-12 text-center">{t.preMood}</span>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>

              {/* Recent Trades List */}
              <div className="col-span-12 bg-[#111827] rounded-2xl border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Recent Executions</h3>
                  <button onClick={() => setActiveView('journal')} className="text-xs text-[#3B82F6] hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-black/20 text-xs uppercase font-mono">
                      <tr>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Symbol</th>
                        <th className="px-6 py-3">Type</th>
                        <th className="px-6 py-3 text-right">PnL</th>
                        <th className="px-6 py-3">Mood</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {trades.slice(0, 3).map((trade) => (
                        <tr key={trade.id} className="hover:bg-white/5 transition-colors font-mono">
                          <td className="px-6 py-4">{trade.date}</td>
                          <td className="px-6 py-4 font-bold text-white">{trade.symbol}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold ${trade.type === 'Long' ? 'bg-[#00C853]/20 text-[#00C853]' : 'bg-[#FF1744]/20 text-[#FF1744]'}`}>
                              {trade.type}
                            </span>
                          </td>
                          <td className={`px-6 py-4 text-right font-bold ${trade.pnl > 0 ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>
                            {trade.pnl > 0 ? '+' : ''}{trade.pnl}
                          </td>
                          <td className="px-6 py-4 text-xs">{trade.preMood} → {trade.postMood}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* NEW TRADE VIEW */}
          {activeView === 'new' && (
             <div className="max-w-2xl mx-auto">
                <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
                   <div className="p-8 border-b border-white/5">
                      <h3 className="text-xl font-bold text-white mb-2">Log Execution</h3>
                      <p className="text-gray-500 text-sm">Enter trade details and emotional state.</p>
                   </div>
                   
                   <div className="p-8 space-y-8">
                      {/* Setup Info */}
                      <div className="grid grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Symbol</label>
                            <input 
                              type="text" 
                              value={newTrade.symbol || ''}
                              onChange={e => setNewTrade({...newTrade, symbol: e.target.value})}
                              className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 font-mono text-white focus:border-[#3B82F6] outline-none"
                              placeholder="BTC/USD"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Direction</label>
                            <div className="flex gap-2 bg-[#0B1120] p-1 rounded-lg border border-white/10">
                               {['Long', 'Short'].map(type => (
                                 <button 
                                   key={type}
                                   onClick={() => setNewTrade({...newTrade, type: type as TradeType})}
                                   className={`flex-1 py-2 rounded font-bold text-sm transition-all ${newTrade.type === type ? (type === 'Long' ? 'bg-[#00C853] text-black' : 'bg-[#FF1744] text-white') : 'text-gray-500 hover:text-white'}`}
                                 >
                                    {type}
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6">
                         <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Entry</label>
                            <input 
                              type="number" 
                              onChange={e => setNewTrade({...newTrade, entry: Number(e.target.value)})}
                              className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 font-mono text-white focus:border-[#3B82F6] outline-none"
                              placeholder="0.00"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Exit</label>
                            <input 
                              type="number" 
                              onChange={e => setNewTrade({...newTrade, exit: Number(e.target.value)})}
                              className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 font-mono text-white focus:border-[#3B82F6] outline-none"
                              placeholder="0.00"
                            />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-gray-500">Qty</label>
                            <input 
                              type="number" 
                              value={newTrade.qty}
                              onChange={e => setNewTrade({...newTrade, qty: Number(e.target.value)})}
                              className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 font-mono text-white focus:border-[#3B82F6] outline-none"
                              placeholder="1"
                            />
                         </div>
                      </div>

                      {/* Psychology Check-in */}
                      <div className="space-y-4 pt-4 border-t border-white/5">
                         <label className="text-xs uppercase font-bold text-[#3B82F6] flex items-center gap-2">
                            <Brain size={14} /> Psychology Check-in
                         </label>
                         <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <span className="text-xs text-gray-500">Pre-Trade Mood</span>
                              <select 
                                onChange={e => setNewTrade({...newTrade, preMood: e.target.value as Mood})}
                                className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 outline-none"
                              >
                                {['Calm', 'Excited', 'Anxious', 'Bored', 'Frustrated'].map(m => <option key={m} value={m}>{m}</option>)}
                              </select>
                           </div>
                           <div className="space-y-2">
                              <span className="text-xs text-gray-500">Post-Trade Mood</span>
                              <select 
                                onChange={e => setNewTrade({...newTrade, postMood: e.target.value as Mood})}
                                className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 outline-none"
                              >
                                {['Calm', 'Excited', 'Anxious', 'Bored', 'Frustrated'].map(m => <option key={m} value={m}>{m}</option>)}
                              </select>
                           </div>
                         </div>
                         <textarea 
                           placeholder="Reflective notes: What went well? What did you miss?"
                           onChange={e => setNewTrade({...newTrade, notes: e.target.value})}
                           className="w-full bg-[#0B1120] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:border-[#3B82F6] outline-none min-h-[100px]"
                         />
                      </div>

                      <button 
                        onClick={handleAddTrade}
                        className="w-full py-4 rounded-xl bg-[#00C853] text-black font-bold text-lg hover:shadow-[0_0_20px_rgba(0,200,83,0.3)] transition-all"
                      >
                         Confirm Execution
                      </button>
                   </div>
                </div>
             </div>
          )}

          {/* JOURNAL VIEW */}
          {activeView === 'journal' && (
            <div className="bg-[#111827] rounded-2xl border border-white/5 overflow-hidden">
               <div className="p-6 border-b border-white/5 flex justify-between items-center">
                  <div className="flex gap-4">
                     <button className="text-sm font-bold text-white border-b-2 border-[#3B82F6] pb-1">All Trades</button>
                     <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors pb-1">Winning</button>
                     <button className="text-sm font-bold text-gray-500 hover:text-white transition-colors pb-1">Losing</button>
                  </div>
                  <button onClick={exportCSV} className="flex items-center gap-2 text-xs font-bold bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all text-gray-300">
                     <Download size={14} /> Export CSV
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-black/20 text-xs uppercase font-mono">
                      <tr>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Symbol</th>
                        <th className="px-6 py-4">Setup</th>
                        <th className="px-6 py-4 text-center">R-Multiple</th>
                        <th className="px-6 py-4 text-right">PnL</th>
                        <th className="px-6 py-4 text-center">Psychology</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {trades.map((trade) => (
                        <tr key={trade.id} className="hover:bg-white/5 transition-colors font-mono">
                          <td className="px-6 py-4">{trade.date}</td>
                          <td className="px-6 py-4 font-bold text-white">
                             {trade.symbol} <span className={`ml-1 text-[10px] ${trade.type === 'Long' ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>{trade.type[0]}</span>
                          </td>
                          <td className="px-6 py-4 text-xs font-sans text-gray-500">{trade.setup}</td>
                          <td className="px-6 py-4 text-center">
                             <span className={`px-2 py-1 rounded text-xs font-bold ${trade.rMultiple > 0 ? 'bg-[#00C853]/10 text-[#00C853]' : 'bg-[#FF1744]/10 text-[#FF1744]'}`}>
                               {trade.rMultiple}R
                             </span>
                          </td>
                          <td className={`px-6 py-4 text-right font-bold ${trade.pnl > 0 ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>
                            ${trade.pnl}
                          </td>
                          <td className="px-6 py-4 text-center">
                             <div className="flex justify-center gap-2 text-[10px] uppercase font-sans font-bold text-gray-600">
                                <span className={trade.preMood === 'Calm' ? 'text-[#3B82F6]' : 'text-gray-500'}>{trade.preMood}</span>
                                <span>→</span>
                                <span className={trade.pnl > 0 ? 'text-[#00C853]' : 'text-[#FF1744]'}>{trade.postMood}</span>
                             </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button 
                               onClick={() => setTrades(trades.filter(t => t.id !== trade.id))}
                               className="text-gray-600 hover:text-[#FF1744] transition-colors"
                             >
                               <Trash2 size={16} />
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          )}
          
          {/* PSYCHOLOGY VIEW */}
          {activeView === 'psychology' && (
             <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#111827] p-8 rounded-2xl border border-white/5">
                   <h3 className="text-xl font-bold text-white mb-6">Mood Performance Matrix</h3>
                   <div className="space-y-6">
                      {['Calm', 'Excited', 'Anxious', 'Bored', 'Frustrated'].map(mood => {
                         const moodTrades = trades.filter(t => t.preMood === mood);
                         const moodPnL = moodTrades.reduce((acc, t) => acc + t.pnl, 0);
                         const count = moodTrades.length;
                         if (count === 0) return null;
                         
                         return (
                            <div key={mood} className="space-y-2">
                               <div className="flex justify-between text-sm">
                                  <span className="font-bold text-gray-400">{mood} ({count})</span>
                                  <span className={`font-mono font-bold ${moodPnL > 0 ? 'text-[#00C853]' : 'text-[#FF1744]'}`}>
                                    {moodPnL > 0 ? '+' : ''}{moodPnL}
                                  </span>
                               </div>
                               <div className="h-2 w-full bg-[#0B1120] rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(Math.abs(moodPnL) / 50, 100)}%` }}
                                    className={`h-full ${moodPnL > 0 ? 'bg-[#00C853]' : 'bg-[#FF1744]'}`} 
                                  />
                               </div>
                            </div>
                         );
                      })}
                   </div>
                </div>

                <div className="bg-[#111827] p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 rounded-full border-4 border-[#3B82F6]/20 flex items-center justify-center mb-6 relative">
                       <Zap size={40} className="text-[#3B82F6]" />
                       <div className="absolute inset-0 border-t-4 border-[#3B82F6] rounded-full animate-spin duration-[3s]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Discipline Streak</h3>
                    <p className="text-[#00C853] font-mono text-4xl font-bold my-2">
                       {trades.filter(t => t.preMood === 'Calm').length}
                    </p>
                    <p className="text-gray-500 text-sm max-w-xs">Consecutive trades taken in a 'Calm' state. Keep emotions stable to increase consistency.</p>
                </div>
             </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default TradeMind;
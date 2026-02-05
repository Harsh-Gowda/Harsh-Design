import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, Send, Paperclip, MoreVertical, Phone, Video, Search, 
  ArrowLeft, CheckCheck, Plane, Train, Bus, MapPin, Calendar, 
  Clock, CreditCard, Bell, Sun, Moon, Globe, LogOut, Terminal, 
  ShieldCheck, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  type: 'text' | 'options' | 'ticket' | 'payment';
  timestamp: string;
  options?: string[];
  data?: any;
};

type Itinerary = {
  destination: string;
  date: string;
  mode: 'flight' | 'train' | 'bus' | null;
  status: 'planning' | 'booking' | 'confirmed';
  price?: string;
  pnr?: string;
};

// --- Mock Data ---
const FLIGHT_OPTIONS = [
  { id: 'F1', airline: 'IndiGo', code: '6E-532', time: '08:30 AM', duration: '1h 15m', price: '₹4,200', type: 'Non-stop' },
  { id: 'F2', airline: 'Air India', code: 'AI-804', time: '10:45 AM', duration: '1h 20m', price: '₹4,850', type: 'Economy' },
  { id: 'F3', airline: 'Vistara', code: 'UK-992', time: '02:15 PM', duration: '1h 10m', price: '₹5,600', type: 'Premium' },
];

const SafarBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'bot', text: 'Namaste! 🙏 I am Safar Bot.', type: 'text', timestamp: '10:00 AM' },
    { id: '2', sender: 'bot', text: 'Where would you like to go today?', type: 'options', timestamp: '10:00 AM', options: ['Book Flight ✈️', 'Check PNR 🎫', 'Trip Ideas 💡'] }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [itinerary, setItinerary] = useState<Itinerary>({ destination: '', date: '', mode: null, status: 'planning' });
  const [darkMode, setDarkMode] = useState(false); // Default to light/sand theme initially for contrast with dark portfolio
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'logs'>('dashboard');
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Bot Logic Simulator
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      type: 'text',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // AI Response Simulation
    setTimeout(() => {
      let botResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: "I didn't catch that. Try 'Book flight to Goa'.",
        type: 'text',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      const lowerInput = userMsg.text.toLowerCase();

      if (lowerInput.includes('flight') || lowerInput.includes('book')) {
        botResponse = {
          ...botResponse,
          text: 'Great! Finding flights for you. ✈️\nHere are the best options for tomorrow:',
          type: 'options',
          options: ['IndiGo ₹4,200', 'Air India ₹4,850', 'Vistara ₹5,600']
        };
        setItinerary(prev => ({ ...prev, mode: 'flight', status: 'booking', date: 'Tomorrow' }));
      } else if (lowerInput.includes('goa') || lowerInput.includes('mumbai')) {
         const dest = lowerInput.includes('goa') ? 'Goa' : 'Mumbai';
         botResponse = {
           ...botResponse,
           text: `Exploring trips to ${dest}? Nice choice! 🌴\nWhen are you planning to travel?`,
           type: 'text'
         };
         setItinerary(prev => ({ ...prev, destination: dest }));
      } else if (lowerInput.includes('indigo') || lowerInput.includes('first')) {
         botResponse = {
           ...botResponse,
           text: 'IndiGo 6E-532 selected. ✅\nProceed to payment to confirm your seat.',
           type: 'payment'
         };
         setItinerary(prev => ({ ...prev, price: '₹4,200', status: 'booking' }));
      } else if (lowerInput.includes('pay') || lowerInput.includes('confirm')) {
         botResponse = {
           ...botResponse,
           text: 'Payment Successful! 🎉\nHere is your ticket. Have a safe journey!',
           type: 'ticket',
           data: { pnr: 'SAFAR882', seat: '12A' }
         };
         setItinerary(prev => ({ ...prev, status: 'confirmed', pnr: 'SAFAR882' }));
      }

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={`flex flex-col md:flex-row h-screen transition-colors duration-500 ${darkMode ? 'bg-[#0F172A] text-white' : 'bg-[#E0E7FF] text-slate-800'}`}>
      
      {/* LEFT: Chat Interface (Mobile Simulator) */}
      <div className="w-full md:w-[400px] flex-shrink-0 flex flex-col h-full border-r border-black/10 relative z-10 shadow-2xl">
        
        {/* Chat Header */}
        <div className={`px-4 py-3 flex items-center justify-between ${darkMode ? 'bg-[#1e293b]' : 'bg-[#008B8B]'} text-white shadow-md z-20`}>
           <div className="flex items-center gap-3">
              <Link to="/" className="mr-1 hover:bg-white/10 p-1 rounded-full"><ArrowLeft size={20} /></Link>
              <div className="relative">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=Safar" alt="Bot" className="w-full h-full p-1" />
                 </div>
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] border-2 border-[#008B8B] rounded-full"></div>
              </div>
              <div>
                 <h3 className="font-bold text-sm leading-tight">Safar Bot <span className="text-[10px] bg-[#25D366] px-1 rounded text-black font-bold ml-1">BUSINESS</span></h3>
                 <p className="text-xs text-white/80">Online</p>
              </div>
           </div>
           <div className="flex gap-4 text-white/90">
              <Video size={20} />
              <Phone size={20} />
              <MoreVertical size={20} />
           </div>
        </div>

        {/* Chat Area */}
        <div 
           ref={chatContainerRef}
           className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#e5ddd5]'}`}
           style={{ backgroundImage: darkMode ? '' : 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundRepeat: 'repeat', backgroundSize: '400px' }}
        >
           <div className="flex justify-center mb-4">
              <span className={`text-[10px] px-3 py-1 rounded-lg shadow-sm ${darkMode ? 'bg-[#1e293b] text-gray-400' : 'bg-[#dcf8c6] text-gray-600'}`}>
                 Messages are end-to-end encrypted. 🔒
              </span>
           </div>

           {messages.map((msg) => (
              <motion.div 
                 key={msg.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                 <div 
                    className={`max-w-[80%] rounded-lg p-2 shadow-sm relative ${
                       msg.sender === 'user' 
                          ? (darkMode ? 'bg-[#005c4b] text-white' : 'bg-[#dcf8c6] text-black') 
                          : (darkMode ? 'bg-[#1e293b] text-white' : 'bg-white text-black')
                    }`}
                 >
                    {msg.sender === 'bot' && <div className="text-[10px] font-bold text-[#008B8B] mb-1">Safar Bot</div>}
                    
                    <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                    
                    {/* Render Options if any */}
                    {msg.type === 'options' && msg.options && (
                       <div className="mt-3 space-y-2">
                          {msg.options.map((opt, i) => (
                             <button 
                                key={i}
                                onClick={() => { setInputText(opt); handleSend(); }}
                                className="block w-full text-center py-2 text-sm text-[#008B8B] font-bold bg-white border border-gray-200 rounded shadow-sm hover:bg-gray-50"
                             >
                                {opt}
                             </button>
                          ))}
                       </div>
                    )}

                    {/* Render Ticket */}
                    {msg.type === 'ticket' && (
                       <div className="mt-3 bg-white rounded border border-dashed border-gray-300 p-3">
                          <div className="flex justify-between items-center border-b pb-2 mb-2">
                             <div className="flex items-center gap-1 text-[#008B8B] font-bold">
                                <Plane size={14} /> INDIGO
                             </div>
                             <span className="text-xs font-mono text-gray-500">{msg.data.pnr}</span>
                          </div>
                          <div className="flex justify-between text-black">
                             <div className="text-center">
                                <p className="text-xs text-gray-400">BOM</p>
                                <p className="font-bold text-lg">08:30</p>
                             </div>
                             <div className="flex flex-col items-center justify-center px-4">
                                <div className="h-[1px] w-12 bg-gray-300"></div>
                                <span className="text-[10px] text-gray-400">1h 15m</span>
                             </div>
                             <div className="text-center">
                                <p className="text-xs text-gray-400">GOI</p>
                                <p className="font-bold text-lg">09:45</p>
                             </div>
                          </div>
                          <div className="mt-2 pt-2 border-t flex justify-between items-center">
                             <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded">CONFIRMED</span>
                             <span className="text-xs font-bold text-gray-600">Seat: {msg.data.seat}</span>
                          </div>
                       </div>
                    )}

                    <div className="flex justify-end items-center gap-1 mt-1">
                       <span className="text-[10px] opacity-60">{msg.timestamp}</span>
                       {msg.sender === 'user' && <CheckCheck size={12} className="text-[#53bdeb]" />}
                    </div>
                 </div>
              </motion.div>
           ))}
           {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
               <div className={`p-3 rounded-lg ${darkMode ? 'bg-[#1e293b]' : 'bg-white'}`}>
                 <Loader2 size={16} className="animate-spin text-[#008B8B]" />
               </div>
             </motion.div>
           )}
        </div>

        {/* Input Area */}
        <div className={`p-2 flex items-center gap-2 ${darkMode ? 'bg-[#1e293b]' : 'bg-[#f0f2f5]'}`}>
           <button className="p-2 text-gray-500 hover:text-[#008B8B]"><MoreVertical size={20} /></button>
           <button className="p-2 text-gray-500 hover:text-[#008B8B]"><Paperclip size={20} /></button>
           <div className={`flex-1 flex items-center rounded-full px-4 py-2 ${darkMode ? 'bg-[#0f172a]' : 'bg-white'}`}>
              <input 
                 type="text" 
                 placeholder="Type a message" 
                 value={inputText}
                 onChange={(e) => setInputText(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                 className="flex-1 bg-transparent outline-none text-sm"
              />
           </div>
           {inputText ? (
              <button onClick={handleSend} className="p-3 rounded-full bg-[#008B8B] text-white shadow-lg hover:scale-110 transition-transform">
                 <Send size={18} />
              </button>
           ) : (
              <button className="p-3 rounded-full bg-[#008B8B] text-white shadow-lg hover:scale-110 transition-transform">
                 <Mic size={18} />
              </button>
           )}
        </div>
      </div>

      {/* RIGHT: Dashboard / Backend View */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${darkMode ? 'bg-[#0F172A]' : 'bg-[#F5F5DC]'}`}>
        
        {/* Top Navigation Bar */}
        <div className={`h-16 border-b flex items-center justify-between px-6 ${darkMode ? 'border-white/10 bg-[#1e293b]' : 'border-black/5 bg-[#F5F5DC]'}`}>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded bg-[#008B8B] flex items-center justify-center text-white font-bold">S</div>
             <span className="font-heading font-bold text-xl tracking-tight">Safar<span className="text-[#008B8B]">Admin</span></span>
          </div>
          
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
               className="flex items-center gap-2 px-3 py-1 rounded-full border border-current text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
             >
               <Globe size={14} /> {language === 'en' ? 'English' : 'Hindi'}
             </button>
             <button 
               onClick={() => setDarkMode(!darkMode)}
               className="p-2 rounded-full hover:bg-black/5 transition-colors"
             >
               {darkMode ? <Sun size={18} /> : <Moon size={18} />}
             </button>
             <Link to="/" className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors">
               <LogOut size={18} />
             </Link>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-y-auto">
           <div className="max-w-4xl mx-auto">
             
             {/* Status Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className={`p-6 rounded-2xl border transition-all ${darkMode ? 'bg-[#1e293b] border-white/5' : 'bg-white border-[#008B8B]/10 shadow-lg shadow-[#008B8B]/5'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-[#008B8B]/10 text-[#008B8B]"><Plane size={24} /></div>
                      {itinerary.status === 'confirmed' && <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold">BOOKED</span>}
                   </div>
                   <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider">Active Trip</h3>
                   <p className="text-2xl font-heading font-bold mt-1">
                      {itinerary.destination || 'Not Selected'}
                   </p>
                </div>
                
                <div className={`p-6 rounded-2xl border transition-all ${darkMode ? 'bg-[#1e293b] border-white/5' : 'bg-white border-[#008B8B]/10 shadow-lg shadow-[#008B8B]/5'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500"><Calendar size={24} /></div>
                      <span className="text-xs font-bold opacity-50">Estimated</span>
                   </div>
                   <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider">Travel Date</h3>
                   <p className="text-2xl font-heading font-bold mt-1">
                      {itinerary.date || '--/--'}
                   </p>
                </div>

                <div className={`p-6 rounded-2xl border transition-all ${darkMode ? 'bg-[#1e293b] border-white/5' : 'bg-white border-[#008B8B]/10 shadow-lg shadow-[#008B8B]/5'}`}>
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500"><CreditCard size={24} /></div>
                   </div>
                   <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider">Total Cost</h3>
                   <p className="text-2xl font-heading font-bold mt-1">
                      {itinerary.price || '₹0'}
                   </p>
                </div>
             </div>

             {/* Main Views: Flight Search vs Backend Logs */}
             <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-white/10">
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'dashboard' ? 'border-[#008B8B] text-[#008B8B]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  Live Results
                </button>
                <button 
                  onClick={() => setActiveTab('logs')} 
                  className={`pb-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'logs' ? 'border-[#008B8B] text-[#008B8B]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  Webhook Logs
                </button>
             </div>

             {activeTab === 'dashboard' ? (
                <div className="space-y-6">
                   {itinerary.mode === 'flight' ? (
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Search size={18} /> Found 3 Flights</h3>
                            <span className="text-xs font-bold text-[#008B8B] bg-[#008B8B]/10 px-3 py-1 rounded-full">Lowest Fare: ₹4,200</span>
                         </div>
                         {FLIGHT_OPTIONS.map((flight) => (
                            <motion.div 
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               key={flight.id} 
                               className={`group relative p-6 rounded-2xl border transition-all hover:scale-[1.01] cursor-pointer ${darkMode ? 'bg-[#1e293b] border-white/5 hover:border-[#008B8B]/50' : 'bg-white border-transparent shadow-md hover:shadow-xl'}`}
                            >
                               <div className="flex justify-between items-center relative z-10">
                                  <div className="flex items-center gap-4">
                                     <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs ${flight.airline === 'IndiGo' ? 'bg-blue-100 text-blue-700' : flight.airline === 'Air India' ? 'bg-orange-100 text-orange-700' : 'bg-purple-100 text-purple-700'}`}>
                                        {flight.code.split('-')[0]}
                                     </div>
                                     <div>
                                        <h4 className="font-bold text-lg">{flight.time}</h4>
                                        <p className="text-xs opacity-60">{flight.airline} • {flight.code}</p>
                                     </div>
                                  </div>
                                  
                                  <div className="text-center px-6">
                                     <p className="text-xs opacity-50 mb-1">{flight.duration}</p>
                                     <div className="w-24 h-[2px] bg-gray-300 dark:bg-white/10 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#008B8B]"></div>
                                     </div>
                                     <p className="text-xs font-bold text-[#008B8B] mt-1">{flight.type}</p>
                                  </div>

                                  <div className="text-right">
                                     <h4 className="font-bold text-xl text-[#008B8B]">{flight.price}</h4>
                                     <button className="mt-2 text-xs font-bold bg-[#008B8B] text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        Book Now
                                     </button>
                                  </div>
                               </div>
                            </motion.div>
                         ))}
                      </div>
                   ) : (
                      <div className="flex flex-col items-center justify-center py-20 opacity-50 space-y-4">
                         <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center">
                            <MapPin size={40} />
                         </div>
                         <p className="font-mono text-sm">Start chatting to plan your trip...</p>
                      </div>
                   )}
                </div>
             ) : (
                <div className={`font-mono text-xs p-6 rounded-2xl overflow-hidden ${darkMode ? 'bg-black text-green-400' : 'bg-[#1e293b] text-green-400'}`}>
                   <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                      <Terminal size={14} /> 
                      <span className="font-bold">Webhook Stream</span>
                      <div className="ml-auto flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-500"></div>
                         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                         <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                   </div>
                   <div className="space-y-4 h-[400px] overflow-y-auto">
                      {messages.map((msg, i) => (
                         <div key={i} className="space-y-1">
                            <p className="opacity-50 text-[10px]">{msg.timestamp} - <span className="text-blue-400">POST /api/v1/webhook</span></p>
                            <p className="pl-4 border-l-2 border-white/20">
                               <span className="text-purple-400">event</span>: <span className="text-yellow-300">"{msg.sender === 'user' ? 'message.received' : 'message.sent'}"</span>
                            </p>
                            <p className="pl-4 border-l-2 border-white/20">
                               <span className="text-purple-400">payload</span>: {'{'} &quot;text&quot;: &quot;{msg.text ? msg.text.substring(0, 30) : ''}...&quot; {'}'}
                            </p>
                         </div>
                      ))}
                      {itinerary.status === 'booking' && (
                         <div className="space-y-1 animate-pulse">
                            <p className="opacity-50 text-[10px]">{new Date().toLocaleTimeString()} - <span className="text-yellow-400">GET /api/v1/flights/search</span></p>
                            <p className="pl-4 border-l-2 border-white/20 text-gray-400">Fetching pricing from GDS...</p>
                         </div>
                      )}
                   </div>
                </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default SafarBot;
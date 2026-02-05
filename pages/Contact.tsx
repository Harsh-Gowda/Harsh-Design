import React, { useState } from 'react';
import { motion as motionBase } from 'framer-motion';
import { 
  Mail, MapPin, Github, Linkedin, Instagram, MessageCircle, 
  Send, Globe, Zap, User, MessageSquare, ArrowRight 
} from 'lucide-react';

// Fix: Use any cast for motion components to resolve environment-specific type conflicts
const motion = motionBase as any;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Freelance Project',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${formData.subject} - ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:harshgowdaujire@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] relative overflow-hidden flex items-center justify-center pt-20 pb-20">
      {/* Decorative Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#7c3aed]/5 rounded-full blur-[100px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0 }}
        className="max-w-7xl w-full mx-auto px-6 z-10"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Text & Info */}
          <div className="space-y-10">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] text-xs font-bold uppercase tracking-widest"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00d4ff]"></span>
                </span>
                Open for Work
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-heading font-extrabold leading-tight text-white"
              >
                Let's Build <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">
                  Something Together
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-gray-400 font-mono leading-relaxed max-w-lg"
              >
                Have a project in mind or need a website that actually converts? I'm currently open to freelance opportunities, affiliate collaborations, and custom WordPress/React development.
              </motion.p>
            </div>

            {/* Contact Details Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-5 group">
                 <div className="w-12 h-12 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20 flex items-center justify-center text-[#00d4ff] group-hover:scale-110 transition-transform">
                   <Mail size={24} />
                 </div>
                 <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Me</h3>
                   <a href="mailto:harshgowdaujire@gmail.com" className="text-lg md:text-xl font-bold text-white hover:text-[#00d4ff] transition-colors">
                     harshgowdaujire@gmail.com
                   </a>
                 </div>
              </div>

              <div className="flex items-center gap-5 group">
                 <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] group-hover:scale-110 transition-transform">
                   <Globe size={24} />
                 </div>
                 <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</h3>
                   <p className="text-lg font-bold text-white">Bengaluru, India · Remote Worldwide</p>
                 </div>
              </div>

              <div className="flex items-center gap-5 group">
                 <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316] group-hover:scale-110 transition-transform">
                   <Zap size={24} />
                 </div>
                 <div>
                   <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Availability</h3>
                   <div className="flex items-center gap-2">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                     <p className="text-lg font-bold text-white">Always Online</p>
                   </div>
                 </div>
              </div>
            </motion.div>

            {/* Social Row */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.6 }}
               className="flex gap-4 pt-4"
            >
               {[
                 { icon: Github, href: "https://github.com/harshdzn", color: "#ffffff", label: "Github" },
                 { icon: Linkedin, href: "#", color: "#0077b5", label: "LinkedIn" },
                 { icon: Instagram, href: "#", color: "#E1306C", label: "Instagram" },
                 { icon: MessageCircle, href: "https://wa.me/91XXXXXXXXXX", color: "#25D366", label: "WhatsApp" }
               ].map((social, i) => (
                 <motion.a
                   key={i}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   whileHover={{ scale: 1.1, y: -3 }}
                   className="w-12 h-12 glass rounded-xl flex items-center justify-center border-white/10 hover:border-[#00d4ff]/50 transition-all group"
                 >
                    <social.icon size={20} style={{ color: social.color }} />
                 </motion.a>
               ))}
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 md:p-10 rounded-3xl border-white/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <MessageSquare size={150} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00d4ff] focus:bg-white/10 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00d4ff] focus:bg-white/10 transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Project Type</label>
                <div className="relative">
                  <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#00d4ff] focus:bg-white/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Freelance Project" className="bg-[#0B1120]">Freelance Project</option>
                    <option value="Affiliate Collaboration" className="bg-[#0B1120]">Affiliate Collaboration</option>
                    <option value="WordPress Development" className="bg-[#0B1120]">WordPress Development</option>
                    <option value="React/Full Stack" className="bg-[#0B1120]">React/Full Stack</option>
                    <option value="Other" className="bg-[#0B1120]">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Message</label>
                <textarea 
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-[#00d4ff] focus:bg-white/10 transition-all resize-none"
                  placeholder="Tell me about your project goals, timeline, and budget..."
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                Send Message <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
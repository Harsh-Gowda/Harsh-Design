
import React from 'react';
import { motion as motionBase } from 'framer-motion';

// Fix: Use any cast for motion components to resolve environment-specific type conflicts with HTMLMotionProps
const motion = motionBase as any;

const BackgroundParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#1E5aaf]/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ff6b35]/5 blur-[150px] rounded-full" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-[#00d4ff]/10 blur-[120px] rounded-full" />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00d4ff]/20 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;

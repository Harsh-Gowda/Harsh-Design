import React from 'react';

interface BrandLogoProps {
  className?: string;
  monochrome?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "w-8 h-8", monochrome = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradient" x1="40" y1="20" x2="100" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      
      {/* Left Vertical Pillar - The backbone of 'H' */}
      <path 
        d="M20 15C17.2386 15 15 17.2386 15 20V80C15 82.7614 17.2386 85 20 85H35V15H20Z" 
        fill={monochrome ? "currentColor" : "white"} 
      />
      
      {/* Crossbar Connector */}
      <rect x="35" y="42" width="22" height="16" fill={monochrome ? "currentColor" : "white"} />
      
      {/* Right Arrow/Chevron - Represents 'D' / Direction / DZN */}
      <path 
        d="M57 15 L 92 48.5858 C 93.5621 50.1479 93.5621 52.6789 92 54.2411 L 57 89.2411 V 68 L 73 51.4142 L 57 35 V 15Z" 
        fill={monochrome ? "currentColor" : "url(#logoGradient)"} 
      />
      
      {/* Floating Digital Accent - The 'Spark' */}
      <rect 
        x="82" 
        y="12" 
        width="10" 
        height="10" 
        rx="2" 
        transform="rotate(45 87 17)" 
        fill={monochrome ? "currentColor" : "#F97316"} 
      />
    </svg>
  );
};

export default BrandLogo;
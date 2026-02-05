
import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      <div 
        className="cursor-dot md:block hidden" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        className="cursor-outline md:block hidden" 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
          backgroundColor: isPointer ? 'rgba(0, 212, 255, 0.1)' : 'transparent'
        }} 
      />
    </>
  );
};

export default CustomCursor;

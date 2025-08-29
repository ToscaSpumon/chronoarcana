'use client';

import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  delay: number;
}

interface AnimatedBackgroundProps {
  className?: string;
  starCount?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ 
  className = '', 
  starCount = 50 
}) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100, // percentage across screen
          y: Math.random() * 100, // percentage down screen
          size: Math.random() * 3 + 1, // 1-4px
          opacity: Math.random() * 0.8 + 0.2, // 0.2-1.0
          pulseSpeed: Math.random() * 3 + 2, // 2-5 seconds
          delay: Math.random() * 2, // 0-2 seconds delay
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, [starCount]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Moon */}
      <div className="absolute top-20 right-20 w-24 h-24">
        <div className="relative w-full h-full">
          {/* Main moon glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-lunar-glow to-astral-gold rounded-full opacity-80 animate-pulse" />
          
          {/* Moon craters */}
          <div className="absolute top-3 left-6 w-3 h-3 bg-deep-void/30 rounded-full" />
          <div className="absolute top-8 left-4 w-2 h-2 bg-deep-void/40 rounded-full" />
          <div className="absolute top-5 right-5 w-2.5 h-2.5 bg-deep-void/25 rounded-full" />
          
          {/* Outer glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-lunar-glow/20 to-astral-gold/20 rounded-full blur-xl animate-pulse" />
        </div>
      </div>

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-lunar-glow rounded-full animate-star-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${star.pulseSpeed}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Shooting stars (occasional) */}
      <div className="absolute top-32 left-10 w-32 h-0.5 bg-gradient-to-r from-transparent via-lunar-glow to-transparent animate-shooting-star" />
      <div className="absolute top-48 right-32 w-24 h-0.5 bg-gradient-to-r from-transparent via-astral-gold to-transparent animate-shooting-star-delayed" />


    </div>
  );
};

export default AnimatedBackground;

'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  delay: number;
}

interface FloatingParticlesProps {
  className?: string;
  particleCount?: number;
  containerRef?: React.RefObject<HTMLDivElement>;
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ 
  className = '', 
  particleCount = 15,
  containerRef 
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate random particles
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100, // percentage across container
          y: Math.random() * 100, // percentage down container
          size: Math.random() * 4 + 2, // 2-6px
          opacity: Math.random() * 0.6 + 0.2, // 0.2-0.8
          speed: Math.random() * 20 + 15, // 15-35 seconds
          delay: Math.random() * 5, // 0-5 seconds delay
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-gradient-to-br from-astral-gold/40 to-amethyst-dream/40 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.speed}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;

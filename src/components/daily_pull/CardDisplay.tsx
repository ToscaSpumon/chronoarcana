'use client';

import React from 'react';
import { TarotCard, DailyPull } from '@/types';
import { cn } from '@/utils/cn';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CardDisplayProps {
  card?: TarotCard;
  pull?: DailyPull;
  showMeanings?: boolean;
  animate?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  enableTiltedCard?: boolean;
}

const CardDisplay: React.FC<CardDisplayProps> = ({
  card,
  pull,
  showMeanings = false,
  animate = false,
  className,
  size = 'md',
  enableTiltedCard = true,
}) => {
  const displayCard = card || pull?.card;
  
  if (!displayCard) {
    return (
      <div className={cn('text-center text-lunar-glow opacity-70', className)}>
        No card to display
      </div>
    );
  }

  const sizeClasses = {
    sm: 'w-32 h-44',
    md: 'w-48 h-64',
    lg: 'w-56 h-80',
  };

  // Convert size classes to pixel values for TiltedCard
  const getTiltedCardDimensions = () => {
    // Use the exact same aspect ratio as the global CSS: 2.5/3.5
    // But make the container much larger to ensure the image fits without side spacing
    const tarotRatio = 2.5 / 3.5;
    
    switch (size) {
      case 'sm':
        return { 
          width: '180px', // Much wider to ensure image fits
          height: '252px', // Much taller to ensure image fits
          containerHeight: '300px' // Extra height for 3D effects
        };
      case 'md':
        return { 
          width: '270px', // Much wider to ensure image fits
          height: '378px', // Much taller to ensure image fits
          containerHeight: '420px' // Extra height for 3D effects
        };
      case 'lg':
        return { 
          width: '315px', // Much wider to ensure image fits
          height: '441px', // Much taller to ensure image fits
          containerHeight: '480px' // Extra height for 3D effects
        };
      default:
        return { 
          width: '270px', // Much wider to ensure image fits
          height: '378px', // Much taller to ensure image fits
          containerHeight: '420px' // Extra height for 3D effects
        };
    }
  };

  const { width, height, containerHeight } = getTiltedCardDimensions();

  // Debug logging
  console.log('CardDisplay rendering:', { 
    cardName: displayCard.card_name, 
    deckId: displayCard.deck_id, 
    imageUrl: displayCard.image_url,
    enableTiltedCard,
    size,
    hasImage: !!displayCard.image_url,
    cardObject: displayCard,
    pullObject: pull
  });

  // Simple tilt effect using framer-motion
  const SimpleTiltedCard = ({ imageSrc, altText }: { imageSrc: string; altText: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(0, { stiffness: 100, damping: 30 });
    const rotateY = useSpring(0, { stiffness: 100, damping: 30 });
    const scale = useSpring(1, { stiffness: 100, damping: 30 });

    // Debug logging for SimpleTiltedCard
    console.log('SimpleTiltedCard component rendered:', { imageSrc, altText });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position relative to center
      // When mouse is at bottom, top should tilt down (negative rotateX for forward tilt)
      const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * -20; // Negative for correct forward tilt
      const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * 20;  // Positive for left/right tilt
      
      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
      scale.set(1.1);
    };

    const handleMouseLeave = () => {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    };

    // Debug logging
    console.log('SimpleTiltedCard rendering:', { imageSrc, altText, enableTiltedCard });

    return (
      <motion.div
        className="perspective-1000"
        style={{
          width: width,
          height: height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            width: width,
            height: height,
            rotateX,
            rotateY,
            scale,
            transformStyle: 'preserve-3d',
            filter: 'drop-shadow(0 8px 16px rgba(139, 69, 19, 0.3))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={imageSrc}
            alt={altText}
            style={{
              width: '100%',
              height: '100%',
                            objectFit: 'fill',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
            onLoad={() => console.log('Image loaded successfully:', imageSrc)}
            onError={(e) => console.error('Image failed to load:', imageSrc, e)}
          />
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Card Image */}
      <div className="flex justify-center" style={{ 
        margin: '0 auto',
        padding: '0'
      }}>
        {displayCard.image_url ? (
          enableTiltedCard ? (
            (() => {
              console.log('Rendering TiltedCard branch:', { enableTiltedCard, hasImage: !!displayCard.image_url });
              return (
                <div className="flex justify-center items-center" style={{ 
                  width: width,
                  height: height,
                }}>
                  <SimpleTiltedCard
                    imageSrc={displayCard.image_url}
                    altText={displayCard.card_name}
                  />
                </div>
              );
            })()
          ) : (
            (() => {
              console.log('Rendering regular image branch:', { enableTiltedCard, hasImage: !!displayCard.image_url });
              return (
                <div
                  className={cn(
                    'tarot-card',
                    animate && 'animate-fade-in'
                  )}
                >
                  <img
                    src={displayCard.image_url}
                    alt={displayCard.card_name}
                    className="rounded-lg"
                  />
                </div>
              );
            })()
          )
        ) : (
          <div
            className={cn(
              'tarot-card',
              animate && 'animate-fade-in'
            )}
          >
            <div className="w-full h-full bg-gradient-to-br from-shadow-veil to-midnight-aura flex flex-col items-center justify-center p-4">
              <h3 className="text-lunar-glow text-center font-cinzel font-semibold text-lg mb-2">
                {displayCard.card_name}
              </h3>
              {displayCard.suit && (
                <p className="text-astral-gold text-sm">{displayCard.suit}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Name and Number */}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-lunar-glow mb-2">
          {displayCard.card_name}
        </h3>
        
        {displayCard.suit && (
          <p className="text-astral-gold text-lg mb-2">
            {displayCard.suit}
          </p>
        )}
        
        {displayCard.keywords && (
          <p className="text-lunar-glow opacity-70 text-sm italic">
            {displayCard.keywords}
          </p>
        )}
        
        {pull && (
          <div className="mt-4 flex justify-center space-x-4 text-sm">
            <span className="text-lunar-glow opacity-70">
              Pull Type: <span className="text-astral-gold capitalize">{pull.pull_type}</span>
            </span>
            {pull.is_reversed && (
              <span className="text-amethyst-dream">Reversed</span>
            )}
          </div>
        )}
      </div>

      {/* Card Meanings */}
      {showMeanings && (
        <div className="space-y-6">
          {/* Upright Meaning */}
          <div className="card bg-opacity-50">
            <h4 className="text-lg font-cinzel font-semibold text-astral-gold mb-3">
              Upright Meaning
            </h4>
            <p className="text-lunar-glow leading-relaxed">
              {displayCard.upright_meaning}
            </p>
          </div>

          {/* Reversed Meaning */}
          {displayCard.reversed_meaning && (
            <div className="card bg-opacity-50">
              <h4 className="text-lg font-cinzel font-semibold text-amethyst-dream mb-3">
                Reversed Meaning
              </h4>
              <p className="text-lunar-glow leading-relaxed">
                {displayCard.reversed_meaning}
              </p>
            </div>
          )}

          {/* Symbol Associations */}
          {displayCard.symbol_associations && (
            <div className="card bg-opacity-50">
              <h4 className="text-lg font-cinzel font-semibold text-emerald-whisper mb-3">
                Symbols & Associations
              </h4>
              <p className="text-lunar-glow leading-relaxed">
                {displayCard.symbol_associations}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDisplay;
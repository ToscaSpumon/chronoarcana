'use client';

import React from 'react';
import { TarotCard, DailyPull } from '@/types';
import { cn } from '@/utils/cn';
import TiltedCard from './TiltedCard';

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
    switch (size) {
      case 'sm':
        return { width: '128px', height: '176px' };
      case 'md':
        return { width: '192px', height: '256px' };
      case 'lg':
        return { width: '224px', height: '320px' };
      default:
        return { width: '192px', height: '256px' };
    }
  };

  const { width, height } = getTiltedCardDimensions();

  return (
    <div className={cn('space-y-6', className)}>
      {/* Card Image with TiltedCard */}
      <div className="flex justify-center">
        {displayCard.image_url ? (
          enableTiltedCard ? (
            <TiltedCard
              imageSrc={displayCard.image_url}
              altText={displayCard.card_name}
              captionText={`${displayCard.card_name}${displayCard.suit ? ` - ${displayCard.suit}` : ''}`}
              containerHeight={height}
              containerWidth={width}
              imageHeight={height}
              imageWidth={width}
              scaleOnHover={1.05}
              rotateAmplitude={12}
              showMobileWarning={false}
              showTooltip={true}
            />
          ) : (
            <div
              className={cn(
                'tarot-card',
                sizeClasses[size],
                animate && 'animate-fade-in'
              )}
            >
              <img
                src={displayCard.image_url}
                alt={displayCard.card_name}
                className="w-full h-full object-contain bg-deep-void rounded-lg"
              />
            </div>
          )
        ) : (
          <div
            className={cn(
              'tarot-card',
              sizeClasses[size],
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
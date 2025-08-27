'use client';

import React from 'react';
import { Crown, TrendingUp, Sparkles } from 'lucide-react';

interface ProfileBadgeProps {
  mostPulledCard?: { cardId: number; count: number } | null;
  totalPulls: number;
}

const ProfileBadge: React.FC<ProfileBadgeProps> = ({ mostPulledCard, totalPulls }) => {
  if (!mostPulledCard || totalPulls === 0) {
    return (
      <div className="card text-center p-3">
        <div className="w-12 h-12 mx-auto mb-3 bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center">
          <Crown className="w-6 h-6 text-astral-gold" />
        </div>
        <h3 className="text-base font-cinzel font-semibold text-lunar-glow mb-1">
          Your Badge
        </h3>
        <p className="text-lunar-glow opacity-70 text-xs">
          Pull more cards to discover your most frequent card
        </p>
      </div>
    );
  }

  const percentage = Math.round((mostPulledCard.count / totalPulls) * 100);

  return (
    <div className="card text-center p-3">
      <div className="w-12 h-12 mx-auto mb-3 bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center animate-glow">
        <Crown className="w-6 h-6 text-astral-gold" />
      </div>
      
      <h3 className="text-base font-cinzel font-semibold text-lunar-glow mb-2">
        Your Signature Card
      </h3>
      
      <p className="text-xs text-lunar-glow opacity-60 mb-2">
        Based on last 60 days
      </p>
      
      {/* Card representation placeholder */}
      <div className="w-16 h-20 mx-auto mb-3 bg-gradient-to-br from-astral-gold to-amethyst-dream rounded-lg flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-lunar-glow" />
      </div>
      
      <div className="space-y-1">
        <p className="text-astral-gold font-semibold text-sm">Card #{mostPulledCard.cardId}</p>
        <div className="flex justify-center items-center space-x-2 text-xs text-lunar-glow opacity-70">
          <TrendingUp className="w-3 h-3" />
          <span>Pulled {mostPulledCard.count} times ({percentage}%)</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBadge;
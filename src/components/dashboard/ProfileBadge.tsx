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
      <div className="card text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center">
          <Crown className="w-8 h-8 text-astral-gold" />
        </div>
        <h3 className="text-lg font-cinzel font-semibold text-lunar-glow mb-2">
          Your Badge
        </h3>
        <p className="text-lunar-glow opacity-70 text-sm">
          Pull more cards to discover your most frequent card
        </p>
      </div>
    );
  }

  const percentage = Math.round((mostPulledCard.count / totalPulls) * 100);

  return (
    <div className="card text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center animate-glow">
        <Crown className="w-8 h-8 text-astral-gold" />
      </div>
      
      <h3 className="text-lg font-cinzel font-semibold text-lunar-glow mb-4">
        Your Signature Card
      </h3>
      
      {/* Card representation placeholder */}
      <div className="w-24 h-32 mx-auto mb-4 bg-gradient-to-br from-astral-gold to-amethyst-dream rounded-lg flex items-center justify-center">
        <Sparkles className="w-8 h-8 text-lunar-glow" />
      </div>
      
      <div className="space-y-2">
        <p className="text-astral-gold font-semibold">Card #{mostPulledCard.cardId}</p>
        <div className="flex justify-center items-center space-x-2 text-sm text-lunar-glow opacity-70">
          <TrendingUp className="w-4 h-4" />
          <span>Pulled {mostPulledCard.count} times ({percentage}%)</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileBadge;
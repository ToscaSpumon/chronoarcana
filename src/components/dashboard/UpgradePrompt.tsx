'use client';

import React from 'react';
import { AlertTriangle, Zap, ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { cn } from '@/utils/cn';

interface UpgradePromptProps {
  daysRemaining: number;
  className?: string;
}

const UpgradePrompt: React.FC<UpgradePromptProps> = ({ daysRemaining, className }) => {
  const isUrgent = daysRemaining <= 7;
  const isVeryUrgent = daysRemaining <= 3;

  const handleUpgrade = () => {
    // Navigate to upgrade page (future implementation)
    console.log('Navigate to upgrade');
  };

  return (
    <div
      className={cn(
        'border-2 rounded-xl p-6 transition-all duration-300',
        isVeryUrgent
          ? 'border-crimson-stain bg-crimson-stain bg-opacity-10 animate-pulse'
          : isUrgent
          ? 'border-amber-glow bg-amber-glow bg-opacity-10'
          : 'border-astral-gold bg-astral-gold bg-opacity-10',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-4">
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center',
              isVeryUrgent
                ? 'bg-crimson-stain bg-opacity-20'
                : isUrgent
                ? 'bg-amber-glow bg-opacity-20'
                : 'bg-astral-gold bg-opacity-20'
            )}
          >
            {isUrgent ? (
              <AlertTriangle
                className={cn(
                  'w-6 h-6',
                  isVeryUrgent ? 'text-crimson-stain' : 'text-amber-glow'
                )}
              />
            ) : (
              <Zap className="w-6 h-6 text-astral-gold" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-2">
              {isVeryUrgent
                ? 'Data Deletion Imminent!'
                : isUrgent
                ? 'Data Deletion Warning'
                : 'Unlock Unlimited History'
              }
            </h3>
            
            <p className="text-lunar-glow opacity-80 mb-3">
              {daysRemaining === 0 ? (
                'Your data retention period has expired. Upgrade now to keep your history!'
              ) : daysRemaining === 1 ? (
                'You have 1 day left before your pull history starts getting deleted.'
              ) : (
                `You have ${daysRemaining} days left before your pull history starts getting deleted.`
              )}
            </p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-astral-gold">Premium Benefits:</h4>
              <ul className="text-sm text-lunar-glow opacity-80 space-y-1">
                <li>• Unlimited data retention</li>
                <li>• Advanced analytics & insights</li>
                <li>• Priority support</li>
                <li>• Early access to new features</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="ml-6">
          <Button
            variant="primary"
            onClick={handleUpgrade}
            className={cn(
              'flex items-center space-x-2',
              isUrgent && 'animate-glow'
            )}
          >
            <span>Upgrade Now</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <p className="text-center text-sm text-lunar-glow opacity-70 mt-2">
            Only $8/month
          </p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-lunar-glow opacity-70 mb-1">
          <span>Data retention</span>
          <span>{daysRemaining} days left</span>
        </div>
        <div className="w-full bg-midnight-aura rounded-full h-2">
          <div
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              isVeryUrgent
                ? 'bg-crimson-stain'
                : isUrgent
                ? 'bg-amber-glow'
                : 'bg-astral-gold'
            )}
            style={{
              width: `${Math.max(5, (daysRemaining / 60) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpgradePrompt;
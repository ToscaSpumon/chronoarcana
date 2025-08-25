'use client';

import React from 'react';
import { Calendar, Eye, FileText, Download } from 'lucide-react';
import { DailyPull } from '@/types';
import Button from '@/components/common/Button';
import { formatDate, formatDateShort } from '@/utils/helpers';

interface RecentPullsListProps {
  pulls: DailyPull[];
  isFreeTier: boolean;
}

const RecentPullsList: React.FC<RecentPullsListProps> = ({ pulls, isFreeTier }) => {
  const handleViewPull = (pullId: string) => {
    // Navigate to pull detail view (future implementation)
    console.log('View pull:', pullId);
  };

  const handleExportData = () => {
    // Export CSV functionality (future implementation)
    console.log('Export data');
  };

  if (pulls.length === 0) {
    return (
      <div className="card text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-amethyst-dream bg-opacity-20 rounded-full flex items-center justify-center">
          <Calendar className="w-8 h-8 text-amethyst-dream" />
        </div>
        <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-2">
          No Pulls Yet
        </h3>
        <p className="text-lunar-glow opacity-70">
          Start your journey by pulling your first card for today.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow">
          Recent Pulls
        </h3>
        <div className="flex items-center space-x-3">
          {isFreeTier && (
            <span className="text-xs text-amber-glow bg-amber-glow bg-opacity-20 px-2 py-1 rounded-full">
              Last 60 days
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportData}
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {pulls.slice(0, 10).map((pull) => (
          <div
            key={pull.id}
            onClick={() => handleViewPull(pull.id)}
            className="flex items-center justify-between p-4 bg-midnight-aura rounded-lg hover:bg-shadow-veil transition-colors cursor-pointer group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-16 bg-shadow-veil border border-midnight-aura rounded-lg flex items-center justify-center">
                {pull.card?.image_url ? (
                  <img
                    src={pull.card.image_url}
                    alt={pull.card.card_name}
                    className="w-full h-full object-contain rounded-lg bg-deep-void"
                  />
                ) : (
                  <div className="text-xs text-lunar-glow opacity-50 text-center">
                    {pull.card?.card_name}
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold text-lunar-glow group-hover:text-astral-gold transition-colors">
                  {pull.card?.card_name || 'Unknown Card'}
                </h4>
                <p className="text-sm text-lunar-glow opacity-70">
                  {formatDate(pull.pull_date)}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    pull.pull_type === 'digital' 
                      ? 'bg-astral-gold bg-opacity-20 text-astral-gold'
                      : 'bg-emerald-whisper bg-opacity-20 text-emerald-whisper'
                  }`}>
                    {pull.pull_type}
                  </span>
                  {pull.notes && (
                    <FileText className="w-3 h-3 text-lunar-glow opacity-50" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-lunar-glow opacity-70">
                {formatDateShort(pull.pull_date)}
              </span>
              <Eye className="w-4 h-4 text-lunar-glow opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>

      {pulls.length > 10 && (
        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm">
            View All Pulls ({pulls.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentPullsList;
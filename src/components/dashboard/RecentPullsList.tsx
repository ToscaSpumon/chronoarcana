'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Eye, FileText, Download } from 'lucide-react';
import { DailyPull } from '@/types';
import Button from '@/components/common/Button';
import { formatDate, formatDateShort } from '@/utils/helpers';
import CardDetailModal from './CardDetailModal';
import { pullAPI } from '@/lib/api';

interface RecentPullsListProps {
  pulls: DailyPull[]; // Last 7 days for display
  pulls60Days: DailyPull[]; // Last 60 days for export
  isFreeTier: boolean;
  onNotesUpdated?: (pullId: string, notes: string) => void;
}

const RecentPullsList: React.FC<RecentPullsListProps> = ({ pulls, pulls60Days, isFreeTier, onNotesUpdated }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [selectedPull, setSelectedPull] = useState<DailyPull | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localPulls, setLocalPulls] = useState<DailyPull[]>(pulls);

  // Update localPulls when props change
  useEffect(() => {
    setLocalPulls(pulls);
  }, [pulls]);

  // This component now shows only the last 7 days of pulls
  // For historical data beyond 7 days, users will use the calendar section

  const handleViewPull = (pull: DailyPull) => {
    setSelectedPull(pull);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPull(null);
  };

  const handleUpdateNotes = async (pullId: string, notes: string) => {
    try {
      // Update notes in the database
      await pullAPI.updatePullNotes(pullId, notes);
      
      // Update the local state to reflect the change
      if (selectedPull) {
        setSelectedPull({
          ...selectedPull,
          notes: notes
        });
      }
      
      // Update the local pulls state to reflect the change
      // This ensures the notes icon shows up in the list
      setLocalPulls(prevPulls => 
        prevPulls.map(pull => 
          pull.id === pullId ? { ...pull, notes: notes } : pull
        )
      );
      
      // Notify parent component about the notes update
      onNotesUpdated?.(pullId, notes);
    } catch (error) {
      console.error('Failed to update notes:', error);
      // You could add a toast notification here
      throw error; // Re-throw to let the modal handle the error
    }
  };

  const handleExportData = async () => {
    // Use pulls60Days for export if available, otherwise fall back to localPulls
    const exportData = pulls60Days && pulls60Days.length > 0 ? pulls60Days : localPulls;
    
    if (exportData.length === 0) {
      alert('No data to export');
      return;
    }

    setIsExporting(true);

    try {
      // Create CSV content - export all 60 days of data for comprehensive analysis
      const headers = [
        'Date',
        'Card Name',
        'Card Number',
        'Suit',
        'Pull Type',
        'Notes',
        'Reversed',
        'Keywords'
      ];

      const csvRows = [
        headers.join(','),
        ...exportData.map(pull => [
          pull.pull_date,
          pull.card?.card_name || 'Unknown',
          pull.card?.card_number || '',
          pull.card?.suit || '',
          pull.pull_type,
          pull.notes || '',
          pull.is_reversed ? 'Yes' : 'No',
          pull.card?.keywords || ''
        ].map(field => `"${field}"`).join(','))
      ];

      const csvContent = csvRows.join('\n');

      // Create and download the file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        const dataType = pulls60Days && pulls60Days.length > 0 ? '60-days' : '7-days';
        link.setAttribute('download', `tarot-pulls-${dataType}-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url); // Clean up
      } else {
        // Fallback for older browsers
        window.open('data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (localPulls.length === 0) {
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
              Last 7 days
            </span>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportData}
            disabled={isExporting}
            className="flex items-center space-x-2"
          >
            <Download className={`w-4 h-4 ${isExporting ? 'animate-spin' : ''}`} />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {localPulls.slice(0, 10).map((pull) => (
          <div
            key={pull.id}
            onClick={() => handleViewPull(pull)}
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

      {localPulls.length > 10 && (
        <div className="mt-6 text-center">
          <Button variant="ghost" size="sm">
            View Calendar for More History
          </Button>
        </div>
      )}

      {/* Card Detail Modal */}
      <CardDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pull={selectedPull}
        onUpdateNotes={handleUpdateNotes}
      />
    </div>
  );
};

export default RecentPullsList;
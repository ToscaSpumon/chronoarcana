'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Eye, FileText, Download } from 'lucide-react';
import { DailyPull } from '@/types';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { formatDate, formatDateShort } from '@/utils/helpers';
import CardDetailModal from './CardDetailModal';
import InteractiveCalendar from './InteractiveCalendar';
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
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [calendarPulls, setCalendarPulls] = useState<DailyPull[]>([]);
  const [calendarDate, setCalendarDate] = useState<Date | null>(null);

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

  const handleCalendarDateClick = (date: Date, pulls: DailyPull[]) => {
    if (pulls.length === 1) {
      // If only one pull, directly open the card detail modal
      setSelectedPull(pulls[0]);
      setIsModalOpen(true);
    } else {
      // If multiple pulls, show the intermediate modal
      setCalendarDate(date);
      setCalendarPulls(pulls);
      setIsCalendarModalOpen(true);
    }
  };

  const handleCloseCalendarModal = () => {
    setIsCalendarModalOpen(false);
    setCalendarPulls([]);
    setCalendarDate(null);
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
      
      // Update the calendar pulls state if the updated pull is in there
      setCalendarPulls(prevCalendarPulls => 
        prevCalendarPulls.map(pull => 
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
        ].join(','))
      ];

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tarot-pulls-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // If no pulls, show empty state
  if (localPulls.length === 0) {
    return (
      <div className="card text-center py-12">
        <Calendar className="w-16 h-16 text-lunar-glow opacity-30 mx-auto mb-4" />
        <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-2">
          No Recent Pulls
        </h3>
        <p className="text-lunar-glow opacity-70">
          Start your journey by pulling your first card from the Daily Pull section.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Recent Pulls List Section */}
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
            <p className="text-sm text-lunar-glow opacity-70 mb-2">
              Showing 10 of {localPulls.length} recent pulls
            </p>
            <p className="text-xs text-lunar-glow opacity-50">
              Use the calendar below to explore your full reading history
            </p>
          </div>
        )}
      </div>

      {/* Interactive Calendar Section */}
      <InteractiveCalendar 
        pulls={pulls60Days} 
        onDateClick={handleCalendarDateClick}
      />

      {/* Card Detail Modal */}
      <CardDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pull={selectedPull}
        onUpdateNotes={handleUpdateNotes}
      />

      {/* Calendar Date Modal - for multiple pulls on same date */}
      {isCalendarModalOpen && calendarDate && (
        <Modal
          isOpen={isCalendarModalOpen}
          onClose={handleCloseCalendarModal}
          title={`Pulls for ${calendarDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="text-center mb-6">
              <p className="text-lunar-glow opacity-70">
                {calendarPulls.length} pull{calendarPulls.length > 1 ? 's' : ''} on this date
              </p>
            </div>
            
            <div className="space-y-3">
              {calendarPulls.map((pull, index) => (
                <div
                  key={pull.id}
                  onClick={() => {
                    setSelectedPull(pull);
                    setIsModalOpen(true);
                    handleCloseCalendarModal();
                  }}
                  className="flex items-center space-x-4 p-4 bg-midnight-aura rounded-lg hover:bg-shadow-veil transition-colors cursor-pointer group border border-transparent hover:border-emerald-whisper hover:border-opacity-30"
                >
                  <div className="w-16 h-24 bg-shadow-veil border border-midnight-aura rounded-lg flex items-center justify-center flex-shrink-0">
                    {pull.card?.image_url ? (
                      <img
                        src={pull.card.image_url}
                        alt={pull.card.card_name}
                        className={`w-full h-full object-contain rounded-lg bg-deep-void ${
                          pull.is_reversed ? 'rotate-180' : ''
                        }`}
                      />
                    ) : (
                      <div className="text-xs text-lunar-glow opacity-50 text-center">
                        {pull.card?.card_name}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lunar-glow group-hover:text-astral-gold transition-colors">
                      {pull.card?.card_name || 'Unknown Card'}
                    </h4>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        pull.pull_type === 'digital' 
                          ? 'bg-astral-gold bg-opacity-20 text-astral-gold'
                          : 'bg-emerald-whisper bg-opacity-20 text-emerald-whisper'
                      }`}>
                        {pull.pull_type}
                      </span>
                      {pull.is_reversed && (
                        <span className="text-xs px-2 py-1 rounded-full bg-crimson-stain bg-opacity-20 text-crimson-stain">
                          Reversed
                        </span>
                      )}
                      {pull.notes && (
                        <span className="text-xs px-2 py-1 rounded-full bg-lunar-glow bg-opacity-20 text-lunar-glow">
                          📝 Notes
                        </span>
                      )}
                    </div>
                    {pull.notes && (
                      <p className="text-sm text-lunar-glow opacity-70 mt-2 line-clamp-2">
                        {pull.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-lunar-glow opacity-50 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center pt-4 border-t border-midnight-aura">
              <p className="text-sm text-lunar-glow opacity-50">
                Click on any pull to view full details and edit notes
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecentPullsList;
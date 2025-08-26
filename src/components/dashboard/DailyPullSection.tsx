'use client';

import React, { useState } from 'react';
import { Shuffle, Hand, Calendar, Edit3 } from 'lucide-react';
import { DailyPull } from '@/types';
import { useTarotPulls } from '@/hooks/useTarotPulls';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import DigitalPullModal from '@/components/daily_pull/DigitalPullModal';
import PhysicalCardSelector from '@/components/daily_pull/PhysicalCardSelector';
import CardDisplay from '@/components/daily_pull/CardDisplay';
import NoteEditor from '@/components/daily_pull/NoteEditor';
import { formatDate, getTodayDate } from '@/utils/helpers';

interface DailyPullSectionProps {
  todaysPull: DailyPull | null;
  userDeckId?: number;
}

const DailyPullSection: React.FC<DailyPullSectionProps> = ({ todaysPull, userDeckId }) => {
  const { userProfile } = useAuth();
  const { updatePullNotes, needsTodayPull } = useTarotPulls();
  
  const [showDigitalPull, setShowDigitalPull] = useState(false);
  const [showPhysicalPull, setShowPhysicalPull] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  const handleNoteSave = async (notes: string) => {
    if (!todaysPull) return;
    
    try {
      await updatePullNotes(todaysPull.id, notes);
      setShowNoteEditor(false);
      setIsEditingNotes(false);
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  // If user hasn't pulled today, show pull options
  if (!todaysPull) {
    const { isNewDay, isFirstTime } = needsTodayPull();
    
    return (
      <div className="card">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center">
            <Calendar className="w-10 h-10 text-astral-gold" />
          </div>
          
          <h2 className="text-3xl font-cinzel font-bold text-lunar-glow mb-4">
            {isNewDay ? 'New Day, New Insight' : 'Today\'s Reading'}
          </h2>
          
          {isNewDay && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-whisper bg-opacity-20 text-emerald-whisper border border-emerald-whisper border-opacity-30">
                <span className="w-2 h-2 bg-emerald-whisper rounded-full mr-2 animate-pulse"></span>
                New Day
              </span>
            </div>
          )}
          
          <p className="text-lunar-glow opacity-70 mb-8 text-lg">
            {formatDate(getTodayDate())}
          </p>
          
          <p className="text-lunar-glow opacity-80 mb-8 max-w-md mx-auto">
            {isNewDay 
              ? 'A new day has dawned. Draw a fresh card to guide your journey ahead.'
              : 'Begin your day with insight. Choose how you\'d like to draw your card for today.'
            }
          </p>
          
          {isNewDay && (
            <p className="text-astral-gold text-sm mb-6 opacity-80">
              💫 Each day brings new energies and insights. Your daily card awaits!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setShowDigitalPull(true)}
              className="flex items-center space-x-2"
              disabled={!userDeckId}
            >
              <Shuffle className="w-5 h-5" />
              <span>Digital Pull</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setShowPhysicalPull(true)}
              className="flex items-center space-x-2"
              disabled={!userDeckId}
            >
              <Hand className="w-5 h-5" />
              <span>Physical Pull</span>
            </Button>
          </div>

          {!userDeckId && (
            <p className="text-amber-glow text-sm mt-4">
              Please select a deck in your settings to begin pulling cards.
            </p>
          )}
        </div>

        {/* Digital Pull Modal */}
        <DigitalPullModal
          isOpen={showDigitalPull}
          onClose={() => setShowDigitalPull(false)}
          deckId={userDeckId}
        />

        {/* Physical Pull Modal */}
        <PhysicalCardSelector
          isOpen={showPhysicalPull}
          onClose={() => setShowPhysicalPull(false)}
          deckId={userDeckId}
        />
      </div>
    );
  }  // If user has pulled today, show the card and options
  return (
    <div className="space-y-6">
      {/* Today's Card Display */}
      <div className="card">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-cinzel font-bold text-lunar-glow mb-2">
            Today's Card
          </h2>
          <p className="text-lunar-glow opacity-70 text-lg">
            {formatDate(todaysPull.pull_date)}
          </p>
        </div>

        <CardDisplay
          pull={todaysPull}
          showMeanings={false}
          className="mb-6"
        />

        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setShowNoteEditor(true)}
            className="flex items-center space-x-2 mx-auto"
          >
            <Edit3 className="w-4 h-4" />
            <span>{todaysPull.notes ? 'Edit Notes' : 'Add Notes'}</span>
          </Button>
        </div>
      </div>

      {/* Notes Section */}
      {todaysPull.notes && (
        <div className="card">
          <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-4">
            Your Notes
          </h3>
          <div className="bg-midnight-aura rounded-lg p-4">
            <p className="text-lunar-glow whitespace-pre-wrap leading-relaxed">
              {todaysPull.notes}
            </p>
          </div>
        </div>
      )}

      {/* Note Editor Modal */}
      <Modal
        isOpen={showNoteEditor}
        onClose={() => setShowNoteEditor(false)}
        title="Edit Your Notes"
        size="lg"
      >
        <NoteEditor
          initialNotes={todaysPull.notes || ''}
          onSave={handleNoteSave}
          onCancel={() => setShowNoteEditor(false)}
        />
      </Modal>
    </div>
  );
};

export default DailyPullSection;
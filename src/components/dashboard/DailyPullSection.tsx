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
import DeckToggle from '@/components/dashboard/DeckToggle';
import FloatingParticles from '@/components/common/FloatingParticles';
import { formatDate, getTodayDate } from '@/utils/helpers';

interface DailyPullSectionProps {
  todaysPull: DailyPull | null;
  userDeckId?: number;
  onPullCreated?: () => void;
  onDeckChange?: (deckId: number) => void;
  recentPulls60Days?: any[];
}

const DailyPullSection: React.FC<DailyPullSectionProps> = ({ 
  todaysPull, 
  userDeckId, 
  onPullCreated,
  onDeckChange,
  recentPulls60Days = []
}) => {
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

  // Callback to notify parent when pull is created
  const handlePullCreated = () => {
    onPullCreated?.();
  };

  // If user hasn't pulled today, show pull options
  if (!todaysPull) {
    const { isNewDay, isFirstTime } = needsTodayPull();
    
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 relative">
          <FloatingParticles particleCount={12} />
          <div className="card relative overflow-hidden" style={{ minHeight: '400px' }}>
            {/* Mystical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-astral-gold/5 via-transparent to-amethyst-dream/5 rounded-lg" />
            
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-astral-gold/20 to-amethyst-dream/20 rounded-full flex items-center justify-center border border-astral-gold/30 shadow-lg">
                <Calendar className="w-10 h-10 text-astral-gold drop-shadow-lg" />
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
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-whisper/20 to-sapphire-haze/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowDigitalPull(true)}
                    className="flex items-center space-x-2 relative z-10 shadow-lg hover:shadow-emerald-whisper/25 transition-all duration-300"
                    disabled={!userDeckId}
                  >
                    <Shuffle className="w-5 h-5" />
                    <span>Digital Pull</span>
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amethyst-dream/20 to-astral-gold/20 rounded-lg blur-lg group-hover:blur-xl transition-all duration-300" />
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setShowPhysicalPull(true)}
                    className="flex items-center space-x-2 relative z-10 shadow-lg hover:shadow-amethyst-dream/25 transition-all duration-300"
                    disabled={!userDeckId}
                  >
                    <Hand className="w-5 h-5" />
                    <span>Physical Pull</span>
                  </Button>
                </div>
              </div>

              {!userDeckId && (
                <p className="text-amber-glow text-sm mt-4">
                  Please select a deck in your settings to begin pulling cards.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 flex flex-col">
          {/* Deck Toggle */}
          <div className="relative z-20 mt-8">
            <DeckToggle
              currentDeckId={userDeckId}
              onDeckChange={onDeckChange}
            />
          </div>
          
          {/* Quick Stats */}
          <div className="card relative z-10 overflow-hidden flex-1">
            {/* Mystical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-crimson-stain/5 via-transparent to-amber-glow/5 rounded-lg" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-4 drop-shadow-lg">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded-lg bg-midnight-aura/50 backdrop-blur-sm border border-crimson-stain/20">
                  <span className="text-lunar-glow opacity-70">Total Pulls (60 days)</span>
                  <span className="text-astral-gold font-semibold text-lg">{recentPulls60Days.length}</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-midnight-aura/50 backdrop-blur-sm border border-amber-glow/20">
                  <span className="text-lunar-glow opacity-70">This Month</span>
                  <span className="text-astral-gold font-semibold text-lg">
                    {recentPulls60Days.filter(pull => {
                      const pullDate = new Date(pull.pull_date);
                      const now = new Date();
                      return pullDate.getMonth() === now.getMonth() && 
                             pullDate.getFullYear() === now.getFullYear();
                    }).length}
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-midnight-aura/50 backdrop-blur-sm border border-emerald-whisper/20">
                  <span className="text-lunar-glow opacity-70">Streak</span>
                  <span className="text-astral-gold font-semibold text-lg">
                    {todaysPull ? '🔥 Active' : '💤 Inactive'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Pull Modal */}
        <DigitalPullModal
          isOpen={showDigitalPull}
          onClose={() => setShowDigitalPull(false)}
          deckId={userDeckId}
          onPullCreated={handlePullCreated}
        />

        {/* Physical Pull Modal */}
        <PhysicalCardSelector
          isOpen={showPhysicalPull}
          onClose={() => setShowPhysicalPull(false)}
          deckId={userDeckId}
          onPullCreated={handlePullCreated}
        />
      </div>
    );
  }  // If user has pulled today, show the card and options
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content - Left Column */}
      <div className="lg:col-span-2 space-y-6 relative">
        {/* Today's Card Display */}
        <div className="card relative overflow-hidden" style={{ minHeight: '400px' }}>
          {/* Mystical glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-whisper/5 via-transparent to-sapphire-haze/5 rounded-lg" />
          
          <div className="relative z-10 text-center mb-6">
            <h2 className="text-3xl font-cinzel font-bold text-lunar-glow mb-2 drop-shadow-lg">
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
            enableTiltedCard={true}
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
          <div className="card relative overflow-hidden">
            {/* Mystical glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-amethyst-dream/5 via-transparent to-astral-gold/5 rounded-lg" />
            
            <div className="relative z-10">
              <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-4 drop-shadow-lg">
                Your Notes
              </h3>
              <div className="bg-midnight-aura/80 backdrop-blur-sm rounded-lg p-4 border border-amethyst-dream/20">
                <p className="text-lunar-glow whitespace-pre-wrap leading-relaxed">
                  {todaysPull.notes}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6 flex flex-col">
        {/* Deck Toggle */}
        <div className="relative z-20 mt-0">
          <DeckToggle
            currentDeckId={userDeckId}
            onDeckChange={onDeckChange}
          />
        </div>
        
        {/* Quick Stats */}
        <div className="card relative z-10 overflow-hidden" style={{ minHeight: '200px' }}>
          {/* Mystical glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-crimson-stain/5 via-transparent to-amber-glow/5 rounded-lg" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-crimson-stain/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-4 drop-shadow-lg">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2 rounded-lg bg-midnight-aura/50 backdrop-blur-sm border border-crimson-stain/20">
                <span className="text-lunar-glow opacity-70">Total Pulls (60 days)</span>
                <span className="text-astral-gold font-semibold text-lg">{recentPulls60Days.length}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-midnight-aura/50 backdrop-blur-sm border border-amber-glow/20">
                <span className="text-lunar-glow opacity-70">This Month</span>
                <span className="text-astral-gold font-semibold text-lg">
                  {recentPulls60Days.filter(pull => {
                    const pullDate = new Date(pull.pull_date);
                    const now = new Date();
                    return pullDate.getMonth() === now.getMonth() && 
                           pullDate.getFullYear() === now.getFullYear();
                  }).length}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-midnight-aura/50 backdrop-blur-sm border border-emerald-whisper/20">
                <span className="text-lunar-glow opacity-70">Streak</span>
                <span className="text-astral-gold font-semibold text-lg">
                  {todaysPull ? '🔥 Active' : '💤 Inactive'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
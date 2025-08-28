'use client';

import React, { useState } from 'react';
import { X, Edit3, Save, RotateCcw } from 'lucide-react';
import { DailyPull } from '@/types';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { formatDate } from '@/utils/helpers';

interface CardDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  pull: DailyPull | null;
  onUpdateNotes?: (pullId: string, notes: string) => Promise<void>;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({
  isOpen,
  onClose,
  pull,
  onUpdateNotes
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Initialize notes when pull changes
  React.useEffect(() => {
    if (pull) {
      setNotes(pull.notes || '');
    }
  }, [pull]);

  const handleSaveNotes = async () => {
    if (!pull || !onUpdateNotes) return;
    
    setIsSaving(true);
    try {
      await onUpdateNotes(pull.id, notes);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save notes:', error);
      // You could add a toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setNotes(pull?.notes || '');
    setIsEditing(false);
  };

  if (!pull) return null;

  const card = pull.card;
  if (!card) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title="Card Details"
    >
      <div className="space-y-6">
        {/* Card Header */}
        <div className="flex items-start space-x-6">
          {/* Card Image */}
          <div className="w-32 h-48 bg-shadow-veil border border-midnight-aura rounded-lg overflow-hidden flex-shrink-0">
            {card.image_url ? (
              <img
                src={card.image_url}
                alt={card.card_name}
                className={`w-full h-full object-contain bg-deep-void ${
                  pull.is_reversed ? 'rotate-180' : ''
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lunar-glow opacity-50">
                <div className="text-center">
                  <div className="text-lg font-semibold">{card.card_name}</div>
                  {pull.is_reversed && <div className="text-sm">(Reversed)</div>}
                </div>
              </div>
            )}
          </div>

          {/* Card Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-cinzel font-semibold text-lunar-glow">
                {card.card_name}
              </h2>
              {pull.is_reversed && (
                <span className="inline-flex items-center space-x-1 text-amber-glow bg-amber-glow bg-opacity-20 px-2 py-1 rounded-full text-sm">
                  <RotateCcw className="w-3 h-3" />
                  <span>Reversed</span>
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-lunar-glow opacity-70">Card Number:</span>
                <div className="text-lunar-glow">{card.card_number || 'N/A'}</div>
              </div>
              <div>
                <span className="text-lunar-glow opacity-70">Suit:</span>
                <div className="text-lunar-glow">{card.suit || 'N/A'}</div>
              </div>
              <div>
                <span className="text-lunar-glow opacity-70">Pull Type:</span>
                <div className="text-lunar-glow capitalize">{pull.pull_type}</div>
              </div>
              <div>
                <span className="text-lunar-glow opacity-70">Pull Date:</span>
                <div className="text-lunar-glow">{formatDate(pull.pull_date)}</div>
              </div>
            </div>

            {card.keywords && (
              <div>
                <span className="text-lunar-glow opacity-70 text-sm">Keywords:</span>
                <div className="text-lunar-glow text-sm mt-1">
                  {card.keywords}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Meanings */}
        <div className="space-y-4">
          <h3 className="text-lg font-cinzel font-semibold text-lunar-glow border-b border-midnight-aura pb-2">
            Meanings
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-astral-gold font-semibold mb-2">Upright</h4>
              <p className="text-lunar-glow text-sm leading-relaxed">
                {card.upright_meaning}
              </p>
            </div>
            
            {card.reversed_meaning && (
              <div>
                <h4 className="text-amber-glow font-semibold mb-2">Reversed</h4>
                <p className="text-lunar-glow text-sm leading-relaxed">
                  {card.reversed_meaning}
                </p>
              </div>
            )}
          </div>

          {card.symbol_associations && (
            <div>
              <h4 className="text-emerald-whisper font-semibold mb-2">Symbol Associations</h4>
              <p className="text-lunar-glow text-sm leading-relaxed">
                {card.symbol_associations}
              </p>
            </div>
          )}
        </div>

        {/* Notes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-cinzel font-semibold text-lunar-glow border-b border-midnight-aura pb-2">
              Your Notes
            </h3>
            {!isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </Button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your personal notes about this card pull..."
                className="w-full h-32 p-3 bg-deep-void border border-midnight-aura rounded-lg text-lunar-glow placeholder-lunar-glow placeholder-opacity-50 resize-none focus:outline-none focus:ring-2 focus:ring-astral-gold focus:border-transparent"
              />
              <div className="flex items-center space-x-3 mb-6">
                <Button
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                  className="flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Notes'}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="min-h-[6rem] p-4 bg-deep-void border border-midnight-aura rounded-lg">
              {notes ? (
                <p className="text-lunar-glow text-sm leading-relaxed whitespace-pre-wrap">
                  {notes}
                </p>
              ) : (
                <p className="text-lunar-glow opacity-50 text-sm italic">
                  No notes yet. Click edit to add your personal thoughts about this card pull.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CardDetailModal;

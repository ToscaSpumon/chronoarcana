'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { tarotAPI, userAPI } from '@/lib/api';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { TarotDeck } from '@/types';

interface DeckSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onDeckSelected: () => void;
}

const DeckSelector: React.FC<DeckSelectorProps> = ({ isOpen, onClose, onDeckSelected }) => {
  const { user, refreshProfile } = useAuth();
  const [decks, setDecks] = useState<TarotDeck[]>([]);
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchDecks();
    }
  }, [isOpen]);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching tarot decks...');
      const fetchedDecks = await tarotAPI.getDecks();
      console.log('📚 Fetched decks:', fetchedDecks);
      setDecks(fetchedDecks);
    } catch (err) {
      console.error('❌ Error fetching decks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch decks');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDeck = async () => {
    if (!selectedDeckId || !user) return;

    try {
      setSaving(true);
      await userAPI.updateChosenDeck(user.id, selectedDeckId);
      await refreshProfile();
      onDeckSelected();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save deck preference');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Choose Your Tarot Deck"
      size="lg"
      closeOnOverlayClick={false}
      showCloseButton={false}
    >
      <div className="space-y-6">
        <p className="text-lunar-glow opacity-80 text-center">
          Select your preferred Tarot deck for daily pulls and card interpretations. 
          You can change this later in your settings.
        </p>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner text="Loading decks..." />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-crimson-stain mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchDecks}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {console.log('🎴 Rendering decks:', decks)}
            {decks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lunar-glow opacity-70">No decks available</p>
                <p className="text-sm text-lunar-glow opacity-50 mt-2">Decks count: {decks.length}</p>
              </div>
            ) : (
              decks.map((deck) => (
                <div
                  key={deck.id}
                  onClick={() => setSelectedDeckId(deck.id)}
                  className={`
                    p-6 border-2 rounded-xl cursor-pointer transition-all duration-300
                    ${selectedDeckId === deck.id 
                      ? 'border-astral-gold bg-astral-gold bg-opacity-10' 
                      : 'border-midnight-aura hover:border-astral-gold hover:bg-shadow-veil'
                    }
                  `}
                >
                  <div className="flex items-center space-x-4">
                    {/* Deck Image */}
                    <div className="flex-shrink-0">
                      {deck.image_url ? (
                        <img
                          src={deck.image_url}
                          alt={`${deck.name} deck cover`}
                          className="w-20 h-28 object-contain rounded-lg border border-midnight-aura bg-deep-void"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      {/* Fallback placeholder */}
                      <div className={`w-20 h-28 bg-gradient-to-br from-midnight-aura to-shadow-veil rounded-lg border border-astral-gold flex items-center justify-center ${deck.image_url ? 'hidden' : ''}`}>
                        <div className="text-center">
                          <div className="text-2xl mb-1">🃏</div>
                          <span className="text-lunar-glow text-xs font-medium">{deck.name}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Deck Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-cinzel font-semibold text-lunar-glow mb-2">
                        {deck.name}
                      </h3>
                      {deck.description && (
                        <p className="text-lunar-glow opacity-70">
                          {deck.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedDeckId === deck.id && (
                      <CheckCircle className="w-8 h-8 text-astral-gold flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-crimson-stain text-sm">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={saving}
          >
            Skip for Now
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveDeck}
            disabled={!selectedDeckId || saving}
            loading={saving}
          >
            Save Preference
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeckSelector;
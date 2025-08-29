'use client';

import React, { useState, useEffect } from 'react';
import { Shuffle, Sparkles } from 'lucide-react';
import { TarotCard, TarotDeck } from '@/types';
import { tarotAPI } from '@/lib/api';
import { useTarotPulls } from '@/hooks/useTarotPulls';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CardDisplay from './CardDisplay';
import NoteEditor from './NoteEditor';
import { selectRandomCard } from '@/utils/helpers';

interface DigitalPullModalProps {
  isOpen: boolean;
  onClose: () => void;
  deckId?: number;
  onPullCreated: () => void;
}

const DigitalPullModal: React.FC<DigitalPullModalProps> = ({ isOpen, onClose, deckId, onPullCreated }) => {
  const { createPull } = useTarotPulls();
  
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [deck, setDeck] = useState<TarotDeck | null>(null);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && deckId) {
      fetchCards();
      fetchDeck();
    }
  }, [isOpen, deckId]);

  const fetchCards = async () => {
    if (!deckId) return;
    
    try {
      setLoading(true);
      const fetchedCards = await tarotAPI.getCards(deckId);
      setCards(fetchedCards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeck = async () => {
    if (!deckId) return;
    
    try {
      const decks = await tarotAPI.getDecks();
      const currentDeck = decks.find(d => d.id === deckId);
      setDeck(currentDeck || null);
    } catch (err) {
      console.error('Failed to fetch deck:', err);
    }
  };

  const handlePullCard = () => {
    if (cards.length === 0) return;
    
    setIsShuffling(true);
    setError(null);
    
    // Simulate shuffling animation
    setTimeout(() => {
      const randomCard = selectRandomCard(cards);
      setSelectedCard(randomCard);
      setIsShuffling(false);
      setShowCard(true);
    }, 2000);
  };

  const handleSavePull = async (notes?: string) => {
    if (!selectedCard) return;
    
    try {
      setLoading(true);
      await createPull(selectedCard.id, 'digital', notes);
      onClose();
      resetModal();
      onPullCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save your pull');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWithNotes = async (notesText: string) => {
    await handleSavePull(notesText);
  };

  const resetModal = () => {
    setSelectedCard(null);
    setShowCard(false);
    setShowNotes(false);
    setIsShuffling(false);
    setError(null);
    setNotes('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300); // Wait for modal close animation
  };

  const handlePullAgain = () => {
    resetModal();
    // Start a new pull immediately
    setTimeout(() => {
      handlePullCard();
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Digital Card Pull"
      size="lg"
      closeOnOverlayClick={!isShuffling}
    >
      <div className="text-center">
        {loading ? (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Preparing your deck..." />
          </div>
        ) : error ? (
          <div className="py-8">
            <p className="text-crimson-stain mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchCards}>
              Try Again
            </Button>
          </div>
        ) : !showCard ? (
          <div className="py-8">
            {isShuffling ? (
              <div className="space-y-6">
                <div className="w-32 h-32 mx-auto bg-astral-gold bg-opacity-20 rounded-full flex items-center justify-center animate-spin">
                  <Sparkles className="w-16 h-16 text-astral-gold" />
                </div>
                <p className="text-xl font-cinzel text-lunar-glow">
                  The cards are revealing your path...
                </p>
                <div className="flex justify-center space-x-1">
                  <div className="w-2 h-2 bg-astral-gold rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-astral-gold rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-astral-gold rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="w-24 h-24 mx-auto bg-shadow-veil border-2 border-midnight-aura rounded-xl flex items-center justify-center overflow-hidden">
                    {deck?.image_url ? (
                      <img
                        src={deck.image_url}
                        alt={`${deck.name} deck cover`}
                        className="w-full h-full object-contain rounded-lg bg-deep-void"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    {/* Fallback placeholder */}
                    <div className={`w-16 h-20 bg-gradient-to-br from-midnight-aura to-shadow-veil rounded-lg border border-astral-gold flex items-center justify-center ${deck?.image_url ? 'hidden' : ''}`}>
                      <span className="text-lunar-glow text-xs">🃏</span>
                    </div>
                  </div>
                  {deck && (
                    <div className="text-center">
                      <p className="text-lunar-glow opacity-80 text-sm font-medium">
                        {deck.name} Deck
                      </p>
                      {deck.description && (
                        <p className="text-lunar-glow opacity-60 text-xs mt-1">
                          {deck.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4">
                    Ready for Your Reading
                  </h3>
                  <p className="text-lunar-glow opacity-80 mb-8">
                    Take a moment to center yourself and focus on your intention for today.
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handlePullCard}
                  className="animate-glow flex items-center space-x-2 mx-auto"
                >
                  <Shuffle className="w-5 h-5" />
                  <span>Pull My Card</span>
                </Button>
              </div>
            )}
          </div>
        ) : selectedCard ? (
          <div className="space-y-6 pb-20">
            {!showNotes ? (
              <>
                <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-4">
                  Your Card for Today
                </h3>
                <CardDisplay 
                  card={selectedCard} 
                  showMeanings={true}
                  animate={true}
                  enableTiltedCard={true}
                />
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    variant="secondary"
                    onClick={handlePullAgain}
                  >
                    Pull Again
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowNotes(true)}
                  >
                    Add Notes
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleSavePull()}
                    loading={loading}
                  >
                    Save This Pull
                  </Button>
                </div>
              </>
            ) : (
              <div className="pb-20">
                <NoteEditor
                  initialNotes={notes}
                  onSave={handleSaveWithNotes}
                  onCancel={() => setShowNotes(false)}
                  maxLength={5000}
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default DigitalPullModal;
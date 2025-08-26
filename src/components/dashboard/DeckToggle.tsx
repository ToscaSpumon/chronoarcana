'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, RefreshCw } from 'lucide-react';
import { tarotAPI } from '@/lib/api';
import { TarotDeck } from '@/types';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface DeckToggleProps {
  currentDeckId?: number;
  onDeckChange: (deckId: number) => void;
}

const DeckToggle: React.FC<DeckToggleProps> = ({ currentDeckId, onDeckChange }) => {
  const [decks, setDecks] = useState<TarotDeck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<TarotDeck | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDecks();
  }, []);

  useEffect(() => {
    if (currentDeckId && decks.length > 0) {
      const deck = decks.find(d => d.id === currentDeckId);
      setCurrentDeck(deck || null);
    }
  }, [currentDeckId, decks]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.deck-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const fetchDecks = async () => {
    try {
      setLoading(true);
      const fetchedDecks = await tarotAPI.getDecks();
      setDecks(fetchedDecks);
    } catch (err) {
      console.error('Failed to fetch decks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeckSelect = (deckId: number) => {
    onDeckChange(deckId);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className="card p-4">
        <LoadingSpinner text="Loading decks..." />
      </div>
    );
  }

  if (!currentDeck) {
    return (
      <div className="card p-4 deck-toggle">
        <div className="text-center">
          <div className="w-24 h-32 bg-gradient-to-br from-midnight-aura to-shadow-veil rounded-lg border border-astral-gold flex items-center justify-center mx-auto mb-3">
            <span className="text-lunar-glow text-xs">🃏</span>
          </div>
          <h3 className="text-lg font-cinzel font-semibold text-lunar-glow mb-2">
            No Deck Selected
          </h3>
          <p className="text-lunar-glow opacity-70 text-sm mb-3">
            Choose a tarot deck to begin your journey
          </p>
          <Button
            variant="primary"
            onClick={() => setIsOpen(true)}
            className="w-full"
          >
            Select Deck
          </Button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-deep-void border border-midnight-aura rounded-lg shadow-lg z-[9999]">
            <div className="p-4">
              <h4 className="text-lunar-glow font-cinzel font-semibold mb-3">
                Choose Your Deck
              </h4>
              <div className="space-y-3">
                {decks.map((deck) => (
                  <div
                    key={deck.id}
                    onClick={() => handleDeckSelect(deck.id)}
                    className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-midnight-aura border border-transparent"
                  >
                    {/* Deck Cover */}
                    <div className="flex-shrink-0">
                      {deck.image_url ? (
                        <img
                          src={deck.image_url}
                          alt={`${deck.name} deck cover`}
                          className="w-12 h-16 object-contain rounded border border-midnight-aura bg-deep-void"
                        />
                      ) : (
                        <div className="w-12 h-16 bg-gradient-to-br from-midnight-aura to-shadow-veil rounded border border-astral-gold flex items-center justify-center">
                          <span className="text-lunar-glow text-xs">🃏</span>
                        </div>
                      )}
                    </div>

                    {/* Deck Info */}
                    <div className="flex-1">
                      <h5 className="font-medium text-lunar-glow">
                        {deck.name}
                      </h5>
                      {deck.description && (
                        <p className="text-lunar-glow opacity-70 text-sm">
                          {deck.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card p-4 deck-toggle flex flex-col overflow-visible">
      <div className="space-y-4">
        {/* Current Deck Cover - Full Width */}
        <div className="relative w-full">
          {currentDeck.image_url ? (
            <img
              src={currentDeck.image_url}
              alt={`${currentDeck.name} deck cover`}
              className="w-full h-32 object-contain rounded-lg border border-midnight-aura bg-deep-void"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          {/* Fallback placeholder */}
          <div className={`w-full h-32 bg-gradient-to-br from-midnight-aura to-shadow-veil rounded-lg border border-astral-gold flex items-center justify-center ${currentDeck.image_url ? 'hidden' : ''}`}>
            <div className="text-center">
              <div className="text-4xl mb-2">🃏</div>
              <span className="text-lunar-glow text-lg font-medium">{currentDeck.name}</span>
            </div>
          </div>
        </div>

        {/* Deck Info */}
        <div className="text-center">
          <h3 className="text-2xl font-cinzel font-semibold text-lunar-glow mb-3">
            Current Deck
          </h3>
          <p className="text-lunar-glow opacity-80 text-lg mb-2">
            {currentDeck.name}
          </p>
          {currentDeck.description && (
            <p className="text-lunar-glow opacity-60 text-base leading-relaxed">
              {currentDeck.description}
            </p>
          )}
        </div>

        {/* Spacer to push buttons to bottom */}
        <div className="pt-4"></div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-midnight-aura">
          {/* Change Deck Button */}
          <div className="relative">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2"
            >
              <span>Change Deck</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute left-0 top-full mt-2 w-80 bg-deep-void border border-midnight-aura rounded-lg shadow-lg z-[9999]">
                <div className="p-4">
                  <h4 className="text-lunar-glow font-cinzel font-semibold mb-3">
                    Choose Your Deck
                  </h4>
                  <div className="space-y-3">
                    {decks.map((deck) => (
                      <div
                        key={deck.id}
                        onClick={() => handleDeckSelect(deck.id)}
                        className={`
                          flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                          ${deck.id === currentDeckId 
                            ? 'bg-astral-gold bg-opacity-20 border border-astral-gold' 
                            : 'hover:bg-midnight-aura border border-transparent'
                          }
                        `}
                      >
                        {/* Deck Cover */}
                        <div className="flex-shrink-0">
                          {deck.image_url ? (
                            <img
                              src={deck.image_url}
                              alt={`${deck.name} deck cover`}
                              className="w-12 h-16 object-contain rounded border border-midnight-aura bg-deep-void"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-gradient-to-br from-midnight-aura to-shadow-veil rounded border border-astral-gold flex items-center justify-center">
                              <span className="text-lunar-glow text-xs">🃏</span>
                            </div>
                          )}
                        </div>

                        {/* Deck Info */}
                        <div className="flex-1">
                          <h5 className={`font-medium ${deck.id === currentDeckId ? 'text-astral-gold' : 'text-lunar-glow'}`}>
                            {deck.name}
                          </h5>
                          {deck.description && (
                            <p className="text-lunar-glow opacity-70 text-sm">
                              {deck.description}
                            </p>
                          )}
                        </div>

                        {/* Current Indicator */}
                        {deck.id === currentDeckId && (
                          <div className="w-3 h-3 bg-astral-gold rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Refresh Decks Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchDecks}
            className="text-lunar-glow opacity-70 hover:opacity-100"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Decks
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeckToggle;

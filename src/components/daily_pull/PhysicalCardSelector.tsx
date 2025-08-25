'use client';

import React, { useState, useEffect } from 'react';
import { Search, Hand } from 'lucide-react';
import { TarotCard } from '@/types';
import { tarotAPI } from '@/lib/api';
import { useTarotPulls } from '@/hooks/useTarotPulls';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CardDisplay from './CardDisplay';

interface PhysicalCardSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  deckId?: number;
}

const PhysicalCardSelector: React.FC<PhysicalCardSelectorProps> = ({ isOpen, onClose, deckId }) => {
  const { createPull } = useTarotPulls();
  
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<TarotCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && deckId) {
      fetchCards();
    }
  }, [isOpen, deckId]);

  useEffect(() => {
    // Filter cards based on search term
    if (!searchTerm) {
      setFilteredCards(cards);
    } else {
      const filtered = cards.filter(card =>
        card.card_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.suit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.keywords?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(filtered);
    }
  }, [cards, searchTerm]);

  const fetchCards = async () => {
    if (!deckId) return;
    
    try {
      setLoading(true);
      const fetchedCards = await tarotAPI.getCards(deckId);
      setCards(fetchedCards);
      setFilteredCards(fetchedCards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cards');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePull = async (notes?: string) => {
    if (!selectedCard) return;
    
    try {
      setSaving(true);
      await createPull(selectedCard.id, 'physical', notes);
      onClose();
      resetModal();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save your pull');
    } finally {
      setSaving(false);
    }
  };

  const resetModal = () => {
    setSelectedCard(null);
    setSearchTerm('');
    setError(null);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Select Your Physical Pull"
      size="xl"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-emerald-whisper bg-opacity-20 rounded-full flex items-center justify-center">
            <Hand className="w-8 h-8 text-emerald-whisper" />
          </div>
          <p className="text-lunar-glow opacity-80">
            Select the card you drew from your physical deck
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" text="Loading cards..." />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-crimson-stain mb-4">{error}</p>
            <Button variant="secondary" onClick={fetchCards}>
              Retry
            </Button>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lunar-glow opacity-50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input w-full pl-10"
              />
            </div>

            {/* Card Grid */}
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className={`
                      cursor-pointer p-3 rounded-lg border-2 transition-all duration-300
                      ${selectedCard?.id === card.id 
                        ? 'border-astral-gold bg-astral-gold bg-opacity-10' 
                        : 'border-midnight-aura hover:border-astral-gold hover:bg-shadow-veil'
                      }
                    `}
                  >
                    <div className="text-center">
                      <div className="tarot-card mb-2 h-20 bg-shadow-veil border border-midnight-aura">
                        {/* Card image placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-xs text-lunar-glow opacity-50">
                          {card.card_name}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-lunar-glow">
                        {card.card_name}
                      </p>
                      {card.suit && (
                        <p className="text-xs text-lunar-glow opacity-70">
                          {card.suit}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredCards.length === 0 && !loading && (
                <div className="text-center py-8">
                  <p className="text-lunar-glow opacity-70">
                    No cards found matching "{searchTerm}"
                  </p>
                </div>
              )}
            </div>

            {/* Selected Card Preview */}
            {selectedCard && (
              <div className="border-t border-midnight-aura pt-6">
                <h4 className="text-lg font-cinzel font-semibold text-lunar-glow mb-4 text-center">
                  Selected Card
                </h4>
                <CardDisplay 
                  card={selectedCard} 
                  showMeanings={false}
                  className="mb-4"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <Button
                variant="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSavePull()}
                disabled={!selectedCard}
                loading={saving}
              >
                Save Pull
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PhysicalCardSelector;
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Hand, ChevronDown } from 'lucide-react';
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
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isCardDropdownOpen, setIsCardDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && deckId) {
      fetchCards();
    }
  }, [isOpen, deckId]);

  useEffect(() => {
    if (cards.length > 0) {
      // Extract unique categories from cards
      const categories = Array.from(new Set(cards.map(card => card.suit || 'Major Arcana')));
      setAvailableCategories(categories.sort());
    }
  }, [cards]);

  useEffect(() => {
    // Filter cards based on search term and selected category
    let filtered = cards;
    
    if (selectedCategory) {
      filtered = filtered.filter(card => 
        (card.suit || 'Major Arcana') === selectedCategory
      );
    }
    
    if (searchTerm && searchTerm.trim() !== '') {
      console.log(`Searching for: "${searchTerm}"`);
      console.log(`Initial filtered cards before search:`, filtered.length);
      
      const searchLower = searchTerm.toLowerCase();
      console.log(`Search term (lowercase): "${searchLower}"`);
      
      const originalFiltered = [...filtered]; // Create a copy for debugging
      console.log(`Original filtered array:`, originalFiltered.map(c => c.card_name));
      
      const beforeFilter = [...filtered];
      console.log(`Before filter - cards:`, beforeFilter.map(c => c.card_name));
      
      const filteredResults = filtered.filter(card => {
        const cardNameLower = card.card_name.toLowerCase();
        const suitLower = card.suit?.toLowerCase() || '';
        const keywordsLower = card.keywords?.toLowerCase() || '';
        
        const matchesName = cardNameLower.includes(searchLower);
        const matchesSuit = suitLower.includes(searchLower);
        // Remove keywords search - only search card name and suit
        // const matchesKeywords = keywordsLower.includes(searchLower);
        
        const shouldInclude = matchesName || matchesSuit;
        
        // Special debugging for the problematic cards
        if (card.card_name === 'The Fool' || card.card_name === 'Five of Wands' || 
            card.card_name === 'Nine of Wands' || card.card_name === 'Nine of Cups') {
          console.log(`🔍 DEBUGGING PROBLEMATIC CARD "${card.card_name}":`);
          console.log(`  - cardName: "${card.card_name}"`);
          console.log(`  - cardNameLower: "${cardNameLower}"`);
          console.log(`  - suit: "${card.suit}"`);
          console.log(`  - suitLower: "${suitLower}"`);
          console.log(`  - keywords: "${card.keywords}"`);
          console.log(`  - keywordsLower: "${keywordsLower}"`);
          console.log(`  - searchLower: "${searchLower}"`);
          console.log(`  - searchLowerLength: ${searchLower.length}`);
          console.log(`  - searchLowerCharCodes: [${Array.from(searchLower).map(c => c.charCodeAt(0)).join(', ')}]`);
          console.log(`  - matchesName: ${matchesName}`);
          console.log(`  - matchesSuit: ${matchesSuit}`);
          // console.log(`  - matchesKeywords: ${matchesKeywords}`); // Removed keywords search
          console.log(`  - shouldInclude: ${shouldInclude}`);
          console.log(`  - nameContains: ${cardNameLower.includes(searchLower)}`);
          console.log(`  - suitContains: ${suitLower.includes(searchLower)}`);
          // console.log(`  - keywordsContains: ${keywordsLower.includes(searchLower)}`); // Removed keywords search
          
          // Additional debugging for keywords
          console.log(`  - keywords length: ${card.keywords?.length || 0}`);
          console.log(`  - keywordsLower length: ${keywordsLower.length}`);
          console.log(`  - keywords char codes: [${Array.from(keywordsLower).map(c => c.charCodeAt(0)).join(', ')}]`);
          console.log(`  - keywords contains "ten": ${keywordsLower.includes('ten')}`);
          console.log(`  - keywords contains searchLower: ${keywordsLower.includes(searchLower)}`);
          console.log(`  - keywords indexOf "ten": ${keywordsLower.indexOf('ten')}`);
          console.log(`  - keywords indexOf searchLower: ${keywordsLower.indexOf(searchLower)}`);
        }
        
        if (shouldInclude) {
          console.log(`✅ INCLUDING "${card.card_name}"`);
        } else {
          console.log(`❌ EXCLUDING "${card.card_name}"`);
        }
        
        return shouldInclude;
      });
      
      console.log(`Filter function returned:`, filteredResults.map(c => c.card_name));
      console.log(`Filter function length:`, filteredResults.length);
      
      // Assign the filtered results to our variable
      filtered = filteredResults;
      
      console.log(`After assignment - filtered:`, filtered.map(c => c.card_name));
      console.log(`After assignment - length:`, filtered.length);
    } else if (!selectedCategory) {
      // If no search term and no category selected, show no cards
      filtered = [];
    }
    
    console.log(`Final state before setFilteredCards:`, filtered.map(c => c.card_name));
    setFilteredCards(filtered);
  }, [cards, searchTerm, selectedCategory]);

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
    setSelectedCategory('');
    setSearchTerm('');
    setError(null);
    setIsCategoryDropdownOpen(false);
    setIsCardDropdownOpen(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSelectedCard(null); // Reset selected card when category changes
    setIsCategoryDropdownOpen(false);
    setIsCardDropdownOpen(false);
  };

  const handleCardSelect = (card: TarotCard) => {
    setSelectedCard(card);
    setIsCardDropdownOpen(false);
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
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lunar-glow opacity-50 w-5 h-5 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[var(--shadow-veil)] border border-[var(--midnight-aura)] text-[var(--lunar-glow)] rounded-lg transition-all duration-300 focus:border-[var(--astral-gold)] focus:outline-none focus:ring-0 focus:ring-[var(--astral-gold)] focus:ring-opacity-10 py-3 pl-12 pr-4 placeholder-[#C0C0C8]"
                style={{ paddingLeft: '3rem' }}
              />
              <div className="mt-2 text-xs text-lunar-glow opacity-70">
                Debug: Search: "{searchTerm}" | Cards: {cards.length} | Filtered: {filteredCards.length} | Category: {selectedCategory || 'None'}
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-lunar-glow mb-2">
                Card Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                  className="w-full input flex items-center justify-between cursor-pointer"
                  disabled={availableCategories.length === 0}
                >
                  <span className={selectedCategory ? 'text-lunar-glow' : 'text-lunar-glow opacity-50'}>
                    {selectedCategory || 'Select a category...'}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-lunar-glow transition-transform duration-200 ${
                      isCategoryDropdownOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              </div>

              {/* Category Dropdown List */}
              {isCategoryDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-shadow-veil border border-midnight-aura rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {availableCategories.map((category) => (
                    <div
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className="px-4 py-3 hover:bg-midnight-aura cursor-pointer border-b border-midnight-aura last:border-b-0 transition-colors duration-150"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lunar-glow font-medium">{category}</span>
                        {selectedCategory === category && (
                          <div className="w-2 h-2 bg-astral-gold rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Card Selection - Auto-display when searching, dropdown when category selected */}
            {(selectedCategory || (searchTerm && filteredCards.length > 0)) && (
              <div className="relative">
                <label className="block text-sm font-medium text-lunar-glow mb-2">
                  {searchTerm && !selectedCategory ? 'Search Results' : `Select Card (${filteredCards.length} available)`}
                </label>
                
                {searchTerm && !selectedCategory ? (
                  /* Auto-display search results */
                  <div className="space-y-2">
                    {filteredCards.map((card) => (
                      <div
                        key={card.id}
                        onClick={() => {
                          console.log('Card clicked:', card.card_name);
                          handleCardSelect(card);
                        }}
                        className="p-3 rounded-lg border border-midnight-aura hover:border-astral-gold hover:bg-midnight-aura cursor-pointer transition-all duration-150"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lunar-glow font-medium">{card.card_name}</p>
                            {card.suit && (
                              <p className="text-sm text-lunar-glow opacity-70">{card.suit}</p>
                            )}
                          </div>
                          {selectedCard?.id === card.id && (
                            <div className="w-2 h-2 bg-astral-gold rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Traditional dropdown for category selection */
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => {
                        console.log('Card dropdown clicked, current state:', isCardDropdownOpen);
                        console.log('Filtered cards available:', filteredCards.length);
                        setIsCardDropdownOpen(!isCardDropdownOpen);
                      }}
                      className="w-full input flex items-center justify-between cursor-pointer"
                      disabled={filteredCards.length === 0}
                    >
                      <span className={selectedCard ? 'text-lunar-glow' : 'text-lunar-glow opacity-50'}>
                        {selectedCard ? selectedCard.card_name : `Select a card... (${filteredCards.length} found)`}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-lunar-glow transition-transform duration-200 ${
                          isCardDropdownOpen ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>

                    {/* Card Dropdown List */}
                    {isCardDropdownOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-shadow-veil border border-midnight-aura rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        <div className="px-4 py-2 text-xs text-lunar-glow opacity-50 border-b border-midnight-aura">
                          Showing {filteredCards.length} filtered cards
                        </div>
                        {console.log('Rendering dropdown with filtered cards:', filteredCards.map(c => c.card_name))}
                        {filteredCards.length > 0 ? (
                          filteredCards.map((card) => (
                            <div
                              key={card.id}
                              onClick={() => {
                                console.log('Card clicked:', card.card_name);
                                handleCardSelect(card);
                              }}
                              className="px-4 py-3 hover:bg-midnight-aura cursor-pointer border-b border-midnight-aura last:border-b-0 transition-colors duration-150"
                            >
                              <div className="flex items-center justify-between">
                                                                 <div>
                                   <p className="text-lunar-glow font-medium">{card.card_name}</p>
                                   {card.suit && (
                                     <p className="text-sm text-lunar-glow opacity-70">{card.suit}</p>
                                   )}
                                 </div>
                                {selectedCard?.id === card.id && (
                                  <div className="w-2 h-2 bg-astral-gold rounded-full"></div>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-lunar-glow opacity-70 text-center">
                            No cards found matching "{searchTerm}"
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

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
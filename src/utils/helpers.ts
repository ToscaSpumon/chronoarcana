import { TarotCard, DailyPull } from '@/types';

// Date formatting utilities
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

// Get today's date in YYYY-MM-DD format
export const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// Random card selection for digital pulls
export const selectRandomCard = (cards: TarotCard[]): TarotCard => {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
};

// Calculate days until data retention limit (for free users)
export const getDaysUntilRetention = (signupDate: string, retentionDays: number = 60): number => {
  const signup = new Date(signupDate);
  const retentionDate = new Date(signup.getTime() + (retentionDays * 24 * 60 * 60 * 1000));
  const today = new Date();
  const diffTime = retentionDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

// Check if user has pulled today
export const hasPulledToday = (pulls: DailyPull[]): boolean => {
  const today = getTodayDate();
  return pulls.some(pull => pull.pull_date === today);
};

// Get the most frequently pulled card
export const getMostPulledCard = (pulls: DailyPull[]): { cardId: number; count: number } | null => {
  if (pulls.length === 0) return null;
  
  const cardCounts = pulls.reduce((acc, pull) => {
    acc[pull.card_id] = (acc[pull.card_id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const mostPulled = Object.entries(cardCounts).reduce((max, [cardId, count]) => {
    return count > max.count ? { cardId: parseInt(cardId), count } : max;
  }, { cardId: 0, count: 0 });
  
  return mostPulled.count > 0 ? mostPulled : null;
};

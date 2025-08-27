// Application constants
export const APP_CONFIG = {
  FREE_TRIAL_DAYS: 60,
  PREMIUM_PRICE: 8, // $8/month
  RECENT_PULLS_DISPLAY_LIMIT: 7, // Last 7 days for display
  RECENT_PULLS_ANALYTICS_LIMIT: 60, // Last 60 days for analytics and export
} as const;

// Tarot deck names
export const DECK_NAMES = {
  RIDER_WAITE: 'Rider Waite',
  THOTH: 'Thoth',
} as const;

// Color palette for data visualization
export const CHART_COLORS = {
  PRIMARY: ['#B89C6F', '#7F58AF', '#4E8D7F', '#3F5F7F'],
  SECONDARY: ['#F2C94C', '#6FCF97', '#EB5757', '#F0F0F5'],
  GRADIENTS: [
    'rgba(184, 156, 111, 0.8)',
    'rgba(127, 88, 175, 0.8)',
    'rgba(78, 141, 127, 0.8)',
    'rgba(63, 95, 127, 0.8)',
  ],
} as const;

// Major Arcana cards with basic meanings (will be expanded with full deck data)
export const MAJOR_ARCANA_BASIC = [
  { number: 0, name: 'The Fool', keywords: 'New beginnings, innocence, spontaneity' },
  { number: 1, name: 'The Magician', keywords: 'Manifestation, resourcefulness, power' },
  { number: 2, name: 'The High Priestess', keywords: 'Intuition, sacred knowledge, divine feminine' },
  { number: 3, name: 'The Empress', keywords: 'Femininity, beauty, nature, abundance' },
  { number: 4, name: 'The Emperor', keywords: 'Authority, establishment, structure, father figure' },
  { number: 5, name: 'The Hierophant', keywords: 'Religion, group identification, conformity' },
  { number: 6, name: 'The Lovers', keywords: 'Love, harmony, relationships, values alignment' },
  { number: 7, name: 'The Chariot', keywords: 'Control, will power, success, determination' },
  { number: 8, name: 'Strength', keywords: 'Inner strength, bravery, compassion, focus' },
  { number: 9, name: 'The Hermit', keywords: 'Soul searching, introspection, inner guidance' },
  { number: 10, name: 'Wheel of Fortune', keywords: 'Good luck, karma, life cycles, destiny' },
  { number: 11, name: 'Justice', keywords: 'Justice, fairness, truth, cause and effect' },
  { number: 12, name: 'The Hanged Man', keywords: 'Suspension, restriction, letting go' },
  { number: 13, name: 'Death', keywords: 'Endings, beginnings, change, transformation' },
  { number: 14, name: 'Temperance', keywords: 'Balance, moderation, patience, purpose' },
  { number: 15, name: 'The Devil', keywords: 'Bondage, addiction, sexuality, materialism' },
  { number: 16, name: 'The Tower', keywords: 'Sudden change, upheaval, chaos, revelation' },
  { number: 17, name: 'The Star', keywords: 'Hope, faith, purpose, renewal, spirituality' },
  { number: 18, name: 'The Moon', keywords: 'Illusion, fear, anxiety, subconscious, intuition' },
  { number: 19, name: 'The Sun', keywords: 'Optimism, fun, warmth, success, vitality' },
  { number: 20, name: 'Judgement', keywords: 'Judgement, rebirth, inner calling, absolution' },
  { number: 21, name: 'The World', keywords: 'Completion, accomplishment, travel, fulfillment' },
] as const;

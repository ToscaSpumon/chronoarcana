// Sample Tarot card data for seeding the database
const TAROT_DECKS = [
  {
    id: 1,
    name: 'Rider Waite',
    description: 'The classic and most widely recognized Tarot deck, perfect for beginners and experienced readers alike.',
    image_url: '/assets/tarot_decks/rider_waite/deck_cover.jpg',
  },
  {
    id: 2,
    name: 'Thoth',
    description: 'Aleister Crowley\'s mystical and symbolically rich deck, offering deep esoteric insights.',
    image_url: '/assets/tarot_decks/thoth/deck_cover.jpg',
  },
];

const RIDER_WAITE_CARDS = [
  // Major Arcana
  {
    deck_id: 1,
    card_name: 'The Fool',
    card_number: 0,
    suit: 'Major Arcana',
    upright_meaning: 'New beginnings, innocence, spontaneity, free spirit, and taking a leap of faith. The Fool represents unlimited potential and the courage to start a new journey without fear.',
    reversed_meaning: 'Recklessness, taken advantage of, inconsideration, and poor judgment. May indicate acting without thinking or being too naive in a situation.',
    symbol_associations: 'White rose (purity), small bag (memories), mountains (challenges ahead), cliff edge (leap of faith), dog (loyalty and protection).',
    keywords: 'New beginnings, innocence, spontaneity, free spirit',
    image_url: '/assets/tarot_decks/rider_waite/00_the_fool.jpg',
  },
  {
    deck_id: 1,
    card_name: 'The Magician',
    card_number: 1,
    suit: 'Major Arcana',
    upright_meaning: 'Manifestation, resourcefulness, power, inspired action, and having the tools you need to succeed. The Magician represents the ability to turn ideas into reality.',
    reversed_meaning: 'Manipulation, poor planning, untapped talents, and lack of focus. May indicate misuse of power or scattered energy.',
    symbol_associations: 'Infinity symbol (unlimited potential), wand (fire element), cup (water), sword (air), pentacle (earth), white robe (purity), red cloak (worldly experience).',
    keywords: 'Manifestation, resourcefulness, power, inspired action',
    image_url: '/assets/tarot_decks/rider_waite/01_the_magician.jpg',
  },
  {
    deck_id: 1,
    card_name: 'The High Priestess',
    card_number: 2,
    suit: 'Major Arcana',
    upright_meaning: 'Intuition, sacred knowledge, divine feminine, and subconscious mind. The High Priestess represents wisdom that comes from within and trusting your inner voice.',
    reversed_meaning: 'Secrets, disconnected from intuition, withdrawal, and silence. May indicate difficulty accessing inner wisdom or keeping too many secrets.',
    symbol_associations: 'Pillars (balance between opposites), veil (hidden knowledge), crescent moon (intuition), blue robe (knowledge), pomegranates (feminine fertility).',
    keywords: 'Intuition, sacred knowledge, divine feminine, subconscious',
    image_url: '/assets/tarot_decks/rider_waite/02_the_high_priestess.jpg',
  },
  {
    deck_id: 1,
    card_name: 'The Empress',
    card_number: 3,
    suit: 'Major Arcana',
    upright_meaning: 'Femininity, beauty, nature, abundance, and motherhood. The Empress represents fertility, creativity, and nurturing energy in all its forms.',
    reversed_meaning: 'Creative block, dependence on others, smothering, and lack of growth. May indicate stifled creativity or overprotectiveness.',
    symbol_associations: 'Venus symbol (love and beauty), wheat (abundance), flowing water (fertility), cushions (comfort), crown of stars (divine connection).',
    keywords: 'Femininity, beauty, nature, abundance, motherhood',
    image_url: '/assets/tarot_decks/rider_waite/03_the_empress.jpg',
  },
  {
    deck_id: 1,
    card_name: 'The Emperor',
    card_number: 4,
    suit: 'Major Arcana',
    upright_meaning: 'Authority, establishment, structure, father figure, and leadership. The Emperor represents stability, control, and the masculine principle.',
    reversed_meaning: 'Tyranny, rigidity, coldness, and abuse of power. May indicate authoritarian behavior or lack of discipline.',
    symbol_associations: 'Throne (authority), ram heads (Mars/Aries), orb and scepter (worldly power), armor (protection), mountains (solid foundation).',
    keywords: 'Authority, establishment, structure, father figure',
    image_url: '/assets/tarot_decks/rider_waite/04_the_emperor.jpg',
  },
  // Adding a few more major arcana cards...
  {
    deck_id: 1,
    card_name: 'The Hierophant',
    card_number: 5,
    suit: 'Major Arcana',
    upright_meaning: 'Religion, group identification, conformity, tradition, and beliefs. The Hierophant represents spiritual wisdom and religious beliefs.',
    reversed_meaning: 'Personal beliefs, freedom, challenging the status quo, and new approaches. May indicate breaking away from tradition.',
    symbol_associations: 'Papal cross (spiritual authority), two acolytes (tradition), keys (knowledge), pillars (established order).',
    keywords: 'Religion, group identification, conformity, tradition',
    image_url: '/assets/tarot_decks/rider_waite/05_the_hierophant.jpg',
  },
  {
    deck_id: 1,
    card_name: 'The Lovers',
    card_number: 6,
    suit: 'Major Arcana',
    upright_meaning: 'Love, harmony, relationships, values alignment, and choices. The Lovers represents union and the power of love.',
    reversed_meaning: 'Disharmony, imbalance, misalignment of values, and relationship struggles. May indicate difficult choices in love.',
    symbol_associations: 'Angel (divine guidance), man and woman (duality), tree of knowledge (choices), mountain (challenges).',
    keywords: 'Love, harmony, relationships, values alignment',
    image_url: '/assets/tarot_decks/rider_waite/06_the_lovers.jpg',
  },
];

const THOTH_CARDS = [
  // Major Arcana - Thoth deck variations
  {
    deck_id: 2,
    card_name: 'The Fool',
    card_number: 0,
    suit: 'Major Arcana',
    upright_meaning: 'The spirit in search of experience, divine folly, and the beginning of all journeys. Represents pure potential and the courage to embrace the unknown.',
    reversed_meaning: 'Mania, extravagance, intoxication, and reckless abandon. May indicate losing touch with reality or dangerous impulsiveness.',
    symbol_associations: 'Green man (natural wisdom), horns (Pan/fertility), grapes (intoxication), butterfly (transformation), crocodile (primal instincts).',
    keywords: 'Spirit, experience, divine folly, pure potential',
    image_url: '/assets/tarot_decks/thoth/00_the_fool.jpg',
  },
  {
    deck_id: 2,
    card_name: 'The Magus',
    card_number: 1,
    suit: 'Major Arcana',
    upright_meaning: 'Communication, skill, flexibility, and conscious awareness. The Magus represents the messenger of the gods and the power of will.',
    reversed_meaning: 'Confusion, poor communication, lack of skill, and scattered energy. May indicate difficulty expressing ideas clearly.',
    symbol_associations: 'Caduceus (communication), ibis (Thoth), monkey (mimicry), cynocephalus (wisdom), winged disk (divine messenger).',
    keywords: 'Communication, skill, flexibility, conscious awareness',
    image_url: '/assets/tarot_decks/thoth/01_the_magus.jpg',
  },
];

module.exports = {
  TAROT_DECKS,
  RIDER_WAITE_CARDS,
  THOTH_CARDS,
};

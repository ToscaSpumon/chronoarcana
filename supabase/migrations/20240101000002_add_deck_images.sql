-- Add deck images to tarot_decks table
-- Migration: 20240101000002_add_deck_images.sql

-- Add image_url column to tarot_decks table
ALTER TABLE tarot_decks 
ADD COLUMN image_url VARCHAR(255);

-- Add comment for documentation
COMMENT ON COLUMN tarot_decks.image_url IS 'URL or path to the deck cover image';

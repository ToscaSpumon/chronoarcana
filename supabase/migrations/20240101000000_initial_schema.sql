-- Initial schema for ChronoArcana
-- Creates the core tables for users, tarot decks, cards, and daily pulls

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    subscription_status VARCHAR(20) DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
    premium_start_date DATE,
    chosen_deck_id INTEGER,
    most_pulled_card_id INTEGER,
    last_login TIMESTAMPTZ,
    stripe_customer_id VARCHAR(255)
);

-- Tarot decks table
CREATE TABLE tarot_decks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tarot cards table
CREATE TABLE tarot_cards (
    id SERIAL PRIMARY KEY,
    deck_id INTEGER NOT NULL REFERENCES tarot_decks(id) ON DELETE CASCADE,
    card_name VARCHAR(100) NOT NULL,
    card_number INTEGER,
    suit VARCHAR(50),
    upright_meaning TEXT NOT NULL,
    reversed_meaning TEXT,
    symbol_associations TEXT,
    keywords VARCHAR(500),
    image_url VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(deck_id, card_name)
);

-- Daily pulls table
CREATE TABLE daily_pulls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    card_id INTEGER NOT NULL REFERENCES tarot_cards(id),
    pull_date DATE NOT NULL,
    pull_type VARCHAR(20) NOT NULL CHECK (pull_type IN ('digital', 'physical')),
    notes TEXT,
    is_reversed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, pull_date)
);

-- Add foreign key constraints to users table (after other tables are created)
ALTER TABLE users 
ADD CONSTRAINT fk_users_chosen_deck 
FOREIGN KEY (chosen_deck_id) REFERENCES tarot_decks(id);

ALTER TABLE users 
ADD CONSTRAINT fk_users_most_pulled_card 
FOREIGN KEY (most_pulled_card_id) REFERENCES tarot_cards(id);

-- Create indexes for better performance
CREATE INDEX idx_users_subscription_status ON users(subscription_status);
CREATE INDEX idx_users_chosen_deck ON users(chosen_deck_id);
CREATE INDEX idx_tarot_cards_deck_id ON tarot_cards(deck_id);
CREATE INDEX idx_daily_pulls_user_id ON daily_pulls(user_id);
CREATE INDEX idx_daily_pulls_pull_date ON daily_pulls(pull_date);
CREATE INDEX idx_daily_pulls_card_id ON daily_pulls(card_id);
CREATE INDEX idx_daily_pulls_user_date ON daily_pulls(user_id, pull_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_daily_pulls_updated_at 
    BEFORE UPDATE ON daily_pulls 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies for ChronoArcana

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_pulls ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Daily pulls policies
-- Users can only access their own pulls
CREATE POLICY "Users can view own pulls" ON daily_pulls
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own pulls" ON daily_pulls
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pulls" ON daily_pulls
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own pulls" ON daily_pulls
    FOR DELETE USING (auth.uid() = user_id);

-- Tarot decks and cards are publicly readable (no RLS needed)
-- These contain static reference data that all users need to access

-- Create a function to automatically delete old pulls for free users
CREATE OR REPLACE FUNCTION delete_expired_free_user_pulls()
RETURNS void AS $$
BEGIN
    DELETE FROM daily_pulls 
    WHERE user_id IN (
        SELECT id FROM users 
        WHERE subscription_status = 'free'
    )
    AND pull_date < (CURRENT_DATE - INTERVAL '60 days');
END;
$$ LANGUAGE plpgsql;

-- Create a function to update user's most pulled card
CREATE OR REPLACE FUNCTION update_most_pulled_card(user_uuid UUID)
RETURNS void AS $$
DECLARE
    most_pulled_card_id INTEGER;
BEGIN
    SELECT card_id INTO most_pulled_card_id
    FROM daily_pulls 
    WHERE user_id = user_uuid
    GROUP BY card_id
    ORDER BY COUNT(*) DESC
    LIMIT 1;
    
    IF most_pulled_card_id IS NOT NULL THEN
        UPDATE users 
        SET most_pulled_card_id = most_pulled_card_id
        WHERE id = user_uuid;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to update most pulled card after insert/update/delete on daily_pulls
CREATE OR REPLACE FUNCTION trigger_update_most_pulled_card()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        PERFORM update_most_pulled_card(OLD.user_id);
        RETURN OLD;
    ELSE
        PERFORM update_most_pulled_card(NEW.user_id);
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_most_pulled_card
    AFTER INSERT OR UPDATE OR DELETE ON daily_pulls
    FOR EACH ROW EXECUTE FUNCTION trigger_update_most_pulled_card();

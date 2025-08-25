-- Fix column ambiguity in trigger functions
-- This migration fixes the "most_pulled_card_id is ambiguous" error

-- Drop the existing trigger first
DROP TRIGGER IF EXISTS update_user_most_pulled_card ON daily_pulls;

-- Drop the existing functions
DROP FUNCTION IF EXISTS trigger_update_most_pulled_card();
DROP FUNCTION IF EXISTS update_most_pulled_card(UUID);

-- Recreate the function with explicit table references
CREATE OR REPLACE FUNCTION update_most_pulled_card(user_uuid UUID)
RETURNS void AS $$
DECLARE
    card_id_to_set INTEGER;
BEGIN
    -- Use explicit table reference to avoid ambiguity
    SELECT dp.card_id INTO card_id_to_set
    FROM daily_pulls dp
    WHERE dp.user_id = user_uuid
    GROUP BY dp.card_id
    ORDER BY COUNT(*) DESC
    LIMIT 1;
    
    IF card_id_to_set IS NOT NULL THEN
        UPDATE users 
        SET most_pulled_card_id = card_id_to_set
        WHERE id = user_uuid;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger function
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

-- Recreate the trigger
CREATE TRIGGER update_user_most_pulled_card
    AFTER INSERT OR UPDATE OR DELETE ON daily_pulls
    FOR EACH ROW EXECUTE FUNCTION trigger_update_most_pulled_card();

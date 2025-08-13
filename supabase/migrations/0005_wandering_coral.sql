/*
  # Update Kraken value handling

  1. Changes
    - Remove automatic rounding of kraken values
    - Keep validation for value range
    - Update to use numeric type for more precision

  2. Security
    - Maintains existing RLS policies
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS process_kraken_values ON calculations;
DROP FUNCTION IF EXISTS process_kraken_value();

-- Alter column type to numeric for more precision
ALTER TABLE calculations 
  ALTER COLUMN kraken_value TYPE numeric;

-- Create new validation function without rounding
CREATE OR REPLACE FUNCTION validate_kraken_value()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.kraken_value IS NOT NULL THEN
    -- Only validate range
    IF NEW.kraken_value < 0 OR NEW.kraken_value > 100 THEN
      RAISE EXCEPTION 'Kraken value must be between 0 and 100';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create new trigger for validation only
CREATE TRIGGER validate_kraken_values
  BEFORE INSERT OR UPDATE ON calculations
  FOR EACH ROW
  EXECUTE FUNCTION validate_kraken_value();
/*
  # Add Kraken value index and validation

  1. Changes
    - Add index on kraken_value column for better query performance
    - Add trigger to automatically round kraken values
    - Add validation to ensure kraken value is within reasonable range

  2. Security
    - Maintains existing RLS policies
*/

-- Add index for kraken_value queries
CREATE INDEX IF NOT EXISTS idx_calculations_kraken_value 
ON calculations(kraken_value);

-- Create function to round and validate kraken values
CREATE OR REPLACE FUNCTION process_kraken_value()
RETURNS TRIGGER AS $$
BEGIN
  -- Round the kraken value if it exists
  IF NEW.kraken_value IS NOT NULL THEN
    -- Round to nearest integer
    NEW.kraken_value := ROUND(NEW.kraken_value);
    
    -- Validate range (between 0 and 100)
    IF NEW.kraken_value < 0 OR NEW.kraken_value > 100 THEN
      RAISE EXCEPTION 'Kraken value must be between 0 and 100';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to process kraken values before insert or update
DROP TRIGGER IF EXISTS process_kraken_values ON calculations;
CREATE TRIGGER process_kraken_values
  BEFORE INSERT OR UPDATE ON calculations
  FOR EACH ROW
  EXECUTE FUNCTION process_kraken_value();
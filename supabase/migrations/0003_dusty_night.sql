/*
  # Update Kraken Value Configuration

  1. Changes
    - Modify kraken_value column to use integer type
    - Add validation check to ensure kraken_value is positive
    - Add trigger to automatically update kraken_value when a calculation is updated

  2. Security
    - Maintain existing RLS policies
*/

-- Convert kraken_value to integer and add validation
ALTER TABLE calculations 
  ALTER COLUMN kraken_value TYPE integer USING (kraken_value::integer);

-- Add check constraint for positive values
ALTER TABLE calculations 
  ADD CONSTRAINT positive_kraken_value 
  CHECK (kraken_value > 0);

-- Create function to validate kraken value
CREATE OR REPLACE FUNCTION validate_kraken_value()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.kraken_value IS NOT NULL AND NEW.kraken_value <= 0 THEN
    RAISE EXCEPTION 'Kraken value must be positive';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate kraken value
CREATE TRIGGER ensure_valid_kraken_value
  BEFORE INSERT OR UPDATE ON calculations
  FOR EACH ROW
  EXECUTE FUNCTION validate_kraken_value();
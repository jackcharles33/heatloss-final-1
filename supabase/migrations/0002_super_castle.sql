/*
  # Add kraken_value column to calculations table

  1. Changes
    - Add `kraken_value` column to `calculations` table
      - Optional numeric field to store Kraken validation values
      - Allows NULL values since not all calculations will have validation

  2. Notes
    - No data migration needed as this is a new optional column
    - Existing records will have NULL values for kraken_value
*/

ALTER TABLE calculations
ADD COLUMN IF NOT EXISTS kraken_value numeric;
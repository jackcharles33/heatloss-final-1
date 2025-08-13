/*
  # Create calculations table

  1. New Tables
    - `calculations`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `size` (integer)
      - `age` (text)
      - `property_type` (text)
      - `window_type` (text)
      - `wall_type` (text)
      - `floor_type` (text)
      - `roof_type` (text)
      - `heat_loss` (numeric)

  2. Security
    - Enable RLS on `calculations` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS calculations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  size integer NOT NULL,
  age text NOT NULL,
  property_type text,
  window_type text NOT NULL,
  wall_type text NOT NULL,
  floor_type text NOT NULL,
  roof_type text NOT NULL,
  heat_loss numeric NOT NULL
);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON calculations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert"
  ON calculations
  FOR INSERT
  TO public
  WITH CHECK (true);
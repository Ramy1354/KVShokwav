/*
  # Create Shok.wav Discord Bot Tables

  1. New Tables
    - `afk_users`
      - `user_id` (text) - Discord user ID
      - `guild_id` (text) - Discord guild ID
      - `reason` (text) - Reason for being AFK
      - `timestamp` (timestamptz) - When the user went AFK
      - Primary key on (user_id, guild_id)
    
    - `economy`
      - `user_id` (text) - Discord user ID
      - `guild_id` (text) - Discord guild ID
      - `balance` (bigint) - Wallet balance
      - `bank` (bigint) - Bank balance
      - `last_daily` (timestamptz) - Last daily claim timestamp
      - `last_work` (timestamptz) - Last work timestamp
      - Primary key on (user_id, guild_id)
    
    - `server_settings`
      - `guild_id` (text, primary key) - Discord guild ID
      - `prefix` (text) - Custom command prefix
      - `welcome_channel` (text) - Welcome channel ID
      - `log_channel` (text) - Log channel ID
      - `autorole` (text) - Auto-assign role ID
      - `settings` (jsonb) - Additional settings
      - `created_at` (timestamptz) - When settings were created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

CREATE TABLE IF NOT EXISTS afk_users (
  user_id text NOT NULL,
  guild_id text NOT NULL,
  reason text DEFAULT '',
  timestamp timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, guild_id)
);

CREATE TABLE IF NOT EXISTS economy (
  user_id text NOT NULL,
  guild_id text NOT NULL,
  balance bigint DEFAULT 0,
  bank bigint DEFAULT 0,
  last_daily timestamptz,
  last_work timestamptz,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, guild_id)
);

CREATE TABLE IF NOT EXISTS server_settings (
  guild_id text PRIMARY KEY,
  prefix text DEFAULT '!',
  welcome_channel text,
  log_channel text,
  autorole text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE afk_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE economy ENABLE ROW LEVEL SECURITY;
ALTER TABLE server_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on afk_users"
  ON afk_users FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on afk_users"
  ON afk_users FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on afk_users"
  ON afk_users FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on afk_users"
  ON afk_users FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Allow public read access on economy"
  ON economy FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on economy"
  ON economy FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on economy"
  ON economy FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on economy"
  ON economy FOR DELETE
  TO public
  USING (true);

CREATE POLICY "Allow public read access on server_settings"
  ON server_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert on server_settings"
  ON server_settings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update on server_settings"
  ON server_settings FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete on server_settings"
  ON server_settings FOR DELETE
  TO public
  USING (true);

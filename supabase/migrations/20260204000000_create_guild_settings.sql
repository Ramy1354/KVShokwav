CREATE TABLE guild_settings (
  guild_id TEXT PRIMARY KEY,
  leveling_channel_id TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create ticket configuration table
CREATE TABLE IF NOT EXISTS ticket_config (
    guild_id TEXT PRIMARY KEY,
    ticket_name TEXT NOT NULL,
    setup_channel_id TEXT NOT NULL,
    category_id TEXT NOT NULL,
    transcript_channel_id TEXT,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    guild_id TEXT NOT NULL,
    ticket_number INTEGER NOT NULL,
    channel_id TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL,
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'claimed', 'closed')),
    claimed_by TEXT,
    claimed_at TIMESTAMP WITH TIME ZONE,
    closed_by TEXT,
    closed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(guild_id, ticket_number)
);

-- Create ticket transcripts table
CREATE TABLE IF NOT EXISTS ticket_transcripts (
    id SERIAL PRIMARY KEY,
    guild_id TEXT NOT NULL,
    ticket_number INTEGER NOT NULL,
    channel_id TEXT NOT NULL,
    channel_name TEXT NOT NULL,
    transcript_channel_id TEXT NOT NULL,
    message_count INTEGER DEFAULT 0,
    generated_by TEXT NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ticket_config_guild ON ticket_config(guild_id);
CREATE INDEX IF NOT EXISTS idx_tickets_guild_status ON tickets(guild_id, status);
CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_channel ON tickets(channel_id);
CREATE INDEX IF NOT EXISTS idx_transcripts_guild ON ticket_transcripts(guild_id);

-- Enable RLS
ALTER TABLE ticket_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_transcripts ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a Discord bot)
CREATE POLICY "Allow public access on ticket_config"
  ON ticket_config FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access on tickets"
  ON tickets FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public access on ticket_transcripts"
  ON ticket_transcripts FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
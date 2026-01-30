-- Create warnings table
CREATE TABLE IF NOT EXISTS warnings (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    moderator_id TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create levels table
CREATE TABLE IF NOT EXISTS levels (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    total_xp INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, guild_id)
);

-- Create verification table
CREATE TABLE IF NOT EXISTS verification (
    id SERIAL PRIMARY KEY,
    guild_id TEXT NOT NULL UNIQUE,
    verified_role_id TEXT,
    verification_channel_id TEXT,
    enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create afk table
CREATE TABLE IF NOT EXISTS afk (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    guild_id TEXT NOT NULL,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, guild_id)
);

-- Create protection settings table
CREATE TABLE IF NOT EXISTS protection (
    id SERIAL PRIMARY KEY,
    guild_id TEXT NOT NULL UNIQUE,
    anti_spam BOOLEAN DEFAULT FALSE,
    banned_words TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_warnings_user_guild ON warnings(user_id, guild_id);
CREATE INDEX IF NOT EXISTS idx_levels_guild_total_xp ON levels(guild_id, total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_afk_user_guild ON afk(user_id, guild_id);
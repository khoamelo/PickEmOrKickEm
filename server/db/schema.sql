-- Enable unaccent extension for case/diacritic-insensitive search
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(100) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

-- Players table for NBA players
CREATE TABLE players (
  player_id INTEGER PRIMARY KEY,
  full_name VARCHAR(100),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_active BOOLEAN
);


-- Game logs table for player stats
CREATE TABLE game_logs (
    season_id VARCHAR(20),
    player_id INTEGER,
    game_id VARCHAR(20),
    game_date DATE,
    matchup VARCHAR(50),
    wl VARCHAR(2),
    min INTEGER,
    fgm INTEGER,
    fga INTEGER,
    fg_pct FLOAT,
    fg3m INTEGER,
    fg3a INTEGER,
    fg3_pct FLOAT,
    ftm INTEGER,
    fta INTEGER,
    ft_pct FLOAT,
    oreb INTEGER,
    dreb INTEGER,
    reb INTEGER,
    ast INTEGER,
    stl INTEGER,
    blk INTEGER,
    tov INTEGER,
    pf INTEGER,
    pts INTEGER,
    plus_minus FLOAT,
    PRIMARY KEY (game_id, player_id)
);
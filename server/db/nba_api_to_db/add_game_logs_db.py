from nba_api.stats.static import players, teams
from active_players_gamelogs import get_active_players, get_active_players_game_logs
from dotenv import load_dotenv
import os
import pandas as pd
import psycopg2

# Load environment variables from .env file
load_dotenv()

def load_active_players_game_logs_db():

    # Establish a connection to the PostgreSQL database
    conn = psycopg2.connect(
        dbname=os.getenv('PGDATABASE'),
        user=os.getenv('PGUSER'),
        password=os.getenv('PGPASSWORD'),
        host=os.getenv('PGHOST'),
        port=os.getenv('PGPORT')
    )

    # Create a cursor object to interact with the database
    cursor = conn.cursor()

    # Insert game logs for active players into the game_logs table
    for _, game in get_active_players_game_logs().iterrows():
        cursor.execute("""
                INSERT INTO game_logs (
                       season_id, 
                       player_id, 
                       game_id, 
                       game_date, 
                       matchup, 
                       wl, 
                       min, 
                       fgm, 
                       fga, 
                       fg_pct,
                       fg3m,
                       fg3a,
                       fg3_pct,
                       ftm,
                       fta,
                       ft_pct,
                       oreb,
                       dreb,
                       reb,
                       ast,
                       stl,
                       blk,
                       tov,
                       pf,
                       pts,
                       plus_minus
                    )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 
                        %s, %s, %s, %s, %s, %s)
                ON CONFLICT (game_id, player_id) DO NOTHING
            """, (
                game['SEASON_ID'],
                game['Player_ID'],
                game['Game_ID'],
                game['GAME_DATE'],
                game['MATCHUP'],
                game['WL'],
                game['MIN'],
                game['FGM'],
                game['FGA'],
                game['FG_PCT'],
                game['FG3M'],
                game['FG3A'],
                game['FG3_PCT'],
                game['FTM'],
                game['FTA'],
                game['FT_PCT'],
                game['OREB'],
                game['DREB'],
                game['REB'],
                game['AST'],
                game['STL'],
                game['BLK'],
                game['TOV'],
                game['PF'],
                game['PTS'],
                game['PLUS_MINUS']
            )
        )

    # Commit and close the connection
    conn.commit()
    cursor.close()
    conn.close()

load_active_players_game_logs_db()
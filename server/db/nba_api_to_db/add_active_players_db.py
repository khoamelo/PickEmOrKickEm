from nba_api.stats.static import players, teams
from active_players_gamelogs import get_active_players
from dotenv import load_dotenv
import os
import pandas as pd
import psycopg2

# Load environment variables from .env file
load_dotenv()

def load_active_players_db():

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

    # Insert active players into the players table
    for _, player in get_active_players().iterrows():
        cursor.execute("""
                INSERT INTO players (player_id, full_name, first_name, last_name, is_active)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (player_id) DO NOTHING;
            """, (
                player['id'],
                player['full_name'],
                player['first_name'],
                player['last_name'],
                player['is_active']
            )
        )

    # Commit and close the connection
    conn.commit()
    cursor.close()
    conn.close()

load_active_players_db()
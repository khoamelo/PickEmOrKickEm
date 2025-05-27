from nba_api.stats.static import players, teams
from nba_api.stats.endpoints import playergamelog
import pandas as pd
import time

# Get a list of all active players
def get_active_players():
    active_players = players.get_active_players()
    df_active_players = pd.DataFrame(active_players)
    return df_active_players

# Helper function to get specific game log of player
def get_player_game_log(player_id):
    try:
        game_log = playergamelog.PlayerGameLog(player_id=player_id, season='2024-25', season_type_all_star='Regular Season')
        df = game_log.get_data_frames()[0]
        return df
    except Exception as e:
        print(f"Failed to get logs for player_id {player_id}: {e}")
        return pd.DataFrame()

# Get game logs for all active players
def get_active_players_game_logs():
    all_logs = []
    active_players = get_active_players()

    for _, player in active_players.iterrows():
        print(f"Getting game logs for {player['full_name']} (ID: {player['id']})")
        df_log = get_player_game_log(player['id'])

        if not df_log.empty:
            all_logs.append(df_log)

        time.sleep(0.6)  # throttle to avoid rate limit

    combined_logs = pd.concat(all_logs, ignore_index=True) if all_logs else pd.DataFrame()
    return combined_logs

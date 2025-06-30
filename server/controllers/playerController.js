const db = require('../db');

// GET /getPlayer/:name
exports.getPlayer = async (req, res) => {
    try {
        // Query the database for the player with the given name
        const results = await db.query(
            `SELECT * FROM players
             WHERE unaccent(LOWER(full_name)) = unaccent(LOWER($1))`,
            [req.params.name]
        );
        // Respond with the player data, number of results, and status
        res.status(200).json({
            status: 'success',
            results: results.rowCount,
            data: { player: results.rows[0] }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error fetching player.' });
    }
};

// GET /getGames/:player_id?n=5
exports.getGames = async (req, res) => {
    try {
        // Parse the number of games to fetch from the query parameter, defaulting to 5
        const n_games = parseInt(req.query.n) || 5;
        // Query the database for the last N games of the player with the given ID
        const results = await db.query(
            `SELECT * FROM game_logs
             WHERE player_id = $1
             ORDER BY game_date DESC
             LIMIT $2`,
            [req.params.player_id, n_games]
        );
        // Respond with the game data, number of results, and status
        res.status(200).json({
            status: 'success',
            results: results.rowCount,
            data: { games: results.rows }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error fetching games.' });
    }
};

// GET /getHeadToHead/:player_id/:team_name
exports.getHeadToHead = async (req, res) => {
    try {
        // Query the database for head-to-head matchups of the player against the specified team
        const results = await db.query(
            `SELECT * FROM game_logs
             WHERE player_id = $1
             AND LOWER(matchup) LIKE '%' || LOWER($2) || '%'
             ORDER BY game_date DESC`,
            [req.params.player_id, req.params.team_name]
        );
        // Respond with the head-to-head game data, number of results, and status
        res.status(200).json({
            status: 'success',
            results: results.rowCount,
            data: { h2h_games: results.rows }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error fetching head-to-head matchups.' });
    }
};

// GET /playerPlayedOpponentDidNot/:playerA_id/:playerB_id/:teamA/:teamB
exports.getGamesWithoutOpponent = async (req, res) => {
    try {
        // Query the database for games where player A played against teams that player B did not play against
        const results = await db.query(
            `SELECT * FROM game_logs
             WHERE player_id = $1
             AND LOWER(matchup) LIKE '%' || LOWER($3) || '%'
             AND LOWER(matchup) LIKE '%' || LOWER($4) || '%'
             AND game_id NOT IN (
                 SELECT game_id FROM game_logs WHERE player_id = $2
             )
             ORDER BY game_date DESC`,
            [req.params.playerA_id, req.params.playerB_id, req.params.teamA, req.params.teamB]
        );
        // Respond with the filtered game data, number of results, and status
        res.status(200).json({
            status: 'success',
            results: results.rowCount,
            data: { games: results.rows }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: 'Error fetching filtered matchups.' });
    }
};
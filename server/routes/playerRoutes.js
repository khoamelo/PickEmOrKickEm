const express = require('express');
const router = express.Router();
const controller = require('../controllers/playerController');

router.get('/getPlayer/:name', controller.getPlayer);
router.get('/getGames/:player_id', controller.getGames);
router.get('/getHeadToHead/:player_id/:team_name', controller.getHeadToHead);
router.get('/playerPlayedOpponentDidNot/:playerA_id/:playerB_id/:teamA/:teamB', controller.getGamesWithoutOpponent);

module.exports = router;
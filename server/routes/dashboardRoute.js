const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');
const authorization = require('../middleware/authorization');

router.get('/', authorization, controller.getDashboard);

module.exports = router;
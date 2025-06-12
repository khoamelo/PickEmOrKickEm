const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

router.post('/registerUser', validInfo, controller.registerUser);
router.post('/loginUser', validInfo, controller.loginUser);
router.get('/verifyUser', authorization, controller.verifyUser);


module.exports = router;
var express = require('express');
var router = express.Router();
var verifyToken = require('../controllers/VerifiyToken');
var authController = require('../controllers/AuthController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/profile', verifyToken, authController.me);

module.exports = router;

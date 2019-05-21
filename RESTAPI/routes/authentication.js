var express = require('express');
var router = express.Router();
//var verifyToken = require('../controllers/VerifyToken');
var verifyRole = require('../controllers/VerifyRole');
var authController = require('../controllers/AuthenticationController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/profile', verifyRole, authController.me);

module.exports = router;

var express = require('express');
var router = express.Router();
var verifyToken = require('../controllers/VerifyToken');
var authController = require('../controllers/AuthenticationController');

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/profile', verifyToken, authController.me);

router.put('/:userId', verifyToken, authController.updateMe);
router.delete('/:userId', verifyToken, authController.removeMe);
router.param('userId', authController.getProfileById);

module.exports = router;

var express = require('express');
var router = express.Router();
var verifyToken = require('../controllers/VerifyToken');
var verifyRole = require('../controllers/VerifyRole');
var authController = require('../controllers/AuthenticationController');

router.get('/roles', verifyRole, authController.getRolesCount);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/profile', verifyToken, authController.me);

router.get('/user/:username', verifyRole, authController.getProfileByUsername);
router.put('/:userId', verifyToken, authController.updateMe);
router.delete('/:userId', verifyToken, authController.removeMe);

module.exports = router;

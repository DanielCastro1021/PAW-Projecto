var express = require('express');
var router = express.Router();
var verifyRole = require('../controllers/VerifyRole');
var userController = require('../controllers/UserController');

router.get('/count', verifyRole, userController.getCount);

var express = require('express');
var passport = require('passport');
var router = express.Router();
var donationController = require('../controllers/donationController');
var config = require('../config/passport');

router.get('/', config.isValidUser, donationController.getAll); //
router.post('/', config.isValidUser, donationController.create); //

router.get('/:donationId', config.isValidUser, donationController.getOne); //
router.put('/:donationId', config.isValidUser, donationController.update); //
router.delete('/:donationId', config.isValidUser, donationController.remove); //

router.param('donationId', donationController.getById);

module.exports = router;

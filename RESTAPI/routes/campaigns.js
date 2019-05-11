var express = require('express');
var passport = require('passport');
var router = express.Router();
var campaignController = require('../controllers/campaignController');
var config = require('../config/passport');

router.get('/', config.isValidUser, campaignController.getAll); //OK
router.post('/', config.isValidUser, campaignController.create); //OK

router.get('/:campaignId', config.isValidUser, campaignController.getOne); //OK
router.put('/:campaignId', config.isValidUser, campaignController.update); //OK
router.delete('/:campaignId', config.isValidUser, campaignController.remove); //OK

router.param('campaignId', campaignController.getById);

module.exports = router;

var express = require('express');

var router = express.Router();

var campaignController = require('../controllers/CampaignController');
var verifyRole = require('../controllers/VerifyRole');
var verifyToken = require('../controllers/VerifyToken');

router.get('/active', campaignController.getAllActiveCampaigns);
router.get('/disabled', verifyRole, campaignController.getAllDisabledCampaigns);
router.get('/', verifyRole, campaignController.getAllCampaigns);
router.get('/total', verifyRole, campaignController.getCampaignTotal);
router.get('/status', verifyRole, campaignController.getCampaignStatus);

router.post('/', verifyRole, campaignController.createCampaign);
router.get('/active/:campaignId', campaignController.getOneActiveCampaigns);
router.get('/:campaignId', verifyToken, campaignController.getOneCampaign);
router.put('/:campaignId', verifyRole, campaignController.updateCampaign);
router.delete('/:campaignId', verifyRole, campaignController.removeCampaign);

router.param('campaignId', campaignController.getCampaignById);
module.exports = router;

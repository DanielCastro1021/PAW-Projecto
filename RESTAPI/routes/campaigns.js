var express = require('express');
var router = express.Router();
var campaignController = require('../controllers/CampaignController');
var verifyRole = require('../controllers/VerifyRole');

router.get('/', campaignController.getAllCampaigns);
router.post('/',verifyRole,campaignController.createCampaign);

router.get('/:campaignId', campaignController.getOneCampaign);
router.put('/:campaignId',verifyRole, campaignController.updateCampaign);
router.delete('/:campaignId',verifyRole, campaignController.removeCampaign);

router.param('campaignId', campaignController.getCampaignById);

module.exports = router;

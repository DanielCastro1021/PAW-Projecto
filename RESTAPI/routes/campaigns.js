var express = require('express');
var multer = require('multer');
var router = express.Router();

var campaignController = require('../controllers/CampaignController');
var verifyRole = require('../controllers/VerifyRole');
let storage = require('../config/multer');

const upload = multer({ storage: storage });

router.get('/active', campaignController.getAllActiveCampaigns);
router.get('/disabled', verifyRole, campaignController.getAllDisabledCampaigns);
router.get('/', verifyRole, campaignController.getAllCampaigns);
router.get('/total', verifyRole, campaignController.getCampaignTotal);
router.get('/status', verifyRole, campaignController.getCampaignStatus);

router.post(
  '/',
  verifyRole,
  upload.single('img'),
  campaignController.createCampaign
);

router.get('/active/:campaignId', campaignController.getOneActiveCampaigns);
router.get(
  '/disabled/:campaignId',
  verifyRole,
  campaignController.getOneDisabledCampaigns
);
router.get('/:campaignId', verifyRole, campaignController.getOneCampaign);

router.put('/:campaignId', verifyRole, campaignController.updateCampaign);
router.delete('/:campaignId', verifyRole, campaignController.removeCampaign);

router.param('campaignId', campaignController.getCampaignById);
module.exports = router;

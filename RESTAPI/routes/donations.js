var express = require('express');
var router = express.Router();
var donationController = require('../controllers/DonationController');
var campaingController = require('../controllers/CampaignController');
var verifyToken = require('../controllers/VerifyToken');
var verifyRole = require('../controllers/VerifyRole');

router.get('/', verifyRole, donationController.getAllDonations);
router.get('/processed', verifyRole, donationController.getProcessedDonations);
router.get(
  '/in-processing',
  verifyRole,
  donationController.getInProcessedDonations
);
router.get('/canceled', verifyRole, donationController.getCanceledDonations);
router.post('/', verifyToken, donationController.createDonation);

router.get('/status', verifyRole, donationController.getSummaryStatus);
router.get('/count', verifyRole, donationController.getSummaryCount);
router.get(
  '/total-donated',
  verifyRole,
  donationController.getSummaryTotalAmount
);

router.get(
  '/users/total-spent',
  verifyRole,
  donationController.getTotalSpentPerUser
);

router.get(
  '/users/count-donations',
  verifyRole,
  donationController.getCountDonationsPerUser
);

router.get('/user/:username', verifyToken, donationController.getUserDonations);

router.get('/campaign/:campaignId', donationController.getCampaignDonations);

router.get('/:donationId', verifyRole, donationController.getOneDonation);
router.put('/:donationId', verifyRole, donationController.updateDonation);
router.delete('/:donationId', verifyRole, donationController.removeDonation);

router.param('campaignId', campaingController.getCampaignById);
router.param('donationId', donationController.getDonationById);

module.exports = router;

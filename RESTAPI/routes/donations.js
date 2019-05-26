var express = require('express');
var router = express.Router();
var donationController = require('../controllers/DonationController');
var campaingController = require('../controllers/CampaignController');
var verifyToken = require('../controllers/VerifyToken');
var verifyRole = require('../controllers/VerifyRole');

router.get('/', verifyToken, donationController.getAllDonations);
router.get('/processed', donationController.getProcessedDonations);
router.get('/in-processing', donationController.getInProcessedDonations);
router.get('/canceled', donationController.getCanceledDonations);
router.post('/', verifyToken, donationController.createDonation);

//DASHBOARD
router.get('/status', donationController.getSummaryStatus);
router.get('/count', donationController.getSummaryCount);
router.get('/total-donated', donationController.getSummaryTotalAmount);

//USER RELATED
router.get('/users/total-spent', donationController.getTotalSpentPerUser);
router.get(
  '/users/count-donations',
  donationController.getCountDonationsPerUser
);

//User
router.get('/user/:username', donationController.getUserDonations);

//Campaign
router.get('/campaign/:campaignId', donationController.getCampaignDonations);

router.get('/:donationId', verifyToken, donationController.getOneDonation);
router.put('/:donationId', verifyToken, donationController.updateDonation);
router.delete('/:donationId', verifyToken, donationController.removeDonation);

router.param('campaignId', campaingController.getCampaignById);
router.param('donationId', donationController.getDonationById);

module.exports = router;

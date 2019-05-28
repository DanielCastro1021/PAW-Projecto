var express = require('express');
var router = express.Router();
var donationController = require('../controllers/DonationController');
var campaingController = require('../controllers/CampaignController');
var verifyToken = require('../controllers/VerifyToken');
var verifyRole = require('../controllers/VerifyRole');
//User
router.get('/', verifyToken, donationController.getAllDonations);
router.post('/', verifyToken, donationController.createDonation);

//Admin
router.get('/processed', verifyRole, donationController.getProcessedDonations);
router.get(
  '/in-processing',
  verifyRole,
  donationController.getInProcessedDonations
);
router.get('/canceled', verifyRole, donationController.getCanceledDonations);

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

router.get('/user/:username', verifyToken, donationController.getUserDonations); // Vizualizar Doações do User
router.get('/campaign/:campaign', donationController.getCampaignDonations); // Vizualizar Doações da Campaign

router.get('/:donationId', verifyToken, donationController.getOneDonation);
router.put('/:donationId', verifyRole, donationController.updateDonation);
router.delete('/:donationId', verifyRole, donationController.removeDonation);

router.param('campaignId', campaingController.getCampaignById);
router.param('donationId', donationController.getDonationById);

module.exports = router;

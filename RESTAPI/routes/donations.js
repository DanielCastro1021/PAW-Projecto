var express = require('express');
var router = express.Router();
var donationController = require('../controllers/DonationController');
var verifyToken = require('../controllers/VerifyToken');

router.get('/', verifyToken, donationController.getAllDonations);
router.post('/', verifyToken, donationController.createDonation);

router.get('/:donationId', verifyToken, donationController.getOneDonation);
router.put('/:donationId', verifyToken, donationController.updateDonation);
router.delete('/:donationId', verifyToken, donationController.removeDonation);

router.param('donationId', donationController.getDonationById);

module.exports = router;

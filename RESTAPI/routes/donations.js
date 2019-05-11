var express = require('express');
var router = express.Router();
var donationController = require('../controllers/donationController');

router.get('/', donationController.getAllDonations);
router.post('/', donationController.createDonation);

router.get('/:donationId', donationController.getOneDonation);
router.put('/:donationId', donationController.updateDonation);
router.delete('/:donationId', donationController.removeDonation);

router.param('donationId', donationController.getDonationById);

module.exports = router;

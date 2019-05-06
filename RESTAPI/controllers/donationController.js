var mongoose = require('mongoose');
var Donation = require('../models/donation');

var donationController = {};

donationController.createDonation = (req, res, next) => {
  var donation = new Donation(req.body);
  donation.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(donation);
    }
  });
};

donationController.updateDonation = (req, res, next) => {
  Donation.findOneAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, donation) => {
      if (err) {
        next(err);
      } else {
        res.json(donation);
      }
    }
  );
};

donationController.removeDonation = (req, res, next) => {
  req.donation.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.donation);
    }
  });
};

donationController.getOneDonation = (req, res, next) => {
  res.json(req.donation);
};

donationController.getDonationById = (req, res, next, id) => {
  Donation.findOne({ _id: id }, (err, donation) => {
    if (err) {
      next(err);
    } else {
      req.donation = donation;
      next();
    }
  });
};

donationController.getAllDonations = (req, res, next) => {
  Donation.find((err, donations) => {
    if (err) {
      next(err);
    } else {
      res.json(donations);
    }
  });
};

module.exports = donationController;

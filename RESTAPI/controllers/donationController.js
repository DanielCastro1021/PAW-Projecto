var mongoose = require('mongoose');
var Donation = require('../models/donation');

var donationController = {};

donationController.create = (req, res, next) => {
  var donation = new Donation(req.body);
  donation.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(donation);
    }
  });
};

donationController.update = (req, res, next) => {
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

donationController.remove = (req, res, next) => {
  req.donation.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.donation);
    }
  });
};

donationController.getOne = (req, res, next) => {
  res.json(req.donation);
};

donationController.getById = (req, res, next, id) => {
  Donation.findOne({ _id: id }, (err, donation) => {
    if (err) {
      next(err);
    } else {
      req.donation = donation;
      next();
    }
  });
};

donationController.getAll = (req, res, next) => {
  Donation.find((err, donations) => {
    if (err) {
      next(err);
    } else {
      res.json(donations);
    }
  });
};

module.exports = donationController;

var mongoose = require('mongoose');
var Donation = require('../models/Donation');

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
    { _id: req.params.donationId },
    { $set: req.body },
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

donationController.getProcessedDonations = (req, res, next) => {
  Donation.find({ status: 'processed' }, (err, donations) => {
    if (err) {
      next(err);
    } else {
      res.json(donations);
    }
  });
};

donationController.getInProcessedDonations = (req, res, next) => {
  Donation.find({ status: 'in processing' }, (err, donations) => {
    if (err) {
      next(err);
    } else {
      res.json(donations);
    }
  });
};

donationController.getCanceledDonations = (req, res, next) => {
  Donation.find({ status: 'canceled' }, (err, donations) => {
    if (err) {
      next(err);
    } else {
      res.json(donations);
    }
  });
};

donationController.getCampaignDonations = (req, res, next) => {
  Donation.find(
    { campaign: req.params.campaignId, status: 'processed' },
    (err, donations) => {
      if (err) {
        next(err);
      } else {
        res.json(donations);
      }
    }
  );
};

//USER
donationController.getUserDonations = (req, res, next) => {
  Donation.find(
    { username: req.params.username, status: 'processed' },
    (err, donations) => {
      if (err) {
        next(err);
      } else {
        res.json(donations);
      }
    }
  );
};

donationController.getTotalSpentPerUser = (req, res, next) => {
  Donation.aggregate(
    [{ $group: { _id: '$username', total: { $sum: '$amount' } } }],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
  );
};

donationController.getCountDonationsPerUser = (req, res, next) => {
  Donation.aggregate(
    [{ $group: { _id: '$username', total: { $sum: 1 } } }],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
  );
};

//DASHBOARD
donationController.getSummaryStatus = (req, res, next) => {
  Donation.aggregate(
    [{ $group: { _id: '$status', total: { $sum: 1 } } }],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
  );
};

donationController.getSummaryCount = (req, res, next) => {
  Donation.aggregate(
    [{ $group: { _id: null, total: { $sum: 1 } } }],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
  );
};

donationController.getSummaryTotalAmount = (req, res, next) => {
  Donation.aggregate(
    [{ $group: { _id: null, total: { $sum: '$amount' } } }],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
  );
};

module.exports = donationController;

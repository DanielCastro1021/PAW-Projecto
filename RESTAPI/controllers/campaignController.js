var mongoose = require('mongoose');
var Campaign = require('../models/campaign');

var campaignController = {};

campaignController.create = (req, res, next) => {
  var campaign = new Campaign(req.body);
  campaign.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(campaign);
    }
  });
};

campaignController.update = (req, res, next) => {
  Campaign.findOneAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, campaign) => {
      if (err) {
        next(err);
      } else {
        res.json(campaign);
      }
    }
  );
};

campaignController.remove = (req, res, next) => {
  req.campaign.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.campaign);
    }
  });
};

campaignController.getOne = (req, res, next) => {
  res.json(req.campaign);
};

campaignController.getById = (req, res, next, id) => {
  Campaign.findOne({ _id: id }, (err, campaign) => {
    if (err) {
      next(err);
    } else {
      req.campaign = campaign;
      next();
    }
  });
};

campaignController.getAll = (req, res, next) => {
  Campaign.find((err, campaigns) => {
    if (err) {
      next(err);
    } else {
      res.json(campaigns);
    }
  });
};

module.exports = campaignController;

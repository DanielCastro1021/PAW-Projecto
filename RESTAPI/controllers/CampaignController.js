var mongoose = require('mongoose');
var Campaign = require('../models/Campaign');

var campaignController = {};

campaignController.createCampaign = (req, res, next) => {
  var campaign = new Campaign(req.body);
  campaign.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(campaign);
    }
  });
};

campaignController.updateCampaign = (req, res, next) => {
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

campaignController.removeCampaign = (req, res, next) => {
  req.campaign.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.campaign);
    }
  });
};

campaignController.getOneCampaign = (req, res, next) => {
  res.json(req.campaign);
};

campaignController.getCampaignById = (req, res, next, id) => {
  Campaign.findOne({ _id: id }, (err, campaign) => {
    if (err) {
      next(err);
    } else {
      req.campaign = campaign;
      next();
    }
  });
};

campaignController.getAllCampaigns = (req, res, next) => {
  Campaign.find((err, campaigns) => {
    if (err) {
      next(err);
    } else {
      res.json(campaigns);
    }
  });
};

module.exports = campaignController;

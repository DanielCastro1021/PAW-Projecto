var mongoose = require('mongoose');
var Campaign = require('../models/Campaign');

var campaignController = {};

campaignController.createCampaign = (req, res, next) => {
  var campaign = new Campaign(req.body);
  campaign.logo = req.file.path;
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

campaignController.getAllActiveCampaigns = (req, res, next) => {
  Campaign.find({ status: 'active' }, (err, campaigns) => {
    if (err) {
      next(err);
    } else {
      res.json(campaigns);
    }
  });
};

campaignController.getOneActiveCampaigns = (req, res, next, id) => {
  Campaign.findOne({ _id: id, status: 'active' }, (err, campaign) => {
    if (err) {
      next(err);
    } else {
      console.log(campaign);
      res.json(campaign);
    }
  });
};

campaignController.getAllDisabledCampaigns = (req, res, next) => {
  Campaign.find({ status: 'disabled' }, (err, campaigns) => {
    if (err) {
      next(err);
    } else {
      res.json(campaigns);
    }
  });
};

campaignController.getOneDisabledCampaigns = (req, res, next, id) => {
  Campaign.findOne({ _id: id, status: 'disabled' }, (err, campaign) => {
    if (err) {
      next(err);
    } else {
      console.log(campaign);
      res.json(campaign);
    }
  });
};

campaignController.getCampaignTotal = (req, res, next) => {
  Campaign.aggregate(
    [{ $group: { _id: null, total: { $sum: 1 } } }],
    (err, result) => {
      if (err) {
        next(err);
      } else {
        res.json(result);
      }
    }
  );
};

campaignController.getCampaignStatus = (req, res, next) => {
  Campaign.aggregate(
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

module.exports = campaignController;

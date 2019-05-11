var mongoose = require('mongoose');
var Campain = require('../models/campain');

var campainController = {};

campainController.createCampain = (req, res, next) => {
  var campain = new Campain(req.body);
  campain.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(campain);
    }
  });
};

campainController.updateCampain = (req, res, next) => {
  Campain.findOneAndUpdate(
    req.body.id,
    req.body,
    { new: true },
    (err, campain) => {
      if (err) {
        next(err);
      } else {
        res.json(campain);
      }
    }
  );
};

campainController.removeCampain = (req, res, next) => {
  req.campain.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.campain);
    }
  });
};

campainController.getOneCampain = (req, res, next) => {
  res.json(req.campain);
};

campainController.getCampainById = (req, res, next, id) => {
  Campain.findOne({ _id: id }, (err, campain) => {
    if (err) {
      next(err);
    } else {
      req.campain = campain;
      next();
    }
  });
};

campainController.getAllCampains = (req, res, next) => {
  Campain.find((err, campains) => {
    if (err) {
      next(err);
    } else {
      res.json(campains);
    }
  });
};

module.exports = campainController;

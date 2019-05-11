var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user');

var userController = {};

userController.authenticate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(501).json(err);
    }
    if (!user) {
      return res.status(501).json(info);
    }
    req.logIn(user, err => {
      if (err) {
        return res.status(501).json(err);
      }
      return res.status(200).json({ message: 'Login Success' });
    });
  })(req, res, next);
};

userController.create = (req, res, next) => {
  var user = new User(req.body);

  user.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

userController.update = (req, res, next) => {
  User.findOneAndUpdate(
    req.body.username,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        next(err);
      } else {
        res.json(user);
      }
    }
  );
};

userController.remove = (req, res, next) => {
  req.user.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.user);
    }
  });
};

userController.getOne = (req, res, next) => {
  res.json(req.user);
};

module.exports = userController;

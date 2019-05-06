var mongoose = require('mongoose');
var User = require('../models/user');

var userController = {};

userController.createUser = (req, res, next) => {
  var user = new User(req.body);

  user.save(err => {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

userController.updateUser = (req, res, next) => {
  User.findOneAndUpdate(req.body.id, req.body, { new: true }, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.json(user);
    }
  });
};

userController.removeUser = (req, res, next) => {
  req.user.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.user);
    }
  });
};
userController.getOneUser = (req, res, next) => {
  res.json(req.user);
};
userController.getUserById = (req, res, next, id) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};
userController.getAllUsers = (req, res, next) => {
  Product.find((err, users) => {
    if (err) {
      next(err);
    } else {
      res.json(users);
    }
  });
};

module.exports = userController;

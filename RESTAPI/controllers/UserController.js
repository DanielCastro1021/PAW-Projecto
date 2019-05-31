var mongoose = require('mongoose');
var User = require('../models/user');

var userController = {};

userController.getCount = (req, res, next) => {
  User.aggregate(
    [{ $group: { _id: '$role', total: { $sum: 1 } } }],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json(results);
      }
    }
  );
};

module.exports = userController;

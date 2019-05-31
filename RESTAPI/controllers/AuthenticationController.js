var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config/jwt'); // get config file

var authController = {};

authController.login = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).send('Error on the server.');
    }
    if (!user) {
      return res.status(404).send('No user found.');
    }
    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null });
    }

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({
      id: user.__id,
      username: user.username,
      token: token,
      role: user.role
    });
  });
};

authController.logout = (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

authController.register = (req, res) => {
  var hashedPassword = bcrypt.hashSync(req.body.user.password, 8);

  User.create(
    {
      username: req.body.user.username,
      password: hashedPassword,
      fullname: req.body.user.fullname,
      nif: req.body.user.nif,
      iban: req.body.user.iban,
      coordinates: {
        latitude: req.body.user.coordinates.latitude,
        longitude: req.body.user.coordinates.longitude
      },
      address: req.body.user.address
    },
    (err, user) => {
      if (err)
        return res
          .status(500)
          .send('There was a problem registering the user`.');

      // if user is registered without errors
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ created: true });
    }
  );
};

authController.me = (req, res, next) => {
  User.findById(req.userId, (err, user) => {
    if (err)
      return res.status(500).send('There was a problem finding the user.');
    if (!user) return res.status(404).send('No user found.');
    res.status(200).send(user);
  });
};

authController.updateMe = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $set: req.body },
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

authController.removeMe = (req, res, next) => {
  req.user.remove(err => {
    if (err) {
      next(err);
    } else {
      res.json(req.user);
    }
  });
};

authController.getProfileById = (req, res, next, id) => {
  User.findOne({ _id: id }, (err, user) => {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authController;

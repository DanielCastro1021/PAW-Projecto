var express = require('express');
var passport = require('passport');
var router = express.Router();
var userController = require('../controllers/userController');
var config = require('../config/passport');

router.post('/register', userController.create); //OK
router.post('/login', userController.authenticate); //OK
router.get('/logout', config.isValidUser, (req, res, next) => {
  //Log out
  req.logout();
  return res.status(200).json({ message: 'Logout Success' });
}); //OK

router.get('/user', config.isValidUser, userController.getOne); //OK
router.put('/user', config.isValidUser, userController.update); //OK
router.delete('/user', config.isValidUser, userController.remove); //OK

module.exports = router;

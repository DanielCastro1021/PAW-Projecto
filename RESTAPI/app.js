var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

var authenticationRouter = require('./routes/authentication');
var donationsRouter = require('./routes/donations');
var campaignsRouter = require('./routes/campaigns');
var imagesRouter = require('./routes/images');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/donationsDB', {
  useNewUrlParser: true
});

var app = express();

app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dump')));

app.use('/api/auth', authenticationRouter);
app.use('/api/v1/donations', donationsRouter);
app.use('/api/v1/campaigns', campaignsRouter);
app.use('/api/v1/images', imagesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

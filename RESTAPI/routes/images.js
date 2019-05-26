var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/download', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', req.query.filename));
});

module.exports = router;

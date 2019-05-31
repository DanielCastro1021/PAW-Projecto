var express = require('express');
var path = require('path');
var router = express.Router();
var multer = require('multer');
let storage = require('../config/multer');
const upload = multer({ storage: storage }).single('file');

router.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.json('Failed');
      return;
    }
    res.json(req.file.path);
  });
});

router.get('/download', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', req.query.filename));
});

module.exports = router;

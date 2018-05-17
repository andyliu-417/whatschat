var express = require('express');
var router = express.Router();
// @andy_settings
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // @andy_settings
  res.sendFile("index.html", {root: path.join(__dirname, "../../client/build/")});

});

module.exports = router;

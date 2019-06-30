var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("cattleweight.ejs");
});

router.get('/cattleweight', function(req, res, next) {
  res.render("cattleweight.ejs");
});
//  GET feedstuff page on click
router.get('/feedstuff', function(req, res, next) {
  res.render("feedstuff.ejs");
});
//  GET quantities page on click
router.get('/quantities', function(req, res, next) {
  res.render("quantities.ejs");
});
//  GET rationweights page on click
router.get('/rationweights', function(req, res, next) {
  res.render("rationweights.ejs");
});

// exports router componets outside the folder for access
module.exports = router;

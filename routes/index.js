var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index.ejs");
});

/* GET cattle Weight Page. */
router.get('/cattleweight', function(req, res, next) {
  res.render("cattleweight.ejs");
});
//  GET feedstuff page
router.get('/feedstuff', function(req, res, next) {
  res.render("feedstuff.ejs");
});
//  GET quantities page
router.get('/quantities', function(req, res, next) {
  res.render("quantities.ejs");
});
//  GET rationweights page
router.get('/rationweights', function(req, res, next) {
  res.render("rationweights.ejs");
});

//  Goes to the login page
router.get('/index', function(req, res, next) {
  res.render("index.ejs");
});


// router.use("/cattleweight", require("../controllers/cattleweight.js"));
router.use("/feedstuff", require("../controllers/feedstuff.js"));


// exports router componets outside the folder for access
module.exports = router;

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET home page. */
router.get("/home", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET About Us page. */
router.get("/about", function (req, res, next) {
  res.render("index", { title: "About Me" });
});

/* GET Products page. */
router.get("/products", function (req, res, next) {
  res.render("index", { title: "Products" });
});

/* GET Service page. */
router.get("/services", function (req, res, next) {
  res.render("index", { title: "Services" });
});

/* GET Contact Us page. */
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "Contact Me" });
});

module.exports = router;
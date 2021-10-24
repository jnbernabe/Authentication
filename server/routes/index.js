var express = require("express");
var router = express.Router();

let indexController = require("../controllers/index");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET home page. */
router.get("/home", indexController.displayHomePage);

/* GET About Us page. */
router.get("/about", indexController.displayAboutPage);

/* GET Products page. */
router.get("/projects", indexController.displayProjectsPage);
/* GET Service page. */
router.get("/services", indexController.displayServicesPage);

/* GET Contact Us page. */
router.get("/contact", indexController.displayContactPage);

/* GET Route for Display Login - Create */
router.get("/login", indexController.displayLoginPage);

/* POST Route for PROCESS Login- Create*/
router.post("/login", indexController.processLoginPage);

/* GET Route for DISPLAY Register- Create */
router.get("/register", indexController.displayRegisterPage);

/* POST Route for PROCESS Register - Create*/
router.post("/register", indexController.processRegisterPage);

/* GET Route for PERFORM Logout - Create */
router.get("/logout", indexController.performLogout);

module.exports = router;

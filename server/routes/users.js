let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

//Connect to Schema

let userController = require("../controllers/user");

//helper
function requireAuth(req, res, next) {
  //check login status
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

/* Get Route for Book List page - READ */

router.get("/list", userController.displayUserList);

/* GET Route for DISPLAY Add page - Create */
router.get("/add", requireAuth, userController.displayAddUser);

/* POST Route for PROCESS Add page - Create*/
router.post("/add", requireAuth, userController.processAddUser);

/* GET Route for DISPLAY Edit page - Update*/
router.get("/edit/:id", requireAuth, userController.displayEditPage);

/* POST Route for PROCESS Edit page - Update */
router.post("/edit/:id", requireAuth, userController.processEditPage);
/* GET PERFORM DELETE - DELETE */
router.get("/delete/:id", requireAuth, userController.performDelete);

module.exports = router;

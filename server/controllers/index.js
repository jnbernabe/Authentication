let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");

let DB = require("../config/db");
//User module
let userModel = require("../models/user");
let user = userModel.user;

module.exports.displayHomePage = (req, res, next) => {
  res.render("index", {
    title: "Home",
    name: req.user ? req.user.name : "",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("index", {
    title: "About",
    name: req.user ? req.user.name : "",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayProjectsPage = (req, res, next) => {
  res.render("index", {
    title: "Projects",
    name: req.user ? req.user.name : "",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayServicesPage = (req, res, next) => {
  res.render("index", {
    title: "Services",
    name: req.user ? req.user.name : "",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayContactPage = (req, res, next) => {
  res.render("contact", {
    title: "Contact",
    name: req.user ? req.user.name : "",
    username: req.user ? req.user.username : "",
  });
};

module.exports.displayLoginPage = (req, res, next) => {
  //check if logged index
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      name: req.user ? req.user.name : "",
      username: req.user ? req.user.username : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    //server errr?
    if (err) {
      return next(err);
    }
    //login error?
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      //server error?
      if (err) {
        return next(err);
      }
      return res.redirect("/user-list");
    });
  })(req, res, next);
};

module.exports.displayRegisterPage = (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      name: req.user ? req.user.name : "",
      username: req.user ? req.user.username : "",
    });
  } else {
    return res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new user({
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    name: req.body.name,
  });

  user.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        req.flash(
          "registerMessage",
          "Registration Error: User Already Exists!"
        );
        console.log("Error: User Already Exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        name: req.user ? req.user.name : "",
        username: req.user ? req.user.username : "",
      });
    } else {
      return passport.authenticate("local")(req, res, () => {
        res.redirect("/user-list");
      });
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

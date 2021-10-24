let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//reference to db Schema

let userModel = require("../models/user");
let user = userModel.user;

module.exports.displayUserList = (req, res, next) => {
  user.find((err, userList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("user/list", {
        title: "Contact List",
        userList: userList.sort(user.fname),
        username: req.user ? req.user.username : "",
      });
    }
  });
};

module.exports.displayAddUser = (req, res, next) => {
  res.render("user/add", {
    title: "Add User",
    username: req.user ? req.user.username : "",
  });
};

module.exports.processAddUser = (req, res, next) => {
  let newUser = user({
    //Error?
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  });
  user.create(newUser, (err, user) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh user List
      res.redirect("/user-list");
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  user.findById(id, (err, usertoEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //shoe edit view
      res.render("user/edit", {
        title: "Edit User",
        user: usertoEdit,
        username: req.user ? req.user.username : "",
      });
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedUser = user({
    _id: id,
    lname: req.body.lname,
    fname: req.body.fname,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  });

  user.updateOne({ _id: id }, updatedUser, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book List
      res.redirect("/user-list");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  user.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book List
      res.redirect("/user-list");
    }
  });
};

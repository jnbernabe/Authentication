let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//reference to db Schema

let userModel = require("../models/user");
let person = userModel.user;

module.exports.displayUserList = (req, res, next) => {
  person.find((err, userList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("user/list", {
        title: "Contact List",
        userList: userList,
        username: req.user ? req.person.username : "",
      });
    }
  });
};

module.exports.displayAddUser = (req, res, next) => {
  res.render("user/add", {
    title: "Add User",
    username: req.user ? req.person.username : "",
  });
};

module.exports.processAddUser = (req, res, next) => {
  let newUser = User({
    //Error?
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  });
  Book.create(newUser, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book List
      res.redirect("/users");
    }
  });
};

module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  person.findById(id, (err, usertoEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //shoe edit view
      res.render("user/edit", {
        title: "Edit User",
        name: usertoEdit,
        username: req.user ? req.person.username : "",
      });
    }
  });
};

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let updatedUser = person({
    _id: id,
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
  });

  person.updateOne({ _id: id }, updatedUser, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book List
      res.redirect("/users");
    }
  });
};

module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;

  person.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh book List
      res.redirect("/users");
    }
  });
};

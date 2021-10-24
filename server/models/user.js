//User Model

let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let user = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "username is required",
    },
    fname: {
      type: String,
      default: "",
      trim: true,
      required: "first name is required",
    },
    lname: {
      type: String,
      default: "",
      trim: true,
      required: "last name is required",
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "email is required",
    },
    phone: {
      type: String,
      default: "",
      trim: true,
      required: "phone is required",
    },

    created: {
      type: Date,
      default: Date.now,
    },
    update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

//config user model options

let options = { missingPasswordError: "Wrong/Missing Password" };

user.plugin(passportLocalMongoose, options);

module.exports.user = mongoose.model("user", user);

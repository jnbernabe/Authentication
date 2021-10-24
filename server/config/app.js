let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

//auth
let session = require("express-session");
let passport = require("passport");
let passportLocal = require("passport-local");
let localStrategy = passportLocal.localStrategy;
let flash = require("connect-flash");

//database setup

let mongoose = require("mongoose");
let DB = require("./db");

//point mongoose to DB URI

mongoose.connect(DB.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let mongoDB = mongoose.connection;

mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once("open", () => {
  console.log("Connected to mongoDB");
});

let indexRouter = require("../routes/index");
let usersRouter = require("../routes/user");

let app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views")); //path to views folder
app.set("view engine", "ejs"); //express -e

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

//express session
app.use(
  session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false,
  })
);

//flash AH Ahhh

app.use(flash());

//passport session

app.use(passport.initialize());
app.use(passport.session());

//passport users

//create user module
let userModel = require("../models/user");
let User = userModel.user;

//user Auth Strat
passport.use(User.createStrategy());
//De/Serial

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/user-list", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", {
    title: "Error",
    messages: err,
    username: req.user ? req.user.username : "",
  });
});

module.exports = app;

let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// Auth
let session = require('express-session');
let passport = require('passport')
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let app = express();

let mongoose = require('mongoose');
let DB = require('./db')

// mongoose.connect('mongod://127.0.0.1:27017/test");
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection error'));
mongoDB.once('open', ()=>{console.log("MongoDB Connected")});

// Auth
// Set-up express session (before mongo)
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false,
}));
// initialize flash
app.use(flash());
// Creating user model instance
let userModel = require('../models/user');
let User = userModel.User;
// serialization and deserialization of the user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// initialize the passport
app.use(passport.initialize());
app.use(passport.session());
// call the strategy
passport.use(User.createStrategy());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let tabletsRouter = require('../routes/tablets');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tabletlist', tabletsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

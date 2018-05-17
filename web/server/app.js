var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
// @andy_db
require('./models/main.js');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// @andy_settings
app.set('views', path.join(__dirname, '../client/build/'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// @andy_settings
app.use(cookieParser());
app.use(bodyParser.json())

// @andy_settings
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));
// app.use(express.static(path.join(__dirname, 'public')));

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/user', userRouter);

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

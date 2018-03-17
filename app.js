const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors')

const index = require('./routes/index');
const users = require('./routes/users');
const admin = require('./routes/admin');

const mongoose = require('mongoose')
let uri = 'mongodb://werkbau:YratyortSevaC5691@devstack-0-shard-00-00-hjaoe.mongodb.net:27017,devstack-0-shard-00-01-hjaoe.mongodb.net:27017,devstack-0-shard-00-02-hjaoe.mongodb.net:27017/ecommerce?ssl=true&replicaSet=devstack-0-shard-0&authSource=admin';
let localhost = 'mongodb://localhost/cake-commerce';
mongoose.connect(uri)


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

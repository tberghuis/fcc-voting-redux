require('dotenv').config();

var fs = require('fs'),
  http = require('http'),
  path = require('path'),
  methods = require('methods'),
  express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  cors = require('cors'),
  passport = require('passport'),
  errorhandler = require('errorhandler'),
  mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

// app.use(require('morgan')('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(require('method-override')());
//app.use(express.static(__dirname + '/public'));

//console.log('SECRET',process.env.SESSION_SECRET);
// study what the options do....

// this session shit is not even relevant...
// ok, post a bug report asking why it exists?
//app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

mongoose.connect(process.env.MONGODB_URI);
// if (!isProduction) {
//   // mongoose.set('debug', true);
// }


require('./models/User');

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// TODO add index.js to routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);



/// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
var server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});

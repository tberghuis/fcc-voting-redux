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

// npm i -S fs http path methods express body-parser express-session cors passport errorhandler mongoose 

var isProduction = process.env.NODE_ENV === 'production';

var app = express();

app.use(cors());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.use(require('method-override')());
//app.use(express.static(__dirname + '/public'));

//app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

mongoose.connect(process.env.MONGODB_URI);
if (!isProduction) {
  // mongoose.set('debug', true);
}


require('./models/User');

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

//app.use(require('./routes'));
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( process.env.PORT || 4000, function(){
  console.log('Listening on port ' + server.address().port);
});

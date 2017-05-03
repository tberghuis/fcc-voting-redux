var express = require('express');
var router = express.Router();
// var bcrypt = require('bcryptjs');
// var jwt = require('jsonwebtoken');

// should i be passing passport in as a parameter?
var  passport = require('passport');

var User = require('../models/User');




router.get('/login', function (req, res, next) {
    res.send('hello');
});



module.exports = router;


// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });

router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


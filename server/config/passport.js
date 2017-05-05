var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));

// passport.use(new FacebookStrategy({
//         clientID: process.env.FACEBOOK_CLIENTID,
//         clientSecret: process.env.FACEBOOK_CLIENTSECRET,
//         callbackURL: process.env.SERVER_BASE + '/auth/login/facebook/return',
//         profileFields: ['email']
//     //enableProof: true
//     },
//     function (accessToken, refreshToken, profile, cb) {
//         return cb(null, profile);
//     }));

// passport.serializeUser(function (user, cb) {
//     console.log('serializeUser',user);  
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     console.log('deserializeUser',user);
//     cb(null, obj);
// });


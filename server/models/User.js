var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');
// var crypto = require('crypto');
// var jwt = require('jsonwebtoken');
// var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
}, {timestamps: true});

// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// UserSchema.methods.generateJWT = function() {
//   var today = new Date();
//   var exp = new Date(today);
//   exp.setDate(today.getDate() + 60);

//   return jwt.sign({
//     id: this._id,
//     username: this.username,
//     exp: parseInt(exp.getTime() / 1000),
//   }, secret);
// };

// UserSchema.methods.toAuthJSON = function(){
//   return {
//     username: this.username,
//     email: this.email,
//     token: this.generateJWT()
//   };
// };

// UserSchema.methods.toProfileJSONFor = function(user){
//   return {
//     username: this.username,
//     bio: this.bio,
//     image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
//     following: user ? user.isFollowing(this._id) : false
//   };
// };

module.exports = mongoose.model('User', UserSchema);

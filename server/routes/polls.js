var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');
var authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware.required, function (req, res, next) {
    console.log('post', req.body);
});

module.exports = router;

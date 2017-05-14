var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var Poll = mongoose.model('Poll');
var authMiddleware = require('../middleware/auth');

router.post('/create', authMiddleware.required, function (req, res, next) {
    //console.log('post', req.body);

    // TODO mongoose schema to deny bad input through config
    // it would be a thankless job...
    // main focus is endtoend working example

    //console.log('user', req.payload);
    //req.payload.id

    User.findById(req.payload.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var votes = new Array(req.body.options.length).fill(0);

        var poll = new Poll({
            title: req.body.title,
            options: req.body.options,
            votes,
            owner: user
        });
        poll.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.polls.push(result);
            user.save();


            //console.log(result);

            let pollResponse = {};
            pollResponse.id = result._id;
            pollResponse.votes = result.votes;
            pollResponse.title = result.title;
            pollResponse.options = result.options;
            res.status(201).json({
                message: 'Saved poll',
                poll: pollResponse
            });
        });
    });


});

module.exports = router;

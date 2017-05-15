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

    User.findById(req.user.id, function (err, user) {
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
            pollResponse.userHasVoted = false;
            res.status(201).json({
                message: 'Saved poll',
                poll: pollResponse
            });
        });
    });


});

function getUserIP(req) {
    return req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

router.get('/:id', authMiddleware.optional, function (req, res, next) {



    // rewrite with promises
    Poll.findById(req.params.id).exec()
        .then(poll => {
            //console.log('poll', poll);
            // so i want to pass poll and userHasVoted

            let userHasVoted = false;

            // not auth
            if (!req.user || !req.user.id) {

                if (poll.ipsVoted.indexOf(getUserIP(req)) > -1) {
                    userHasVoted = true;
                }

            } else if (poll.usersVoted.indexOf(req.user.id) > -1) {
                userHasVoted = true;
            }

            // now send
            let pollResponse = {};
            pollResponse.id = poll._id;
            pollResponse.votes = poll.votes;
            pollResponse.title = poll.title;
            pollResponse.options = poll.options;
            pollResponse.userHasVoted = userHasVoted;
            res.status(201).json({
                message: 'Saved poll',
                poll: pollResponse
            });
        })
        .catch(error => {
            res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        });
});


router.post('/:id', authMiddleware.optional, function (req, res, next) {

    console.log('post /polls', req.body);

    // stuff validation for now
    // would need to validate req.body fields in real app

    let userId = req.user ? req.user.id : null;
    let userIP = getUserIP(req);

    Poll.findById(req.params.id, (error, poll) => {
        if (error) {
            return res.status(500).json({
                title: 'An error occurred',
                error
            });
        }

        if (poll.usersVoted.indexOf(userId) > -1) {
            // should i send error... probably
            return res.status(412).json({
                title: 'User has already voted on this poll'
            });
        } else if (poll.ipsVoted.indexOf(userIP) > -1) {
            return res.status(412).json({
                title: 'User at IP ' + userIP + ' has already voted on this poll'
            });
        }

        // add user id to usersVoted
        if (userId) {
            poll.usersVoted.push(userId);
            poll.markModified("usersVoted");
        } else {
            poll.ipsVoted.push(userIP);
            poll.markModified("ipsVoted");
        }

        if (req.body.optionIndex === 'newoption') {
            poll.options.push(req.body.newOption);
            poll.markModified("options");
            poll.votes.push(1);
        }
        else {
            poll.votes[req.body.optionIndex]++;
        }

        poll.markModified("votes");

        poll.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            let pollResponse = {};
            pollResponse.id = result._id;
            pollResponse.votes = result.votes;
            pollResponse.title = result.title;
            pollResponse.options = result.options;
            pollResponse.userHasVoted = true;

            res.status(201).json({
                message: 'voted on poll',
                poll: pollResponse
            });
        });


    });


    // put getUserIp into function

});



module.exports = router;

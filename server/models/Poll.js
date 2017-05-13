var mongoose = require('mongoose');

var User = require('./User');

var PollSchema = new mongoose.Schema({
    title: { type: String, required: true },
    options: [String],
    votes: [Number],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    usersVoted: [String],
    ipsVoted: [String]
});

PollSchema.post('remove', function (poll) {
    User.findById(poll.owner, function (err, user) {
        user.polls.pull(poll);
        user.save();
    });
});

module.exports = mongoose.model('Poll', PollSchema);

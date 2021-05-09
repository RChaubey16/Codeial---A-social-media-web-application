const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },

    // comments belong to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    // comments are made on a post
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
}, {
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment
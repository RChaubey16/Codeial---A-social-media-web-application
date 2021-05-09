const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    content:{
        type: String, 
        required: true
    },

    // Establidhing relationship among user and posts
    user:{

        // takes the ObjectId of the logged in user who's making the post from the db 
        type: mongoose.Schema.Types.ObjectId,
        // takes the name of the Schema being followed by the user for other details
        ref: 'User'
    },

    // every post has alot of comments from the diff users, hence an array of comments made by diff users 
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post
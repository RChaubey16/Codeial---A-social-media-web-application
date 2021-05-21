// module.exports.actionName = function(req, res){}

const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function(req, res){                     // aynchronous function

    // use of cookies and alteration of cookies in both browser and server. Just an example
    // console.log(req.cookies);
    // res.cookie('something', 'hey!');
    // res.cookie('user_id', 22);


    // finding and displaying all the posts
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Populate the user of each post

    try {
        let posts = await Post.find({})                     // await the query
        .populate('user')                                   // user who is posting the post 
        .populate({
            path: 'comments',
            populate: {
                path: 'user'                                // user who is commenting on the post
            }
        });

        let users = await User.find({});                    // await the query

        return res.render('home', { 
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log("Error : ", err);
        return;
    }

}

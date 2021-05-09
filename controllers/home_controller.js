// module.exports.actionName = function(req, res){}

const Post = require("../models/post");

module.exports.home = function(req, res){

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
    Post.find({}).populate('user').exec(
        function (err, posts) {
            return res.render('home', { 
                title: "Codeial | Home",
                posts: posts
            });
        }
    )

}

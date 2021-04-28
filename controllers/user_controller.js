const { connection } = require('mongoose');
const User = require('../models/user');

module.exports.profile = function(req, res){

    return res.render('user_profile', {
        title: "Profile"
    })

}


// render the sign-up page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}


// render the sign-in page
module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the signUp data
module.exports.create = function(req, res){
    console.log(req.body);
    // To check if password and confirm password are same
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // To check whether the user already exists or not
    User.findOne({email: req.body.email}, function (err, user){
        if (err){console.log("Error in finding user while sign up"); return }

        // if user not found then create
        if(!user){
            User.create(req.body, function(err, user){
                if (err){console.log("Error in creating user while sign up"); return }

                return res.redirect('/users/sign-in');

            });
        }else { // if user is present   
            return res.redirect('back');
        }
    });


}

// sign-in and create a session for the users
module.exports.createSession = function(req, res){
    // TODO
}
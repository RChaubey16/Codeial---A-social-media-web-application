const { connection } = require('mongoose');
const User = require('../models/user');

module.exports.profile = function(req, res){

    
    // to check whether the user is authenticated or not
    if (req.cookies.user_id){

        // if yes, then find the user with the help of the id and then print the user details
        User.findById(req.cookies.user_id, function (err, user){

            if(err){ console.log('error in finding the user'); return }

            if (user){
                // user found print the user details on the profile page
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                });
            }

            // if not found then redirect to user sign in page
            return res.redirect('/users/sign-in');
        });
    }else{
        // if user is not authenticated then redirect to user sign in page
        return res.redirect('/users/sign-in');
    }

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
      // steps to authenticate
    // find user

    User.findOne({email: req.body.email}, function(err, user){

        if (err){console.log("Error in finding user while sign up"); return }

        // handle user found
        if (user){

            // handle passwords that don't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }else{
            // handle user not found
            return res.redirect('back')
        }

    });
}
// require passport library
const passport = require('passport');
// require passport-local strategy
const LocalStrategy = require('passport-local');

// require the user collection from db
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy ({
        usernameField: 'email',
        passReqToCallback: true
    }, 
    function(req, email, password, done){
        User.findOne({email: email}, function(err, user){
            if (err){
                req.flash('error', err);
                return done(err);
            }

            if (!user || user.password != password){
                req.flash('error', 'Inavalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }

));


// once authnetication is successful then we need to serialize the user i.e we need to decide which key of the user-details is to be kept in the cookie
passport.serializeUser(function (user, done) {
    return done(null, user.id); 
});

// when the serialization is done then when the user makes the request, we need to deserialize the user from the key in the recieved cookie from the user-browser
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err){
            console.log("Error in finding the user --> passport");
            return done(err);
        }

        return done(null, user);
    })
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    
    // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

// exporting the file for further usage
module.exports = passport;
// require passport library
const passport = require('passport');
// require passport-local strategy
const LocalStrategy = require('passport-local');

// require the user collection from db
const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy ({
        usernameField: 'email'
    }, 
    function(email, password, done){
        User.findOne({email: email}, function(err, user){
            if (err){
                console.log("Erroe in finding the user --> passport");
                return done(err);
            }

            if (!user || user.password != password){
                console.log("Invalid username/password");
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

// exporting the file for further usage
module.exports = passport;
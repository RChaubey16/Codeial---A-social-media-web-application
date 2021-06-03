const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
  // Header has a list of key in which there is a key "authorization". Futher authorization also has a list of key in which there is a key called "Bearer" which will contain the JWT token
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,

  // secret contains the key using which the encryption and decryption of token takes place
  secretOrKey: "codeial",
};

passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    User.findById(jwtPayload._id, function (err, user) {
      if (err) {
        console.log(err);
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;

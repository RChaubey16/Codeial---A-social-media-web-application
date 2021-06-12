const User = require("../models/user");
const fs = require("fs");
const path = require("path");

// lets keep it same as before
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    return res.render("user_profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  if (req.user.id == req.params.id) {
    let user = await User.findById(req.params.id);
    User.uploadedAvatar(req, res, function (err) {
      if (err) {
        return console.log("Error", err);
      }

      user.name = req.body.name;
      user.email = req.body.email;

      if (req.file) {
        if (req.file) {
          fs.unlinkSync(__dirname, "..", user.avatar);
        }

        // this is saving the path of uploaded file into avatar field in the user
        user.avatar = User.avatarPath + "/" + req.file.filename;
      }

      user.save();
      req.flash("success", "Profile Updated.");
      return res.redirect("back");
    });
  } else {
    req.flash("error", "Unauthorized");
    return res.status(401).send("UNauthorized");
  }
};

// render the sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    // making sure if only the signed out users are able to view the sign up page and not the signed in ones
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// render the sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    // making sure if only the signed out users are able to view the sign in page and not the signed in ones
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// get the signUp data
module.exports.create = function (req, res) {
  console.log(req.body);
  // To check if password and confirm password are same
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  // To check whether the user already exists or not
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding user while sign up");
      return;
    }

    // if user not found then create
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user while sign up");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      // if user is present
      req.flash("success", "You have signed up, login to continue!");
      return res.redirect("back");
    }
  });
};

// sign-in and create a session for the users
module.exports.createSession = function (req, res) {
  // creating a flash message

  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash("success", "You have logged out!");

  return res.redirect("/");
};

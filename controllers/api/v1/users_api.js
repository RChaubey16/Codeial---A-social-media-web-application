const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.json(422, {
        message: "Invalid username/password",
      });
    }

    return res.json(200, {
      message: "Sign in successfull, here is your token please keep it safe",
      data: {
        // token creation. the user.toJSON part is user info and will be encrypted using the key "codeial"
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: "10000000" }),
      },
    });
  } catch (err) {
    console.log("error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};

const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
  try {
    // likeable will hold the post or comment on which the like is made on
    let likeable;
    // deleted will be used to check, if the likeable post or comment is already liked or not.
    let deleted = false;

    // if post is liked
    if (req.query.type == "Post") {
      // .populate('likes') will fetch the likes that are already made on the likeable post or comment
      likable = await Post.findById(req.query.id).populate("likes");
    } else {
      // else if comment is liked
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    // get the like
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user,
    });

    // if like exists on likeable post or comment, remove it from likeable likes array and delete the existinglike and make deleted as true
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      existingLike.remove();
      deleted = true;
    } else {
      // else create a new like in Like schema and push it into the likable post or comment's array
      let newLike = await Like.create({
        user: req.user,
        likeable: req.query.id,
        onModel: req.query.type,
      });

      likeable.likes.push(newLike._id);
      likeable.save();
    }
  } catch (error) {
    console.log(err);
    return res.json(200, {
      message: "Request Successfull",
      data: {
        deleted: deleted,
      },
    });
  }
};

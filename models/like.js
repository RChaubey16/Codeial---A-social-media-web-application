const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // this defines the object Id of the liked object(post, comment)
    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
      type: String,
      required: true,
      // enum says, Like belongs to either post or comment model
      enum: ["Post", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

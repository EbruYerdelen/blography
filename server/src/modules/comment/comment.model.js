const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //indicate which post the comment is associated with.
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required:true
  },
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);
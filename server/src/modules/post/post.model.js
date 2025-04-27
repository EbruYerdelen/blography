const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
});

module.exports = mongoose.model("Post", PostSchema);

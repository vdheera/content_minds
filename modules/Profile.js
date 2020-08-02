const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  bio: {
    type: String,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

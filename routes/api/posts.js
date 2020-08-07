const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../modules/User");
const Post = require("../../modules/Post");
const Community = require("../../modules/Community");
const { check, validationResult } = require("express-validator");

// @route POST /posts/:communityid
//@desc Create a post to a specific community
//@access Private
router.post(
  "/:communityid",
  [
    auth,
    [
      check("topic", "topic is required").not().isEmpty(),
      check("body", "body is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const community = await Community.findById(req.params.communityid);
      const newPost = new Post({
        topic: req.body.topic,
        body: req.body.body,
        user: user,
        community: community,
      });
      const post = newPost.save();
      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /posts/:id
//@desc Get a specific post based by ID
//@access Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

// @route DELETE /post:id
//@desc delete a specific post
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //gets all dates by newest firt
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //Check to make sure the logged in user is the one who the deleted post belongs to
    if (post.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this post" });
    }
    await post.remove();
    return res.json({ msg: "Successfully deleted post" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});
// @route PUT /post/like:id
//@desc Like a specific post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post already been liked by this user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    } else if (post.user.toString() === req.user.id) {
      return res.status(400).json({ msg: "You can't like your own post" });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json({ msg: "Successfuly liked post", likedby: post.likes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT /post/unlike:id
//@desc Unlike a specific post
//@access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Check if the post already been liked by this user
    if (post.user.toString() === req.user.id) {
      return res.status(400).json({ msg: "You can't unlike your own post" });
    } else if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "Post has not been liked yet, so you can't unlike it" });
    }
    //Get Remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    //Remove that index from likes
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json({ msg: "Successfuly unliked post", likedby: post.likes });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /posts/comment/:id
//@desc Add a comment
//@access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      const newComment = {
        text: req.body.text,
        user: user,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json({ msg: "Successfully added comment", comments: post.comments });
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /posts/comment/:postid/:commentid
//@desc Delete a comment
//@access Private
router.delete("/comment/:postid/:commentid", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postid);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.commentid
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User is not authorized to delete this comment" });
    }
    //Make sure comment exists

    //Check user

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    //Remove that index from likes
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json({ msg: "Successfuly deleted comment", comments: post.comments });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

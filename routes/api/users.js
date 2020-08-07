const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../modules/User");
const Post = require("../../modules/Post");

// @route POST /users
//@desc Register User
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with atleast 8 characters"
    ).isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET /users
//@desc Get all users
//@access Public
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET /users/:userid
//@desc Get a specific users's profile (including user info, posts, likes and comments)
//@access Private

//in the future, need to only get posts from a specific community, not
router.get("/:userid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.userid);
    const createdPosts = await Post.find({ user: req.params.userid });
    const likedPosts = await Post.find({ likes: { user: req.params.userid } });
    const commentedPosts = await Post.find({
      comments: { user: req.params.userid },
    });
    res.json({
      user: user,
      posts: createdPosts,
      liked: likedPosts,
      comments: commentedPosts,
    });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route delete /users/:userid
//@desc Delete a specific user and their account
//@access Public
router.delete("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    await user.remove();
    return res.json({ msg: "Successfully deleted your account" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../modules/User");
const Community = require("../../modules/Community");
const Post = require("../../modules/Post");

// @route GET /communities
//@desc Get all communities
//@access Public
router.get("/", async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST /communities
//@desc Create a community
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "name is required").not().isEmpty(),
      check("description", "description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newCommunity = new Community({
        name: req.body.name,
        description: req.body.description,
        user: user,
      });
      const community = newCommunity.save();
      res.json(newCommunity);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /communities/:communityid
//@desc Delete a specific community
//@access Private
router.delete("/:communityid", auth, async (req, res) => {
  try {
    //gets all dates by newest firt
    const community = await Community.findById(req.params.communityid);
    if (!community) {
      return res.status(404).json({ msg: "Community not found" });
    }
    //Check to make sure the logged in user is the one who the deleted post belongs to
    if (community.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this community" });
    }
    await community.remove();
    return res.json({ msg: "Successfully deleted community" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route GET /communities/:communityid
//@desc Get all posts for a specific communitiy
//@access Public
router.get("/:communityid", async (req, res) => {
  try {
    const posts = await Post.find({ community: req.params.communityid })
      .sort({
        date: -1,
      })
      .populate("user");
    console.log(posts);
    if (!posts) {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Community not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// import Post model
const Post = require("../../models/Post");
// import Profile model
const Profile = require("../../models/Profile");

// import validator file
const validatePostInput = require("../../validators/post");

// @rout    GET /api/post/test
// @desc    test post routes
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "post works"
  })
);

// @rout    GET /api/post
// @desc    Get all posts
// @access  public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostsfound: "No posts found", err })
    );
});

// @rout    GET /api/post/:id
// @desc    Get post by id
// @access  public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostsfound: "No post found by this ID", err })
    );
});

// @rout    POST /api/post
// @desc    Add post
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check for validation errors
    if (!isValid) {
      // if any errors send status 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @rout    DELETE /api/post/:id
// @desc    Delete post by id
// @access  private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(Profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "Not authorized for this task" });
          }

          // delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ nopostfound: "No post found" }));
    });
  }
);

// @rout    POST /api/post/like/:id
// @desc    like post by id
// @access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(Profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "This post is already liked" });
          }

          // like post
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ nopostfound: "No post found", err })
        );
    });
  }
);

// @rout    POST /api/post/unlike/:id
// @desc    Unlike post by id
// @access  private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(Profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ anotliked: "This post is not liked" });
          }
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.params.id);

          // remove like
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ nopostfound: "No post found", err })
        );
    });
  }
);

module.exports = router;

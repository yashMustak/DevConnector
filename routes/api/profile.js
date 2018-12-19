const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load profile model
const Profile = require("../../models/Profile");
// load user model
const User = require("../../models/Users");

// import validators
const validateProfileInput = require("../../validators/profile");

// @rout    GET /api/profile/test
// @desc    test profile routes
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "profile works"
  })
);

// @rout    GET /api/profile
// @desc    get current user's profie
// @access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status.json(err));
  }
);

// @rout    POST /api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
});

// @rout    POST /api/profile/:handle
// @desc    Show user profile by handle
// @access  Public
router.get("/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile exists for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @rout    POST /api/profile/:user_id
// @desc    Show user profile by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "No profile exists for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @rout    POST /api/profile
// @desc    create or update user profile
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};

    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    //skills
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          //update
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => res.json(err));
        } else {
          // create

          // check for handle
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = "The handle already exists!";
                res.status(400).json(errors);
              }
              // save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            })
            .catch(err => res.json(err));
        }
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;

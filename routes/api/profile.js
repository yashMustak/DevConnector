const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load profile model
const Profile = require("../../models/Profile");
// load user model
const User = require("../../models/Users");

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

module.exports = router;

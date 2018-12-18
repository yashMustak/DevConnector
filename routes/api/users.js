const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport"); // To create protected routes

// import User model
const User = require("../../models/Users");

// @rout    GET /api/users/test
// @desc    test users routes
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "user works"
  })
);

// @rout    GET /api/users/register
// @desc    registration page for user
// @access  public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists!" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @rout    GET /api/users/login
// @desc    Login user or return JWT token
// @access  public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email ID
  User.findOne({ email }).then(User => {
    if (!User) {
      return res.status(404).json({ email: "User not found!" });
    }

    bcrypt.compare(password, User.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: User.id, name: User.name, avatar: User.avatar };

        // Sign Token
        jwt.sign(payload, keys.secretKey, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        return res.status(400).json({ password: "Incorrect password!" });
      }
    });
  });
});

// @rout    GET /api/users/current
// @desc    Page to get varified details of user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;

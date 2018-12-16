const express = require("express");
const router = express.Router();

// @rout    GET /api/users/test
// @desc    test users routes
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "user works"
  })
);

module.exports = router;

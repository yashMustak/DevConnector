const express = require("express");
const router = express.Router();

// @rout    GET /api/profile/test
// @desc    test profile routes
// @access  public
router.get("/test", (req, res) =>
  res.json({
    msg: "profile works"
  })
);

module.exports = router;

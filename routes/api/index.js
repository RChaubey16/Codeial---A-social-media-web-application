const express = require("express");
const router = express.Router(); // used to differentiate between routes and controller

router.use("/v1", require("./v1"));
router.use("/v2", require("./v2"));

module.exports = router;

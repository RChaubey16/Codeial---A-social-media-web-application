const express = require("express");
const router = express.Router();
const postApi = require("../../../controllers/api/v1/posts_api");

router.get("/posts", require("./posts"));

module.exports = router;

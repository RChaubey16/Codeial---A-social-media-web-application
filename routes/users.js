const express = require("express");
const router = express.Router();
// accessong users controller file
const usersController = require("../controllers/users_controller");

router.get("/profile", usersController.profile);

module.exports = router
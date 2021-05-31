const express = require("express");
const router = express.Router(); // used to differentiate between routes and controller
const homeController = require("../controllers/home_controller");

console.log("Router Loaded");

router.get("/", homeController.home);
router.use("/posts", require("./post"));
router.use("/users", require("./user"));
router.use("/contact", require("./contact"));
router.use("/comments", require("./comment"));

router.use("/api", require("./api"));

// for any further routes, access from here
// router.use("/routerName", require('./routerFile'));

// router.get("/profile", homeController.profile);

module.exports = router;

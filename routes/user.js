const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
// when the create-session request is made then first the authenticattion is done to authenticate the user, if it is successful the the user controller is executed
router.post("/create-session", passport.authenticate('local', {failureRedirect: "/users/sign-in"}) , userController.createSession);
router.get("/sign-out", userController.destroySession);

module.exports = router;
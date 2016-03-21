var express = require('express');
var passport = require("passport");
var FacebookStrategy = require("passport-facebook").Strategy;
var router = express.Router();

passport.use("facebook", new FacebookStrategy({
        clientID: "120676024994652",
        clientSecret: "c03d14ba14bafdb04963ee7d282a1a21",
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        cb(null, profile);
    }
));

passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(obj, done){
   done(null, obj);
});

router.get("/fail", function (req, res, next) {
    res.render("error", {message: "Something went wrong", error: {}})
});

router.get('/facebook', passport.authenticate("facebook"));

router.get("/facebook/callback", passport.authenticate("facebook", {failureRedirect: "/auth/fail"}),
    function (req, res) {
        debugger;
    });

module.exports = router;

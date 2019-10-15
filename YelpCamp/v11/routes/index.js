var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/users");

//root route
router.get("/", (req, res) => {
	res.render("landing");
});

//Show Register form
router.get("/register", (req, res) => {
	res.render("register", {page: 'register'});
});

//handle signup 
router.post("/register", (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	User.register(new User({username}), password, (err, user) => {
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
			req.flash("success", "Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//SHOW LOGIN FORM
router.get("/login", (req, res) => {
	res.render("login", {page: 'login'});
});

//HANDLE USER LOGIN
router.post("/login", passport.authenticate("local", 
		{	successRedirect: "/campgrounds", successFlash:  "Hey! Welcome Back",
			failureRedirect: "/login", failureFlash: "Invalid username or password."	
		}), (req, res) => {
		});

//LOGOUT ROUTE
router.get("/logout", (req, res) => {
	req.logout();
	req.flash("success", "Logged Out !");
	res.redirect("/campgrounds");
});


module.exports = router;
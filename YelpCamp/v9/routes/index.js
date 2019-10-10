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
	res.render("register");
});

//handle signup 
router.post("/register", (req, res) => {
	var username = req.body.username;
	var password = req.body.password;
	User.register(new User({username}), password, (err, user) => {
		if(err){
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, () => {
			res.redirect("/campgrounds");
		});
	});
});

//SHOW LOGIN FORM
router.get("/login", (req, res) => {
	res.render("login");
});

//HANDLE USER LOGIN
router.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login"}), (req, res) => {
});

//LOGOUT ROUTE
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login"); 
}

module.exports = router;
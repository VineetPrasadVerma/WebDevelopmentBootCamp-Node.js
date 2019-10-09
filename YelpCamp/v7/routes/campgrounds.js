var express = require("express");
var router = express.Router();
var Campground = require("../models/campground"); 	

//INDEX ROUTE
router.get("/", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE ROUTE
router.post("/", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	//Create a new campgroud and save it to database
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
	
});

//NEW ROUTE - show form to create campground.
router.get("/new", (req, res) => {
	res.render("campgrounds/new");
});

//SHOW ROUTE- show desc about particular campground
router.get("/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

module.exports = router;

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground"); 	
var middleware = require("../middleware");


//INDEX ROUTE
router.get("/", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author};
	//Create a new campgroud and save it to database
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
			req.flash("error", "Oops! Something went wrong. Please try again !!");
			console.log(err);
		}else{
			req.flash("Campground added successfully !");
			res.redirect("/campgrounds");
		}
	});
	
});

//NEW ROUTE - show form to create campground.
router.get("/new", middleware.isLoggedIn, (req, res) => {
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

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		res.render("campgrounds/edit", {campground: foundCampground});
	});	
});

//UPDATE ROUTE 
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=> {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
		if(err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
	Campground.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Campground Deleted")
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;

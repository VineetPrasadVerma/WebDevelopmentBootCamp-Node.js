var express = require("express"),	
		app = express(), 
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
 Campground = require("./models/campground"),
 	 seedDB = require("./seeds.js");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
// 	{
// 		name: "Shimla Hill's", 
// 		image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-											 		 				1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
// 		description: "Beautiful Natural Views. Food, Water is available."
// 	}, (err, campground) => {
// 		if(err){
// 			console.log(err);
// 		}else{
// 			console.log("Campground Created");
// 			console.log(campground)
// 		}
// 	} 
// );

app.get("/", (req, res) => {
	res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		}else{
			res.render("index", {campgrounds: allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE ROUTE
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

//SHOW ROUTE- show desc about particular campground
app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id, (err, foundCampground) => {
		if(err){
			console.log(err);
		}else{
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen("3000", () => {
	console.log("YelpCamp server has started");
});

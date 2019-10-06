var express = require("express"),	
		app = express(), 
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
 Campground = require("./models/campground"),
    Comment = require("./models/comment"),
 	 seedDB = require("./seeds.js");

mongoose.connect("mongodb://localhost/yelp_camp_v", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
seedDB();

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
			res.render("campgrounds/index", {campgrounds: allCampgrounds});
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
	res.render("campgrounds/new");
});

//SHOW ROUTE- show desc about particular campground
app.get("/campgrounds/:id", (req, res) => {
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//========
//COMMENTS ROUTES
//========

app.get("/campgrounds/:id/comment/new", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});	
		}
	});
});

app.post("/campgrounds/:id/comments", (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment, (err, comment) => {
				if(err){
					console.log(err);
				}else{
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/"+campground._id);
				}
			});
		}
	});
});

app.listen("3000", () => {
	console.log("YelpCamp server has started");
});

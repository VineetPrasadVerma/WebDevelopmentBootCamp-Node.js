var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
// 	{
// 		name: "Shimla Hill's", 
// 		image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-											 		 				1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
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

app.get("/campgrounds", (req, res) => {
	Campground.find({}, (err, allCampgrounds) => {
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds", {campgrounds: allCampgrounds});
		}
	});
	// res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image};
	//Create a new campgroud and save it to database
	Campground.create(newCampground, (err, newlyCreated) => {
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
	
});

app.get("/campgrounds/new", (req, res) => {
	res.render("new");
});

app.listen("3000", () => {
	console.log("YelpCamp server has started");
});

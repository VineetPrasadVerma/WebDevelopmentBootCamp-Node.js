var express   = require("express"),	
		app   = express(), 
 bodyParser   = require("body-parser"),
   mongoose   = require("mongoose"),
  passport    = require("passport"),
LocalStrategy = require("passport-local"),
 Campground   = require("./models/campground"),
    Comment   = require("./models/comment"),
	   User   = require("./models/users"),
 	 seedDB   = require("./seeds.js");

mongoose.connect("mongodb://localhost/yelp_camp_v6", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Feleen is cute",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	next();
});

app.get("/", (req, res) => {
	res.render("landing");
});

//INDEX ROUTE
app.get("/campgrounds", (req, res) => {
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

app.get("/campgrounds/:id/comment/new", isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) => {
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});	
		}
	});
});

app.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
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

//==========
//AUTH ROUTES
//==========

//Show Register form
app.get("/register", (req, res) => {
	res.render("register");
});

//handle signup 
app.post("/register", (req, res) => {
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
app.get("/login", (req, res) => {
	res.render("login");
});

//HANDLE USER LOGIN
app.post("/login", passport.authenticate("local", { successRedirect: "/campgrounds", failureRedirect: "/login"}), (req, res) => {
});

//LOGOUT ROUTE
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login"); 
}
app.listen("3000", () => {
	console.log("YelpCamp server has started");
});

var express   = require("express"),	
		app   = express(), 
 bodyParser   = require("body-parser"),
   mongoose   = require("mongoose"),
   passport   = require("passport"),
LocalStrategy = require("passport-local"),
 Campground   = require("./models/campground"),
    Comment   = require("./models/comment"),
	   User   = require("./models/users"),
 	 seedDB   = require("./seeds.js");

//requiring routes
var campgroundRoutes = require("./routes/campgrounds"),
	   commentRoutes = require("./routes/comments"),
	     indexRoutes = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp_v9", {useUnifiedTopology: true, useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
//seedDB();

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

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen("3000", () => {
	console.log("YelpCamp server has started");
});

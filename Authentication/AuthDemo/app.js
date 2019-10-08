          var express = require("express"),
 	              app = express(),
             mongoose = require("mongoose"),
             passport = require("passport"),
           bodyParser = require("body-parser"),
        LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
			     User = require("./models/user"); 
   
mongoose.connect("mongodb://localhost/auth_demo_app", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret:"Feleena is Love",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=========
//ROUTES
//=========

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/secret", isLoggedin, (req, res) => {
	res.render("secret");
});

//Auth Routes
//Show signup form
app.get("/register", (req, res) => {
	res.render("register");
});

//handling User sign up
app.post("/register", (req,res) => {
	var username = req.body.username;
	var password = req.body.password;
	
	User.register(new User({username}), password, (err, user)=> {
		if(err){
			console.log(err);
			return res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
		
	});
});

//handling user login
app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", passport.authenticate("local", {
	successRedirect: "/secret", failureRedirect: "/login"}),
	(req, res) => {
	
});

//handling user logout
app.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

function isLoggedin(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

app.listen(3000, () => {
	console.log("Server Started");
});
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

app.use(require("express-session")({
	secret:"Feleena is Love",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
	res.render("home");
});

app.get("/secret", (req, res) => {
	res.render("secret");
});

app.listen(3000, () => {
	console.log("Server Started");
});
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); 
app.set("view engine", "ejs");

var friends = ["Vineet", "Vikas", "Seema"];

app.get("/", (req, res) => {
	res.render("home");
});	

app.get("/fellinlovewith/:thing", (req, res) => {
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
});

app.get("/posts", (req, res) => {
	var posts = [
		{title: "Captain Jack", author:"Vineet"},
		{title: "Evolution", author:"Vikas"},
		{title: "Tobuild family", author:"Vinay"}
	]	
	
	res.render("posts", {posts: posts});
	
});

app.get("/friends", (req, res) => {
	res.render("friends", {friends: friends});
});

app.post("/addfriend", (req, res) => {
	friends.push(req.body.newfriend);
	res.redirect("/friends");
});

app.listen(3000, () => {
	console.log("Server has started");
});
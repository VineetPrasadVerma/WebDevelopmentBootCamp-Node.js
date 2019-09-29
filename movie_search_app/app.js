var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("search");
});

app.get("/results", (req, res) => {
	var movieName = req.query.search;
	var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + movieName;
	request(url, (error, response, body) => {
		if(!error && response.statusCode === 200){
			var result = JSON.parse(body);
			res.render("results", {result: result});
		}
	});
});

app.listen(3000, () => {
	console.log("Movie app has started.");
});
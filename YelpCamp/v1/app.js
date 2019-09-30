var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("landing");
});

app.get("/campgrounds", (req, res) => {
	var campgrounds = [
		{name: "Leh Laddakh Camp", image:"https://images.unsplash.com/photo-1440262206549-8fe2c3b8bf8f?ixlib=rb-								1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Shimla Hill's", image:"https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-									1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Rohtang Pass", image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-									1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "Himalayan Range Hills", image:"https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-							1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
		{name: "kullu Campers", image:"https://images.unsplash.com/photo-1536065018553-5b54b5df1b1d?ixlib=rb-									1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}
	];
	
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen("3000", () => {
	console.log("YelpCamp server has started");
});

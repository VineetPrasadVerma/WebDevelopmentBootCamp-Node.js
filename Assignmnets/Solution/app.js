var express = require("express");
var app = express();

app.get("/", (req, res) => {
	res.send("Hi there, welcome to Vineet's page");
});

app.get("/speak/:animal", (req, res) => {
	var resStr = "Write any Animal Name";
	var sounds = {
		pig: "Oink",
		cow: "Moo",
		dog: "Woof Woof",
		cat: "Meow"
	}
	var animalName = req.params.animal.toLowerCase();
	var sound = sounds[animalName];
	resStr = "The " +animalName+ " says '" + sound + "'.";
	res.send(resStr)
});

app.get("/repeat/:word/:noOfTimes", (req, res) => {
	var word = req.params.word;
	var noOfTimes = Number(req.params.noOfTimes);
	var resStr = "Type word and Number Only";
	for(var i=0; i<noOfTimes; i++){
		resStr += word + " ";
	}
	
	res.send(resStr);
});

app.get("*", (req, res) => {
	res.send("Page not found");
});

app.listen(3000, () => {
	console.log("server has started on port 3000");
});
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useUnifiedTopology: true, useNewUrlParser: true});

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var feleena = new Cat({ 
// 	name:"Feleena",
// 	age:2,
// });


// feleena.save((err, cat) => {
// 	if(err){
// 		console.log("Something wennt wrong");
// 	}else{
// 		console.log("We just saved a  cat to db");
// 		console.log(cat);
// 	}
// });

// Cat.create({
// 	name:"SnowWhite",
// 	age: 15,
// 	temperament: "Nice"
// }, (err, cat) => {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(cat);
// 	}
// });


Cat.find({}, (err, cats) => {
	if(err){
		console.log("ERROR");
		console.log(err);
	}else{
		console.log("All Cats");
		console.log(cats);
	}
});
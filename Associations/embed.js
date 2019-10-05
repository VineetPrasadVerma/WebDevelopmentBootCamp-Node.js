var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true});

//POST - title, content
var postSchema = new mongoose.Schema({
	title: String,
	content: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
	email: String,
	name: String,
	posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
// 	email:"hermoine@gmail.com",
// 	name:"Hermoine"
// });

// newUser.posts.push({
// 	title: "Potion",
// 	content: "How to make potion"
// });

// newUser.save( (err, user) => {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

User.findOne({name: "Hermoine"}, (err, user) => {
	if(err){
		console.log(err);
	}else{
		user.posts.push({
			title:"bobby",
			content:"ullu"
		});	
		user.save( (err, user) => {
			if(err){
				console.log(err);
			}else{
				console.log(user);
			}
		});
	}
});

// User.create({
// 	email:"vineet@gmail.com",
// 	name:"Vineet Prasad",
// 	posts: [{
// 		title:"tttttt",
// 		content:"ggggg"
// 	}]
// 	}, (err, user) => {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });


// Post.create({
// 	title: "Who am i ?",
// 	content: "I am Vineet Verma"
// }, (err, post) => {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(post);
// 	}
// });



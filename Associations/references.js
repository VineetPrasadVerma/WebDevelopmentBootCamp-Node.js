var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true});

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
	post: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post"
	}]
});

var User = mongoose.model("User", userSchema);

// User.create({
// 	email:"vineet@gmail.com",
// 	name:"Vineet"
// });

// Post.create({
// 	title:"Blah blah 3",
// 	content: "balh balh"
// }, (err, post) => {
// 	User.findOne({name: "Vineet"}, (err, foundUser) => {
// 		if(err){
// 			console.log(err);
// 		}else{
// 			foundUser.post.push(post);
// 			foundUser.save((err, data) => {
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log(data);
// 				}
// 			});
// 		}
// 	});
// });

// User.findOne({name: "Vineet"}).populate("post").exec((err, user)=> {
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(user);
// 	}
// });

User.find({}, (err, users) => {
	console.log(users);
});


var express    = require("express"),
	app        = express(),
	bodyParser = require("body-parser"),
	mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/restful_blog_app", {useUnifiedTopology: true, useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL ROUTES
app.get("/", (req, res) => {
	res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
	Blog.find({}, (err, blogs) => {
		if(err){
			console.log(err);
		}else{
			res.render("index", {blogs: blogs});
		}
	});
});


app.listen(3000, () => {
	console.log("Blog server has started");
});

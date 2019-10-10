var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 						labore et dolore magna aliqua." 
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 						labore et dolore magna aliqua."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 						labore et dolore magna aliqua."
    }
]

function seedDB(){
	//Remove Campground
	Campground.deleteMany({}, (err) => {
		if(err){
			console.log(err);
		}
		console.log("Campground Removed");
		//Add new campground
		data.forEach((seed) => {
			Campground.create(seed, (err, campground) => {	
				if(err){ 
					console.log(err);
				}else{
					console.log("Added a campground");
					//create comment
					Comment.create(
						{
							text:"internet is great",
							author: "Vineet"
						}, (err, comment) => {
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created comment");
							}
						});
				}
			});
		});
	});	
}

module.exports = seedDB;

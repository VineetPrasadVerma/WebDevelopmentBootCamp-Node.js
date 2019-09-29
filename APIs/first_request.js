var request = require("request");
request("https://jsonplaceholder.typicode.com/users/", function(error, response, body){
	if(!error && response.statusCode === 200){
		var parsedData = JSON.parse(body);
		console.log(typeof body);
		console.log(parsedData[0].name);
	}else{
		console.log(error);
	}
});

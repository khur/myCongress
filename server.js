var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var db = mongojs('myCongress', ['user', 'team']);

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/', function (request, response){
	console.log("I got a GET request!");
	response.send('home.html')
});

//////////////////////////////////////////////////////////////////////////////////////

// Gets a list a users
app.get('/users', function (request, response){
	console.log("I got a GET request for users!");
	db.user.find(function (err, result) {
		// console.log(result);
		response.json("./index.html", result);
	})
}); // End List of Users request

//////////////////////////////////////////////////////////////////////////////////////

// Creates a user POST request
app.post('/users', function (request, response) {
	console.log(request.body);
	db.user.insert(request.body, function (err, result) {
		response.json(result);
	});
});// End Create User request

//////////////////////////////////////////////////////////////////////////////////////

// Deletes a User
app.delete('/users/:id', function (request, response) {
	var id = request.params.id;
	console.log(id);
	db.user.remove({_id:mongojs.ObjectId(id)}, function (err, result){
		response.json(result);
	});
});// end Delete request

//////////////////////////////////////////////////////////////////////////////////////

// Get a single user request
app.get('/users/:id', function (request, response) {
	var id = request.params.id;
	console.log(id);
	db.user.findOne({_id: mongojs.ObjectId(id)}, function (err, result) {
		console.log(result);
		response.json(result);
	});
});// End single user get request

//////////////////////////////////////////////////////////////////////////////////////

// Update user with a PUT request
app.put('/users/:id', function (request, response) {
	var id = request.params.id;
	console.log(request.body.name);
	db.user.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: request.body.name, email: request.body.email}},
		new: true}, function (err, result) {
			response.json(result);
	});
}); //End user PUT request

//////////////////////////////////////////////////////////////////////////////////////

		///////////////////////////////////////////
		//////////// TEAM API /////////////////////
		///////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

// Get a list of teams request
app.get('/teams', function (request, response){
	console.log("I got a GET request for teams!");
	db.team.find(function (err, result) {
		console.log("this is the list of teams:" + result);
		response.json(result);
	})
}); //  End List of teams request

//////////////////////////////////////////////////////////////////////////////////////

// Get a Single User
app.get('/teams/:id', function(request, response){
	var id = request.params.id;
	console.log(id);
	db.team.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
		console.log("this is the single team:" + result);
		response.json(result);
	});
}); //End Single user GET

//////////////////////////////////////////////////////////////////////////////////////

// Creates a Team POST request
app.post('/teams', function (request, response) {
	console.log("this is a post request" + request.body);
	db.team.insert(request.body, function (err, result) {
		response.json(result);
	});
});// End Create Team request

//////////////////////////////////////////////////////////////////////////////////////

// UPDATE TEAM
app.put('/teams/:id', function (request, response) {
	var id = request.params.id;
	console.log(request.body.name);
	db.team.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: request.body.name, email: request.body.slogan}},
		new: true}, function (err, result) {
		console.log("this is the new team:" + result.name);
		response.json(result);
	});
}); //End user PUT request

//////////////////////////////////////////////////////////////////////////////////////

// DELETE TEAM
app.delete('/teams/:id', function (request, response) {
	var id = request.params.id;
	console.log(id);
	db.team.remove({_id:mongojs.ObjectId(id)}, function (err, result){
		response.json(result);
	});
});// end Delete request

//////////////////////////////////////////////////////////////////////////////////////

app.listen(3000);
console.log("Server running on port 3000!");
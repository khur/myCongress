var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var http = require('http');
var db = mongojs('myCongress', ['user', 'team', 'league']);
var request = require('request');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
	function(username, password, done) {

		console.log("I'm in local strategy \n");


		db.user.find({username: username}, function (err, user) {
			console.log(user);
			if(user[0].username === username && user[0].password === password ) {
				return done(null, {message: "welcome" + user.name});
			} else{
				return done(null, false, {message: "Incorrect Credentials"});
			}
		});
		//if (username === "admin" && password === "admin") // stupid example
		//	return done(null, {name: "admin"});
        //
		//return done(null, false, { message: 'Incorrect username.' });
	}
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

// Define a middleware function to be used for every secured routes

var auth = function(request, response, next) {

	if (!request.isAuthenticated()) response.send(401);

	else next();
};

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////

// REQUEST SENATORS HERE

app.get('/senators', function(req, resp){
	console.log("I got a request for senators");
	// console.log(req);
	request('https://congress.api.sunlightfoundation.com/legislators?per_page=all&bioguide_id=T000476&title=Sen&in_office=true&apikey=0492ff906e2042c9b4e733b9843ef779', function (error, response, body) {
  		if (!error && response.statusCode == 200) {
  			console.log(body);
  			resp.json(body);
 		}
});
})
 

// console.log("first body" + " " + body.results);
//////////////////////////////////////////////////////////////////////////////////////

// USER LOGIN GET

app.get('/loggedin', function(request, response) {
	response.send(request.isAuthenticated() ? request.user : '0');
});

//////////////////////////////////////////////////////////////////////////////////////

// USER LOGIN POST

app.post('/login', passport.authenticate('local'), function(request, response) {
	response.send(request.user);
});

//////////////////////////////////////////////////////////////////////////////////////

//USER LOGOUT POST
app.post('/logout', function(request, response){
	request.logOut();
	response.send(200);
});

//////////////////////////////////////////////////////////////////////////////////////

//app.get('/', function (request, response){
//	console.log("I got a GET request!");
//	//response.send('home.html')
//});

//////////////////////////////////////////////////////////////////////////////////////


						///////////////////////////////////////////
						////////////     USER API      ////////////
						///////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////

// Gets a list a users
app.get('/users', function (request, response){
	console.log("I got a GET request for users!");
	db.user.find(function (err, result) {
		// console.log(result);
		response.json(result);
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
		update: {$set: {name: request.body.name, email: request.body.email, username: request.body.username, password: request.body.password}},
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
	console.log("lets create a team!");
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
		update: {$set: {name: request.body.name, vp: request.body.vp}},
		new: true}, function (err, result) {
		console.log("this is the new team:" + result.name);
		response.json(result);
	});
}); //End user PUT request

//////////////////////////////////////////////////////////////////////////////////////

// DELETE TEAM
app.delete('/teams/:id', auth, function (request, response) {
	var id = request.params.id;
	console.log(id);
	db.team.remove({_id:mongojs.ObjectId(id)}, function (err, result){
		response.json(result);
	});
});// end Delete request

//////////////////////////////////////////////////////////////////////////////////////


						///////////////////////////////////////////
						//////////      LEAGUE API    /////////////
						///////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////

// Get a list of LEAGUES request
app.get('/leagues', function (request, response){
	console.log("I got a GET request for leagues!");
	db.league.find(function (err, result) {
		console.log("this is the list of leagues:" + result);
		response.json(result);
	})
}); //  End List of LEAGUES request

//////////////////////////////////////////////////////////////////////////////////////

// Get a Single LEAGUE
app.get('/leagues/:id', function(request, response){
	var id = request.params.id;
	console.log(id);
	db.league.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
		console.log("this is the single league: \n" + result.body);
		response.json(result);
	});
}); //End Single LEAGUE GET

//////////////////////////////////////////////////////////////////////////////////////

// Creates a LEAGUE POST request
app.post('/leagues', function (request, response) {
	console.log("this is a post request" + request.body);
	db.league.insert(request.body, function (err, result) {
		response.json(result);
	});
});// End Create LEAGUE request

//////////////////////////////////////////////////////////////////////////////////////

// UPDATE LEAGUE
app.put('/leagues/:id', function (request, response) {
	var id = request.params.id;
	console.log(request.body.name);
	db.league.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: request.body.name }},
		new: true}, function (err, result) {
		console.log("this is the new league:" + result.name);
		response.json(result);
	});

}); //End LEAGUE PUT request

//////////////////////////////////////////////////////////////////////////////////////

// DELETE LEAGUE
app.delete('/leagues/:id', function (request, response) {
	var id = request.params.id;
	console.log(id);
	db.league.remove({_id:mongojs.ObjectId(id)}, function (err, result){
		response.json(result);
	});
});// End LEAGUE Delete request

//////////////////////////////////////////////////////////////////////////////////////

// Gets a list of TEAMS in a LEAGUE

app.get('/leagues/:id/teams', function(request, response){
	console.log("\n Inside league/:id/teams");
	var id = request.params.id;
	console.log("id for list of teams:  " + id);
	console.log("I WAS ASKED FOR TEAM IN A LEAGUE!");

	db.team.find({league_id: id}, function(err, docs) {
		if (err) console.log(err);
		console.log("this is the list of specific teams in league: " + docs);
		response.json(docs);
	});

});

app.get('https://congress.api.sunlightfoundation.com/legislators?per_page=all&bioguide_id=T000476&title=Sen&in_office=true&apikey=0492ff906e2042c9b4e733b9843ef779', function(request, response){
	console.log("this is the response: " + response);

});

//////////////////////////////////////////////////////////////////////////////////////
app.listen(3000);
console.log("Server running on port 3000!");
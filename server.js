var express 				= require('express');
var app 						= express();
var bodyParser 			= require('body-parser');
var passport 				= require('passport');
var LocalStrategy 	= require('passport-local').Strategy;
var http 						= require('http');
var request 				= require('request');
var Router 					= require('./api/api');
// var session = require('express-session');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
// app.use(express.session({ secret: 'myCongress' }));
app.use(passport.initialize());
app.use(passport.session());


  // app.use(express.static(__dirname + "/public"));
  
  // app.use(bodyParser.json());
  // app.use(express.session({ secret: 'myCongress' }));
  // app.use(passport.initialize());
  // app.use(passport.session());

app.use(Router);


// passport.use(new LocalStrategy(
// 	function(username, password, done) {

// 		console.log("I'm in local strategy \n");
// 		db.user.find({username: username}, function (err, user) {
// 			// console.log(user); 
// 			if(user[0].username === username && user[0].password === password ) {

// 				return done(null, {message: "welcome" + user.name});
// 			} else{
// 				return done(null, false, {message: "Incorrect Credentials"});
// 			}
// 		});
// 	}
// ));

// // Serialized and deserialized methods when got from session
// passport.serializeUser(function(user, done) {
// 	done(null, user);
// });

// passport.deserializeUser(function(user, done) {
// 	done(null, user);
// });

// // Define a middleware function to be used for every secured routes

// var auth = function(request, response, next) {

// 	if (!request.isAuthenticated()) response.send(401);

// 	else next();
// };

//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////
////      Gets a list of Senators      /////
////////////////////////////////////////////



// app.get('https://congress.api.sunlightfoundation.com/legislators?per_page=all&bioguide_id=T000476&title=Sen&in_office=true&apikey=0492ff906e2042c9b4e733b9843ef779', function(request, response){
// 	console.log("this is the response: " + response);

// });

//////////////////////////////////////////////////////////////////////////////////////
app.listen(3000);
console.log("Server running on port 3000!");

















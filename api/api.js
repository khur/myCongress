var express = require('express');
var router  = express.Router();
var mongojs         = require('mongojs');
var db              = mongojs('myCongress', ['user', 'team', 'league', 'senator']);







// REQUEST SENATORS HERE

router.get('/senators', function(req, resp){
  console.log("I got a request for senators");
  // console.log(req);
  db.senator.find(function (err, result) {
    // console.log(result);
    resp.json(result);
  });
  // request('https://congress.api.sunlightfoundation.com/legislators?per_page=all&title=Sen&in_office=true&apikey=0492ff906e2042c9b4e733b9843ef779', function (error, response, body) {
 //     if (!error && response.statusCode == 200) {
 //       nb = JSON.parse(body);
 //       // console.log(nb.results[99].first_name);
 //       for(var i = 0; i < nb.results.length; i++){
 //         senator = {
 //           first_name: nb.results[i].first_name,
 //           last_name: nb.results[i].last_name,
 //           party: nb.results[i].party,
 //           state: nb.results[i].state,
 //           state_name: nb.results[i].state_name,
 //           state_rank: nb.results[i].state_rank,
 //           website: nb.results[i].website,
 //           contact_form: nb.results[i].contact_form
 //         }

 //         db.senator.insert(senator, function(err, result){
 //           console.log(err);
 //           console.log(result);
 //           response.json(result);
 //         });
 //       }
        // resp.json();
    // }
// });
});

router.get('/senators/:id', function (request, response) {
  console.log("i got a single sen request");
  var id = request.params.id;

  db.senator.findOne({_id: mongojs.ObjectId(id)}, function (err, result) {
      console.log(result);
      response.json(result);
    });

});
 

// console.log("first body" + " " + body.results);
//////////////////////////////////////////////////////////////////////////////////////

// USER LOGIN GET

// router.get('/loggedin', function(request, response) {
//   console.log("inside loggedin function \n");
//   // console.log(request.body);
//   response.send(request.isAuthenticated() ? request.user : '0');
// });

//////////////////////////////////////////////////////////////////////////////////////

// USER LOGIN POST

// router.post('/login', passport.authenticate('local', { 
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true })
// );

//////////////////////////////////////////////////////////////////////////////////////

//USER LOGOUT POST
// router.post('/logout', function(request, response){
//   request.logOut();
//   response.send(200);
// });

//////////////////////////////////////////////////////////////////////////////////////

//router.get('/', function (request, response){
//  console.log("I got a GET request!");
//  //response.send('home.html')
//});

//////////////////////////////////////////////////////////////////////////////////////


            ///////////////////////////////////////////
            ////////////     USER API      ////////////
              ///////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////

// Gets a list a users
router.get('/users', function (request, response){
  console.log("I got a GET request for users!");
  db.user.find(function (err, result) {
    // console.log(result);
    response.json(result);
  })
}); // End List of Users request

//////////////////////////////////////////////////////////////////////////////////////

// Creates a user POST request
router.post('/users', function (request, response) {
  console.log(request.body);
  db.user.insert(request.body, function (err, result) {
    response.json(result);
  });
});// End Create User request

//////////////////////////////////////////////////////////////////////////////////////

// Deletes a User
router.delete('/users/:id', function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.user.remove({_id:mongojs.ObjectId(id)}, function (err, result){
    response.json(result);
  });
});// end Delete request

//////////////////////////////////////////////////////////////////////////////////////

// Get a single user request
router.get('/users/:id', function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.user.findOne({_id: mongojs.ObjectId(id)}, function (err, result) {
    console.log(result);
    response.json(result);
  });
});// End single user get request

//////////////////////////////////////////////////////////////////////////////////////

// Update user with a PUT request
router.put('/users/:id', function (request, response) {
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
router.get('/teams', function (request, response){
  console.log("I got a GET request for teams!");
  db.team.find(function (err, result) {
    console.log("this is the list of teams:" + result);
    response.json(result);
  })
}); //  End List of teams request

//////////////////////////////////////////////////////////////////////////////////////

// Get a Single User
router.get('/teams/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  db.team.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
    console.log("this is the single team:" + result);
    response.json(result);
  });
}); //End Single user GET

//////////////////////////////////////////////////////////////////////////////////////

// Creates a Team POST request
router.post('/teams', function (request, response) {
  console.log("lets create a team!");
  console.log("this is a post request" + request.body);
  db.team.insert(request.body, function (err, result) {
    response.json(result);
  });
});// End Create Team request

//////////////////////////////////////////////////////////////////////////////////////

// UPDATE TEAM
router.put('/teams/:id', function (request, response) {
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
router.delete('/teams/:id', function (request, response) {
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
router.get('/leagues', function (request, response){
  console.log("I got a GET request for leagues!");
  db.league.find(function (err, result) {
    console.log("this is the list of leagues:" + result);
    response.json(result);
  })
}); //  End List of LEAGUES request

//////////////////////////////////////////////////////////////////////////////////////

// Get a Single LEAGUE
router.get('/leagues/:id', function(request, response){
  var id = request.params.id;
  console.log(id);
  db.league.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
    console.log("this is the single league: \n" + result.body);
    response.json(result);
  });
}); //End Single LEAGUE GET

//////////////////////////////////////////////////////////////////////////////////////

// Creates a LEAGUE POST request
router.post('/leagues', function (request, response) {
  console.log("this is a post request" + request.body);
  db.league.insert(request.body, function (err, result) {
    response.json(result);
  });
});// End Create LEAGUE request

//////////////////////////////////////////////////////////////////////////////////////

// UPDATE LEAGUE
router.put('/leagues/:id', function (request, response) {
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
router.delete('/leagues/:id', function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.league.remove({_id:mongojs.ObjectId(id)}, function (err, result){
    response.json(result);
  });
});// End LEAGUE Delete request

//////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////
//// Gets a list of TEAMS in a LEAGUE  /////
////////////////////////////////////////////

router.get('/leagues/:id/teams', function(request, response){
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

module.exports = router;
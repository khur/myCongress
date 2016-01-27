var express    = require('express');
var router     = express.Router();
var mongojs    = require('mongojs');
var db         = mongojs('myCongress', ['user', 'team', 'league', 'senator']);
var Senator    = require('./senator/routes');
var User       = require('./user/routes');
var Team       = require('./team/routes');
var League     = require('./league/routes');




// REQUEST SENATORS HERE
router.get('/senators', Senator.getSenators);
router.get('/senators/:id', Senator.getSingleSenator);

// League Routes
router.get('/leagues', League.getLeagues);
router.get('/leagues/:id', League.getSingleLeague);
router.post('/leagues', League.createLeague);
router.put('/leagues/:id', League.updateLeague);
router.delete('/leagues/:id', League.deleteLeague);
router.get('/leagues/:id/teams', League.leagueTeams);

// User Routes
router.get('/users', User.getUsers);
router.get('/users/:id', User.getSingleUser);
router.post('/users', User.createUser);
router.put('/users/:id', User.updateUser);
router.delete('/users/:id', User.deleteUser);

// Team Routes

router.get('/teams', Team.getTeams); //  End List of teams request
router.get('/teams/:id', Team.getSingleTeam); //End Single user GET
router.post('/teams', Team.createTeam);// End Create Team request
router.put('/teams/:id', Team.updateTeam); //End user PUT request
router.delete('/teams/:id', Team.deleteTeam);


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




module.exports = router;
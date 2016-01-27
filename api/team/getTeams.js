var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getTeams = function (request, response){
  // console.log("I got a GET request for teams!");
  db.team.find(function (err, result) {
    // console.log("this is the list of teams:" + result);
    response.json(result);
  })
};

module.exports = getTeams;
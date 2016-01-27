var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var createTeam = function (request, response) {
  // console.log("lets create a team!");
  // console.log("this is a post request" + request.body);
  db.team.insert(request.body, function (err, result) {
    response.json(result);
  });
};

module.exports = createTeam;
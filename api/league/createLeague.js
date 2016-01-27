var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var createLeague = function (request, response) {
    // console.log("this is a post request" + request.body);
    db.league.insert(request.body, function (err, result) {
      response.json(result);
    });
  // });
}

module.exports = createLeague;
var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getLeagues = function (request, response){
    // console.log("I got a GET request for leagues!");
    db.league.find(function (err, result) {
      // console.log("this is the list of leagues:" + result);
      response.json(result);
    })
  // });
}

module.exports = getLeagues;
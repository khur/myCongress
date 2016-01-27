var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var leagueTeams =  function(request, response){
  var id = request.params.id;

  db.team.find({league_id: id}, function(err, docs) {
    if (err) console.log(err);
    // console.log("this is the list of specific teams in league: " + docs);

    response.json(docs);
  });

};

module.exports = leagueTeams;
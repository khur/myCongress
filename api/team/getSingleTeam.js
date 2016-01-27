var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getSingleTeam = function(request, response){
  var id = request.params.id;
  // console.log(id);
  db.team.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
    // console.log("this is the single team:" + result);
    response.json(result);
  });
};

module.exports = getSingleTeam;
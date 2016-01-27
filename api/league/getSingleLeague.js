var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getSingleLeague = function(request, response){
    var id = request.params.id;
    // console.log(id);
    db.league.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
      // console.log("this is the single league: \n" + result.body);
      response.json(result);
    });
  // });
}

module.exports = getSingleLeague;
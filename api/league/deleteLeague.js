var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var deleteLeague = function (request, response) {
    var id = request.params.id;
    // console.log(id);
    db.league.remove({_id:mongojs.ObjectId(id)}, function (err, result){
      response.json(result);
    });

};

module.exports = deleteLeague;
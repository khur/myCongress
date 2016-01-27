var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var updateLeague = function (request, response) {
    var id = request.params.id;
    // console.log(request.body.name);
    db.league.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: request.body.name }},
      new: true}, function (err, result) {
      // console.log("this is the new league:" + result.name);
      response.json(result);
    });

  // });
}

module.exports = updateLeague;
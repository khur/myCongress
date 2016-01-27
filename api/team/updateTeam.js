var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var updateTeam = function (request, response) {
  var id = request.params.id;
  // console.log(request.body.name);
  db.team.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: request.body.name, vp: request.body.vp}},
    new: true}, function (err, result) {
    // console.log("this is the new team:" + result.name);
    response.json(result);
  });
};

module.exports = updateTeam;
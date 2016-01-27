var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var updateUser = function (request, response) {
  var id = request.params.id;
  console.log(request.body.name);
  db.user.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: request.body.name, email: request.body.email, username: request.body.username, password: request.body.password}},
    new: true}, function (err, result) {
      response.json(result);
  });
};

module.exports = updateUser;
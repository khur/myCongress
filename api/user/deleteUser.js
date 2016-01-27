var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var deleteUser = function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.user.remove({_id:mongojs.ObjectId(id)}, function (err, result){
    response.json(result);
  });
};

module.exports = deleteUser;
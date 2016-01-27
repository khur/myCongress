var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getSingleUser = function (request, response) {
  var id = request.params.id;
  console.log(id);
  db.user.findOne({_id: mongojs.ObjectId(id)}, function (err, result) {
    console.log(result);
    response.json(result);
  });
};

module.exports = getSingleUser;
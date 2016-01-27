var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var createUser = function (request, response) {
  // console.log(request.body);
  db.user.insert(request.body, function (err, result) {
    response.json(result);
  });
};

module.exports = createUser;
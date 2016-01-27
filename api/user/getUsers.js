var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getUsers = function (request, response){
  console.log("I got a GET request for users!");
  db.user.find(function (err, result) {
    // console.log(result);
    response.json(result);
  })
};

module.exports = getUsers;
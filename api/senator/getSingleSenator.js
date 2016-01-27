var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getSingleSenator =  function (request, response) {
  // console.log("i got a single sen request");
  var id = request.params.id;

  db.senator.findOne({_id: mongojs.ObjectId(id)}, function (err, result) {
      // console.log(result);
      response.json(result);
    });

};

module.exports = getSingleSenator;
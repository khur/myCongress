var mongojs           = require('mongojs');
var db                = mongojs('myCongress', ['user', 'team', 'league', 'senator']);

var getSenators = function(req, resp){
  // console.log("I got a request for senators");

  db.senator.find(function (err, result) {
    resp.json(result);
  });



  // request('https://congress.api.sunlightfoundation.com/legislators?per_page=all&title=Sen&in_office=true&apikey=0492ff906e2042c9b4e733b9843ef779', function (error, response, body) {
 //     if (!error && response.statusCode == 200) {
 //       nb = JSON.parse(body);
 //       // console.log(nb.results[99].first_name);
 //       for(var i = 0; i < nb.results.length; i++){
 //         senator = {
 //           first_name: nb.results[i].first_name,
 //           last_name: nb.results[i].last_name,
 //           party: nb.results[i].party,
 //           state: nb.results[i].state,
 //           state_name: nb.results[i].state_name,
 //           state_rank: nb.results[i].state_rank,
 //           website: nb.results[i].website,
 //           contact_form: nb.results[i].contact_form
 //         }

 //         db.senator.insert(senator, function(err, result){
 //           console.log(err);
 //           console.log(result);
 //           response.json(result);
 //         });
 //       }
        // resp.json();
    // }
// });

};


module.exports = getSenators;
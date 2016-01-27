var getTeams = require('./getTeams');
var deleteTeam = require('./deleteTeam');
var updateTeam = require('./updateTeam');
var getSingleTeam = require('./getSingleTeam');
var createTeam = require('./createTeam');

module.exports = {
  getTeams : getTeams,
  deleteTeam : deleteTeam,
  updateTeam : updateTeam,
  getSingleTeam : getSingleTeam,
  createTeam : createTeam
}
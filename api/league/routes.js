var express = require('express');
var router = express.Router();

var getLeagues = require('./getLeagues');
var getSingleLeague = require('./getSingleLeague');
var createLeague = require('./createLeague');
var updateLeague = require('./updateLeague');
var deleteLeague = require('./deleteLeague');
var leagueTeams = require('./leagueTeams');

module.exports = {
  getLeagues: getLeagues,
  getSingleLeague: getSingleLeague,
  createLeague: createLeague,
  updateLeague: updateLeague,
  deleteLeague: deleteLeague,
  leagueTeams: leagueTeams
}
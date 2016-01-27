var express = require('express');
var router = express.Router();

var getSenators       = require('./getSenators');
var getSingleSenator  = require('./getSingleSenator');

module.exports = {

  getSenators: getSenators,
  getSingleSenator: getSingleSenator

}

// router.get("/:id", getSingleSenator);
var getUsers = require('./getUsers');
var deleteUser = require('./deleteUser');
var updateUser = require('./updateUser');
var getSingleUser = require('./getSingleUser');
var createUser = require('./createUser');

module.exports = {
  getUsers : getUsers,
  deleteUser : deleteUser,
  updateUser : updateUser,
  getSingleUser : getSingleUser,
  createUser : createUser
}
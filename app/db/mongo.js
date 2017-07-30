const config = require('config');
const mongoose = require('mongoose');

function __connection() {

  let username  = config.get('mongo.username');
  let password  = config.get('mongo.password');
  let database  = config.get('mongo.database');
  let server    = config.get('mongo.server');
  let port      = config.get('mongo.port');
  let auth      = username ? (username + ':' + password + '@') : '';

  return 'mongodb://' + auth + server + ':' + port + '/' + database;

}

module.exports = mongoose.connect(__connection());

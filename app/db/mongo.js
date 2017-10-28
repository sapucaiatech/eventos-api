const mongoose = require('mongoose');

function __connection() {

  let username  = process.env.MONGO_USERNAME || '';
  let password  = process.env.MONGO_PASSWORD || '';
  let database  = process.env.MONGO_DATABASE || 'sapucaia';
  let server    = process.env.MONGO_SERVER || 'localhost';
  let port      = process.env.MONGO_PORT || 27017;
  let auth      = username ? (username + ':' + password + '@') : '';

  return 'mongodb://' + auth + server + ':' + port + '/' + database;

}

module.exports = mongoose.connect(__connection());

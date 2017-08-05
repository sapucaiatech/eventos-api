const moment  = require('moment');
const jwt     = require('jwt-simple');
const lancaError = require('../utils/lancaError.js')

const middlewareAuth = function(req, res, next) {

  let token = req.headers['x-access-token'];

  try {

    if (!token) {
      throw lancaError("Forbidden", 403);
    }

    let decoded = jwt.decode(token, process.env.JWT_SECRET);
    let expirou = moment(decoded.exp).isBefore(new Date());

    if (expirou) {
      throw lancaError("Unauthorized", 401);
    }

    req.username = decoded.sub;
    next();

  } catch (e) {
    return next(e);
  }

};


module.exports = middlewareAuth;

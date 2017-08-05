const express = require('express');
const router  = express.Router();
const moment = require('moment');
const jwt = require('jwt-simple');
const lancaError = require('../utils/lancaError.js')

router.post('/', function(req, res, next) {

  let user = req.body.username;

  try {

    if (!process.env.JWT_USERNAME || !process.env.JWT_SECRET) {
      throw lancaError("Environment not configured correctly", 500);
    }

    if (user === process.env.JWT_USERNAME) {

      let expira  = moment().add(3, 'days').valueOf();
      let token   = jwt.encode({
        sub: user,
        exp: expira
      }, process.env.JWT_SECRET);

      res.json({ token: token });

    } else {
      throw lancaError("Unauthorized", 401);
    }

  } catch (e) {
    return next(e);
  }

});


module.exports = router;

const express = require('express');
const router  = express.Router();
const moment = require('moment');
const jwt = require('jwt-simple');

router.post('/', function(req, res, next) {

  let pass = req.body.password;
  let user = req.body.username;

  try {

    if (!process.env.JWT_USERNAME || !process.env.JWT_PASSWORD || !process.env.JWT_SECRET) {

      let err = new Error("Ambiente não configurado corretamente");
      err.status = 500;
      throw err;

    }

    if (user === process.env.JWT_USERNAME && pass === process.env.JWT_PASSWORD) {

      let expira  = moment().add(3, 'days').valueOf();
      let token   = jwt.encode({
        username: user,
        expira: expira
      }, process.env.JWT_SECRET);

      res.json({ token: token });

    } else {
      throw new Error("Acesso não autorizado");
    }

  } catch (e) {

    if (!e.status) {
      e.status = 401;
    }
    return next(e);
  }

});


module.exports = router;

const express = require('express');
const router  = express.Router();
const Evento  = require('../models/evento');
const moment  = require('moment');
const jwt     = require('jwt-simple');

const middlewareAuth = function(req, res, next) {

  const lancaErro = function(msg, code) {
    let err = new Error(msg);
    err.status = code;
    return err;
  }

  let token = req.body.token || req.headers['x-access-token'];

  try {

    if (!token) {
      throw lancaErro("Proibido", 403);
    }

    let decoded = jwt.decode(token, process.env.JWT_SECRET);
    let expirou = moment(decoded.expira).isBefore(new Date());

    if (expirou) {
      throw lancaErro("Acesso não autorizado", 401);
    }

    req.user = decoded.username;
    next();

  } catch (e) {
    return next(e);
  }

};

router.route('/')
  .post(middlewareAuth, function(req, res) {
    var evento = new Evento(req.body);
    evento.save(function(error) {
      if (error) {
        res.send(error);
      }
      res.json(
        {
          message: 'Event created',
          event: evento
        }
      );
    });
  })
  .get(function(req, res) {
    Evento.find(function(err, eventos) {
      if (err) {
        res.send(err);
      }
      res.json(eventos);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Evento.findById(req.params.id, function(error, evento) {
      if (error) {
        res.send(error);
      }
      res.json(evento);
    });
  })
  .put(middlewareAuth, function(req, res) {
    Evento.findOneAndUpdate({_id: req.params.id}, req.body,  {new: true},function(error, evento){
      if (error) {
        res.send(error);
      }
      res.send(
        {
          message:"Event updated",
          event: evento
        }
      );
    });
  })
  .delete(middlewareAuth, function(req, res) {
    Evento.remove({_id: req.params.id}, function(error) {
      if (error) {
        res.send(error);
      }
      res.json({ message: 'Event removed'});
    });
  });

module.exports = router;

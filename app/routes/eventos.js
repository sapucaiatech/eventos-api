const express = require('express');
const router  = express.Router();
const Evento  = require('../models/evento');
const middlewareAuth = require('../utils/middlewareAuth');
const moment = require('moment');
const lancaError = require('../utils/lancaError.js')

router.post('/', middlewareAuth, function(req, res) {
  let evento = new Evento(req.body);
  evento.save(function(err) {

    if (err) {
      throw lancaError("Problem creating the event: " + err, 500);
    }
    res.json({
      message: 'Event created',
      event: evento
    });

  });
});

router.get('/', function(req, res) {
  let filtro = {};

  filtro['data.inicio'] = {
    $gte: moment().startOf('day').format()
  };

  Evento
    .find(filtro, function(err, eventos) {
      if (err) {
        throw lancaError("Problem finding events: " + err, 500);
      }
      res.json(eventos);
    })
    .sort('data.inicio')
  ;
});

router.get('/:id', function(req, res) {
  Evento.findById(req.params.id, function(err, evento) {
    if (err) {
      throw lancaError("Problem finding the event: " + err, 500);
    }
    res.json(evento);
  });
});

router.put('/:id', middlewareAuth, function(req, res) {
  Evento.findOneAndUpdate({
    _id: req.params.id
  }, req.body, { new: true }, function(err, evento) {

    if (err) {
      throw lancaError("Problem updating the event: " + err, 500);
    }
    res.send({
      message:"Event updated",
      event: evento
    });

  });
});

router.delete('/:id', middlewareAuth, function(req, res) {
  Evento.remove({ _id: req.params.id }, function(err) {
    if (err) {
      throw lancaError("Problem deleting the event: " + err, 500);
    }
    res.json({ message: 'Event removed' });
  });
});

module.exports = router;

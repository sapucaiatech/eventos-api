const express = require('express');
const router  = express.Router();
const Evento  = require('../models/evento');
const middlewareAuth = require('../utils/middlewareAuth');
const moment = require('moment')

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
    Evento.find({'data.inicio' : { $gte : moment().startOf('day').format()} }, function(err, eventos) {
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

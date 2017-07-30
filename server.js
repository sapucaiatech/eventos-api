var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var Evento = require('./app/models/evento');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var router  = express.Router();

router.use(function(req, res, next) {
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'OK' });
});

router.route('/eventos')
    .post(function(req, res) {
        var evento = new Evento(req.body);
        evento.save(function(error) {
            if(error)
                res.send(error);
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
            if(err)
                res.send(err);
            res.json(eventos);
        });
    });

    router.route('/eventos/:id')
        .get(function(req, res) {
            Evento.findById(req.params.id, function(error, evento) {
                if(error)
                    res.send(error);
                res.json(evento);
            });
        })
        .put(function(req, res) {
            Evento.findOneAndUpdate({_id: req.params.id}, req.body,  {new: true},function(error, evento){
                if(error)
                    res.send(error);
                res.send(
                  {
                    message:"Event updated",
                    event: evento
                  }
                );
            });
        })
        .delete(function(req, res) {
            Evento.remove({_id: req.params.id}, function(error) {
                if(error)
                    res.send(error);
                res.json({ message: 'Event removed'});
       });
   });

app.use('/api', router);
app.listen(port);
console.log('Server started on port ' + port);

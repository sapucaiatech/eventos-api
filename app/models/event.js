var mongoose = require('mongoose');
mongoose.connect('conection');

var Schema = mongoose.Schema;

var EventSchema = new Schema({
  Evento: String,
  Link: String,
  Local: String,
  Data: { type: Date },
  Descrição: String
});

module.exports = mongoose.model('Event', EventSchema);

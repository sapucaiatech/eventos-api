var mongoose = require('mongoose');
mongoose.connect('conection');

var Schema = mongoose.Schema;

var EventoSchema = new Schema({
  evento: String,
  link: String,
  local: String,
  data: { type: Date },
  descricao: String
});

module.exports = mongoose.model('Evento', EventoSchema);
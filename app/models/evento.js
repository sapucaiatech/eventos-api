var mongoose = require('mongoose');
mongoose.connect('mongodb://sapucaia:sapucaia@ds129183.mlab.com:29183/sapucaia');

var Schema = mongoose.Schema;

var EventoSchema = new Schema({
  evento: String,
  link: String,
  local: String,
  data: { type: Date },
  descricao: String
});

module.exports = mongoose.model('Evento', EventoSchema);

const db = require('../db/mongo');

const Schema = db.Schema;

const EventoSchema = new Schema({
  evento: String,
  link: String,
  local: String,
  maps: String,
  data: {
    inicio: { type: Date },
    fim: { type: Date }
  },
  descricao: String
});

module.exports = db.model('Evento', EventoSchema);

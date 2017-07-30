const express = require('express');
const router  = express.Router();

router.get('/', function (req, res) {

  res.status(200);
  res.json({ message: 'OK' });

});


// Eventos
router.use('/eventos', require('./eventos'));


module.exports = router;

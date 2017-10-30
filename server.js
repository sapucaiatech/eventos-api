require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const logger = require('morgan');

const port = process.env.PORT || 8000;
const dev = process.env.DEV || true;

// Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (dev){
  app.use(logger('combined'));
}

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});


// Routes
app.use('/', require('./app/routes'));


// Error handling
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500).json({ err: err.message });
});


// Server
app.listen(port);
console.log('Server started on port ' + port);

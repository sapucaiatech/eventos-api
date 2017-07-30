const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8000;

// Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  let date = new Date();
  console.log(`\n -- ${req.method} ::> ${req.originalUrl}`);
  console.log(`request at: ${date.toString()}`);
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

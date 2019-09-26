const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

<<<<<<< HEAD
<<<<<<< HEAD:services/lists/src/app.js
const routes = require('./routes/lists');
=======
const routes = require('./routes/items');
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/items/src/app.js
=======
const routes = require('./routes/lists');
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

if (process.env.NODE_ENV !== 'test') { app.use(logger('dev')); }
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

<<<<<<< HEAD
<<<<<<< HEAD:services/lists/src/app.js
app.use('/lists', routes);
=======
app.use('/items', routes);
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056:services/items/src/app.js
=======
app.use('/lists', routes);
>>>>>>> 5e917d3bcc2f7aff11e29fa9caa72b2eeda5c056

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  const message = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({
    status: 'error',
    message: err,
  });
});
/* eslint-enable no-unused-vars */

module.exports = app;

const express = require('express');

const queries = require('../db/queries.js');
const routeHelpers = require('./_helpers');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

/*
get items by user
 */
/* eslint-disable no-param-reassign */
router.get('/user', routeHelpers.ensureAuthenticated, (req, res, next) => {
  return queries.getSavedItems(parseInt(req.user, 10))
    .then((items) => {
      res.json({
        status: 'success',
        data: items,
      });
    })
    .catch((err) => { return next(err); });
});
/* eslint-enable no-param-reassign */

/*
add new item
 */
router.post('/', routeHelpers.ensureAuthenticated, (req, res, next) => {
  req.body.user_id = req.user;
  return queries.addItem(req.body)
    .then(() => {
      res.json({
        status: 'success',
        data: 'Item Added!',
      });
    })
    .catch((err) => { return next(err); });
});

module.exports = router;

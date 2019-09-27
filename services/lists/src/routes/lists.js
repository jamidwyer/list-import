const express = require('express');

const queries = require('../db/queries.js');
const routeHelpers = require('./_helpers');

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send('pong');
});

/*
get lists by user
 */
/* eslint-disable no-param-reassign */
router.get('/user', routeHelpers.ensureAuthenticated, (req, res, next) => {
  return queries.getSavedLists(parseInt(req.user, 10))
    .then((lists) => {
      res.json({
        status: 'success',
        data: lists,
      });
    })
    .catch((err) => { return next(err); });
});
/* eslint-enable no-param-reassign */

/*
add new list
 */
router.post('/', routeHelpers.ensureAuthenticated, (req, res, next) => {
  req.body.user_id = req.user;
  return queries.addList(req.body)
    .then(() => {
      res.json({
        status: 'success',
        data: 'List Added!',
      });
    })
    .catch((err) => { return next(err); });
});

module.exports = router;

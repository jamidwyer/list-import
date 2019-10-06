const knex = require('./connection');

function getSavedLists(userId) {
  const lists = knex('lists').select().where('user_id', userId);
  return lists;
}

function addList(obj) {
  knex.query(
    'INSERT INTO lists(name, user_id) VALUES($1, $2)',
    [name, userId],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/lists');
    }
  )
}

module.exports = {
  getSavedLists,
  addList,
};

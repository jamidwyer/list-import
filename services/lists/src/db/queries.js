const knex = require('./connection');

function getSavedLists(userId) {
  return knex('lists').select().where('user_id', userId);
}

function addList(obj) {
  return knex('lists').insert(obj);
}

module.exports = {
  getSavedLists,
  addList,
};
